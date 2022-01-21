# ProxyParse



Parses Proxy-Strings of the following formats

- ip:port:user:pass
- ip:port@user:pass
- user:pass:ip:port
- user:pass@ip:port
- ip:port

and provides an Object to access proxy properties.

## Dependencies



The only dependency is axios :)

## Usage


Input:

    var proxyObject = proxyFromString("ip:port@user:pass");
    
Result:

    HTTPSProxy {
    _authRequired: false,
    _ip: '',
    _port: 0,
    _user: '',
    _pass: '',
    _protocol: 'HTTPS://'
    }

Input:

    var proxyObject = proxyFromString("113.28.90.67:9480");

Result:

    HTTPSProxy {
    _authRequired: false,
    _ip: '113.28.90.67',
    _port: '9480',
    _user: '',
    _pass: '',
    _protocol: 'HTTPS://'
    }

## Additional functionality



### getGeolocation()

    await proxyObject.getGeolocation()

Result:

    {
    status: 'success',
    countryCode: 'MX',
    city: 'San Luis Potosí City',
    zip: '78421',
    isp: 'Television Internacional, S.A. de C.V.',
    org: 'Television Internacional, S.A. de C.V',
    proxy: false,
    query: '200.188.153.52'
    }

Query value equals proxy address and proxy value indicates anonymity

### rtt(url)

    await proxyObject.rtt("https://www.google.com")

Result:

    { virginTime: 150, tunneledTime: 152.33333333333334 }

Output is the RTT average across 3 connections via axios to the target url, good for benchmarking Proxies for your usecase.

virginTime -> not tunneled  
tunneledTime -> tunneled via proxy

### authHeaderValue Property

    proxyObject.authHeaderValue

Returns value for **Authorization Header** (base64 encoded user:pass)  
Example:

    Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

