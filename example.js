const { searchPackage, listPackages, packageExists } = require("./bower-package");

// Search and get the results
searchPackage("jquery").then((results) => {
    console.log("Search results: " + results.length);
    // Iterate over the results
    results.forEach((result) => {
        console.log(result);
    });
});

// Get the list of packages
listPackages(20).then((results) => {
    console.log("List of packages: " + results.length)

    // Iterate over the results
    results.forEach((result) => {
        console.log(result);
    });
});

// Check a package exists
packageExists("jquery").then((results) => {
    console.log("Package exists: " + results)
});
