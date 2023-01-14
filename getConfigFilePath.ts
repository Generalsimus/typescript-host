import ts from "typescript"
import { CustomCompilerHost } from "./";
import path from "path"
import { normalizePath } from "./utils/normalizePath";

export function getTsConfigFilePath(this: CustomCompilerHost) {
    const currentDirectory = this.getCurrentDirectory()
    let configFileName: string | undefined
    if (this.defaultTsConfigPath) {
        configFileName = path.resolve(currentDirectory, this.defaultTsConfigPath)
    } else {
        configFileName = ts.findConfigFile(
            currentDirectory,
            (fileName: string) => this.fileExists(fileName)
        )
    }
    return normalizePath(configFileName || "");
}
