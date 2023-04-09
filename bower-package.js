const axios = require('axios');

const PACKAGES_ENDPOINT = 'https://bower.herokuapp.com/packages/';
const SEARCH_ENDPOINT = PACKAGES_ENDPOINT + 'search/';

// Send a GET request to the specified endpoint
function sendRequest(url) {
    return axios.get(url)
        .then(response => response.data)
        .catch(error => Promise.reject(error));
}

// Search for a package
function searchPackage(packageName) {
    const url = `${SEARCH_ENDPOINT}${packageName}`;
    return sendRequest(url);
}

// Get a list of packages
function listPackages() {
    return sendRequest(PACKAGES_ENDPOINT);
}

// Check if a package exists
function packageExists(packageName) {
    const url = `${PACKAGES_ENDPOINT}${packageName}`;
    return sendRequest(url)
        .then(() => true)
        .catch(error => {
            if (error.response && error.response.status === 404) return false;
            else return Promise.reject(error);
        });
}

module.exports = {
    searchPackage,
    listPackages,
    packageExists
};
