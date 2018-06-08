import {createHash} from "crypto";

export class RandomUtils {
    s4(): string {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    hash(input: string): string {
        const hash = createHash("md5");
        hash.update(input);
        return hash.digest("hex");
    }

    guid() {
        return `${this.s4()}${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}-${this.s4()}${this.s4()}${this.s4()}`;
    }
}
