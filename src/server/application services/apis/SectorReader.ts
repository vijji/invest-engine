export interface SectorReader<SectorModelEntity> {
    read(): Promise<SectorModelEntity[]>;
}