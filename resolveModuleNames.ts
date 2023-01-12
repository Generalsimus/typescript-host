import ts from "typescript"
import { CustomCompilerHost } from "."


export function resolveModuleNames(this: CustomCompilerHost, moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ts.ResolvedProjectReference | undefined, options: ts.CompilerOptions, containingSourceFile?: ts.SourceFile): (ts.ResolvedModule | undefined)[] {
    // console.log("🚀 --> file: resolveModuleNames.ts:6 --> resolveModuleNames --> moduleNames", moduleNames);

    return this.getCacheFileDetails(containingFile).modules ||= (
        moduleNames.map(moduleName => {
            console.log("🚀 --> file: resolveModuleNames.ts:12 --> resolveModuleNames --> moduleName", ts.nodeModuleNameResolver(moduleName, containingFile, this.configFileOptions.options, this, undefined, redirectedReference));
            return ts.nodeModuleNameResolver(moduleName, containingFile, this.configFileOptions.options, this, undefined, redirectedReference).resolvedModule
        })
    )
}