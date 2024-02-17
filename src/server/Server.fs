module Server

open Feliz
open Fable.Core
open App
open Express
open Global
open GraphQLSchema
open Components

[<Import("default", "dotenv")>]
let dotenv : unit -> unit = jsNative
dotenv

[<Emit("dotenv.config()")>]
let dotenvConfig : unit = jsNative
dotenvConfig

[<Emit("process.env[$0]")>]
let env (key : string) : string = jsNative

[<Import("default", "sendgrid")>]
let sendgrid : string -> {| mail : obj |} = jsNative

let sendgridClient = sendgrid(env "SENDGRID_API_KEY")

[<Import("default", "contentful")>]
let contentful : Contentful = jsNative

let contentfulClient = contentful.createClient { space = env "CONTENTFUL_SPACE"; accessToken = env "CONTENTFUL_ACCESS_TOKEN" }

[<Import("default", "express")>]
let express : unit -> ExpressApp = jsNative

[<Import("default", "csurf")>]
let csurf : obj -> unit = jsNative

[<Import("default", "cookie-session")>]
let cookieSession : {| name: string; sameSite: string; secret: string |} -> unit = jsNative

[<Import("graphqlHTTP", "express-graphql")>]
let graphqlHTTP : {| schema: obj; rootValue: obj; graphiql: bool |} -> unit = jsNative

[<Import("default", "./graphql-schema-builder.js")>]
let graphqlSchemaBuilder : {| schemaString: string |} -> obj = jsNative

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

let rootValue : obj = rootValueInitializer contentfulClient sendgridClient

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