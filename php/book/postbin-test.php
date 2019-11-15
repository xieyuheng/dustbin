<?php

require_once "./postbin.php";

$bin_id = bin()["binId"];

echo "bin_id: $bin_id \n";

$data = [
    "email" => "cicada@example.com",
    "display_name" => "xieyuheng",
];

$req = [
    "http" => [
        "method" => "POST",
        "header" => "Content-Type: application/x-www-form-urlencoded",
        "content" => http_build_query($data)
    ]
];

echo "req: "; print_r($req);
echo "req_json: "; print_r(json_encode($req));

$query = http_build_query([
    "x" => 1,
    "y" => 2,
]);

// $req_id = bin_req($bin_id, $req);
$req_id = bin_req_query($bin_id, $req, $query);

$req_record = bin_get($bin_id, $req_id);

echo "req_record: "; print_r($req_record);
echo "req_record_json: "; print_r(json_encode($req_record));
