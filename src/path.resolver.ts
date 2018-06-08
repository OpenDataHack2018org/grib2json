import {RandomUtils} from "./random.utils";
import {tmpdir} from "os";
import {resolve as resolvePath} from "path";

export class PathResolver {
    constructor(private randomUtils: RandomUtils,
                private tempDir: string = tmpdir()) {

    }
    randomDownloadPath(): string {
        return resolvePath(this.tempDir, this.randomUtils.guid());
    }

    toDestinationKey(fileHash: string) {
        return `${fileHash}.json`;
    }

}
