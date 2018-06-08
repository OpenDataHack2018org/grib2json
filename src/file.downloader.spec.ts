import {should, use} from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {FileDownloader} from "./file.downloader";
import {Server} from "http";
let instance: FileDownloader;
let server: Server;
describe("File downloader", function() {
    this.timeout(1e4);

    before("Initialise chai", () => {
        should();
        use(chaiAsPromised);
    });

    beforeEach("Create instance", () => {
        instance = new FileDownloader();
    });

    it("Downloads a file from an existing URL", async () => {

    });

});
