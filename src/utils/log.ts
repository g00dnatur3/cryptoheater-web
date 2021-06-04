/* tslint:disable */
const isNode = require("detect-node");

const getLog = (tag: string): any => {
  if (isNode) {
    const path = require('path')
    const dirs:string[] = path.dirname(tag).split(path.sep)
    const index:number = dirs.indexOf('src') > -1 ? dirs.indexOf('src') : dirs.indexOf('test')
    if (index > 0 && index+1 <= dirs.length) {
      const basename = path.basename(tag)
      tag = `${dirs.slice(index+1).join(path.sep)}${path.sep}${basename}`
    }
    const log4js = require('log4js')
    const log = log4js.getLogger(tag)
    log.err = log.error
    log.level = 'debug'
    return log
  } else {
    const info = (message: any, ...args: [any]) => {
      args.unshift(`[${tag}]`, message);
      console.info.apply(null, args);
    };
    const warn = (message: any, ...args: [any]) => {
      args.unshift(`[${tag}]`, message);
      console.warn.apply(null, args);
    };
    const error = (message: any, ...args: [any]) => {
      args.unshift(`[${tag}]`, message);
      console.error.apply(null, args);
    };
    return {info, error, warn, err: error};
  }
};

export default getLog;
