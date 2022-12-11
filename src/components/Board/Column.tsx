import React from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { ITask } from "../../types/tasks";

import { Container, Header, Title} from "../shared/column";
import { TaskList } from "./TaskList";
import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview, Flex,
  IconButton,
  Input,
  useEditableControls
} from '@chakra-ui/react';

type Props = {
  index: number,
  title: string,
  id: string,
  tasks: ITask[],
  deleteColumn: Function,
  saveEditColumnName: Function,

}

export const Column: React.FC<Props> = ({index,title, tasks, id, deleteColumn, saveEditColumnName}) => {
  const [headerTitle, setTitle] = React.useState(title);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();



    return isEditing ? (
      <ButtonGroup justifyContent='center' size='sm' marginLeft='5px' >{/*
        // @ts-ignore */}
        <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()}  />{/*
        // @ts-ignore */}
        <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='center' marginLeft='5px'>{/*
        // @ts-ignore */}
        <IconButton size='sm' icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    )
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
        <Container ref={provided.innerRef} {...provided.draggableProps}>
          <Header isDragging={snapshot.isDragging}>
            <Title isDragging={snapshot.isDragging}
                   {...provided.dragHandleProps}
                   aria-label={`${title} quote list`} >
              <Editable textAlign='center'
                        fontSize='2xl'
                        display='flex'
                        flexDirection='row'
                        alignItems='center'
                        justifyContent='space-between'
                        value={headerTitle}
                        onChange={e => {
                          setTitle(e);
                        }}
                        onSubmit={e => saveEditColumnName(id, headerTitle)}
                        isPreviewFocusable={false} >
                <EditablePreview />
                <Input as={EditableInput} />
                <EditableControls />
              </Editable>
            </Title>
            <DeleteIcon color='gray' marginRight='10px' onClick={e => deleteColumn(id)} cursor='pointer'/>

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