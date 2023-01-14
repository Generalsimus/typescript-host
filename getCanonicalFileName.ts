import ts from "typescript"
import path from "path"
import { CustomCompilerHost } from ".";
const fileNameLowerCaseRegExp = /[^\u0130\u0131\u00DFa-z0-9\\/:\-_\. ]+/g,
    toLowerCase = (fileName: string) => fileName.toLowerCase();

const getFileName = (ts.sys.useCaseSensitiveFileNames
    ? (fileName: string): string => fileName
    : (fileName: string): string => {
        return fileNameLowerCaseRegExp.test(fileName)
            ? fileName.replace(fileNameLowerCaseRegExp, toLowerCase)
            : fileName;
    })

export function getCanonicalFileName(this: CustomCompilerHost, fileName: string) {
    const newFileName = getFileName(fileName)
    const extname = path.extname(newFileName);
    if (extname.length !== 0) {
        if (extname in this.extensionsSupport) {
            return newFileName + (this.extensionsSupport[extname]!.extension)
        }
    }

    return newFileName
}