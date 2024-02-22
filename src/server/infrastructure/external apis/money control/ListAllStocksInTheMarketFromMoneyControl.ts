import { ListAllStocksInTheMarketByVendor } from "../../../application services/apis/ListAllStocksInTheMarketByVendor.ts";
import { htmlParser } from "../../../modules/htmlParser.js";
import { parse } from "node-html-parser";
import {listAllStocksByAVendor} from "../../../application services/data Models/types";
import {writeJson} from "../../../modules/writeJson.ts";

export class ListAllStocksInTheMarketFromMoneyControl implements ListAllStocksInTheMarketByVendor {
    async ListAllStocksInTheMarket(vendorName: string): Promise<listAllStocksByAVendor> {
        const data = await this.readDataFromUrl();
        let output = {
            vendorName: vendorName,
            stockDetails: data,
        };

        const path = './src/data/ListAllStocksInTheMarketFromMoneyControl.json'
        // writeJson(path, output)
        return output;
    }

    async readDataFromUrl() {
        const urls = this.buildUrls();
        const dataSet: any = [];
        for (const url of urls) {
            try {
                const data = await htmlParser(url); // Await the parsing result
                const root = parse(data);
                const htmlElements = root.querySelectorAll('.bl_12');
                htmlElements.forEach((element) => {
                    const href = element.getAttribute('href');
                    if (href) {
                        dataSet.push({
                            stockId:href.split('/').pop(),
                            url: href,
                        })
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
        return dataSet;
    }

    private buildUrls(): string[] {
        const baseUrl = 'https://www.moneycontrol.com/india/stockpricequote/';
        const urlsToParse: string[] = [];
        for (let i = 65; i <= 90; i++) {
            urlsToParse.push(baseUrl + String.fromCharCode(i));
        }
        urlsToParse.push(baseUrl + 'others');
        return urlsToParse;
    }
}

