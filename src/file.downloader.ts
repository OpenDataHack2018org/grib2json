import {get} from "http";
import {DownloadRequest} from "./download.request";
import {createWriteStream} from "fs";
import {createHash} from "crypto";
export class FileDownloader {
    constructor() {
    }

    /**
     * Downloads a file from a URL and calculates a hash of the content
     * @param {DownloadRequest} request
     * @return {Promise<string>} - The md5 hash of the file content
     */
    async download(request: DownloadRequest): Promise<string> {
        const hash = createHash("md5");
        const writeStream = createWriteStream(request.destination);
        await new Promise((resolve, reject) => {
            get(request.url.toString(), res => {
                const stream = res.pipe(writeStream);
                res.on("data", data => {
                    hash.update(data.toString());
                });
                writeStream.on("finish", resolve);
                stream.on("error", reject);
            });
        });
        return hash.digest("hex");
    }
}
