import axios from "axios";

/*  Note:
    HTTP and HTTPS Proxy classes inherit from Proxy, so we can eventually implement a socks5 proxy class
    and keep the naming/structure consistent, since we have to overwrite #rtt and getGeolocation functions
*/
export default class Proxy {

    constructor({ip = "", port = 0, user = "", pass = ""}) {
        this._authRequired = user !== "";
        this._ip = ip;
        this._port = port;
        this._user = user;
        this._pass = pass;
        this._protocol = null;
    }

    get authHeaderValue() {
        return 'Basic ' + new Buffer(this.user + ':' + this.pass).toString('base64')
    }

    #geoLocationRequestUrl = 'http://ip-api.com/json?fields=status,message,countryCode,city,zip,isp,org,proxy,query';

    async getGeolocation() {
        if (this.protocol == null) {
            return null;
        }
        const res = await axios.get(this.#geoLocationRequestUrl, {
            proxy: {
                protocol: this.protocol,
                host: this.ip,
                port: this.port,
                auth: {
                    username: this.user,
                    password: this.pass
                }
            }
        });
        return res.data;
    }


    #avgRttTrips = 3;

    /**
     * Returns average RTT to specified url across #avgRttTrips tries with and without Proxy-Tunnel
     * @param url Target
     * @returns {Promise<{}|null>} null if protocol isn't set
     */
    async rtt(url) {

        if (this.protocol == null) {
            return null;
        }
        let result = {};

        result["virginTime"] = await this.#avgRtt(this.#avgRttTrips,{},url);
        let config = {
            protocol: this.protocol,
            host: this.ip,
            port: this.port,
            auth: {
                username: this.user,
                password: this.pass
            }
        };
        result["tunneledTime"] = await  this.#avgRtt(this.#avgRttTrips,config,url);
        return result;
    }

    async #rtt(config,url) {
        let start = Date.now();
        const res = await axios.get(url,  config);
        return Date.now()-start;
    }

    async #avgRtt(trips,config,url) {
        let sumOfTrips = 0;
        for(let i=0;i<trips;i++) {
            sumOfTrips += await this.#rtt(config,url)
        }
        return sumOfTrips/trips;
    }

    isValidProxy() {
        return this.ip != "" && this.port!=0;
    }

    #stringify(authIsCalledFor) {
        if (this.protocol == null) {
            return null;
        }
        let credentials = ""
        if (this.isAuthRequired && authIsCalledFor) {
            credentials = this.user + ":" + this.pass + "@";
        }
        return this.protocol + credentials + this.ip + ":" + this.port;

    }

    toNonAuthString() {
        return this.#stringify(false);
    }

    toString() {
        return this.#stringify(true);
    }



    get protocol() {
        return this._protocol;
    }

    get ip() {
        return this._ip;
    }

    set ip(value) {
        this._ip = value;
        return this;
    }

    get port() {
        return this._port;
    }

    set port(value) {
        this._port = value;
        return this;
    }

    get user() {
        return this._user;
    }

    set user(value) {
        this._user = value;
        return this;
    }

    get pass() {
        return this._pass;
    }

    set pass(value) {
        this._pass = value;
        return this;
    }

    get isAuthRequired() {
        return this._authRequired;
    }
}