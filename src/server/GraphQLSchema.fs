module GraphQLSchema

open Fable.Core
open Fable.Core.JsInterop
open Global

type SendGridHelper = {
    Email: string -> string -> obj
    Content: string -> string -> obj
    Mail: obj -> obj -> obj -> obj -> {| toJSON: unit -> string |}
}

[<Import("default", "sendgrid")>]
let sendgrid : {| mail : SendGridHelper |} -> obj = jsNative

let helper : SendGridHelper = sendgrid?mail

type Body = {
    content: obj array
}

type Article = {
    body: Body
    title: string
    slug: string
    publishedDate: string
    description: string
}

type Page = {
    title: string
    slug: string
    body: obj
}

type EmailMessage = {
    name: string
    replyToAddress: string
    subject: string
    body: string
}

type SuccessResponse = {
    success: bool
}

let schemaString = "
  scalar JSON

  type Article {
    title: String
    slug: String
    publishedDate: String
    description: String
    body: JSON
  }

  type Page {
    title: String
    slug: String
    body: JSON
  }

  input EmailMessage {
    name: String
    replyToAddress: String
    subject: String
    body: String
  }

  type SuccessResponse {
    success: Boolean
  }

  type Query {
    allArticles: [Article]
    article(slug: String!): Article
    page(slug: String!): Page
  }

  type Mutation {
    sendEmail(input: EmailMessage): SuccessResponse
  }"

let rootValueInitializer contentfulClient sendgridClient =
    let allArticles () =
        let trimBody (item : obj) =
            let fields : Article = item?fields
            let body : Body = fields.body
            let updatedContent = body.content |> Array.take 4
            {| fields with body = {| body with content = updatedContent |} |}
            
        promise {
            let entriesOptions = 
                createObj [
                    "content_type" ==> "blogPost"
                    "fields.hidden" ==> false
                    "order" ==> "-fields.publishedDate"
                ]
            let! entries = contentfulClient.getEntries(entriesOptions)
            return entries?items
                |> Array.map (fun item -> trimBody item)
        }

    let article (args : {| slug : string |}) =
        let slug = args.slug

        promise {
            let entriesOptions = 
                createObj [
                    "content_type" ==> "blogPost"
                    "fields.slug[in]" ==> slug
                ]
            let! entries = contentfulClient.getEntries(entriesOptions)
            return entries?items
                |> Array.map (fun item -> item?fields)
                |> Array.head
        }

    let page (args : {| slug : string |}) =
        let slug = args.slug

        promise {
            let entriesOptions = 
                createObj [
                    "content_type" ==> "page"
                    "fields.slug[in]" ==> slug
                ]
            let! entries = contentfulClient.getEntries(entriesOptions)
            return entries?items
                |> Array.map (fun item -> item?fields)
                |> Array.head
        }

    let sendEmail (args : {| input: {| name: string; replyToAddress: string; subject: string; body: string |} |}) =
        let input = args.input
        let name = input.name
        let replyToAddress = input.replyToAddress
        let subject = input.subject
        let modifiedSubject = "From williamcotton.com: " + subject
        let body = input.body

        let fromMail = helper.Email replyToAddress name
        let toMail = helper.Email "williamcotton@gmail.com" "William Cotton"
        let content = helper.Content "text/plain" body
        let mail = helper.Mail fromMail modifiedSubject toMail content

        let sendGridOptions = 
            createObj [
                "method" ==> "POST"
                "path" ==> "/v3/mail/send"
                "body" ==> mail.toJSON()
            ]

        let request = sendgridClient?emptyRequest(sendGridOptions)

        promise {
            try
                let! response = sendgridClient?API(request)
                consoleLog response
                return {| success = true |}
            with ex ->
                consoleLog ex.Message
                return {| success = false |}
        } |> ignore

        {| success = true |}

    {|
        allArticles = allArticles;
        article = article;
        page = page;
        sendEmail = sendEmail;
    |}