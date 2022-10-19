import { format } from 'util'
import { exceptionCodes, notFoundCodes, unhandledCodes } from './snag.exception.codes'
import { ISnagOptions } from './snag.exception.types'

type TProtocol = 'http' | 'amqp' | 'ws' | 'grpc'

/**
 * Snag is a modern Error object designed to store and passe error information in a debug-friendly, and API-orientated manner.
 * @example
 * Basic usage:
 * throw new Snag('foo')
 *
 * @example
 *
 * try {
 *     const stuff = undefined
 *     stuff.prop = true // this will error out
 * } catch (originalError) {
 *     // Snag will wrap around the native error object
 *     // and provide API-oriented functionality
 *     throw new Snag({
 *         error: originalError,
 *         message: 'We were not able to complete some task.',
 *         statusCode: 'HTTP_400_Bad_Request',
 *         tag: 'some_tag_the_frontend_can_use',
 *         // message can be shown to client (i.e. on Alert/Modals).
 *         showMessageToClient: true,
 *         // we put `stuff` here which Sentry/GCP can see.
 *         breadcrumbs: [stuff],
 *     })
 * }
 *
 * @example
 * // If error is received from a Grpc operation, and you are communicating to client predominantly via Websocket:
 * sendGrpc().catch(grpcError => {
 *      throw new Snag({
 *          error: grpcError,
 *          // `WS_1011_Server_Error` also maps to `HTTP_500_Internal_Server_Error`, and other server errors for various protocols.
 *          statusCode: 'WS_1011_Server_Error'
 *      })
 * }
 *
 * @example
 * // If you pass in an error object, it will turn it into a Snag error, with the error re-attached to the Snag.
 * const error = Error('The error from upstream.')
 * const snag = new Snag(error)
 * snag.message // outputs 'The error from upstream.'
 * snag.statusCode // outputs 500
 * snag.error === error // outputs true
 *
 * @param options Can be message in string, any instances of Error, or an options object. If strings, defaults tag to 'not_handled'.
 * @param options.error An error object of the original offending exception. If this is passed in, it will be added to the breadcrumbs. If `options.message` is not passed in, Snag will attempt to extract the message from `options.error`.
 * @param options.message An error message.
 * @param options.showMessageToClient `true` if it is intended/recommend for the error message to be shown directly to a user. Defaults to `false`.
 * @param options.setStatus Use autocomplete for all available codes.
 * @param options.tag A primary tag that can be used for downstream if/else or switch/case handling. Defaults to `not_handled`. `Note: Tags are not to be confused with code names within specifications. It can coincide with various code names if preferred, but is meant to be application-specific.`
 * @param options.additionalTags Additional tags. `WARN: For performance, arrays passed in here can be subject to side-effects.`
 * @param options.breadcrumbs Any useful debugging information. `WARN: For performance, arrays passed in here can be subject to side-effects.`
 * @param options.level A level tag that can be used to categorise errors.
 *
 */
export class Snag<
    T extends string,
    U extends ISnagOptions<T> | string | Error = ISnagOptions<T>,
