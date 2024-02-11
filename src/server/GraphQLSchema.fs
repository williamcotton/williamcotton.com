module GraphQLSchema

open Fable.Core
open Feliz
open FSharp.Data
open Fable.Core.JS
open Fable.Core.JsInterop
open Express
open System

// Function to add ordinal suffix to a day number
let addOrdinal (day: int) : string =
    match day % 10 with
    | 1 when day % 100 <> 11 -> sprintf "%dst" day
    | 2 when day % 100 <> 12 -> sprintf "%dnd" day
    | 3 when day % 100 <> 13 -> sprintf "%drd" day
    | _ -> sprintf "%dth" day

let monthNames monthNumber =
    match monthNumber with
    | 1 -> "January"
    | 2 -> "February"
    | 3 -> "March"
    | 4 -> "April"
    | 5 -> "May"
    | 6 -> "June"
    | 7 -> "July"
    | 8 -> "August"
    | 9 -> "September"
    | 10 -> "October"
    | 11 -> "November"
    | 12 -> "December"
    | _ -> failwith "Invalid month number"

let formatDateString (inputDate: string) : string =
    let parsedDate = DateTime.Parse(inputDate)
    let monthName = monthNames parsedDate.Month
    let dayWithOrdinal = addOrdinal parsedDate.Day
    sprintf "%s %s, %d" monthName dayWithOrdinal parsedDate.Year

[<Import("default", "sendgrid")>]
let sendgrid : obj -> obj = jsNative

[<Emit("sendgrid.mail")>]
let helper: unit -> obj = jsNative

[<Import("default", "../common/render_node.js")>]
let renderNode : obj -> obj = jsNative

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

[<Emit("fetch($0)")>]
let fetch (url: string): JS.Promise<{| text: unit -> JS.Promise<string>; json: unit -> JS.Promise<obj> |}> = jsNative

let rootValueInitializer contentfulAccessToken contentfulSpaceId =
    let allArticles () =
        let trimBody (item : obj) =
            let fields : Article = item?fields
            let body : Body = fields.body
            let updatedContent = body.content |> Array.take 4
            {| fields with body = {| body with content = updatedContent |} |}
            
        promise {
            let! res = fetch $"https://cdn.contentful.com/spaces/{contentfulSpaceId}/environments/master/entries?access_token={contentfulAccessToken}&content_type=blogPost&fields.hidden=false&order=-fields.publishedDate"
            let! json = res.json()
            let items = json?items
            let assets = json?includes?Asset
            let articles = items |> Array.map (fun item -> trimBody item)
            return articles
        }

    let article params =
        let slug = params?slug

        promise {
            let! res = fetch $"https://cdn.contentful.com/spaces/{contentfulSpaceId}/environments/master/entries?access_token={contentfulAccessToken}&content_type=blogPost&fields.slug[in]={slug}"
            let! json = res.json()
            let item = json?items |> Array.head
            let article  : Article = item?fields
            return article
        }

    let page params =
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