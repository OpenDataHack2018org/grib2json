import {should, use} from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {GribConversionExecutor} from "./grib.conversion.executor";
import {environment} from "../environment";
import {resolve as resolvePath} from "path";
import {statSync} from "fs";
import {NodeReadable, Stream} from "ts-stream";
import {createLogger, format, transports} from "winston";
import {PassThrough} from "stream";
const testPath = resolvePath(__dirname, "..", "test");
const logger = createLogger({
    format: format.simple(),
    transports: [new transports.Console()]
});
let instance: GribConversionExecutor;
describe("Grib converter", function() {
    this.timeout(6e5);

    before("Initialise chai", () => {
        should();
        use(chaiAsPromised);
    });

    beforeEach("Create instance", () => {
        instance = new GribConversionExecutor(environment.binFilePath);
        try {
            statSync(environment.binFilePath);
        } catch (err) {

            if (err.code === "ENOENT") {
                logger.error(`No grib executable found in ${environment.binFilePath}, using mock data`);
                logger.error("Please run the test in the docker container");
                instance.convertToJson = () => {
                    return new NodeReadable(Stream.from([JSON.stringify({foo: "bar"})]));
                };
            } else {
                throw err;
            }
        }

    });

    it("Converts a sample file", async () => {
        const inputFilePath = resolvePath(testPath, "sample1.grib");
        const readable = instance.convertToJson(inputFilePath);
        const passThrough = new PassThrough();
        let jsonSize = 0;
        passThrough.on("data", (data) => {
            jsonSize += Buffer.byteLength(data.toString());
        });
        const stream = readable.pipe(passThrough);
        await new Promise((resolve, reject) => {
            stream.on("finish", resolve);
        });
        logger.info(`Produced a ${Math.round(jsonSize / 1024 )}Kb json output`);
        jsonSize.should.be.greaterThan(0, "Should have produced a non-empty file");

    });

});
