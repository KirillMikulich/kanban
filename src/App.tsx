import React from 'react';
import { Login } from "./pages/Login/Login";
import { Box } from "@chakra-ui/react";
import { refreshToken } from "./api";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { updateUserInfo } from "./store/slices/user";
import { Index } from './pages/layout/Index';

function App() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    loginUser().then();
  });

  const loginUser = async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const user = await refreshToken();
        dispatch(updateUserInfo(user));
      } catch (e) {
        navigate('/login');
      }
    }
  }

  return (
    <Box width="100%" height="100vh" >
      <Routes>
        <Route path="/" element={<Index/>}>
        </Route>
        <Route  path="/login" element={<Login/>}></Route>
      </Routes>
    </Box>
  );
}

export default App;
