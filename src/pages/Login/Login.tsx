import React from 'react';

//chakra-ui
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text
} from '@chakra-ui/react'
import axios from "axios";
import { API_URL } from "../../api";
import { useAppDispatch } from "../../store/hooks";
import { updateUserInfo } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";


export const Login: React.FC = () => {
  const [show, setShow] = React.useState(false);
  const [login, setLogin] = React.useState('');
  const [password, setPassword] = React.useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const onSubmit = async () => {
    const response = await axios(`${API_URL}/user/authenticate`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      data: { email: login, password: password }
    });

    if (response.status === 200) {
      const user = response.data;

      localStorage.setItem('token', user.jwtToken);
      dispatch(updateUserInfo(user));
      navigate('/');
    }

  }

  return (
    <Box alignItems="center" height="100%" display="flex" verticalAlign="middle">
      <Box width="400px" height="auto" padding="20px" mx="auto" borderRadius="10px" boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)">
        <Text fontSize="32" width="100%" textAlign="center">Вход</Text>

        <FormControl>
          <FormLabel>Логин</FormLabel>
          <Input type='email' onChange={e => setLogin(e.target.value)}/>
          <FormHelperText>Пример - example@mail.com</FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel>Пароль</FormLabel>
          <InputGroup>
            <Input onChange={e => setPassword(e.target.value)} type={show ? 'text' : 'password'} />
            <InputRightElement width='4.5rem'>
              <Button h='2rem' size='sm' marginRight="5px" onClick={handleClick}>
                {show ? 'Скрыть' : 'Показать'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button marginTop="10px" width="100%" onClick={onSubmit}>Войти</Button>
      </Box>
    </Box>
  );
}