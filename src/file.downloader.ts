import {get} from "http";
import {DownloadRequest} from "./download.request";
import {createWriteStream} from "fs";
export class FileDownloader {
    constructor() {
    }

    async download(request: DownloadRequest): Promise<string> {
        const writeStream = createWriteStream(request.destination);
        await new Promise((resolve, reject) => {
            get(request.url.toString(), res => {
                const stream = res.pipe(writeStream);
                writeStream.on("finish", resolve);
                stream.on("error", reject);
            });
        });
        return request.destination;
    }
}
