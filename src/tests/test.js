import proxyFromString from '../index.js';
import {strict as assert} from 'assert';

const testCases = {
    "subdomain.domain.tld:909": {
        ip: "subdomain.domain.tld",
        port: "909",
        user: "",
        pass: ""
    },
    "255.233.111.2:50": {
        ip: "255.233.111.2",
        port: "50",
        user: "",
        pass: ""
    },
    "user:pass:255.233.111.2:50": {
        ip: "255.233.111.2",
        port: "50",
        user: "user",
        pass: "pass"
    },
    "255.233.111.2:50:user:pass": {
        ip: "255.233.111.2",
        port: "50",
        user: "user",
        pass: "pass"
    },
    "255.233.111.2:50@user:pass": {
        ip: "255.233.111.2",
        port: "50",
        user: "user",
        pass: "pass"
    },
    "user:pass@255.233.111.2:50": {
        ip: "255.233.111.2",
        port: "50",
        user: "user",
        pass: "pass"
    },
    "notaproxys:trin:g": {
        ip:"",
        port:0,
        user:"",
        pass:""
    },
    "notaproxystring": {
        ip:"",
        port:0,
        user:"",
        pass:""
    },
    "notaproxys:trin:g:too": {
        ip:"",
        port:0,
        user:"",
        pass:""
    },
    "266.266.266.266:90": {
        ip:"",
        port:0,
        user:"",
        pass:""
    },
    "01.1.1.1:4": {
        ip:"",
        port:0,
        user:"",
        pass:""
    },
    "1.1.1.1:4": {
        ip:"1.1.1.1",
        port:"4",
        user:"",
        pass:""
    }, "176.9.119.170:3128":{
        ip:"176.9.119.170",
        port:"3128",
        user:"",
        pass:""
    }
};


let totalCases = Object.keys(testCases).length;
let passedCases = totalCases;



for (let n in testCases) {
    let testCaseProxy = proxyFromString(n)
    try {
        assert.equal(testCaseProxy.ip, testCases[n].ip, "IP mismatch");
        assert.equal(testCaseProxy.port, testCases[n].port, "PORT mismatch");
        assert.equal(testCaseProxy.user, testCases[n].user, "USER mismatch");
        assert.equal(testCaseProxy.pass, testCases[n].pass, "PASS mismatch");
    } catch(err) {
        console.group()
        console.error(err.message+" @ "+n);
        console.group()
        console.error("actual\t"+err.actual);
        console.error("expected\t"+err.expected);
        console.groupEnd()
        console.groupEnd()
        passedCases--;
    }
    console.log("PASS: "+(testCaseProxy.isValidProxy()?"Valid":"Invalid")+" Proxy-String\t"+n);
}

console.log(`\nPassed\t${passedCases}/${totalCases}`)