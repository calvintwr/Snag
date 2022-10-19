import { exceptionCodes } from './snag.exception.codes'

export type TSnagTags = 'not_handled' | 'not_categorised' | 'result_not_found'

export interface ISnagOptions<T extends string = ''> {
    error?: unknown
    message?: string
    showMessageToClient?: boolean
    setStatus?: keyof typeof exceptionCodes
    tag?: TSnagTags | T
    additionalTags?: TSnagTags[] | T[]
    breadcrumbs?: unknown[]
    level?: 'nil' | 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug'
}
