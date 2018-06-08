import {ChildProcess, spawn} from "child_process";
import {Readable} from "stream";

export class GribConversionExecutor {
    constructor(private binPath: string) {
    }
    convertToJson(inputFilePath: string): Readable {
        return spawn(this.binPath, ["-j", inputFilePath]).stdout;
    }
}
