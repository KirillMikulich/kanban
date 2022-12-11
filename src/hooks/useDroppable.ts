import { IColumn } from "../types/columns";
import { DropResult } from "react-beautiful-dnd";

enum DropType {
  Column = 'COLUMN',
  Task = 'TASK',
}

export const useDroppable = (data: IColumn[], setColumns: any): [(result: DropResult) => void] => {
  const _columns = data;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    const startIndex = source.index;
    const endIndex = destination?.index;

    if (type === DropType.Column) {
      if(endIndex !== undefined) {
        const columns = sortInList(_columns, startIndex, endIndex);
        setColumns(columns);
      }
    }

    if (type === DropType.Task) {
      if (source.droppableId === destination?.droppableId) {
        const columns = [..._columns];
        const column = columns.find(item => item.id === source.droppableId);

        if (column) {
          column.tasks = sortInList(column.tasks, startIndex, endIndex);
          columns[column.index] = column;

          setColumns(columns);
        }
      } else {
        const columns = [..._columns];
        const startColumnIndex = columns.findIndex(item => item.id === source.droppableId);
        const endColumnIndex = columns.findIndex(item => item.id === destination?.droppableId);

        if (startColumnIndex > -1 && endColumnIndex > -1) {

          const startColumn = columns[startColumnIndex];
          const endColumn = columns[endColumnIndex];

          const item = startColumn.tasks[source.index];

          startColumn.tasks = removeInList(startColumn.tasks, source.index);

          endColumn.tasks = insertInList(endColumn.tasks, destination?.index, item);

          columns[startColumnIndex] = startColumn;
          columns[endColumnIndex] = endColumn;

          setColumns(columns);
        }
      }
    }
  };

  const sortInList = (list: any[], index: any, dropIndex: any): any => {
    const _list = [...list];

    const item = _list[index];

    _list.splice(index, 1);

    _list.splice(dropIndex, 0, item);

    return _list.map((item: any, index: number) => {
      item.index = index;
      return item;
    });
  }

  const insertInList = (list: any[], dropIndex: any, item: any): any => {
    const _list = [...list];

    _list.splice(dropIndex, 0, item);

    return _list.map((item: any, index: number) => {
      item.index = index;
      return item;
    });
  }

  const removeInList = (list: any[], index: any): any => {
    const _list = [...list];

    _list.splice(index, 1);

    return _list.map((item: any, index: number) => {
      item.index = index;
      return item;
    });
  }

  return [onDragEnd];
}