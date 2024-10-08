﻿module App

open Feliz
open Fable.Core.JsInterop
open Express
open Global
open GraphQLSchema
open Components

let verifyPost (value: string option) =
    match value with
    | Some s when s.Length >= 5 -> Ok s
    | Some _ -> Error "The value must be at least 6 characters long."
    | None -> Error "No value provided."

let universalApp (app: ExpressApp) =
    app.get("/", fun req res next ->
        promise {
            let! response = 
                req |> gql<{| allArticles: Article[] |}> 
                    "query { allArticles { title slug publishedDate description body } }" 
                    {||}
                
            match response with
            | Ok response -> 
                FrontPage ({| allArticles = response.allArticles |})
                |> res.renderComponent |> ignore
            | Error message -> 
                consoleLog message
                next()

        } |> ignore
    )

    app.get("/articles/:slug", fun req res next ->
        promise {
            let slug = req.``params``?slug

            let! response =
                req |> gql<{| article: Article |}>
                    "query ($slug: String!) { article(slug: $slug) { title slug publishedDate description body } }" 
                    {| slug = slug |}
            match response with
            | Ok response ->
                ArticlePage ({| article = response.article |})
                |> res.renderComponent |> ignore
            | Error message -> 
                consoleLog message
                next()

        } |> ignore
    )

    app.get("/contact", fun req res _ ->
        ContactPage()
        |> res.renderComponent |> ignore
    )

    app.post("/contact", fun req res next ->
        promise {
            let name = req.body?name
            let replyToAddress = req.body?email
            let subject = req.body?subject
            let body = req.body?body

            let! response = 
                req |> gql 
                    "mutation sendEmail($input: EmailMessage) { sendEmail(input: $input) { success } }" 
                    {| input = {| name = name; replyToAddress = replyToAddress; subject = subject; body = body |} |}

            match response with
            | Ok response -> 
                consoleLog response 
            | Error message -> 
                consoleLog message
                next()

        } |> ignore
    )

    app.get("/:slug", fun req res next ->
        promise {
            let slug = req.``params``?slug

            let! response = 
                req |> gql<{| page: Page |}> 
                    "query Page($slug: String!) { page(slug: $slug) { title, slug, body } }" 
                    {| slug = slug |}

            match response with
            | Ok response ->
                Page ({| page = response.page |})
                |> res.renderComponent |> ignore
            | Error message -> 
                consoleLog message
                next()

        } |> ignore
    )

    app.``use`` (fun (req: ExpressReq) (res: ExpressRes) next ->
        res.status 404 |> ignore
        Html.div "This page isn't here!"
        |> res.renderComponent 
        |> ignore
    )

    let errorHandler (err: obj) (req: ExpressReq) (res: ExpressRes) (next: unit -> unit) =
        match err with
        | :? System.Exception as ex ->
            let message = ex.Message
            consoleLog message
            res.status 500 |> ignore
            Html.div message
            |> res.renderComponent
            |> ignore
        | _ -> next()

    app.``use`` errorHandler