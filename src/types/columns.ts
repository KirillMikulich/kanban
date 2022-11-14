import { ITask } from "./tasks";

export interface IColumn {
  id: string,
  boardId: string | null,
  name: string,
  index: number,
  tasks: ITask[],
}