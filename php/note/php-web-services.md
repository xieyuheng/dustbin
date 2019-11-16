# PHP Web Services

- Book by Lorna Jane Mitchell

## CHAPTER 1. HTTP

If `allow_url_fopen` is enabled,
it is possible to make requests using `file_get_contents()`.
The simplest example is making a GET request
and reading the response body in as if it were a local file.

``` php
$postbin = "https://postb.in/1573800685926-1449347755406";
$result = file_get_contents($postbin);
echo $result;

$data = [
    "name" => "cicada",
    "email" => "cicada@example.com"
];
$context = [
    "http" => [
        "method" => "POST",
        "header" => [
            "Accept: application/json",
            "Content-Type: application/json"],
        "content" => json_encode($data),
    ]
];
$query = ["x" => 1, "y" => 2];
$result = file_get_contents(
    $postbin . "?" . http_build_query($query),
    false, stream_context_create($context));
echo $result;
```

## CHAPTER 2. HTTP Verbs

### Serving GET Requests

URLs used with GET can be bookmarked,
they can be called as many times as needed
(the request can change the data it accesses).

A great example of using a GET request when filling in a web form
is when using a search form, which should always use GET.
Searches can be repeated safely, and the URLs can be shared.

If the request is safe to repeat, then GET is a good choice; otherwise use POST.

### Making GET Requests

``` php
<?php
$url = "http://localhost:8000/book/get-form-page.php";
$data = ["category" => "programming", "rows" => 20];
$get_addr = $url . "?" . http_build_query($data);
$page = file_get_contents($get_addr);
echo $page;
```

### Handling POST Requests

In contrast to GET requests, a POST request is one that
does cause change on the server that handles the request.
These requests shouldn't be repeated or bookmarked,
which is why your browser warns you when it is resubmitting data.

When a form is submitted via GET, we can see the variables being sent on the URL.

With POST, however, the data goes into the body of the request,
and the `Content-Type` header denotes what kind of data can be found in the body.

### Making POST Requests

``` php
<?php
$url = "http://localhost:8000/book/post-form-page.php";
$data = [
    "email" => "cicada@example.com",
    "display_name" => "LornaJane",
];
$options = [
    "http" => [
        "method" => "POST",
        "header" => "Content-Type: application/x-www-form-urlencoded",
        "content" => http_build_query($data)
    ]
];

$page = file_get_contents($url, false, stream_context_create($options));
echo $page;
```

### Using Other HTTP Verbs

``` php
<?php
$url = "http://localhost:8000/book/method-echo.php";

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
curl_exec($ch);

echo file_get_contents($url, false, stream_context_create([
    "http" => [
        "method" => "DELETE",
    ]
]));
```
## CHAPTER 3. Headers

## CHAPTER 4. Cookies

## CHAPTER 5. JSON

``` php
echo json_encode(array("message" => "hello you"));

$message_json = <<<END
  { "message": "hello you" }
END;

$data = json_decode($message_json);
var_dump($data);

$obj = new stdClass();
$obj->message = "hello you";
echo json_encode($obj) . "\n";

$data = json_decode($message_json, true);
var_dump($data);
```

## CHAPTER 8. REST

REST stands for REpresentational State Transfer,
it is more a philosophy or a set of principles than a protocol in its own right.

REST is a set of ideas about how data can be transferred elegantly,
and although it's not tied to HTTP, it is discussed here in the context of HTTP.

REST takes great advantage of the features of HTTP.

In a RESTful service, four HTTP verbs are used to provide
a basic set of CRUD (Create, Read, Update, Delete) functionality:
`POST`, `GET`, `PUT`, and `DELETE`.

It is also possible to see implementations of other verbs in RESTful services,
such as PATCH to allow partial update of a record,
but the basic four provide the platform of a RESTful service.

The operations are applied to **resources** in a system.
A representation of resource might be JSON or XML, or indeed anything else.

At the first stage of API design, a starting point could be
to consider each database row as an individual resource.
Think of an imaginary blogging system as an example:
resources might be posts, categories, and authors.
Every resource has a URI, which is the unique identifier for the record.

A collection contains multiple resources (of the same type);
usually this is a list of resources or the result of a search operation.
A blog example might have a collection of posts,
and another collection of posts limited to a particular category.

### RESTful URLs

RESTful services are often thought of as “pretty URL” services,
but there's more than prettiness to the structures used here.

Example URLs,
- https://api.github.com/users/lornajane/
- https://api.github.com/users/lornajane/repos
- https://api.github.com/users/lornajane/gists

These delightful, descriptive URLs allow users to guess what will be found when visiting them,
and to easily navigate around a predictable and clearly designed system.
They describe what data will be found there, and what to expect.

A key characteristic of RESTful URLs is that
they only contain information about the resource or collection data,
there are no verbs in these URLs.

In order to alter how a collection is viewed
(for example, to add filtering or sorting to it),
it is common to add query parameters to the URL,
- http://api.joind.in/v2.1/events -- for all events
- http://api.joind.in/v2.1/events?filter=past -- for events that happened before today
- http://api.joind.in/v2.1/events?filter=cfp -- for events with a Call for Papers currently open

Notice that the URLs are not along the lines of `/events/sortBy/Past`
or any other format that puts extra variables in the URL,
but they use query variables instead.
This data set, in both cases, still utilizes the `/events/` collection,
but sorted and/or filtered accordingly.

### Resource Structure and Hypermedia

Exactly how the resource is returned can vary hugely;
REST doesn't dictate how to structure the representations sent.

### Build the Basic RESTful Server

REST makes the most of HTTP's best features,
placing all the metadata about the request and response into the verbs, status codes and headers,
and reserving the main body of the communications for the actual content.

#### Example Project: The Wishlist

## CHAPTER 11 Maintainable Web Services

This chapter deals with the very important work of
how to structure your API with great error handling and diagnostic output
to make a project that can be picked up and maintained for as long as it is needed.

## CHAPTER 12 Making Service Design Decisions

## APPENDIX A. A Guide to Common Status Codes

## APPENDIX B. Common HTTP Headers
