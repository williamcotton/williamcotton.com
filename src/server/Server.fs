module Server

open Node.Api
open Feliz
open Fable.Core
open App
open Express
open GraphQLSchema

[<Import("default", "contentful")>]
let contentful : unit -> unit = jsNative

[<Import("default", "sendgrid")>]
let sendgrid : unit -> unit = jsNative

[<Import("default", "express")>]
let express : unit -> ExpressApp = jsNative

[<Import("default", "csurf")>]
let csurf : unit -> unit = jsNative

[<Import("default", "cookie-session")>]
let cookieSession : {| name: string; sameSite: string; secret: string |} -> unit = jsNative

[<Import("default", "dotenv")>]
let dotenv : unit -> unit = jsNative
dotenv

[<Emit("dotenv.config()")>]
let dotenvConfig : unit = jsNative
dotenvConfig

[<Import("graphqlHTTP", "express-graphql")>]
let graphqlHTTP : {| schema: obj; rootValue: obj; graphiql: bool |} -> unit = jsNative

[<Import("default", "./graphql-schema-builder.js")>]
let graphqlSchemaBuilder : {| schemaString: string |} -> obj = jsNative

[<Emit("process.env[$0]")>]
let env (key : string) : string = jsNative

[<Import("default", "./middleware/express-link.js")>]
let expressLinkMiddleware : {| defaultTitle: string |} -> unit = jsNative

[<Import("default", "./middleware/react-renderer.js")>]
let reactRendererMiddleware : {| appLayout: {| content: ReactElement; req: ExpressReq |} -> ReactElement |} -> unit = jsNative

[<Import("default", "./middleware/graphql-client.js")>]
let graphqlClientMiddleware : {| schema : obj; rootValue : obj |} -> unit = jsNative

[<Emit("app.use($0)")>]
let useMiddleware middleware: unit = jsNative

[<Emit("app.use($0, $1)")>]
let useMiddlewareRoute route middleware: unit = jsNative

[<Emit("express.static($0)")>]
let expressStatic (path : string): unit = jsNative

let defaultTitle = env "DEFAULT_TITLE"
let sessionSecret = env "SESSION_SECRET"
let port = env "PORT"

let schemaObject = graphqlSchemaBuilder {| schemaString = schemaString |}
let schema = schemaObject :?> {| schema: obj; rootValue: obj |}

let rootValue : obj = rootValueInitializer (env "CONTENTFUL_ACCESS_TOKEN") (env "CONTENTFUL_SPACE")

let app = express()
useMiddleware(expressStatic("build"))
useMiddleware(cookieSession({| name = "session"; sameSite = "lax"; secret = sessionSecret |}))
useMiddleware(csurf())
useMiddlewareRoute "/graphql" (graphqlHTTP({| schema = schema.schema; rootValue = rootValue; graphiql = true |}));
useMiddleware(graphqlClientMiddleware({| schema = schema.schema; rootValue = rootValue |}));
useMiddleware(expressLinkMiddleware({| defaultTitle = defaultTitle |}))
useMiddleware(reactRendererMiddleware({| appLayout = AppLayout |}))

universalApp app

app.listen(int port, fun _ ->
    printfn "Listening on port %s" port
)