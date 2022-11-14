import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAppSelector } from "../../store/hooks";
import { fetchWithAuth, REQUEST_CONFIG } from "../../api";

export function Index() {
  const user = useAppSelector(({user}) => user);
  const navigate = useNavigate();

  const logOut = async () => {
    await fetchWithAuth('/user/revoke-token', {
      ...REQUEST_CONFIG,
      method: 'POST',
      data: {token: null}
    });
    localStorage.removeItem('token');
    navigate('/login');
  }

  const boardHandle = () => {
      navigate('/boards');
  }

  return (
    <Box>
      <Box height="auto"
           boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
           display="flex"
           padding="10px 20px"
           justifyContent="space-between">
        <Button colorScheme='green' onClick={boardHandle}>Мои доски</Button>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            {user.firstName} {user.lastName}
          </MenuButton>
          <MenuList>
            <MenuItem>Профиль</MenuItem>
            <MenuItem onClick={boardHandle}>Доски</MenuItem>
            <MenuItem onClick={logOut}>Выйти</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <Outlet/>
    </Box>
  )
}