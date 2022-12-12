import React from 'react';
import { ITask } from "../../types/tasks";
import {
  Box,
  Button, Input, Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Select
} from "@chakra-ui/react";
import { IUser } from "../../types/users";

interface IModalProps  {
  task: ITask | null,
  isOpen: boolean,
  onClose: any,
  onSave: any,
  columnId: string | null,
  assignee: IUser[] | undefined
}

export const CustomModal: React.FC<IModalProps> = ({task, onClose, isOpen, onSave, columnId, assignee }) => {

  const [saveTask, setSaveTask] = React.useState<ITask>();

  React.useEffect(() => {
    if (task) {
      setSaveTask(task);
    }
    else {
      setSaveTask({id: '', columnId: columnId, index: 0, description: '', name: '', assignee: [], settings: '' });
    }
  }, []);


  const onChange = (e: any) => {
    if  (e.target.name && e.target.value && saveTask)
      setSaveTask({...saveTask, [e.target.name]: e.target.value});
  }

  const onSelectUser = (e: any) => {
    if (e.target.value.length > 0) {
      let user = assignee?.find(item => item.id === e.target.value);
      if (user && saveTask) {
        setSaveTask({...saveTask, assignee: [user]});
      }
    } else {
      if (saveTask)
        setSaveTask({...saveTask, assignee: []});
    }
  }

  const isUserSelected = (userId: string): boolean => {
    let users = task?.assignee?.filter(user => user.id === userId);
    if (users && users.length > 0) return true;
    return false;

  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{ task == null ? 'Добавть новую задачу' : 'Редактировать задачу' }</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Название задачи
              <Input type="text" value={saveTask?.name} name='name' onChange={onChange}/>
            </Box>

            <Box>
              Описание
              <Input type="text" value={saveTask?.description?.toString()} name='description' onChange={onChange}/>
            </Box>

            <Box>
              Ответственный
              <Select onChange={onSelectUser}>
                <option value=''>{''}</option>
                {
                  assignee?.map((item) =>
                    <option value={item.id} selected={isUserSelected(item.id)}>
                      {item.firstName} {item.lastName}
                    </option>)
                }
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Закрыть
            </Button>
            <Button variant='ghost' onClick={e => onSave(saveTask)}>{ task == null ? 'Добавить' : 'Сохранить' }</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}