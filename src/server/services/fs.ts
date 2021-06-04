const fs = require('fs').promises;

export const fileExists = async (file: string) => {
  //console.log('fileExists')
  try {
    await fs.access(file);
    return true
  } catch (error) {
    return false
  }
}

export const isDirectory = async (file: string) => {
  //console.log('isDirectory')
  try {
    const stat = await fs.lstat(file);
    return stat.isDirectory()
  } catch (err) {
    return false
  }
}

export const deleteFile = async (file: string) => {
  //console.log('deleteFile')
  try {
    return await fs.unlink(file)
  } catch (err) { }
}

export const mkdir = async (file: string, opts?) => {
  console.log('mkdir:', file)
  return await fs.mkdir(file, opts)
}

export const writeFile = async (file: string, data, opts?) => {
  return await fs.writeFile(file, data, opts)
}

export const readFile = async (file: string, opts?) => {
  return await fs.readFile(file, opts)
}

export default {
  fileExists,
  isDirectory,
  deleteFile,
  readFile,
  writeFile,
  mkdir
}