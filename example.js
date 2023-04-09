const { searchPackage, listPackages, packageExists } = require("./bower-package");

// Search and get the results
searchPackage("jquery").then((results) => {
	console.log("Search results: " + results.length);
	// Iterate over the results
	results.forEach((result) => {
		console.log(result);
	});
});

// Get the list of all packages
listPackages().then((packages) => {
	console.log("List of packages: " + packages.length);

	// Iterate over the results
	packages.forEach((package) => {
		console.log(package);
	});
});

// Get the list of packages
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

// Check a package exists
packageExists("jquery").then((exists) => {
	console.log("Package exists: " + exists)
});
