import {ListStocks} from "../../../application services/apis/ListStocks";

import {ModelStock} from "../../../application services/data Models/types.ts";

export class ListStocksBySector implements ListStocks {
    list(htmlNodeData: string): ModelStock[] {

        return [];
    }

}

const url = 'https://www.moneycontrol.com/stocks/sectors/consumer-goods-electronic.html';