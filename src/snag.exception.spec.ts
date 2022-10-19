import { Snag } from './snag.exception'
import * as util from 'util'
import { ISnagOptions } from './snag.exception.types'

const should = it

describe('Snag', () => {
    should('be instances of Error and Snag', () => {
        const snag = new Snag()
        expect(snag).toBeInstanceOf(Snag)
        expect(snag).toBeInstanceOf(Error)
    })

    should('have properties properties and default values', () => {
        const snag = new Snag()
        expect(snag.name).toBe(Snag.name)
        expect(snag.timestamp / 1000).toBeCloseTo(new Date().getTime() / 1000, 0)
        expect(snag.timestamptz.split('.')[0]).toBe(new Date().toISOString().split('.')[0])
        expect(snag).toMatchObject({
            showMessageToClient: false,
            statuses: [
                'HTTP_500_Internal_Server_Error',
                'AMQP_541_Internal_Error',
                'WS_1011_Server_Error',
                'GRPC_13_INTERNAL',
            ],
            statusCodes: { http: 500, amqp: 541, ws: 1011, grpc: 13 },
            statusCode: 500,
            tag: 'not_handled',
            additionalTags: [],
            breadcrumbs: [],
            level: 'nil',
        })
    })

    should('be able to accept string', () => {
        const snag = new Snag('foo')
        expect(snag.message).toBe('foo')
    })

    should('be able to accept error object', () => {
        const error = new TypeError('Some error')
        const snag = new Snag(error)
        expect((snag.error = error))
        expect(snag.message).toBe(error.message)
        expect(snag.getStatus()).toBe(500)
    })

    should('be able to handle null types gracefully', () => {
        const snag = new Snag(null as unknown as Error)
        expect(snag.message).toBe('null')
    })

    should('be able to handle boolean types gracefully', () => {
        const snag = new Snag(true as unknown as Error)
        expect(snag.message).toBe('true')
        const snag2 = new Snag(false as unknown as Error)
        expect(snag2.message).toBe('false')
    })

    should('be able to handle number types gracefully', () => {
        const snag = new Snag(1000 as unknown as Error)
        expect(snag.message).toBe('1000')
    })

    should('be able to accept custom options', () => {
        const nestedError = new Error()
        const options: ISnagOptions = {
            error: nestedError,
            message: 'foo',
            showMessageToClient: true,
            setStatus: 'GRPC_5_NOT_FOUND',
            tag: 'not_categorised',
            additionalTags: ['result_not_found'],
            breadcrumbs: [{ foo: 'bar ' }],
            level: 'info',
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const snag = new Snag(options)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { setStatus: _, ...optionsWithoutSetStatus } = options
        expect(snag).toMatchObject({
            ...optionsWithoutSetStatus,
            statusCodes: {
                amqp: 404,
                grpc: 5,
                http: 404,
                ws: 1008,
            },
            statusCode: 404,
        })
    })

    should(
        'extract error message from error argument (Error class) if `options.message` is not provided',
        () => {
            const snag = new Snag({ error: Error('foo') })
            expect(snag.message).toBe('foo')
        },
    )

    should(
        'extract error message from error argument (object.message prop) if `options.message` is not provided',
        () => {
            const snag = new Snag({ error: { message: 'hello' } })
            expect(snag.message).toBe('hello')
        },
    )

    should('have empty message if message not provided in options, or error object', () => {
        const snag = new Snag({ error: { foo: 'bar' } })
        expect(snag.message).toBe('')
    })

    should('not fail if `util` fails', () => {
        const spy = jest.spyOn(util, 'format').mockImplementationOnce(() => {
            throw Error()
        })
        spy.mockClear()
        const snag = new Snag({ error: { message: 'bar' } })
        expect(spy).toBeCalledTimes(1)
        expect(snag.message).toBe('')
    })

    describe('#add', () => {
        should('add properties', () => {
            const error = Error('add properties')
            const options: ISnagOptions = {
                error,
                message: 'old message',
                additionalTags: ['not_handled'],
                breadcrumbs: ['first'],
            }
            const snag = new Snag(options)
            const addedProps: ISnagOptions = {
                message: 'newly added',
                additionalTags: ['result_not_found', 'not_handled'], // not_handled is repeated here, should not be added in.
                breadcrumbs: ['second', 'third'],
            }
            snag.add(addedProps)

            expect(snag).toMatchObject({
                message: `${options.message}; ${addedProps.message}`,
                additionalTags: ['not_handled', 'result_not_found'], // should remove 'not_handled'
                breadcrumbs: ['first', 'second', 'third'],
            })
        })
    })

    describe('#new', () => {
        should('retain old properties if not given a new one', () => {
            const oldProps: ISnagOptions = {
                error: Error('old'),
                message: 'old',
                showMessageToClient: true,
                setStatus: 'AMQP_403_Access_Refused',
                tag: 'not_categorised',
                additionalTags: ['result_not_found'],
                breadcrumbs: ['oldcrumb'],
            }
            const oldSnap = new Snag(oldProps)

            const newProps: ISnagOptions = {
                error: Error('new'),
                message: 'new',
                showMessageToClient: false,
                setStatus: 'AMQP_530_Not_Allowed',
                tag: 'result_not_found',
                additionalTags: ['not_categorised'],
            }

            const newSnap = oldSnap.new(newProps)
            expect(newSnap === oldSnap).toBe(false)

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { setStatus: _, ...oldPropsWithoutSetStatus } = oldProps
            expect(oldSnap).toMatchObject({
                ...oldPropsWithoutSetStatus,
                statusCodes: {
                    amqp: 403,
                },
                statusCode: 403,
            })
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { setStatus: __, ...newPropsWithoutSetStatus } = newProps
            expect(newSnap).toMatchObject({
                ...newPropsWithoutSetStatus,
                statusCodes: {
                    amqp: 530,
                },
                statusCode: 401, // AMQP 530 is mapped to HTTP 401.
                // timestamps doesn't get over-written
                timestamp: oldSnap.timestamp,
                timestamptz: oldSnap.timestamptz,
                breadcrumbs: ['oldcrumb'],
            })
        })

        should('retain old properties if not given a new one', () => {
            const oldProps: ISnagOptions<'custom_tag' | 'another_custom_tag'> = {
                error: Error('old'),
                message: 'old',
                showMessageToClient: true,
                setStatus: 'AMQP_506_Resource_Error',
                tag: 'custom_tag',
                additionalTags: ['another_custom_tag'],
                breadcrumbs: ['oldcrumb'],
            }
            const oldSnap = new Snag(oldProps)

            const newProps: ISnagOptions<'custom_tag' | 'another_custom_tag'> = {
                error: Error('new'),
                message: 'new',
                showMessageToClient: false,
            }

            const newSnap = oldSnap.new(newProps)
            expect(newSnap === oldSnap).toBe(false)
            expect(newSnap).toMatchObject({
                ...newProps,
                statusCodes: {
                    amqp: 506,
                },
                statusCode: 429,
                timestamp: oldSnap.timestamp,
                timestamptz: oldSnap.timestamptz,
                tag: 'custom_tag',
                additionalTags: ['another_custom_tag'],
                breadcrumbs: ['oldcrumb'],
            })
        })
    })

    should('have tag=not_categorised if statusCode is not 500, and tag is not provided.', () => {
        const snapHttp = new Snag({ setStatus: 'HTTP_400_Bad_Request' })
        expect(snapHttp.statusCodes.http).toBe(400)
        expect(snapHttp.tag).toBe('not_categorised')
    })

    should('still be able to set to other tags even if 500', () => {
        const snapHttp = new Snag({ tag: 'result_not_found' })
        expect(snapHttp).toMatchObject({
            statusCodes: {
                http: 500,
                amqp: 541,
                ws: 1011,
                grpc: 13,
            },
            statusCode: 500,
            tag: 'result_not_found',
        })
    })

    should('default tag to `result_not_found` if not defined, and statusCode is 404', () => {
        const snag = new Snag({ setStatus: 'HTTP_404_Not_Found' })
        expect(snag.tag).toBe('result_not_found')
    })

    should('retain defined tag if statusCode is 404', () => {
        const snag = new Snag({ setStatus: 'HTTP_404_Not_Found', tag: 'not_handled' })
        expect(snag.tag).toBe('not_handled')
    })

    describe('#getStatus', () => {
        should('get status', () => {
            const snag = new Snag()
            expect(snag.getStatus()).toBe(500)
            expect(snag.getStatus('amqp')).toBe(541)
            expect(snag.getStatus('ws')).toBe(1011)
            expect(snag.getStatus('grpc')).toBe(13)
        })
    })

    describe('#toJSON', () => {
        describe('verbose = true', () => {
            should('output JSON data', () => {
                const snag = new Snag({ level: 'fatal' })
                expect(snag.toJSON(true)).toMatchObject({
                    showMessageToClient: false,
                    statuses: [
                        'HTTP_500_Internal_Server_Error',
                        'AMQP_541_Internal_Error',
                        'WS_1011_Server_Error',
                        'GRPC_13_INTERNAL',
                    ],
                    statusCodes: { http: 500, amqp: 541, ws: 1011, grpc: 13 },
                    statusCode: 500,
                    tag: 'not_handled',
                    stack: expect.stringContaining('Snag'),
                    additionalTags: [],
                    breadcrumbs: [],
                    level: 'fatal',
                })
            })

            should('output JSON data even with unexpected types', () => {
                const snag = new Snag(null as unknown as Error)
                expect(snag.toJSON(true)).toMatchObject({
                    message: 'null',
                    showMessageToClient: false,
                    statuses: [
                        'HTTP_500_Internal_Server_Error',
                        'AMQP_541_Internal_Error',
                        'WS_1011_Server_Error',
                        'GRPC_13_INTERNAL',
                    ],
                    statusCodes: { http: 500, amqp: 541, ws: 1011, grpc: 13 },
                    statusCode: 500,
                    tag: 'not_handled',
                    stack: expect.stringContaining('Snag'),
                    additionalTags: [],
                    breadcrumbs: [],
                })
            })

            should('output nested error with it properties and stack', () => {
                const secondLevel = new Error('second level')
                const firstLevel = new Error('first level') as unknown as { error: Error }
                firstLevel.error = secondLevel
                const snag = new Snag({
                    error: firstLevel,
                })
                expect(snag.toJSON(true)).toMatchObject({
                    error: {
                        error: {
                            stack: expect.stringContaining('second level'),
                        },
                        stack: expect.stringContaining('first level'),
                    },
                })
            })

            should('output still process unexpected nested error type `object`', () => {
                const nestedError = { foo: 'bar' }
                const snag = new Snag({
                    error: nestedError,
                })
                expect(snag.toJSON(true)).toMatchObject({
                    error: nestedError,
                })
            })

            should('output still process unexpected nested error type Array', () => {
                const nestedError = ['foo', 'bar']
                const snag = new Snag({
                    error: nestedError,
                })
                expect(snag.toJSON(true)).toMatchObject({
                    error: nestedError,
                })
            })

            should('output unexpected nested error of unexpected types', () => {
                expect(new Snag({ error: null }).toJSON(true)).toMatchObject({ error: null })
                expect(new Snag({ error: 89089 }).toJSON(true)).toMatchObject({ error: 89089 })
                expect(new Snag({ error: 'foo' }).toJSON(true)).toMatchObject({ error: 'foo' })
                expect(new Snag({ error: true }).toJSON(true)).toMatchObject({ error: true })
                expect(new Snag({ error: false }).toJSON(true)).toMatchObject({ error: false })
            })

            should('output nested error with unexpected object type', () => {
                const secondLevel = null
                const firstLevel = { message: { foo: 'bar' }, error: secondLevel }
                firstLevel.error = secondLevel
                const snag = new Snag({
                    error: firstLevel,
                })
                expect(snag.toJSON(true)).toMatchObject({
                    error: {
                        error: null,
                    },
                    message: expect.stringContaining('foo'),
                })
            })

            should('output nested error with other unexpected types', () => {
                const secondLevel = null
                const firstLevel = ['first level'] as unknown as { error: null; stack: string[] }
                firstLevel.error = secondLevel
                firstLevel.stack = ['weird stack']
                const snag = new Snag({
                    error: firstLevel,
                })
                expect(snag.toJSON(true)).toMatchObject({
                    error: expect.arrayContaining(['first level']),
                })
            })
        })
        describe('verbose = false', () => {
            should('output less properties', () => {
                const snag = new Snag({
                    message: 'foo',
                })
                expect(snag.toJSON()).toEqual({
                    message: 'foo',
                    showMessageToClient: false,
                    statusCode: 500,
                    statusCodes: {
                        http: 500,
                        amqp: 541,
                        ws: 1011,
                        grpc: 13,
                    },
                    tag: 'not_handled',
                    additionalTags: [],
                    level: 'nil',
                })
            })
        })
    })
})
