import {listAllStocksByAVendor} from "../../application services/data Models/types.ts";

export interface ListAllStocksInTheMarketByVendor {
    ListAllStocksInTheMarket(vendorName: string): Promise<listAllStocksByAVendor>;
}