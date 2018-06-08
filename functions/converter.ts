import "source-map-support/register";
import {APIGatewayEvent, Handler} from "aws-lambda";
import {GribConverter} from "../src/grib.converter";
import {FileDownloader} from "../src/file.downloader";
import {PathResolver} from "../src/path.resolver";
import {RandomUtils} from "../src/random.utils";
import {GribConversionExecutor} from "../src/grib.conversion.executor";
import {environment} from "../environment";
import {Uploader} from "../src/uploader";
import * as S3 from "aws-sdk/clients/s3";
const downloader = new FileDownloader();
const randomUtils = new RandomUtils();
const pathResolver = new PathResolver(randomUtils);
const executor = new GribConversionExecutor(environment.binFilePath);
const region = process.env.REGION;
const bucket = process.env.GRIB_BUCKET;
const s3 = new S3({region});
// tslint:disable-next-line
const version = require("../package.json").version;
const uploader = new Uploader(s3, bucket, `${version}/`);
const converter = new GribConverter(downloader, executor, pathResolver, uploader);
export const handler: Handler<APIGatewayEvent, any> = async (event, context) => {
    const url = event.queryStringParameters["url"] || JSON.parse(event.body).url;
    const link = await converter.handle({url});

};
