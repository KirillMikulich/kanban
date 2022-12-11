import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { ITask } from "../../types/tasks";

import { Container, Header, Title} from "../shared/column";
import { TaskList } from "./TaskList";

type Props = {
  index: number,
  title: string,
  id: string,
  tasks: ITask[]
}

export const Column: React.FC<Props> = ({index,title, tasks, id}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title isDragging={snapshot.isDragging}
                   {...provided.dragHandleProps}
                   aria-label={`${title} quote list`} >
              {title}
            </Title>
          </Header>

          <TaskList listId={id}
                    listType="TASK"
                    style={{ backgroundColor: 'rgba(235, 236, 240, 100%)' }}
                    tasks={tasks}/>
        </Container>
      )}
    </Draggable >
  );
}