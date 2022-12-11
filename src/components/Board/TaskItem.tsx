import React from 'react';
import { DraggableProvided } from "react-beautiful-dnd";
import { ITask } from "../../types/tasks";

import { Container, Content } from "../shared/task/item";

type Props = {
  quote: ITask,
  isDragging: boolean,
  provided: DraggableProvided,
  isClone?: boolean,
  isGroupedOver?: boolean,
  index: number,
};

export const TaskItem: React.FC<Props> = ({quote, isDragging, provided, isClone, isGroupedOver, index}) => {
  return (
    <Container href={''}
               isDragging={isDragging}
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
        {quote.name}
        {quote.description}
      </Content>
    </Container>
  );
}