import { IUser } from "./users";
import { IColumn } from "./columns";

export interface IShortBoard {
  id: string,
  name: string,
  creator: IUser
}

export interface IBoard extends IShortBoard {
  id: string,
  name: string,
  creator: IUser
  participants: IUser[],
  columns: IColumn[],
}