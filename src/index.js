import { loadAllPackage } from "./utils"

/**
 * This will return true if the value is some of the items
 * @param {string} pkgName
 * @param {function} callback
 */
function npm(packages,callback){
	
	loadAllPackage(packages,function(){
		callback.apply(this,arguments)
	},npm.baseUrl)
	
}

npm.baseUrl = "https://unpkg.com/";

export default npm