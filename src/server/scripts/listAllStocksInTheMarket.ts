import {
    ListAllStocksInTheMarketFromMoneyControl
} from "../infrastructure/external apis/money control/ListAllStocksInTheMarketFromMoneyControl.ts";


const vendorName = 'Money Control';
const listAllStocksInstance = new ListAllStocksInTheMarketFromMoneyControl();

listAllStocksInstance.ListAllStocksInTheMarket(vendorName)
    .then((result) => {
    })
    .catch((error) => {
        console.error('Error:', error);
    });