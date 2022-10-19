// TODO: deepFreeze not working somehow.
// import { deepFreeze } from '@malt/utils'

export const exceptionCodes = Object.freeze({
    DEFAULT: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_13_INTERNAL',
    },

    /* HTTP */
    HTTP_400_Bad_Request: {
        amqp: 'AMQP_502_Syntax_Error',
        ws: 'WS_1007_Unsupported_Payload',
        grpc: 'GRPC_3_INVALID_ARGUMENT',
    },
    HTTP_401_Unauthorized: {
        amqp: 'AMQP_530_Not_Allowed',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_16_UNAUTHENTICATED',
    },
    HTTP_402_Payment_Required: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_403_Forbidden: {
        amqp: 'AMQP_403_Access_Refused',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_7_PERMISSION_DENIED',
    },
    HTTP_404_Not_Found: {
        amqp: 'AMQP_404_Not_Found',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_5_NOT_FOUND',
    },
    HTTP_405_Method_Not_Allowed: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_406_Not_Acceptable: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_407_Proxy_Authentication_Required: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_408_Request_Timeout: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_4_DEADLINE_EXCEEDED',
    },
    HTTP_409_Conflict: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_410_Gone: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_411_Length_Required: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_412_Precondition_Failed: {
        amqp: 'AMQP_406_Precondition_Failed',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_9_FAILED_PRECONDITION',
    },
    HTTP_413_Payload_Too_Large: {
        amqp: 'AMQP_311_Content_Too_Large',
        ws: 'WS_1009_Close_Too_Large',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_414_URI_Too_Long: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_415_Unsupported_Media_Type: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_416_Range_Not_Satisfiable: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_11_OUT_OF_RANGE',
    },
    HTTP_417_Expectation_Failed: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_418_Im_a_Teapot: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_421_Misdirected_Request: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_422_Unprocessable_Entity: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_423_Locked: {
        amqp: 'AMQP_405_Resource_Locked',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_424_Failed_Dependency: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_425_Too_Early: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_426_Upgrade_Required: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_428_Precondition_Required: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_429_Too_Many_Requests: {
        amqp: 'AMQP_506_Resource_Error',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_8_RESOURCE_EXHAUSTED',
    },
    HTTP_431_Request_Header_Fields_Too_Large: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_451_Unavailable_For_Legal_Reasons: {
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_500_Internal_Server_Error: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_13_INTERNAL',
    },
    HTTP_501_Not_Implemented: {
        amqp: 'AMQP_540_Not_Implemented',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_12_UNIMPLEMENTED',
    },
    HTTP_502_Bad_Gateway: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1014_Bad_Gateway',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_503_Service_Unavailable: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1013_Try_Again_Later',
        grpc: 'GRPC_14_UNAVAILABLE',
    },
    HTTP_504_Gateway_Timeout: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1010_Mandatory_Extension',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_505_HTTP_Version_Not_Supported: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_506_Variant_Also_Negotiates: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_507_Insufficient_Storage: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_508_Loop_Detected: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_510_Not_Extended: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    HTTP_511_Network_Authentication_Required: {
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },

    /* AMQP */
    AMQP_311_Content_Too_Large: {
        http: 'HTTP_413_Payload_Too_Large',
        ws: 'WS_1009_Close_Too_Large',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_312_No_Route: {
        http: 'HTTP_500_Internal_Server_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_313_No_Consumers: {
        http: 'HTTP_500_Internal_Server_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_320_Connection_Forced: {
        http: 'HTTP_503_Service_Unavailable',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_402_Invalid_Path: {
        http: 'HTTP_500_Internal_Server_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_403_Access_Refused: {
        http: 'HTTP_403_Forbidden',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_7_PERMISSION_DENIED',
    },
    AMQP_404_Not_Found: {
        http: 'HTTP_404_Not_Found',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_5_NOT_FOUND',
    },
    AMQP_405_Resource_Locked: {
        http: 'HTTP_423_Locked',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_406_Precondition_Failed: {
        http: 'HTTP_412_Precondition_Failed',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_9_FAILED_PRECONDITION',
    },
    AMQP_501_Frame_Error: {
        http: 'HTTP_400_Bad_Request',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_502_Syntax_Error: {
        http: 'HTTP_400_Bad_Request',
        ws: 'WS_1007_Unsupported_Payload',
        grpc: 'GRPC_3_INVALID_ARGUMENT',
    },
    AMQP_503_Command_Invalid: {
        http: 'HTTP_400_Bad_Request',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_504_Channel_Error: {
        http: 'HTTP_400_Bad_Request',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_505_Unexpected_Frame: {
        http: 'HTTP_400_Bad_Request',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_2_UNKNOWN',
    },
    AMQP_506_Resource_Error: {
        http: 'HTTP_429_Too_Many_Requests',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_8_RESOURCE_EXHAUSTED',
    },
    AMQP_530_Not_Allowed: {
        http: 'HTTP_401_Unauthorized',
        ws: 'WS_1008_Policy_Violation',
        grpc: 'GRPC_16_UNAUTHENTICATED',
    },
    AMQP_540_Not_Implemented: {
        http: 'HTTP_501_Not_Implemented',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_12_UNIMPLEMENTED',
    },
    AMQP_541_Internal_Error: {
        http: 'HTTP_500_Internal_Server_Error',
        ws: 'WS_1011_Server_Error',
        grpc: 'GRPC_13_INTERNAL',
    },

    /* WS */
    WS_1002_Close_Protocol_Error: {
        http: 'HTTP_400_Bad_Request',
        amqp: 'AMQP_503_Command_Invalid',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1003_Close_Unsupported: {
        http: 'HTTP_400_Bad_Request',
        amqp: 'AMQP_503_Command_Invalid',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1005_Closed_No_Status: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1006_Close_Abnormal: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1007_Unsupported_Payload: {
        http: 'HTTP_400_Bad_Request',
        amqp: 'AMQP_502_Syntax_Error',
        grpc: 'GRPC_3_INVALID_ARGUMENT',
    },
    WS_1008_Policy_Violation: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1009_Close_Too_Large: {
        http: 'HTTP_413_Payload_Too_Large',
        amqp: 'AMQP_311_Content_Too_Large',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1010_Mandatory_Extension: {
        http: 'HTTP_504_Gateway_Timeout',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1011_Server_Error: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_13_INTERNAL',
    },
    WS_1012_Service_Restart: {
        http: 'HTTP_503_Service_Unavailable',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1013_Try_Again_Later: {
        http: 'HTTP_503_Service_Unavailable',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_14_UNAVAILABLE',
    },
    WS_1014_Bad_Gateway: {
        http: 'HTTP_502_Bad_Gateway',
        amqp: 'AMQP_541_Internal_Error',
        grpc: 'GRPC_2_UNKNOWN',
    },
    WS_1015_TLS_Handshake_Fail: {
        http: 'HTTP_503_Service_Unavailable',
        amqp: 'AMQP_530_Not_Allowed',
        grpc: 'GRPC_2_UNKNOWN',
    },

    /* GRPC */
    GRPC_2_UNKNOWN: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
    },
    GRPC_3_INVALID_ARGUMENT: {
        http: 'HTTP_400_Bad_Request',
        amqp: 'AMQP_502_Syntax_Error',
        ws: 'WS_1007_Unsupported_Payload',
    },
    GRPC_4_DEADLINE_EXCEEDED: {
        http: 'HTTP_408_Request_Timeout',
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_5_NOT_FOUND: {
        http: 'HTTP_404_Not_Found',
        amqp: 'AMQP_404_Not_Found',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_6_ALREADY_EXISTS: {
        http: 'HTTP_400_Bad_Request',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_7_PERMISSION_DENIED: {
        http: 'HTTP_403_Forbidden',
        amqp: 'AMQP_403_Access_Refused',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_8_RESOURCE_EXHAUSTED: {
        http: 'HTTP_429_Too_Many_Requests',
        amqp: 'AMQP_506_Resource_Error',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_9_FAILED_PRECONDITION: {
        http: 'HTTP_412_Precondition_Failed',
        amqp: 'AMQP_406_Precondition_Failed',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_10_ABORTED: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
    },
    GRPC_11_OUT_OF_RANGE: {
        http: 'HTTP_416_Range_Not_Satisfiable',
        amqp: 'AMQP_503_Command_Invalid',
        ws: 'WS_1008_Policy_Violation',
    },
    GRPC_12_UNIMPLEMENTED: {
        http: 'HTTP_501_Not_Implemented',
        amqp: 'AMQP_540_Not_Implemented',
        ws: 'WS_1011_Server_Error',
    },
    GRPC_13_INTERNAL: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
    },
    GRPC_14_UNAVAILABLE: {
        http: 'HTTP_503_Service_Unavailable',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1013_Try_Again_Later',
    },
    GRPC_15_DATA_LOSS: {
        http: 'HTTP_500_Internal_Server_Error',
        amqp: 'AMQP_541_Internal_Error',
        ws: 'WS_1011_Server_Error',
    },
    GRPC_16_UNAUTHENTICATED: {
        http: 'HTTP_401_Unauthorized',
        amqp: 'AMQP_530_Not_Allowed',
        ws: 'WS_1008_Policy_Violation',
    },
})

export const unhandledCodes = [
    exceptionCodes.DEFAULT.http,
    exceptionCodes.DEFAULT.amqp,
    exceptionCodes.DEFAULT.ws,
    exceptionCodes.DEFAULT.grpc,
]

export const notFoundCodes = [
    'HTTP_404_Not_Found',
    exceptionCodes['HTTP_404_Not_Found'].amqp,
    exceptionCodes['HTTP_404_Not_Found'].ws,
    exceptionCodes['HTTP_404_Not_Found'].grpc,
]
