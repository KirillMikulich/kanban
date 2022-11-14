import { IUser } from "./users";

export interface ITask {
  id: string,
  columnId: string | null,
  name: string,
  index: number,
  description: string | null,
  settings: string,
  assignee: IUser[],
}