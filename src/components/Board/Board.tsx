import React from 'react';
import { Box } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { fetchWithAuth, REQUEST_CONFIG } from "../../api";
import { IBoard } from "../../types/boards";
import { useAppSelector } from "../../store/hooks";
import { Users } from "./Users/Users";
import { DragDropContext, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { IColumn } from "../../types/columns";
import { useDroppable } from "../../hooks/useDroppable";
import { Container, ParentContainer } from "../shared/board";
import { Column } from "./Column";

export const Board: React.FC = () => {
  const user = useAppSelector(({user}) => user);
  const [board, setBoard] = React.useState<IBoard>();

  const [_columns, setColumns] = React.useState<IColumn[]>([]);
  const [onDragEnd] = useDroppable(_columns, setColumns);

  const params = useParams();
  const id = params.id;

  React.useEffect(() => {
    loadBoard();
  }, [id]);

  React.useEffect(() => {
    if (board)
      setColumns(board.columns);
  }, [board]);

  const loadBoard = () => {
    fetchWithAuth(`/board/get-board-by-id?board-id=${id}`, {
      ...REQUEST_CONFIG,
      method: 'GET'
    }).then((res: any) => {
      if (res.data) {
        setBoard(res.data);
      }
    });
  }

  const addToBoard = (email: string) => {
    fetchWithAuth(`/board/add-user-to-board-email?board-id=${id}&email=${email}`, {
      ...REQUEST_CONFIG,
      method: 'GET'
    }).then((res: any) => {
      loadBoard();
    });
  }

  const deleteUser = (userId: string) => {
    fetchWithAuth(`/board/delete-user-in-board?board-id=${id}&userId=${userId}`, {
      ...REQUEST_CONFIG,
      method: 'GET'
    }).then((res: any) => {
      loadBoard();
    });
  }

  return (
    <Box padding='20px'>
      <Box>
        { board && <Users users={board.participants} addUser={addToBoard} deleteUser={deleteUser}/> }
      </Box>

      <Box padding='20px' height='100vh'>
          <DragDropContext onDragEnd={onDragEnd}>
            <ParentContainer>
              <Droppable droppableId="board"
                         type="COLUMN"
                         ignoreContainerClipping={false}
                         isCombineEnabled={false}
                         direction="horizontal">
                {(provided: DroppableProvided) => (
                  <Container ref={provided.innerRef} {...provided.droppableProps}>
                    {
                      _columns.map((value: IColumn, index: number) =>
                        <Column key={value.id}
                                id={value.id}
                                index={index}
                                title={value.name}
                                tasks={value.tasks} />)
                    }
                    {provided.placeholder}
                  </Container>
                )}
              </Droppable>
            </ParentContainer>
          </DragDropContext>
      </Box>
    </Box>
  );
}