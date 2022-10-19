import { ISnagOptions } from './snag.exception.types';
declare type TProtocol = 'http' | 'amqp' | 'ws' | 'grpc';
export declare class Snag<T extends string> extends Error {
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
    tag: ISnagOptions<T>['tag'];
    additionalTags: ISnagOptions<T>['tag'][];
    breadcrumbs: unknown[];
    level: ISnagOptions['level'];
    constructor(options?: ISnagOptions<T> | string);
    add(options?: Partial<Pick<ISnagOptions<T>, 'message' | 'additionalTags' | 'breadcrumbs'>>): this;
    new(options: ISnagOptions<T>): Snag<T>;
    getStatus(protocol?: TProtocol): number;
    toJSON(verbose?: boolean, depth?: number): this & {
        stack: string;
        error: {
            stack?: string;
            error?: Error & {
                error?: Error;
            };
        };
    };
}
export {};
