const axios = require('axios');

// Search for a package
function searchPackage(packageName) {
  return new Promise((resolve, reject) => {
    // Sending a request to the Bower registry
    axios.get(`https://bower.herokuapp.com/packages/search/${packageName}`)
      .then(response => {
        const results = response.data;
        resolve(results);
      })
      .catch(error => {
        reject(error);
      });
  });
}

module.exports = {
  searchPackage,
//   listPackages,
//   packageExists
};
