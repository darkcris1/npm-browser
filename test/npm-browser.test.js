import npm from "../dist/npm-browser.min"

const baseUrl = "https://unpkg.com/"
describe("npm-browser",()=>{
	it("should match the package",()=>{
		
		
		expect(npm.baseUrl).toBe(baseUrl);
		expect(typeof npm === "function").toBe(true)
	})
	it("test multiple package in order",done=>{
		function callback(calert,ripple,swal,joi){
			try {
				expect(typeof calert === "function").toBe(true)
				expect(typeof ripple === "function").toBe(true)
				expect(typeof ripple().destroy === "function").toBe(true)
				expect(typeof swal.close === "function").toBe(true)
				expect(typeof joi === "object").toBe(true)
				expect(typeof joi.string === "function").toBe(true)
				done()
			} catch (e) {
				done(e)
			}
		}
		npm("calerts ripple-effects sweetalert joi",callback)
	},50000)
	it("should change the baseUrl",done=>{
		const npm2 = npm;
		npm2.baseUrl = "https://cdn.jsdelivr.net/npm/";
		
		function callback(calert){
			try {

				expect(typeof calert === "function").toBe(true)
				done()
			} catch (e) {
				done(e)
			}
		}
		npm2("calerts@latest",callback)
		
	},20000)
})
