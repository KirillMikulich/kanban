import { Button } from '@chakra-ui/react';
import React from 'react';
import { IShortBoard } from "../../types/boards";
import { useNavigate } from "react-router-dom";

interface IBoardItemProps {
  board: IShortBoard
}

function BoardItem({board}: IBoardItemProps) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(`/boards/${board.id}`);
  }

  return (
    <Button onClick={onClick} marginRight='20px' width='150px' height='100px' colorScheme='green'>
      {board.name}
    </Button>
  );
}

export default BoardItem;