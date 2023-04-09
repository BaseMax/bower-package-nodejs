const axios = require('axios');

const PACKAGES_ENDPOINT = 'https://bower.herokuapp.com/packages/';
const SEARCH_ENDPOINT = PACKAGES_ENDPOINT + 'search/';

let cachedPackages = null;

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
function listPackages(chunkSize = Infinity) {
    return new Promise((resolve, reject) => {
        // If the packages are already cached, return them
        if (cachedPackages !== null) {
            if (chunkSize === Infinity) {
                resolve(cachedPackages);
            } else {
                // Split the cached packages into chunks
                const chunks = [];
                for (let i = 0; i < cachedPackages.length; i += chunkSize) {
                    chunks.push(cachedPackages.slice(i, i + chunkSize));
                }
                resolve(chunks);
            }
        } else {
            // Otherwise, send a request to the Bower registry
            sendRequest(PACKAGES_ENDPOINT)
                .then(packages => {
                    // Cache the packages and return them
                    cachedPackages = packages;
                    if (chunkSize === Infinity) {
                        resolve(cachedPackages);
                    } else {
                        // Split the packages into chunks
                        const chunks = [];
                        for (let i = 0; i < packages.length; i += chunkSize) {
                            chunks.push(packages.slice(i, i + chunkSize));
                        }
                        resolve(chunks);
                    }
                })
                .catch(error => reject(error));
        }
    });
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
