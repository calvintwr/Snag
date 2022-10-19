"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Snag = void 0;
const util_1 = require("util");
const snag_exception_codes_1 = require("./snag.exception.codes");
class Snag extends Error {
    constructor(options = {}) {
        super();
        this.showMessageToClient = false;
        this.statuses = [
            'HTTP_500_Internal_Server_Error',
            'AMQP_541_Internal_Error',
            'WS_1011_Server_Error',
            'GRPC_13_INTERNAL',
        ];
        this.statusCode = 500;
        this.statusCodes = {
            http: 500,
            amqp: 541,
            ws: 1011,
            grpc: 13,
        };
        this.tag = 'not_handled';
        this.additionalTags = [];
        this.breadcrumbs = [];
        this.level = 'nil';
        const date = new Date();
        this.timestamp = date.getTime();
        this.timestamptz = date.toISOString();
        if (typeof options === 'string') {
            this.message = options;
        }
        else {
            const { error, message, showMessageToClient, setStatus, tag, additionalTags, breadcrumbs, level, } = options;
            let extractedMessage;
            if (typeof message === 'string') {
                extractedMessage = message;
            }
            else if (error instanceof Error) {
                extractedMessage = error.message;
            }
            else if (typeof error === 'object' && error !== null && 'message' in error) {
                const errorWithMessageProp = error;
                try {
                    extractedMessage = (0, util_1.format)(errorWithMessageProp.message);
                }
                catch (error) {
                    extractedMessage = '';
                }
            }
            else {
                extractedMessage = '';
            }
            this.message = extractedMessage;
            if (showMessageToClient !== undefined)
                this.showMessageToClient = showMessageToClient;
            if (setStatus && setStatus !== 'DEFAULT') {
                this.statuses = Object.keys(snag_exception_codes_1.exceptionCodes[setStatus]).reduce((value, key) => {
                    return value.concat(snag_exception_codes_1.exceptionCodes[setStatus][key]);
                }, [setStatus]);
                for (const status of this.statuses) {
                    const [protocol, code] = status.split('_');
                    this.statusCodes[protocol.toLowerCase()] = parseInt(code);
                }
            }
            this.statusCode = this.getStatus('http');
            if (tag !== undefined) {
                this.tag = tag;
            }
            else {
                if (snag_exception_codes_1.notFoundCodes.includes(setStatus)) {
                    this.tag = 'result_not_found';
                }
                else if (setStatus && !snag_exception_codes_1.unhandledCodes.includes(setStatus)) {
                    this.tag = 'not_categorised';
                }
            }
            if (additionalTags !== undefined)
                this.additionalTags = additionalTags;
            if (breadcrumbs !== undefined)
                this.breadcrumbs = breadcrumbs;
            if (error !== undefined)
                this.error = error;
            if (level !== undefined)
                this.level = level;
        }
        this.stack = removeUnnecessaryStack(new Error().stack, new.target.name);
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, new.target.prototype);
        }
        else {
            ;
            this.__proto__ = new.target.prototype;
        }
    }
    get name() {
        return this.constructor.name;
    }
    add(options = {}) {
        const { message, additionalTags, breadcrumbs } = options;
        if (message !== undefined) {
            this.message = `${this.message}; ${message}`;
        }
        if (additionalTags !== undefined) {
            this.additionalTags = [...new Set(this.additionalTags.concat(additionalTags))];
        }
        if (breadcrumbs !== undefined) {
            this.breadcrumbs.push(...breadcrumbs);
        }
        return this;
    }
    new(options) {
        const snag = new Snag(options);
        const newKeys = Object.keys(options);
        const oldKeys = Object.keys(this);
        for (const oldKey of oldKeys) {
            if (['timestamp', 'timestamptz'].includes(oldKey)) {
                snag[oldKey] = this[oldKey];
                continue;
            }
            if (!newKeys.includes(oldKey)) {
                if (Array.isArray(this[oldKey])) {
                    snag[oldKey] = [...this[oldKey]];
                    continue;
                }
                else if (oldKey === 'statusCode') {
                    if (options.setStatus)
                        continue;
                    snag['statusCode'] = this['statusCode'];
                    snag['statusCodes'] = structuredClone(this['statusCodes']);
                }
                else if (oldKey === 'statusCodes') {
                    continue;
                }
                else {
                    snag[oldKey] = this[oldKey];
                }
            }
        }
        return snag;
    }
    getStatus(protocol = 'http') {
        return this.statusCodes[protocol];
    }
    toJSON(verbose, depth = 8) {
        let error;
        let nestedError;
        for (let i = 0; i < depth; i++) {
            try {
                if (i === 0) {
                    if (this.error instanceof Error) {
                        error = Object.assign(Object.assign({}, this.error), { stack: this.error.stack });
                        nestedError = error.error;
                    }
                    else {
                        error = this.error;
                        break;
                    }
                }
                else {
                    if (nestedError.error instanceof Error) {
                        nestedError.error = Object.assign(Object.assign({}, nestedError.error), { stack: nestedError.error.stack });
                        nestedError = nestedError.error;
                    }
                    else {
                        break;
                    }
                }
            }
            catch (err) {
                break;
            }
        }
        return Object.assign(Object.assign({}, this), { stack: this.stack, error });
    }
}
exports.Snag = Snag;
function removeUnnecessaryStack(stack, functionName) {
    if (!stack)
        return stack;
    if (!functionName)
        return stack;
    const exclusion = new RegExp(`\\s+at\\s((new\\s)?${functionName})(\\s|.)`);
    const lines = stack.split('\n');
    const resultLines = lines.filter(line => !line.match(exclusion));
    resultLines[0] = functionName;
    return resultLines.join('\n');
}
//# sourceMappingURL=snag.exception.js.map