module Components

open Feliz
open Global
open GraphQLSchema
open Fable.Core
open Fable.Core.JsInterop
open Express

let requestContext = React.createContext(name="Request")

[<Import("documentToReactComponents", "@contentful/rich-text-react-renderer")>]
let documentToReactComponents (richText: obj, options: obj): ReactElement = jsNative

[<Import("default", "../common/render_node.js")>]
let renderNode : obj -> obj = jsNative

[<ReactComponent>]
let AppLayout (props: {| content: ReactElement; req: ExpressReq |}) =
    let Link = props.req.Link
    React.contextProvider(requestContext, props.req, React.fragment [
        Html.div [
            prop.className "sitewrapper"
            prop.children [
                Html.header [
                    Html.h1 [
                        Link {| href = "/"; children = "williamcotton.com" |}
                    ]
                    Html.nav [
                        Link {| href = "/about"; children = "About" |}
                        Link {| href = "/bio"; children = "Bio" |}
                        Link {| href = "/contact"; children = "Contact" |}
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
let Article(props: {| article : Article |}) =
    let req = React.useContext(requestContext)
    let article = props.article
    Html.article [
        Html.h2 [ prop.text article.title ]
        Html.p [ 
            prop.className "published-date"
            prop.text (formatDateString article.publishedDate) 
        ]
        let renderNodeObj = renderNode({| Link = req.Link |})
        documentToReactComponents(article.body, {| renderNode = renderNodeObj |})
    ]

[<ReactComponent>]
let FrontPage(props: {| allArticles : Article[] |}) =
    let req = React.useContext(requestContext)
    props.allArticles 
        |> Array.map (fun article ->
            Html.article [
                Html.h2 [req.Link {| href = "/articles/" + article.slug; children =[article.title] |}]
                Html.p [ 
                    prop.className "published-date"
                    prop.text (formatDateString article.publishedDate) 
                ]
                let renderNodeObj = renderNode({| Link = req.Link |})
                documentToReactComponents(article.body, {| renderNode = renderNodeObj |})
            ]
        ) 
        |> React.fragment 
        
[<ReactComponent>]
let Contact() =
    // sendgrid API key has expired
    // let req = React.useContext(requestContext)
    // let Form = req.Form
    // React.fragment [
    //     Html.h2 [
    //         prop.text "Contact"
    //     ]
    //     Form {| action = "/contact"; method = "post"; children = [
    //             Html.input [ prop.type' "text"; prop.name "name"; prop.placeholder "Name" ]
    //             Html.input [ prop.type' "email"; prop.name "email"; prop.placeholder "Email" ]
    //             Html.input [ prop.type' "subject"; prop.name "subject"; prop.placeholder "Subject" ]
    //             Html.textarea [ prop.placeholder "Message"; prop.name "body" ]
    //             Html.button [ prop.text "Send" ]
    //         ]
    //     |}
    // ]
    React.fragment [
        Html.h2 [
            prop.text "Contact"
        ]
        Html.p [
            prop.text "Email me at this domain name, minus the dot com, at gmail dot com"
        ]
    ]

[<ReactComponent>]
let Page(props: {| page : Page |}) =
    let req = React.useContext(requestContext)
    let page = props.page
    React.fragment [
        Html.h2 [ prop.text page.title ]
        let renderNodeObj = renderNode({| Link = req.Link |})
        documentToReactComponents(page.body, {| renderNode = renderNodeObj |})
    ]