# npm-browser

Install like a node package manager in the browser 

Think of this as [requirejs](https://requirejs.org) but in a lighter version

- Lightweight (1kb)
- No Dependencies

## Installation

Unpkg

```html
<script src="https://unpkg.com/npm-browser"></script>
```

# Usage

```html
<script src="https://unpkg.com/npm-browser"></script>
<script>
	npm("sweetalert jQuery",(swal,$)=>{
		swal("Hello world")
		$("body").on("click",()=>{
			alert("hello world")
		})
	})
	
	// Specify the version
	npm("sweetalert@1.0.0",(swal)=>{
		swal("...")
	})
</script>
```
> Packages name must be separated by spaces just like installing a package on npm

> **TIP**: spaces can be many as you want

The base url of this package was **https://unpkg.com/**
if you dont want the default baseUrl you can change it via:

```javascript
npm.baseUrl = "https://cdn.jsdelivr.net/npm/"
```