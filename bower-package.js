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

// Get a list of packages
function listPackages() {
  return new Promise((resolve, reject) => {
    // Sending a request to the Bower registry
    axios.get('https://bower.herokuapp.com/packages')
      .then(response => {
        const packages = response.data;
        resolve(packages);
      })
      .catch(error => {
        reject(error);
      });
  });
}

// Check if a package exists
function packageExists(packageName) {
  return new Promise((resolve, reject) => {
    // Sending a request to the Bower registry
    axios.get(`https://bower.herokuapp.com/packages/${packageName}`)
      .then(response => {
        const exists = response.status === 200;
        resolve(exists);
      })
      .catch(error => {
        if (error.response && error.response.status === 404) {
          resolve(false);
        } else {
          reject(error);
        }
      });
  });
}

module.exports = {
  searchPackage,
  listPackages,
  packageExists
};
