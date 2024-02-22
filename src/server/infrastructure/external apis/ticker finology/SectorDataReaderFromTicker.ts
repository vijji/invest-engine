import {SectorModelEntity} from "../../../application services/data Models/types";
import {SectorReader} from "../../../application services/apis/SectorReader.ts";
import {htmlParser} from "../../../modules/htmlParser.js";
import {parse} from "node-html-parser";


const url = "https://ticker.finology.in/sector";
export class SectorDataReaderFromTicker implements SectorReader<SectorModelEntity>{
    read(): Promise<SectorModelEntity[]> {
        return this.dataFetcher()
    }

    // @ts-ignore
    async dataFetcher(): Promise<SectorModelEntity[]> {
        try {
            const data = await htmlParser(url)
            const root = parse(data)
            let output: SectorModelEntity[] = [];
            const sectorNode = root.getElementsByTagName("h4")
            if (sectorNode)
            {
                // @ts-ignore
                sectorNode.forEach((val: any, index: number) => {
                    //console.log(val.childNodes.toString(), typeof val.childNodes);
                    output.push({name: val.childNodes.toString().trim()})
                })
            }

            return output;
        } catch (error) {
            console.error(error)
        }
    }
    
}