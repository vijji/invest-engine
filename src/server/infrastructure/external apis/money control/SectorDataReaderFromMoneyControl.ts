import {SectorModelEntity} from "../../../application services/data Models/types";
import {SectorReader} from "../../../application services/apis/SectorReader.ts";
import {htmlParser} from "../../../modules/htmlParser.js";
import {parse} from "node-html-parser";

const url = "https://www.moneycontrol.com/india/stockmarket/sector-classification/marketstatistics/nse/agri.html";

export class SectorDataReaderFromMoneyControl implements SectorReader<SectorModelEntity>{
    read(): Promise<SectorModelEntity[]> {
        return this.dataFetcher()
    }

    // @ts-ignore
    async dataFetcher(): Promise<SectorModelEntity[]> {
        try {
            const data = await htmlParser(url)
            const root = parse(data)
            const sectorNode = root.querySelector('.lftmenu')?.structuredText
            // @ts-ignore
            const dataSet = sectorNode.split("\n");
            let output: SectorModelEntity[] = [];
            dataSet.forEach((data) => (
                output.push({name: data.trim()})
            ));

            return output;
        } catch (error) {
            console.error(error)
        }
    }

}
