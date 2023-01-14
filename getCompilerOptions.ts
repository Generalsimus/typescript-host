import ts from "typescript"
import { CustomCompilerHost } from "./";



export function getCompilerOptions(this: CustomCompilerHost): ts.ParsedCommandLine {
    const configFile = ts.readConfigFile(this.tsConfigPath, ts.sys.readFile);
    const compilerOptions = ts.parseJsonConfigFileContent(
        configFile.config,
        ts.sys,
        this.getCurrentDirectory()
    )

    // compilerOptions.
    // console.log("🚀 --> file: getCompilerOptions.ts:25 --> getCompilerOptions --> compilerOptions", compilerOptions);
    const errors: ts.Diagnostic[] = [...compilerOptions.errors]
    if (configFile.error) {
        errors.push(configFile.error)
    }
    return {
        ...compilerOptions,
        options: { ...compilerOptions.options, ...(this.defaultCompilerOptions || {}) },
        errors: errors
    }
}
