import {resolve as resolvePath} from "path";
const eccodesFolder = "eccodes";
const eccodesDistFolderPath = resolvePath(__dirname, eccodesFolder, "dist");
export const environment = {
    eccodesFolder,
    binFilePath: resolvePath(eccodesDistFolderPath, "bin", "grib_dump"),
    eccodesDistFolderPath
};
