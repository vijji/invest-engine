export interface SectorRepositoryPort<Entity> {
    insert(entity: Entity | Entity[]): Promise<void>;
}