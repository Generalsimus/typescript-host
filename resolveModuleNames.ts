import ts from "typescript"
import { CustomCompilerHost } from "."


export function resolveModuleNames(this: CustomCompilerHost, moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ts.ResolvedProjectReference | undefined, options: ts.CompilerOptions, containingSourceFile?: ts.SourceFile): (ts.ResolvedModule | undefined)[] {
    const moduleCache = (this.getCacheFileDetails(containingFile).modules ||= {})

    return moduleNames.map(moduleName => {
        return moduleCache[moduleName] ||= ts.nodeModuleNameResolver(moduleName, containingFile, this.configFileOptions.options, this, undefined, redirectedReference).resolvedModule;
    })
}