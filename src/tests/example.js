import proxyFromString from '../index.js';
import axios from "axios";


async function example() {
    let proxyString = await getFreshProxyString();
    console.log("Got the following test Proxy-String:\n" + proxyString);

    let proxyObject = proxyFromString(proxyString);

    console.log("Resulting in Object:")
    console.log(proxyObject)

    console.log("RTT to Google.com")
    console.log(await proxyObject.rtt("https://www.google.com"))

    console.log("Geolocation")
    console.log(await proxyObject.getGeolocation())
}

// example may break if proxyscan.io discontinues service
const proxyAPIURL = "https://www.proxyscan.io/api/proxy?type=http,https&format=json";

async function getFreshProxyString() {
    let responseData = (await axios.get(proxyAPIURL, {responseType: 'json'})).data[0];
    return responseData.Ip + ":" + responseData.Port;
}

example().then(r => console.log("Example finished"));