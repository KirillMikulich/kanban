import React from 'react';
import { DraggableProvided } from "react-beautiful-dnd";
import { ITask } from "../../types/tasks";

import { Container, Content } from "../shared/task/item";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";
import { TaskAddContext } from "./Board";
import { Box } from "@chakra-ui/react";

type Props = {
  quote: ITask,
  isDragging: boolean,
  provided: DraggableProvided,
  isClone?: boolean,
  isGroupedOver?: boolean,
  index: number,
  deleteTask: Function
};

export const TaskItem: React.FC<Props> = ({quote, isDragging, provided, isClone, isGroupedOver, index, deleteTask}) => {
  const openWindow = React.useContext(TaskAddContext);

  return (
    <Container isDragging={isDragging}
               isGroupedOver={isGroupedOver}
               isClone={isClone}
               colors={''}
               ref={provided.innerRef}
               {...provided.draggableProps}
               {...provided.dragHandleProps}
               style={provided.draggableProps.style}
               data-is-dragging={isDragging}
               data-testid={quote.id}
               data-index={index}
               aria-label={`${'quote.author.name'} quote ${'quote.content'}`}>
      <Content>
        <div>
          {quote.name}
        </div>
        <Box>
          <DeleteIcon onClick={e => deleteTask(quote.id)} marginRight='5px'/>
          <HamburgerIcon onClick={e => openWindow(quote)}/>
        </Box>
      </Content>
    </Container>
  );
}