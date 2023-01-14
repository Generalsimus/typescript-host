
import path from "path"

const win32Sep = path.win32.sep
const posixSep = path.posix.sep
export const normalizePath = (fileName: string) => {
    return fileName.split(win32Sep).join(posixSep);
}