import {ChildProcess, spawn} from "child_process";
import {RepairStream} from "jsonrepair";
import {Readable} from "stream";

export class GribConversionExecutor {
    constructor(private binPath: string) {
    }
    convertToJson(inputFilePath: string): Readable {
        const repairRules = [{
            description: "Removing trailing comma within array",
            character: "]",
            expected: "VALUE",
            action: (parser) => {
                parser.stack.pop();
                parser.onclosearray();
                const newState = parser.stack.pop();
                parser.state = newState;
            }
        }];

        const repairStream = new RepairStream(repairRules);

        return spawn(this.binPath, ["-j", inputFilePath]).stdout.pipe(repairStream);
    }
}
