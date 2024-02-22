import {ModelStock} from "../../application services/data Models/types.ts";

export interface ListStocks {
    list(htmlNodeData: string): ModelStock[];
}