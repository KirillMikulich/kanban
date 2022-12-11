import React from 'react';
import { IUser } from "../../../types/users";
import { Box, Button, Heading, Input, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { fetchWithAuth, REQUEST_CONFIG } from "../../../api";

interface IUsersProps {
  users: IUser[],
  addUser: Function,
  deleteUser: Function
}

export const Users: React.FC<IUsersProps> = ({users, deleteUser, addUser}) => {

  const [email, setEmail] = React.useState<string>('');

  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const onDeleteClick = (id: string) => {
    deleteUser(id);
  }

  const onAddClick = () => {
      if (expression.test(email)) {
        addUser(email);
        setEmail('');
      } else {
        alert('Проверьте email');
      }
  }

  return (
    <Box>
      <Box display='flex'
           flexDirection='row'
           boxShadow='0px 0px 10px rgba(0, 0, 0, 0.2)'
           padding='10px'
           borderRadius='10px'>
        {
          users && users.map((user) => (
            <Tag size='lg'
                 key={user.id}
                 borderRadius='full'
                 variant='solid'
                 margin='2px'
                 colorScheme='green'>
              <TagLabel>{user.firstName} {user.lastName}</TagLabel>
              <TagCloseButton  onClick={() => onDeleteClick(user.id)}/>
            </Tag>
          ))
        }

        <Input variant='outline'
               value={email}
               onChange={e => setEmail(e.target.value)}
               marginLeft='10px'
               width='300px'
               type='email'
               placeholder='Добавить пользователя по email' />
        <Button marginLeft='10px' onClick={onAddClick}>Добавить</Button>
      </Box>
    </Box>
  );
}