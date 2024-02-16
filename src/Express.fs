module Express

open Feliz
open Fable.Core
open Fable.Import.Express
open Fable.Core.JsInterop

type ExpressReq =
  abstract member params : obj
  abstract member body : obj
  abstract member query : obj
  abstract member Link : obj -> ReactElement
  abstract member Form : obj -> ReactElement
  abstract member method : string
  abstract member path : string
  abstract member originalUrl : string
  abstract member url : string
  abstract member baseUrl : string
  abstract member hostname : string
  abstract member ip : string
  abstract member protocol : string
  abstract member secure : bool
  abstract member xhr : bool
  abstract member status : int
  abstract member gql : string -> obj -> JS.Promise<obj>

type ExpressRes =
  abstract member send : obj -> unit
  abstract member renderComponent : ReactElement -> unit
  abstract member status : int -> ExpressReq

type ExpressApp =
  abstract member get: string * (ExpressReq -> ExpressRes -> (obj -> unit) -> unit) -> unit
  abstract member post: string * (ExpressReq -> ExpressRes -> unit -> unit) -> unit
  abstract member listen: int * (unit -> unit) -> unit
  abstract member ``use``: (obj -> ExpressReq -> ExpressRes -> (unit -> unit) -> unit) -> unit
  abstract member ``use``: (ExpressReq -> ExpressRes -> (unit -> unit) -> unit) -> unit

let gql (query: string) (variables: obj) (req: ExpressReq) : JS.Promise<Result<obj, string>> =
  promise {
    try
      let! result = req.gql query variables
      return Ok result
    with
    | ex -> return Error (sprintf "Error in query: %s" ex.Message)
  }