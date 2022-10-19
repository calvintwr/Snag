export declare const exceptionCodes: Readonly<{
    DEFAULT: {
        http: string;
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_400_Bad_Request: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_401_Unauthorized: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_402_Payment_Required: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_403_Forbidden: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_404_Not_Found: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_405_Method_Not_Allowed: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_406_Not_Acceptable: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_407_Proxy_Authentication_Required: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_408_Request_Timeout: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_409_Conflict: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_410_Gone: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_411_Length_Required: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_412_Precondition_Failed: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_413_Payload_Too_Large: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_414_URI_Too_Long: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_415_Unsupported_Media_Type: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_416_Range_Not_Satisfiable: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_417_Expectation_Failed: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_418_Im_a_Teapot: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_421_Misdirected_Request: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_422_Unprocessable_Entity: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_423_Locked: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_424_Failed_Dependency: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_425_Too_Early: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_426_Upgrade_Required: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_428_Precondition_Required: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_429_Too_Many_Requests: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_431_Request_Header_Fields_Too_Large: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_451_Unavailable_For_Legal_Reasons: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_500_Internal_Server_Error: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_501_Not_Implemented: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_502_Bad_Gateway: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_503_Service_Unavailable: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_504_Gateway_Timeout: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_505_HTTP_Version_Not_Supported: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_506_Variant_Also_Negotiates: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_507_Insufficient_Storage: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_508_Loop_Detected: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_510_Not_Extended: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    HTTP_511_Network_Authentication_Required: {
        amqp: string;
        ws: string;
        grpc: string;
    };
    AMQP_311_Content_Too_Large: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_312_No_Route: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_313_No_Consumers: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_320_Connection_Forced: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_402_Invalid_Path: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_403_Access_Refused: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_404_Not_Found: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_405_Resource_Locked: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_406_Precondition_Failed: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_501_Frame_Error: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_502_Syntax_Error: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_503_Command_Invalid: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_504_Channel_Error: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_505_Unexpected_Frame: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_506_Resource_Error: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_530_Not_Allowed: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_540_Not_Implemented: {
        http: string;
        ws: string;
        grpc: string;
    };
    AMQP_541_Internal_Error: {
        http: string;
        ws: string;
        grpc: string;
    };
    WS_1002_Close_Protocol_Error: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1003_Close_Unsupported: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1005_Closed_No_Status: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1006_Close_Abnormal: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1007_Unsupported_Payload: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1008_Policy_Violation: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1009_Close_Too_Large: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1010_Mandatory_Extension: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1011_Server_Error: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1012_Service_Restart: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1013_Try_Again_Later: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1014_Bad_Gateway: {
        http: string;
        amqp: string;
        grpc: string;
    };
    WS_1015_TLS_Handshake_Fail: {
        http: string;
        amqp: string;
        grpc: string;
    };
    GRPC_2_UNKNOWN: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_3_INVALID_ARGUMENT: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_4_DEADLINE_EXCEEDED: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_5_NOT_FOUND: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_6_ALREADY_EXISTS: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_7_PERMISSION_DENIED: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_8_RESOURCE_EXHAUSTED: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_9_FAILED_PRECONDITION: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_10_ABORTED: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_11_OUT_OF_RANGE: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_12_UNIMPLEMENTED: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_13_INTERNAL: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_14_UNAVAILABLE: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_15_DATA_LOSS: {
        http: string;
        amqp: string;
        ws: string;
    };
    GRPC_16_UNAUTHENTICATED: {
        http: string;
        amqp: string;
        ws: string;
    };
}>;
export declare const unhandledCodes: string[];
export declare const notFoundCodes: string[];
