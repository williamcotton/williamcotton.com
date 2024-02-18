module Global

open Fable.Core
open System

[<Emit("console.log($0)")>]
let consoleLog text: unit = jsNative

[<Emit("fetch($0)")>]
let fetch (url: string): JS.Promise<{| text: unit -> JS.Promise<string>; json: unit -> JS.Promise<obj> |}> = jsNative

type ContentfulClientOptions = {
    space: string
    accessToken: string
}

type Entry = {
    sys: {| id: string; contentType: {| sys: {| id: string |} |} |}
    fields: {| hidden: bool |}
    json: obj -> JS.Promise<obj>
}

type ContentfulClient = {
    getEntries: obj -> JS.Promise<Entry[]>
}

type Contentful = {
    createClient: ContentfulClientOptions -> ContentfulClient
}

let addOrdinal day =
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

let formatDateString inputDate =
    let parsedDate = DateTime.Parse(inputDate)
    let monthName = monthNames parsedDate.Month
    let dayWithOrdinal = addOrdinal parsedDate.Day
    sprintf "%s %s, %d" monthName dayWithOrdinal parsedDate.Year