import ts from "typescript";
import { createProgram } from "./createProgram";
import { EmitFileValueType, emitFileCode } from "./emitFileCode";
import { getCompilerOptions } from "./getCompilerOptions";
import { readFile } from "./readFile";
import { getCacheFileDetails } from "./getCacheFileDetails";
import { getSourceFile } from "./getSourceFile";
import { getCanonicalFileName } from "./getCanonicalFileName";
import { getDefaultLibLocation } from "./getDefaultLibLocation";
import { getDefaultLibFileName } from "./getDefaultLibFileName";
import { getCurrentDirectory } from "./getCurrentDirectory";
import { getSourceFileByPath } from "./getSourceFileByPath";
import { resolveModuleNames } from "./resolveModuleNames";
import { getTsConfigFilePath } from "./getConfigFilePath";
import { emitFileIfChanged } from "./emitFileIfChanged";
import { getOptimizedRootNames } from "./optimizeRootNames";

export { ts }
export type ExtensionName = string;
export type CustomExtensions = Partial<Record<ExtensionName, {
    extension: ts.Extension;
    scriptKind: ts.ScriptKind;
}>>;
export const Extension = ts.Extension;
export const ScriptKind = ts.ScriptKind;
export interface HostOptions {
    compilerOptions?: ts.CompilerOptions;
    tsConfigPath?: string;
    transformers?: ts.CustomTransformers;
    extensionsSupport?: CustomExtensions;
}

export class CustomCompilerHost {
    fileCache = new Map<
        string,
        {
            sourceFile: ts.SourceFile | undefined;
            code: string | undefined;
            modules: (ts.ResolvedModule | undefined)[] | undefined;
            emitFileValue: EmitFileValueType | undefined;
        }
    >();
    extensionsSupport: CustomExtensions;
    defaultCompilerOptions?: ts.CompilerOptions;
    defaultTsConfigPath?: string;
    tsConfigPath: string;
    transformers?: ts.CustomTransformers;
    configFileOptions: ts.ParsedCommandLine;
    oldProgram: ts.Program;
    newLine = ts.sys.newLine;
    rootNames: string[] = [];
    constructor(hostOptions: HostOptions, rootNames: string[] = []) {
        this.defaultTsConfigPath = hostOptions.tsConfigPath;
        this.defaultCompilerOptions = hostOptions.compilerOptions;
        this.transformers = hostOptions.transformers;
        this.tsConfigPath = this.getTsConfigFilePath();
        this.configFileOptions = this.getCompilerOptions();
        this.rootNames = this.getOptimizedRootNames(rootNames);
        this.extensionsSupport = hostOptions.extensionsSupport || {};
        this.oldProgram = this.createProgram();
    }
    getOptimizedRootNames = getOptimizedRootNames;
    getSourceFile = getSourceFile;
    getSourceFileByPath = getSourceFileByPath;
    getCacheFileDetails = getCacheFileDetails;
    readFile = readFile;
    emitFileIfChanged = emitFileIfChanged;
    writeFile(fileName: string) {
        // EMPTY
    }
    readDirectory = ts.sys.readDirectory.bind(ts.sys);
    getCanonicalFileName = getCanonicalFileName;
    getDefaultLibLocation = getDefaultLibLocation;
    getDefaultLibFileName = getDefaultLibFileName;
    useCaseSensitiveFileNames() {
        return ts.sys.useCaseSensitiveFileNames;
    }
    getNewLine() {
        return this.newLine;
    }
    getCurrentDirectory = getCurrentDirectory;
    fileExists(fileName: string) {
        return this.fileCache.has(fileName) || ts.sys.fileExists(fileName);
    }
    getTsConfigFilePath = getTsConfigFilePath;
    resolveModuleNames = resolveModuleNames;
    getCompilerOptions = getCompilerOptions;
    emitFileCode = emitFileCode;
    createProgram = createProgram;
}