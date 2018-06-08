import * as S3 from "aws-sdk/clients/s3";
import {PassThrough, Readable} from "stream";

export class Uploader {
    constructor(private s3: S3,
                private bucket: string,
                private prefix: string) {

    }

    toParams(destinationKey: string): {Bucket: string, Key: string} {
        return {
            Bucket: this.bucket,
            Key: this.prefix + destinationKey
        };
    }

    async exists(destinationKey: string): Promise<boolean> {
        try {
            await this.s3.headObject(this.toParams(destinationKey)).promise();
            return true;
        } catch (err) {
            return false;
        }
    }

    async getLink(destinationKey: string): Promise<string> {
        const params = this.toParams(destinationKey);
        return await new Promise<string>((resolve, reject) => {
            this.s3.getSignedUrl("getObject", params, (err, url) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(url);
                }
            });
        });
    }

    async upload(stream: Readable, destinationKey: string): Promise<void> {
        const params = this.toParams(destinationKey);
        const passThrough = new PassThrough();
        const body = stream.pipe(passThrough);
        await this.s3.upload({
            ...params,
            Body: body,
            ContentType: "application/json" // Resolve this from the destination key in future
        }).promise();
    }
}
