
Snag is a modern Error object designed to store and passe error information in a debug-friendly, and API-orientated manner.

```js
throw new Snag('foo')
```

## Basic usage:

```js
// some code above...
try {
    const stuff = undefined
    stuff.prop = true // this will error out
} catch (originalError) {
    // Snag will wrap around the native error object
    // and provide API-oriented functionality
    throw new Snag({
        error: originalError,
        message: 'We were not able to complete some task.',
        statusCode: 'HTTP_400_Bad_Request',
        tag: 'some_tag_the_frontend_can_use',
        // message can be shown to client (i.e. on Alert/Modals).
        showMessageToClient: true,
        // we put `stuff` here which Sentry/GCP can see.
        breadcrumbs: [stuff],
    })
}
```
If error is received from a Grpc operation, and you are communicating to client predominantly via Websocket:
```js
sendGrpc().catch(grpcError => {
     throw new Snag({
         error: grpcError,
         // `WS_1011_Server_Error` also maps to `HTTP_500_Internal_Server_Error`, and other server errors for various protocols.
         statusCode: 'WS_1011_Server_Error'
     })
}
```

If you pass in an error object, it will turn it into a Snag error, with the error re-attached to the Snag.
```js
const error = Error('The error from upstream.')
const snag = new Snag(error)
snag.message // outputs 'The error from upstream.'
snag.statusCode // outputs 500
snag.error === error // outputs true
```

## Options
@param `options` Can be message in string, any instances of Error, or an options object. If strings, defaults tag to 'not_handled'.

@param `options.error` An error object of the original offending exception. If this is passed in, it will be added to the breadcrumbs. If `options.message` is not passed in, Snag will attempt to extract the message from `options.error`.

@param `options.message` An error message.

@param `options.showMessageToClient` `true` if it is intended/recommend for the error message to be shown directly to a user. Defaults to `false`.

@param `options.setStatus` Use autocomplete for all available codes.

@param `options.tag` A primary tag that can be used for downstream if/else or switch/case handling. Defaults to `not_handled`. `Note: Tags are not to be confused with code names within specifications. It can coincide with various code names if preferred, but is meant to be application-specific.`

@param `options.additionalTags` Additional tags. `WARN: For performance, arrays passed in here can be subject to side-effects.`

@param `options.breadcrumbs` Any useful debugging information. `WARN: For performance, arrays passed in here can be subject to side-effects.`

@param `options.level` A level tag that can be used to categorise errors.

## getStatus

```js
snag.getStatus() // defaults to http status code
snag.getStatus('amqp') // gets `amqp` status code
```

You can also get the status using property accessor directly:

```js
snag.statusCode // this always defaults to http, regardless of what protocol was used.
snag.statusCodes.ws // equivalent of snag.getStatus('ws')
```

## toJSON

Snag provides a `#toJSON` method that can interface with some frameworks that uses errors classes with this method.

By default, verbosity is switched off, which hides information such as nested errors, error stack, and breadcrumbs:
```js
snag.toJSON() // outputs JSON data.
```

Turning on verbosity:
```js
const json = snag.toJSON(true, 10)
json.stack // this will print out the stack
json.error.stack // you will also have nested error stacks.
```