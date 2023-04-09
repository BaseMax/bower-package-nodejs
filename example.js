const { searchPackage, listPackages, packageExists } = require("./bower-package");

// Search and get the results
searchPackage("jquery").then((results) =>
    console.log("Search results: " + results)
);

// Get the list of packages
listPackages().then((results) =>
    console.log("List of packages: " + results)
);

// Check a package exists
packageExists("jquery").then((results) =>
    console.log("Package exists: " + results)
);
