import { IBoardMember } from "./IBoardMember";

export interface IBoard {
    id: string;
    title: string;
    background: string;
    members: IBoardMember[];
    createdAt?: Date;
    updatedAt?: Date;
}
