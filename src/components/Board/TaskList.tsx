import React from 'react';
import { ITask } from "../../types/tasks";
import {
  Draggable,
  DraggableProvided, DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot
} from "react-beautiful-dnd";

import { Container, DropZone, Wrapper } from "../shared/task";
import { Title } from "../shared/column";
import { TaskItem } from "./TaskItem";


type Props = {
  listId: string,
  listType: string,
  tasks: ITask[]
  style: Object,
};

type InnerListProps = {
  dropProvided: DroppableProvided,
  quotes: ITask[],
  title: string | null,
};

type TaskListProps = {
  quotes: ITask[],
};

const InnerTaskList = React.memo(function InnerTaskList(props: TaskListProps): any {
  return props.quotes.map((quote: ITask, index: number) => (
    <Draggable key={quote.id} draggableId={quote.id} index={index}>
      {(
        dragProvided: DraggableProvided,
        dragSnapshot: DraggableStateSnapshot,
      ) => (
        <TaskItem
          key={quote.id}
          quote={quote}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
          provided={dragProvided}
          index={quote.index}
        />
      )}
    </Draggable>
  ));
});

function InnerList(props: InnerListProps) {
  const { quotes, dropProvided } = props;
  const title = props.title ? <Title isDragging={true}>{props.title}</Title> : null;

  return (
    <Container>
      {title}
      <DropZone ref={dropProvided.innerRef}>
        <InnerTaskList quotes={quotes} />
        {dropProvided.placeholder}
      </DropZone>
    </Container>
  );
}

export const TaskList: React.FC<Props> = ({listId,
                                            listType,
                                            tasks,
                                            style}) => {
  return (
    <Droppable droppableId={listId}
               type={listType}
               ignoreContainerClipping={false}
               isDropDisabled={false}
               isCombineEnabled={true}>
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot,
      ) => (
        <Wrapper style={style}
                 isDraggingOver={dropSnapshot.isDraggingOver}
                 isDropDisabled={false}
                 isDraggingFrom={Boolean(dropSnapshot.draggingFromThisWith)}
                 {...dropProvided.droppableProps}>
          <InnerList quotes={tasks}
                     title={''}
                     dropProvided={dropProvided}/>
        </Wrapper>
      )}
    </Droppable>
  );
}