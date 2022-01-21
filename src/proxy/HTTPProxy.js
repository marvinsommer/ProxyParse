import Proxy from './Proxy.js';

export default class HTTPProxy extends Proxy {
    constructor({ip, port, user, pass}) {
        super({ip, port, user, pass});
        this._protocol = "HTTP://";
    }
}