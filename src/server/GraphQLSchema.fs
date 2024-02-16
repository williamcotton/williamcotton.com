module GraphQLSchema

open Fable.Core
open Feliz
open FSharp.Data
open Fable.Core.JS
open Fable.Core.JsInterop
open Express
open Global
open System

[<Import("default", "sendgrid")>]
let sendgrid : obj -> obj = jsNative

[<Emit("sendgrid.mail")>]
let helper: unit -> obj = jsNative

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

    let article params =
        let slug = params?slug

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

    let page params =
        let slug = params?slug

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

    let sendEmail params =
        let input = params?input
        let name = input?name
        let replyToAddress = input?replyToAddress
        let subject = input?subject
        let body = input?body

        let modifiedSubject = "From williamcotton.com: " + subject
        {| success = true |}

    {|
        allArticles = allArticles;
        article = article;
        page = page;
        sendEmail = sendEmail;
    |}