 function log(msg){
 	console.log("%cNPM-BROWSER[DEBUG]: " + msg,"background: red;font-size:1rem;color: white");
 }

function moduleFunction(code,pkgName){
	try {
		const transformCode = [
			"var exports = {};var module = {exports: {}};",
			code,
			"return module.exports;"
			].join("\n")
		// Wrap the code into iife then pass the module and exports as object
		// to make it exportable
		return new Function(`return (function(){
			${transformCode}
		})()`)()
	} catch (e) {
		console.log(e.message);
		log(`The "${pkgName}" module must be type of UMD`)
		return null;
	}
}

function importer(pkgName,callback, baseUrl){
	const http = new XMLHttpRequest();
	const url = baseUrl + pkgName;
		
	http.open("GET",url);
	http.send();
	
	http.onreadystatechange = function(res){
		 if (http.readyState === XMLHttpRequest.DONE) {
		 	const status = http.status;
		 	switch (status) {
		 		case 200:
		   		const module = moduleFunction(http.responseText,pkgName)
		   		callback(module);
		 			break;
	 			case 404:
	      		log(`"${pkgName}" package not Found`);
	      		callback(null)
	      		break;
		 		default:
	    			log(`Network Error while loading "${pkgName}"`);
	      		callback(null)
		 	}
		}
	}
	
}
function loadAllPackage(packages,callback,baseUrl){
	packages = packages.trim().split(/\s+/);
	
	const modules = new Array(packages.length);
	
	// counter for how many packages has loaded
	let counter = 0;
	
	packages.forEach((val,i)=>{
		
		importer(val,(fn)=>{
			modules.splice(i,1,fn);
			counter += 1;
			
			if(counter === packages.length){
				callback.apply(this, modules)
			}
			
		},baseUrl)
		
	})
}

export { loadAllPackage }