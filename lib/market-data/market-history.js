const request = require('request');


let bodyJSON = {
    "pair": "XBTCAD"
}
let headersJSON = {
    "Api-Key": "",
    "Api-Sign": "",
    "User-Agent": "kraken api",
    "Content-Type" : "application/x-www-form-urlencoded"
}
let options = {
    url: "https://api.kraken.com/0/public/OHLC",
    method: 'GET',
    headers: headersJSON,
    qs: {pair: "xbtcad"}
}

function callback(error, response, body) {
    if (error) {
        console.log(`error: ${error}`)
    }
    else {
        console.log(`body: ${JSON.stringify(body)}`);
    }
}

request(options, callback);