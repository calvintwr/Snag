import { exceptionCodes } from './snag.exception.codes';
export declare type TSnagTags = 'not_handled' | 'not_categorised' | 'result_not_found';
export interface ISnagOptions<Tags extends string = TSnagTags> {
    error?: unknown;
    message?: string;
    showMessageToClient?: boolean;
    setStatus?: keyof typeof exceptionCodes;
    tag?: TSnagTags | Tags;
    additionalTags?: TSnagTags[] | Tags[];
    breadcrumbs?: unknown[];
    level?: 'nil' | 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';
}
