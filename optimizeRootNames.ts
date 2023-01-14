import { CustomCompilerHost } from ".";

export function getOptimizedRootNames(this: CustomCompilerHost, appendNames: string[] = []) {

    return [
        ...new Set([
            ...this.rootNames,
            ...appendNames,
            ...this.configFileOptions.fileNames
        ])
    ]
}