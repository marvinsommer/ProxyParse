import HTTPSProxy from './proxy/HTTPSProxy.js';

export default function proxyFromString(proxyString) {
    let splitComponents = splitOnSeparators(proxyString);

    if (isNonCredentialProxy(splitComponents)) {
        return isAddressOrIP(splitComponents[0])
            ? new HTTPSProxy({ip: splitComponents[0], port: splitComponents[1]})
            : new HTTPSProxy({});
    }

    if (splitComponents.length != 4) {
        return new HTTPSProxy({});
    }

    let indexMap = isAddressOrIP(splitComponents[0]) ? componentIndexMap.SERVER_AUTH : componentIndexMap.AUTH_SERVER;
    return indexMap == componentIndexMap.SERVER_AUTH || isAddressOrIP(splitComponents[2])
        ? new HTTPSProxy
        ({
             ip: splitComponents[indexMap.ip],
             port: splitComponents[indexMap.port],
             user: splitComponents[indexMap.user],
             pass: splitComponents[indexMap.pass]
         })
        : new HTTPSProxy({});
}

const componentIndexMap = {
    AUTH_SERVER: {
        user: 0,
        pass: 1,
        ip: 2,
        port: 3
    },
    SERVER_AUTH: {
        user: 2,
        pass: 3,
        ip: 0,
        port: 1
    }
}

function splitOnSeparators(proxyString) {
    return proxyString
        .replace("@", ":")
        .split(":");
}

function isNonCredentialProxy(splitComponents) {
    return splitComponents.length == 2;
}

const ipBlockRegex = new RegExp(/^((2[0-4][0-9])|(25[0-9])|(1[0-9]{2})|([1-9]?[0-9]))$/);

function isIPv4(splitComponent) {
    let ipBlocks = splitComponent.split(".");
    return ipBlocks.length == 4 && ipBlocks.every((block) => ipBlockRegex.test(block));
}

const addressRegex = new RegExp(/^[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,24}?$/);

function isAddress(splitComponent) {
    return addressRegex.test(splitComponent);
}

function isAddressOrIP(splitComponent) {
    return isIPv4(splitComponent) || isAddress(splitComponent);
}

