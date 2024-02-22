import { SectorRepositoryPort } from '../../application services/ports/sector.repository.port'
import {SectorEntity} from "../../application services/data Models/types.ts";


export class SectorRepository implements SectorRepositoryPort<SectorEntity>
{
    insert(entity: SectorEntity | SectorEntity[]): Promise<void> {
        return Promise.resolve(undefined);
    }

}