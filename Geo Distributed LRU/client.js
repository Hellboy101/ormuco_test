const axios = require('axios');
const dotenv = require('dotenv');
const sortBy = require('lodash.sortby');
const ping = require('ping');

dotenv.config();

class Caching {
    constructor() {
        this.centralServerURL = process.env.CENTRAL_SERVER;
        this.cachingServerList = [];
        this.fastestServer = undefined;
    }

    async getCachingServers() {
        try {
            return await axios.get(this.centralServerURL + "/cachingServerList");
        } catch (error) {
            return error;
        }
    }

    async getFastestServer() {
        if (!this.cachingServerList.length) {
            this.cachingServerList = await this.getCachingServers();
        }
        Promise.all(this.cachingServerList.map(server => ping.promise.probe(server))).then(response => {
            this.fastestServer = sortBy(response, 'time')[0];
        });
    }

    async getCache(key) {
        if (this.fastestServer === undefined) {
            this.getFastestServer();
        }
        try {
            return await axios.get(this.fastestServer + "/get/" + key);
        } catch (e) {
            console.log(e);
        }
    }

    async putCache(key, value) {
        if (this.fastestServer === undefined) {
            this.getFastestServer();
        }
        axios.post(this.fastestServer + "/put", {key, value}).then(response => {
            return response;
        })
        .catch(e => {
            console.log(e);
        });
    }

}
