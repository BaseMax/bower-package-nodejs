const { searchPackage } = require("./bower-package");

console.log(searchPackage);
console.log(searchPackage("jquery").then((results) => console.log(results)));
