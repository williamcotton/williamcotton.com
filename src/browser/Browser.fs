module Browser

open Browser.Dom
open Feliz
open Fable.Core
open App
open Express

[<Import("default", "browser-express")>]
let express : unit -> ExpressApp = jsNative

[<Import("default", "./middleware/react-renderer.js")>]
let reactRendererMiddleware : {| app: ExpressApp; appLayout: {| content: ReactElement; req: ExpressReq |} -> ReactElement |} -> unit = jsNative

[<Import("default", "./middleware/express-link.js")>]
let expressLinkMiddleware : unit -> unit = jsNative

[<Import("default", "./middleware/graphql-client.js")>]
let graphqlClientMiddleware : {| route : string |} -> unit = jsNative

[<Emit("fetch($0)")>]
let fetch (url: string): JS.Promise<{| text: unit -> JS.Promise<string> |}> = jsNative

[<Emit("app.use($0)")>]
let useMiddleware middleware: unit = jsNative

let app = express()
useMiddleware(expressLinkMiddleware())
useMiddleware(reactRendererMiddleware({| app = app; appLayout = AppLayout |}))
useMiddleware(graphqlClientMiddleware({| route = "/graphql" |}))

universalApp app

app.listen(3000, fun _ ->
    printfn "Listening on port 3000"
)
