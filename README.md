# GRIB to JSON converter

This project makes use of AWS Lambda and API Gateway to convert GRIB files to JSON in order to make CDS data accessible from the browser

## How to use it:

GET https://ug3idxbga3.execute-api.eu-west-1.amazonaws.com/prod/convert?url=[YOUR_GRIB_URL]

Response:
```json
{
"link": [JSON_DOWNLOAD_URL] 
}
```

... More details soon