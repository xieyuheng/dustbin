<?php

// https://postb.in/api

function bin() {
    $url = "https://postb.in/api/bin";
    $req = [
        "http" => [
            "method" => "POST",
        ]
    ];
    $result = file_get_contents($url, false, stream_context_create($req));
    return json_decode($result, true);
}

function bin_req($bin_id, $req) {
    $url = "https://postb.in/$bin_id";
    $req_id = file_get_contents($url, false, stream_context_create($req));
    return $req_id;
}

function bin_req_query($bin_id, $req, $query) {
    $url = "https://postb.in/$bin_id?$query";
    $req_id = file_get_contents($url, false, stream_context_create($req));
    return $req_id;
}

function bin_get($bin_id, $req_id) {
    $url = "https://postb.in/api/bin/$bin_id/req/$req_id";
    $req = [
        "http" => [
            "method" => "GET",
        ]
    ];
    $result = file_get_contents($url, false, stream_context_create($req));
    return json_decode($result, true);
}
