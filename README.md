# CryptoTrader

## Project
The CryptoTrader project is a bot written in node.js with the goal of trading assets in the cryptocurrency market.
Currently, the bot trades the bitcoin USD pairing (XBTUSD) and is focused on taking long positions in the larger time frames.

## Architecture
The bot receives the required market data through a websocket stream connected to the kraken exchange.
It then formats the data to the corresponding models for further processing and analysis. The advisor portion
of the bot determmines potential trade orders which are then executed by the trade maker.

The bot currently contains the following services:

* market-data
* data-manager
* exchange
* trading-advisor
* trade-maker

The services are each responsible for different processes to achieve the larger goal of making successful trades.
They are designed to be self-contained and encapsulating of the domain they are assigned to.

## Setup & Installation
First clone the project in the desired folder.
To install the required project node modules run the command:
```
 npm install
```

To run the bot, the correct config values in the .env file must be first setup in the project root.
Then navigate to the project src folder and then run:

```
node app.js
```
