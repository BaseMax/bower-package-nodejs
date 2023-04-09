# bower-package-nodejs

This is a NodeJS module for getting information about Bower packages from the Bower registry, which is a REST API. It can be used to search for packages, list all packages, and check if a package exists. The package written in JavaScript.

## Features

- Search packages
- List packages (All packages, or in chunks)
- Internal cache feature to reduce the number of requests
- Check package exists and name availability

## Example

Import the module:

```javascript
const { searchPackage, listPackages, packageExists } = require("./bower-package");
```

Search and get the results:

```javascript
searchPackage("jquery").then((results) => {
	console.log("Search results: " + results.length);
	// Iterate over the results
	results.forEach((result) => {
		console.log(result);
	});
});
```

Get the list of all packages:

```javascript
listPackages().then((packages) => {
	console.log("List of packages: " + packages.length);

	// Iterate over the results
	packages.forEach((package) => {
		console.log(package);
	});
});
```

Get the list of packages and chunk them into arrays of 20 packages:

```javascript
listPackages(20).then((chunks) => {
	console.log("List of chunks: " + chunks.length)
	console.log("List of packages: " + chunks.reduce((sum, chunk) => sum + chunk.length, 0));

	// Iterate over the results
	chunks.forEach((chunk) => {
		console.log(chunk);
		// chunk.forEach((package) => {
		//     console.log(package);
		// });
	});
});
```

Check a package exists:

```javascript
packageExists("jquery").then((exists) => {
	console.log("Package exists: " + exists)
});
```

Copyright 2023, Max Base
