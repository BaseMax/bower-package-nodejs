const axios = require('axios');

const PACKAGES_ENDPOINT = 'https://bower.herokuapp.com/packages/';
const SEARCH_ENDPOINT = PACKAGES_ENDPOINT + 'search/';

let cachedPackages = [];

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
function listPackages(chunkSize) {
    return new Promise((resolve, reject) => {
        // Check if the packages are already cached
        if (cachedPackages.length > 0) {
            // If chunkSize is not provided, return the entire list
            if (!chunkSize) {
                resolve(cachedPackages);
            } else {
                // Divide the cached packages into chunks of the specified size
                const chunks = [];
                for (let i = 0; i < cachedPackages.length; i += chunkSize) {
                    chunks.push(cachedPackages.slice(i, i + chunkSize));
                }
                resolve(chunks);
            }
        } else {
            // If packages are not cached, fetch them from the API and cache the result
            sendRequest(PACKAGES_ENDPOINT)
                .then(packages => {
                    cachedPackages = packages;
                    // If chunkSize is not provided, return the entire list
                    if (!chunkSize) {
                        resolve(cachedPackages);
                    } else {
                        // Divide the cached packages into chunks of the specified size
                        const chunks = [];
                        for (let i = 0; i < cachedPackages.length; i += chunkSize) {
                            chunks.push(cachedPackages.slice(i, i + chunkSize));
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
