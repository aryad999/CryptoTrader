const request = require('request');
const crypto = require('crypto');
const qs = require('qs');
const KrakenConfig = require('../../../../config').kraken;


const kraken_api_key = KrakenConfig.api_key;
const kraken_secret_api_key = KrakenConfig.secret_api_key;


function createMessageSignature(postParams) {
	const message       = qs.stringify(postParams);
	const secret_buffer = new Buffer(kraken_secret_api_key, 'base64');
	const hash          = new crypto.createHash('sha256');
	const hmac          = new crypto.createHmac('sha512', secret_buffer);
	const hash_digest   = hash.update(nonce + message).digest('binary');
    const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64');
    
    return hmac_digest;
}