> extends Error {
    get name() {
        return this.constructor.name
    }

    readonly timestamp: number
    readonly timestamptz: string

    error: unknown
    message: string
    showMessageToClient = false
    statuses: string[] = [
        'HTTP_500_Internal_Server_Error',
        'AMQP_541_Internal_Error',
        'WS_1011_Server_Error',
        'GRPC_13_INTERNAL',
    ]
    // `statusCode` is for Http by default
    // Other transport protocol should use `statusCodes[protocol]` instead to set response before transmitting
    // Required for NestJS base-exception-filter to work.
    statusCode = 500
    statusCodes: {
        http: number
        amqp: number
        ws: number
        grpc: number
    } = {
        http: 500,
        amqp: 541,
        ws: 1011,
        grpc: 13,
    }
    tag: ISnagOptions<T>['tag'] = 'not_handled'
    additionalTags: ISnagOptions<T>['tag'][] = []
    breadcrumbs: unknown[] = []
    level: ISnagOptions['level'] = 'nil'

    constructor(options?: U) {
        super()

        // set the timestamp
        const date = new Date()
        this.timestamp = date.getTime()
        this.timestamptz = date.toISOString()

        if (typeof options === 'string') {
            this.message = options
            return this
        }
        if (typeof options === 'number') {
            this.message = (options as number).toString()
            return this
        }
        if (typeof options === 'boolean') {
            this.message = (options as boolean).toString()
            return this
        }
        if (options === null) {
            this.message = 'null'
            return this
        }

        let safeOptions: ISnagOptions<T> = {}

        if (options instanceof Error) {
            // Snag is actually able to accept all instances of Error class.
            // So re-assigning all properties of the error object back into `options` will allow best-effort extraction of properties
            // and then we re-attach the original error back into the Snag's `.error` property.
            safeOptions.error = options
            Object.assign(safeOptions, options)
        } else if (typeof options === 'object' && options !== null) {
            safeOptions = options
        }

        const {
            error,
            message,
            showMessageToClient,
            setStatus,
            tag,
            additionalTags,
            breadcrumbs,
            level,
        } = safeOptions

        // Assign the message if provided in `message` prop.
        // Otherwise, attempt to extract from the `error` object.
        let extractedMessage: string | undefined
        if (typeof message === 'string') {
            extractedMessage = message
        } else if (error instanceof Error) {
            extractedMessage = error.message
        } else if (typeof error === 'object' && error !== null && 'message' in error) {
            const errorWithMessageProp = error as { message: unknown }

            // try/catch to be ultra-safe
            try {
                extractedMessage = format(errorWithMessageProp.message)
            } catch (error) {
                extractedMessage = ''
            }
        } else {
            extractedMessage = '' // this is the default native JS Error behaviour
        }

        this.message = extractedMessage

        if (showMessageToClient !== undefined) this.showMessageToClient = showMessageToClient

        if (setStatus && setStatus !== 'DEFAULT') {
            // flatten the exceptionCode properties into array
            this.statuses = Object.keys(exceptionCodes[setStatus]).reduce(
                (value, key) => {
                    return value.concat(exceptionCodes[setStatus][key])
                },
                // the setStatus status code is passed in is one of the statuses
                [setStatus],
            )
            // each of the status strings contains the protocol and the code that needs to be split and parsed.
            for (const status of this.statuses) {
                const [protocol, code] = status.split('_')
                this.statusCodes[protocol.toLowerCase()] = parseInt(code)
            }
        }
        // set the default `statusCode` which is http-based
        // to make NestJS work because it asssumes HTTP as the base case.
        this.statusCode = this.getStatus('http')

        if (tag !== undefined) {
            this.tag = tag
        } else {
            // if tag is not defined, but statusCode is a NOT_FOUND type
            if (notFoundCodes.includes(setStatus)) {
                this.tag = 'result_not_found'
            } else if (setStatus && !unhandledCodes.includes(setStatus)) {
                // if statusCode is defined, but is not internal error
                // we considered it "handled", but not categorised
                this.tag = 'not_categorised'
            }
        }
        if (additionalTags !== undefined) this.additionalTags = additionalTags
        if (breadcrumbs !== undefined) this.breadcrumbs = breadcrumbs

        // if error is passed in, attach it
        if (error !== undefined) this.error = error
        if (level !== undefined) this.level = level

        // pop out from the error stack a line that refers to this file
        // as it is not useful, and wastes at least 1 stack trace.
        // this creates an error stack and modifies it
        this.stack = removeUnnecessaryStack(new Error().stack, new.target.name)

        // restore prototype chain because the base `Error` type
        // will break the prototype chain a little
        // see: https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // see: https://github.com/typeorm/typeorm/blob/master/src/error/TypeORMError.ts
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, new.target.prototype)
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(this as any).__proto__ = new.target.prototype
        }
    }

    /**
     * Mostly a convenience to add to arrays, and also concatenate error messages.
     * Other properties can be changed directly like: `snag.statusCode = 999`
     * `NOTE (SIDE-EFFECTS): This will change the properties of the current instance.`
     *
     */
    add(
        options: Partial<Pick<ISnagOptions<T>, 'message' | 'additionalTags' | 'breadcrumbs'>> = {},
    ) {
        const { message, additionalTags, breadcrumbs } = options
        if (message !== undefined) {
            this.message = `${this.message}; ${message}`
        }
        if (additionalTags !== undefined) {
            this.additionalTags = [...new Set(this.additionalTags.concat(additionalTags))]
        }
        if (breadcrumbs !== undefined) {
            this.breadcrumbs.push(...breadcrumbs)
        }
        return this
    }

    /**
     * Works like #add, but returns a new instance with the desired alterations.
     * A convenience if you don't want to redefine everything.
     * `NOTE: This is used when you want to avoid side effects.`
     */
    new(options: ISnagOptions<T>) {
        const snag = new Snag(options)
        const newKeys = Object.keys(options)
        const oldKeys = Object.keys(this)
        for (const oldKey of oldKeys) {
            // attach the old timestamp back
            if (['timestamp', 'timestamptz'].includes(oldKey)) {
                snag[oldKey] = this[oldKey]
                continue
            }
            // if a property is not defined in the new instance, but exist in the old,
            // copy them over
            if (!newKeys.includes(oldKey)) {
                if (Array.isArray(this[oldKey])) {
                    snag[oldKey] = [...this[oldKey]]
                    continue
                } else if (oldKey === 'statusCode') {
                    // if setStatus is provided, it means we want to keep the new statusCodes
                    if (options.setStatus) continue

                    // if no new statusCode is provided, copy both the statusCode and statusCodes over.
                    snag['statusCode'] = this['statusCode']
                    snag['statusCodes'] = structuredClone(this['statusCodes'])
                } else if (oldKey === 'statusCodes') {
                    // do nothing as the earlier block would have copied over
                    continue
                } else {
                    snag[oldKey] = this[oldKey]
                }
            }
        }
        return snag
    }

    getStatus(protocol: TProtocol = 'http') {
        return this.statusCodes[protocol]
    }

    // TODO: remove properties when verbose is false
    toJSON(verbose?: boolean, depth = 8) {
        let error: { stack?: string; error?: Error & { error?: Error } }
        let nestedError: { stack?: string; error?: Error & { error?: Error } }
        for (let i = 0; i < depth; i++) {
            try {
                if (i === 0) {
                    if (this.error instanceof Error) {
                        error = { ...this.error, stack: this.error.stack }
                        nestedError = error.error
                    } else {
                        error = this.error
                        break
                    }
                } else {
                    if (nestedError.error instanceof Error) {
                        nestedError.error = { ...nestedError.error, stack: nestedError.error.stack }
                        nestedError = nestedError.error
                    } else {
                        break
                    }
                }
            } catch (err: unknown) {
                break
            }
        }
        return {
            ...this,
            stack: this.stack,
            error,
        }
    }
}

function removeUnnecessaryStack(stack: string, functionName: string) {
    if (!stack) return stack
    if (!functionName) return stack
    // exclude lines starts with:  " at new className" and " at subClassName.className"
    const exclusion = new RegExp(`\\s+at\\s((new\\s)?${functionName})(\\s|.)`)

    const lines = stack.split('\n')
    const resultLines = lines.filter(line => !line.match(exclusion))
    resultLines[0] = functionName
    return resultLines.join('\n')
}
