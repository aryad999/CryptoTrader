require('dotenv').config({ path: '../../../../.env' });
const logger = require('../../../../utils/logger').getLogger();
const request = require('request');
const crypto = require('crypto');
const qs = require('qs');
const KrakenConfig = require('../../../../config').kraken;

const kraken_api_key = KrakenConfig.api_key;
const kraken_secret_api_key = KrakenConfig.secret_api_key;
const kraken_api_url = KrakenConfig.api_url;
const kraken_api_version = KrakenConfig.api_version;

/**
 * kraken api private methods need to use a api-sign value in the POST body
 * based on the following function
 * @param {string} path 
 * @param {object} postData 
 * @param {number} nonce 
 */
function createMessageSignature(path, postData, nonce) {
	const message = qs.stringify(postData); //POST data as string
	const secret_buffer = new Buffer.from(kraken_secret_api_key, 'base64');
	const hash = new crypto.createHash('sha256');
	const hmac = new crypto.createHmac('sha512', secret_buffer); // base64 decoded secret
	const hash_digest = hash.update(nonce + message).digest('binary'); // SHA256(nonce + POST data)
	const hmac_digest = hmac.update(path + hash_digest, 'binary').digest('base64'); //HMAC sha512 of results

	return hmac_digest;
}

function getAccountBalance() {
	let uri = '/' + kraken_api_version + '/private/Balance';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
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

function getOpenOrders() {
	let uri = '/' + kraken_api_version + '/private/OpenOrders';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
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

function getClosedOrders() {
	let uri = '/' + kraken_api_version + '/private/ClosedOrders';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
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

function queryOrdersInfo(transactionIDs) {
	let uri = '/' + kraken_api_version + '/private/QueryOrders';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		txid: transactionIDs.join(),
		nonce: nonce
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
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

function getTradesHistory() {
	let uri = '/' + kraken_api_version + '/private/TradesHistory';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
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

function getOpenPositions() {
	let uri = '/' + kraken_api_version + '/private/OpenPositions';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
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


function addStandardOrder(tradeOrder) {
	logger.warn('addStandardOrder');
	logger.warn(tradeOrder)
	let uri = '/' + kraken_api_version + '/private/AddOrder';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce,
		pair: tradeOrder.currencyPair,
		type: tradeOrder.action,
		ordertype: tradeOrder.type,
		volume: tradeOrder.volume
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
	}

	logger.info(options);
	return new Promise((resolve, reject) => {
		request(options, (err, response, body) => {
			if (err) {
				console.log(`error: ${err}`)
				reject(err);
			}
			else {
				const returnresponse = JSON.parse(body);
				logger.info(returnresponse);
				resolve(returnresponse);

			}
		});
	});

}

function cancelOpenOrder(txid) {
	let uri = '/' + kraken_api_version + '/private/Balance';
	let url = kraken_api_url + uri;

	let nonce = (new Date() * 1000);
	let postData = {
		nonce: nonce,
		txid: txid
	};

	let headersJSON = {
		'API-Key': kraken_api_key,
		'API-Sign': createMessageSignature(uri, postData, nonce)
	}

	let options = {
		url: url,
		method: 'POST',
		headers: headersJSON,
		body: qs.stringify(postData)
	}
	logger.info(options);
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

module.exports.getAccountBalance = getAccountBalance;
module.exports.getOpenOrders = getOpenOrders;
module.exports.getClosedOrders = getClosedOrders;
module.exports.queryOrdersInfo = queryOrdersInfo;
module.exports.getTradesHistory = getTradesHistory;
module.exports.getOpenPositions = getOpenPositions;
module.exports.addStandardOrder = addStandardOrder;
module.exports.cancelOpenOrder = cancelOpenOrder;


