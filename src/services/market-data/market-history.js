const request = require('request');
const headerBase = {
    userAgent: "kraken api",
    contentType: "application/x-www-form-urlencoded"
}

/**
 * 
 * @param {*} pair currency pair 
 * @param {*} interval minutes
 */
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
                //console.log(`body: ${JSON.stringify(body)}`);
                const returnresponse = JSON.parse(body);
                console.log(returnresponse);
                console.log(returnresponse.result['XXBTZCAD']);
            
                resolve(returnresponse);

            }
        });
    });

}

ohlc("xbtcad", 21600)