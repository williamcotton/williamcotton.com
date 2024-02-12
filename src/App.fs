module App

open Node.Api
open Feliz
open Fable.Core
open Fable.Core.JsInterop
open Express
open Global
open GraphQLSchema

let requestContext = React.createContext(name="Request")

[<Import("documentToReactComponents", "@contentful/rich-text-react-renderer")>]
let documentToReactComponents (richText: obj, options: obj): ReactElement = jsNative

[<ReactComponent>]
let AppLayout (props: {| content: ReactElement; req: ExpressReq |}) =
    React.contextProvider(requestContext, props.req, React.fragment [
        Html.div [
            prop.className "sitewrapper"
            prop.children [
                Html.header [
                    Html.h1 [
                        props.req.Link {| href = "/"; children = "williamcotton.com" |}
                    ]
                    Html.nav [
                        props.req.Link {| href = "/about"; children = "About" |}
                        props.req.Link {| href = "/bio"; children = "Bio" |}
                        props.req.Link {| href = "/contact"; children = "Contact" |}
                    ]
                ]
                Html.div [
                    prop.className "content"
                    prop.children props.content
                ]
                Html.footer [
                    prop.children [
                        Html.p [
                            prop.text "© 2024 William Cotton"
                        ]
                    ]
                ]
            ]
        ]
    ])

[<ReactComponent>]
let Articles() =
    React.fragment [
        Html.article [
            Html.h2 [ prop.text "Article: This is an Article" ]
            Html.p [ prop.text "This is the content of the article." ]
        ]
    ]

[<ReactComponent>]
let FrontPage() =
    Html.div [
        prop.className "front-page"
        prop.children (Articles())
    ]

[<ReactComponent>]
let About() =
    React.fragment [
        Html.h2 [
            prop.text "About"
        ]
        Html.p [
            prop.text "This is the about page."
        ]
    ]

[<ReactComponent>]
let Bio() =
    React.fragment [
        Html.h2 [
            prop.text "Bio"
        ]
    ]

[<ReactComponent>]
let Contact() =
    React.fragment [
        Html.h2 [
            prop.text "Contact"
        ]
    ]

let verifyPost (value: string option) =
    match value with
    | Some s when s.Length >= 5 -> Ok s
    | Some _ -> Error "The value must be at least 6 characters long."
    | None -> Error "No value provided."

let universalApp (app: ExpressApp) =
    app.get("/", fun req res _ ->
        promise {
            let! response = req.q "query { allArticles { title slug publishedDate description body } }" {||}
            let allArticles : Article[] = response?allArticles
            allArticles 
                |> Array.map (fun article ->
                    Html.article [
                        Html.h2 [req.Link {| href = "/articles/" + article.slug; children =[article.title] |}]
                        Html.p [ 
                            prop.className "published-date"
                            prop.text (formatDateString article.publishedDate) 
                        ]
                        documentToReactComponents(article.body, {||})
                    ]
                ) 
                |> React.fragment 
                |> res.renderComponent |> ignore
        } |> ignore
    )

    app.get("/articles/:slug", fun req res _ ->
        let slug = req.params?slug

        promise {
            let! response = req.q "query ($slug: String!) { article(slug: $slug) { title slug publishedDate description body } }" {| slug = slug |}
            let article : Article = response?article
            Html.article [
                Html.h2 [ prop.text article.title ]
                Html.p [ 
                    prop.className "published-date"
                    prop.text (formatDateString article.publishedDate) 
                ]
                documentToReactComponents(article.body, {||})
            ]
            |> res.renderComponent |> ignore
        } |> ignore
    )

    app.get("/about", fun req res _ ->
        React.fragment [
            Html.h2 [
                prop.text "About"
            ]
            Html.p [
                prop.text "This is the about page."
            ]
        ]
        |> res.renderComponent |> ignore
    )

    app.get("/bio", fun req res _ ->
        Bio()
        |> res.renderComponent |> ignore
    )

    app.get("/contact", fun req res _ ->
        Contact()
        |> res.renderComponent |> ignore
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
            res.status 500 |> ignore
            res.send(message) |> ignore
        | _ ->
            next()

    app.``use`` errorHandler