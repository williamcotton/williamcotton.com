module Server

open Node.Api
open Feliz
open Fable.Core
open App
open Express

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

[<Emit("process.env[$0]")>]
let env (key : string) : string = jsNative

[<Import("default", "./middleware/express-link.js")>]
let expressLinkMiddleware : {| defaultTitle: string |} -> unit = jsNative

[<Import("default", "./middleware/react-renderer.js")>]
let reactRendererMiddleware : {| appLayout: {| content: ReactElement; req: ExpressReq |} -> ReactElement |} -> unit = jsNative

[<Emit("app.use($0)")>]
let useMiddleware middleware: unit = jsNative

[<Emit("express.static($0)")>]
let expressStatic (path : string): unit = jsNative

let defaultTitle = env "DEFAULT_TITLE"
let sessionSecret = env "SESSION_SECRET"
let port = env "PORT"

let app = express()
useMiddleware(expressStatic("build"))
useMiddleware(cookieSession({| name = "session"; sameSite = "lax"; secret = sessionSecret |}))
useMiddleware(csurf())
useMiddleware(expressLinkMiddleware({| defaultTitle = defaultTitle |}))
useMiddleware(reactRendererMiddleware({| appLayout = AppLayout |}))

universalApp app

app.listen(int port, fun _ ->
    printfn "Listening on port %s" port
)