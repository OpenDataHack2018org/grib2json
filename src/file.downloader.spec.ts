import {should, use} from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {FileDownloader} from "./file.downloader";
import {createServer, Server} from "http";
import {tmpdir} from "os";
import {resolve as resolvePath} from "path";
import {AddressInfo} from "net";
import {readFileSync, unlinkSync} from "fs";
let instance: FileDownloader;
let mockFileContent: string;
let destination: string;
let server: Server;
let serverAddress: string;
describe("File downloader", function() {
    this.timeout(1e4);

    before("Initialise chai and serve a mock json file", async () => {
        should();
        use(chaiAsPromised);

        server = createServer((req, res) => {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(mockFileContent);
            res.end();
        });

        await new Promise((resolve, reject) => {
            server.listen(0);
            server.once("listening", resolve);
            server.on("error", reject);
        });
        serverAddress = `http://localhost:${(server.address() as AddressInfo).port}`;

    });

    beforeEach("Create instance", () => {
        instance = new FileDownloader();
        destination = resolvePath(tmpdir(), `${new Date().getTime()}test.json`);
        mockFileContent = JSON.stringify({foo: "bar", timestamp: new Date().getTime()});
    });

    it("Downloads a file from an existing URL", async () => {
        await instance.download({
            destination,
            url: new URL(serverAddress)
        });
        readFileSync(destination).toString().should.equal(mockFileContent,
            "Should have downloaded the correct file contents");
    });

    afterEach("Clean up temp files", () => {
        unlinkSync(destination);
    });

    after("Stop the local server", async () => {
        await new Promise((resolve, reject) => {
            server.close(resolve);
        });
    });

});
