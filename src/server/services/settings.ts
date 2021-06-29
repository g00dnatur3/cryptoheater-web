import { fileExists, isDirectory, deleteFile, mkdir, writeFile, readFile } from './fs'

// const homeDir = require('os').homedir();
const settingsDir = `/home/user/.cryptoheater`
const settingsFile = `${settingsDir}/settings.json`

export const saveSettings = async (settings) => {
  let exists = await fileExists(settingsDir)
  let isDir = exists ? await isDirectory(settingsDir) : false
  if (!exists) {
    await mkdir(settingsDir)
  }
  if (exists && !isDir) {
    await deleteFile(settingsDir)
    await mkdir(settingsDir)
  }
  exists = await fileExists(settingsFile)
  let existingSettings;
  if (exists) {
    try {
      const jsonData = await readFile(settingsFile, { encoding: 'utf8' })
      existingSettings = JSON.parse(jsonData)
    }
    catch (err) {
      existingSettings = undefined
    }
  }
  if (existingSettings) {
    settings = {...existingSettings, ...settings}
  }
  const data = JSON.stringify(settings, null, 2)
  await writeFile(settingsFile, data)
}

export const loadSettings = async () => {
  const exists = await fileExists(settingsFile)
  if (exists) {
    console.log('settings found:', settingsFile)
    try {
      const jsonData = await readFile(settingsFile, { encoding: 'utf8' })
      return JSON.parse(jsonData)
    }
    catch (err) {
      console.log(err)
    }
  } else {
    console.log('settings not found:', settingsFile)
  }
}

export default {
  saveSettings,
  loadSettings
}
