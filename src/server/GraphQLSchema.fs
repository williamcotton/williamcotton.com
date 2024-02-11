module GraphQLSchema

open Fable.Core
open FSharp.Data
open Fable.Core.JS
open Fable.Core.JsInterop
open Express
open System

[<Import("default", "sendgrid")>]
let sendgrid : obj -> obj = jsNative

[<Emit("sendgrid.mail")>]
let helper: unit -> obj = jsNative

type Article = {
    body: obj
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

[<Emit("fetch($0)")>]
let fetch (url: string): JS.Promise<{| text: unit -> JS.Promise<string>; json: unit -> JS.Promise<obj> |}> = jsNative

let fetchAndLog url =
    fetch(url)
    |> fun response ->
        response.``then``(fun r -> 
            consoleLog r?body
        )

let rootValueInitializer contentfulAccessToken contentfulSpaceId =
    let trimBody fields =
        { fields with body = fields.body.[..3] } // Slice string to get first 4 characters

    let allArticles () =
        promise {
            let! res = fetch $"https://cdn.contentful.com/spaces/{contentfulSpaceId}/environments/master/entries?access_token={contentfulAccessToken}&content_type=blogPost&fields.hidden=false"
            let! json = res.json()
            let items = json?items
            let articles = items |> Array.map (fun item -> item?fields)
            return articles
        }

    let article slug =
        consoleLog "Fetching article"
        // let url = $"https://cdn.contentful.com/spaces/{contentfulSpaceId}/environments/{nodeEnv}/entries?access_token={contentfulAccessToken}"
        // /spaces/{space_id}/environments/{environment_id}/entries/{entry_id}?access_token={access_token}
        let url = "https://google.com"
        fetch url

    let page slug =
        fun () -> ()
        // async {
        //     let! entries = contentfulClient.GetEntriesAsync("page", slug = slug)
        //     match entries with
        //     | firstEntry::_ -> return firstEntry
        //     | [] -> failwith "NotFound"
        // }

    let sendEmail input =
        fun () -> ()
    //     async {
    //         try
    //             let modifiedSubject = $"From williamcotton.com: {input.subject}"
    //             let fromEmail = helper.Email(input.replyToAddress, input.name)
    //             let toEmail = helper.Email("williamcotton@gmail.com")
    //             let content = helper.Content("text/plain", input.body)
    //             let mailMessage = helper.Mail(fromEmail, modifiedSubject, toEmail, content)
    //             // Assuming sendgridClient is a configured SMTP client or similar
    //             let! result = sendgridClient.SendMailAsync(mailMessage)
    //             return { success = true }
    //         with
    //         | _ -> return { success = false }
    //     }

    {|
        allArticles = allArticles;
        article = article;
        page = page;
        sendEmail = sendEmail;
    |}