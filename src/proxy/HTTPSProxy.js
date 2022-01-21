import Proxy from './Proxy.js';

export default class HTTPSProxy extends Proxy {
    constructor({ip, port, user, pass}) {
        super({ip, port, user, pass});
        this._protocol = "HTTPS://";
    }
}