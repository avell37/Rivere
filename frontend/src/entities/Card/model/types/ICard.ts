export interface ICard {
    id: string;
    title: string;
    description?: string;
    columnId: string;
    createdAt?: Date;
    updatedAt?: Date;
}
