# Dida

## Configure

- DB: https://github.com/cntehang/basic-resource-service-scala/blob/master/src/main/resources/application.conf
- log: https://github.com/cntehang/basic-resource-service-scala/blob/master/src/main/resources/logback.xml

## Dependencies

- Data downloading depends on the command line tool `curl`.

## Run

- run `DidaSync`:
``` sh
sbt "runMain com.tehang.resource.int.hotel.thirdparty.dida.DidaSync"
```

## Info

- API Docs:
  http://doc.didatravel.com/ui/index.html?projectID=3&Lang=CN

- API endpoint:
  http://api.didatravel.com/api/staticdata/<FunctionName>?$format=json
- Testing Authorization Header:
  { "Header": { "ClientID": "DidaApiTestID", "LicenseKey": "TestKey" } }

- Proxy API endpoint (due to third part's IP whitelist):
  http://dev-dida.teyixing.com/api/staticdata/<FunctionName>?$format=json
- Authorization Header:
  { "Header": { "ClientID": "Tehang400_Test", "LicenseKey": "Tehang400_Test" } }

## Note about API "/api/staticdata/GetStaticInformation"

API "/api/staticdata/GetStaticInformation" returns a url to CSV files.
- which might be DB dump
- which uses `|` as delimiter
- which might contains the following string in fields (not all csv parser can handle them):
  -  `x "x"`
  -  `"x" x`
  -  `x "x" x`
  -  `\"x`

Example the CSV file size:

``` sh
wc HotelSummary.csv
   732514   9171915 189876936 HotelSummary.csv

wc Policy.csv
  4538770  64310690 834957099 Policy.csv

wc Facilities.csv
 15610954  40333573 853980281 Facilities.csv
```
