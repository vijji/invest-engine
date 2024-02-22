import { htmlParser } from "../../../modules/htmlParser.js";
import { parse } from "node-html-parser";
import axios from "axios";
import {listAllStocksByAVendor} from "../../../application services/data Models/types";
import {writeJson} from "../../../modules/writeJson.ts";
import {StockPerformance} from "../../../application services/apis/StockPerformance.ts";
import {readJson} from "../../../modules/readJson.ts";

export class StockPerformanceMoneyControl implements StockPerformance {
    performanceMetric = 50.00

    stockIdSelector = 'stockName'
    priceIdSelector = 'nsespotval'

    async listStocksByOneToThreePerformanceMetric() {
        try {
            const data = await this.readDataFromFlatFile();
            const path = './src/data/StockPerformanceMoneyControl.json';
            await writeJson(path, data); // Await the write operation
            console.log('Data has been written to file successfully.');
        } catch (error) {
            console.error('Error writing data to file:', error);
        }
    }
    async readDataFromFlatFile() {
        const urls = await this.buildUrls();
        const dataSet: any = [];

        // Execute HTML parsing and API requests in parallel
        await Promise.all(urls.map(async (url) => {
            try {
                const data = await htmlParser(url);
                const root = parse(data);
                const output = await this.buildDataSetFromRoot(root);
                if (output != null) {
                    dataSet.push(output);
                }
            } catch (error) {
                console.error('Error parsing HTML:', error);
            }
        }));

        return dataSet;
    }

    private async buildUrls(): Promise<string[]> {
        const localPath = './src/data/ListAllStocksInTheMarketFromMoneyControl.json';
        const contents: any = await readJson(localPath)
        const urlsToParse: string[] = []
        if (contents) {
            contents.stockDetails.forEach((stock: any) => {
                urlsToParse.push(stock.url)
            })
        }
        return urlsToParse;
    }

    private async buildDataSetFromRoot(rootHtmlNode: any): Promise<any> {
        // stock name
        const stockNameNode = rootHtmlNode.getElementById(this.stockIdSelector);
        const priceNode = rootHtmlNode.getElementById(this.priceIdSelector);
        const priceApiSelector = rootHtmlNode.getElementById('scid');

        if (!stockNameNode || !priceNode || !priceApiSelector) {
            // Return null if any of the required elements are missing
            return null;
        }

        const [name, sector] = stockNameNode.rawText.split('Sector:');
        const stockName = name.trim();
        const stockSector = sector.trim();
        const stockPrice = priceNode.getAttribute('value').trim();
        const apiParam = priceApiSelector.getAttribute('value');

        const priceVolume = await this.buildPriceAndVolumeFromApi(apiParam);

        if (!priceVolume || priceVolume == null) {
            // Return null if priceVolume is null or undefined
            return null;
        }

        return {
            stockName: stockName,
            sectorName: stockSector,
            currentMarketValue: stockPrice,
            priceVolume
        };
    }


    async buildPriceAndVolumeFromApi(scid: string): Promise<any> {
        const url = 'https://api.moneycontrol.com/mcapi/v1/stock/price-volume'
        const str = '--';
        const bigIntValue = str === '--' ? BigInt(0) : BigInt(str);
        try {
            const response = await axios.get(`https://api.moneycontrol.com/mcapi/v1/stock/price-volume?scId=${scid}`);
            if (response.data.success == 1){
                const priceObject = response.data.data.stock_price_volume_data.price
                const volumeObject = response.data.data.stock_price_volume_data.volume
                if (priceObject && volumeObject) {
                    // parsing price
                    const ytd = priceObject['YTD'] === str ? 0 : priceObject['YTD']
                    const oneYear = priceObject['1 Year'] === str ? 0 : priceObject['1 Year']
                    const threeYear = priceObject['3 Years'] === str ? 0 : priceObject['3 Years']

                    if (oneYear > this.performanceMetric && threeYear > this.performanceMetric) {
                        // parsing volume
                        const oneMonthTraded = volumeObject['1 Month Avg']['cvol']
                        const oneMonthDelivery = volumeObject['1 Month Avg']['delivery']

                            return {
                                priceHistory: {
                                    ytd: ytd,
                                    oneYear: oneYear,
                                    threeYear: threeYear,
                                },
                                volumeHistory: {
                                    oneMonthTraded: oneMonthTraded,
                                    oneMonthDelivery: oneMonthDelivery,
                                }
                            }
                      }
                    else {
                        return null;
                    }
                }
                else {
                    return null;
                }
                return null;
            }
        } catch (error: any) {
            // Handle error
            console.error('Error fetching data:', error.message);
            throw error;
        }

    }
}

