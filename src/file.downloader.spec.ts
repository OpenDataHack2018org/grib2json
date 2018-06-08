import {should, use} from "chai";
import * as chaiAsPromised from "chai-as-promised";
import {FileDownloader} from "./file.downloader";
let instance: FileDownloader;

describe("File downloader", function() {
    this.timeout(1e4);

    before("Initialise chai", () => {
        should();
        use(chaiAsPromised);
    });

    beforeEach("Create instance", () => {
        instance = new FileDownloader();
    });

    it("Downloads an existing URL")

});
