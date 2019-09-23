const request = require('request');
const headerBase = {
    userAgent: "kraken api",
    contentType: "application/x-www-form-urlencoded"
}

function ohlc(pair, interval) {
    let headersJSON = {
        "User-Agent": headerBase.userAgent,
        "Content-Type": headerBase.contentType
    }
    let options = {
        url: "https://api.kraken.com/0/public/OHLC",
        method: 'GET',
        headers: headersJSON,
        qs: { pair, interval }
    }

    return new Promise((resolve, reject) => {
        request(options, (err, response, body) => {
            if (err) {
                console.log(`error: ${err}`)
                reject(err);
            }
            else {
                const returnresponse = JSON.parse(body);

                resolve(returnresponse);

            }
        });
    });

}

module.exports.ohlc = ohlc;