import {FileDownloader} from "./file.downloader";
import {GribConversionExecutor} from "./grib.conversion.executor";
import {ConvertRequest} from "./convert.request";
import {PathResolver} from "./path.resolver";
import {unlinkSync} from "fs";
import {Uploader} from "./uploader";

export class GribConverter {
    constructor(private downloader: FileDownloader,
                private converter: GribConversionExecutor,
                private pathResolver: PathResolver,
                private uploader: Uploader) {
    }

    async handle(request: ConvertRequest): Promise<string> {
        const destination = this.pathResolver.randomDownloadPath();
        const hash = await this.downloader.download({url: new URL(request.url), destination});
        const destinationKey = this.pathResolver.toDestinationKey(hash);
        const exists = await this.uploader.exists(destinationKey);
        if (!exists) {
            const readable =  this.converter.convertToJson(destination);
            await this.uploader.upload(readable, destinationKey);
        }
        unlinkSync(destination);
        return await this.uploader.getLink(destinationKey);

    }
}
