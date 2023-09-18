import { ISnagOptions, TSnagTags } from './snag.exception.types';
declare type TProtocol = 'http' | 'amqp' | 'ws' | 'grpc';
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
export declare class Snag<Tags extends string | TSnagTags = TSnagTags, Options extends ISnagOptions<Tags> | string | Error = ISnagOptions<Tags>> extends Error {
    get name(): string;
    readonly timestamp: number;
    readonly timestamptz: string;
    error: unknown;
    message: string;
    showMessageToClient: boolean;
    statuses: string[];
    statusCode: number;
    statusCodes: {
        http: number;
        amqp: number;
        ws: number;
        grpc: number;
    };
    tag: ISnagOptions<Tags>['tag'];
    additionalTags: ISnagOptions<Tags>['tag'][];
    breadcrumbs: unknown[];
    level: ISnagOptions['level'];
    constructor(options?: Options);
    /**
     * Mostly a convenience to add to arrays, and also concatenate error messages.
     * Other properties can be changed directly like: `snag.statusCode = 999`
     * `NOTE (SIDE-EFFECTS): This will change the properties of the current instance.`
     *
     */
    add(options?: Partial<Pick<ISnagOptions<Tags>, 'message' | 'additionalTags' | 'breadcrumbs'>>): this;
    /**
     * Works like #add, but returns a new instance with the desired alterations.
     * A convenience if you don't want to redefine everything.
     * `NOTE: This is used when you want to avoid side effects.`
     */
    new(options: ISnagOptions<Tags>): Snag<Tags, ISnagOptions<Tags>>;
    getStatus(protocol?: TProtocol): number;
    /**
     * Formats error object into JSON
     * @param verbose defaults to false, which removes additional/developmental info.
     * @param depth defaults to 8. determines how many levels of error nesting to parse.
     *
     * @example
     * snag.toJSON() // outputs without verbosity. Recommended for PRODUCTION
     * sang.toJSON(true, 10) // outputs with verbose mode (recommended for DEVELOPMENT), and will format errors nested up to 10 levels.
     */
    toJSON(verbose?: boolean, depth?: number): {
        message: string;
        showMessageToClient: boolean;
        statusCode: number;
        statusCodes: {
            http: number;
            amqp: number;
            ws: number;
            grpc: number;
        };
        tag: TSnagTags | Tags;
        additionalTags: (TSnagTags | Tags)[];
        level: "nil" | "fatal" | "error" | "warning" | "log" | "info" | "debug";
        timestamp: number;
        timestamptz: string;
    } | (this & {
        stack: string;
        error: {
            stack?: string;
            error?: Error & {
                error?: Error;
            };
        };
    });
}
export {};
