import {writeJson} from "../modules/writeJson.ts";
import {SectorReader} from "../application services/apis/SectorReader.ts";
import {SectorDataReaderFromMoneyControl} from "../infrastructure/external apis/money control/SectorDataReaderFromMoneyControl.ts";
import {SectorDataReaderFromTicker} from "../infrastructure/external apis/ticker finology/SectorDataReaderFromTicker.ts";

export class FetchSectorData
{
    private sectorReader: SectorReader<any>;
    constructor(sectorReader: SectorReader<any>)
    {
        this.sectorReader = sectorReader
    }

    fetchData(path?: string): void
    {
        this.sectorReader.read().then((res) => {
            if (path) {
                writeJson(path, JSON.stringify(res));
            }
            console.log(res, 'Data fetched !!');
        })
    }
}

let path = './src/data/sectorByMoneyControl.json';
const fetch = new FetchSectorData(new SectorDataReaderFromMoneyControl())
fetch.fetchData(path);

path = './src/data/sectorByTicker.json';
const fetch1 = new FetchSectorData(new SectorDataReaderFromTicker())
fetch1.fetchData(path);