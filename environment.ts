import {resolve as resolvePath} from "path";
export const environment = {
    binFilePath: resolvePath(__dirname, "eccodes", "dist", "bin", "grib_dump")
};
