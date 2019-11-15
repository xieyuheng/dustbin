<?php

$url = "http://localhost:8000/book/req-echo.php";

$data = [
    "email" => "cicada@example.com",
    "display_name" => "LornaJane",
];

$req = [
    "http" => [
        "method" => "POST",
        "header" => "Content-Type: application/x-www-form-urlencoded",
        "content" => http_build_query($data)
    ]
];

$page = file_get_contents($url, false, stream_context_create($req));

echo $page;
