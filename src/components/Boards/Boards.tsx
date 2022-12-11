import { Box } from "@chakra-ui/react";
import React from "react";
import { IShortBoard } from "../../types/boards";
import { fetchWithAuth, REQUEST_CONFIG } from "../../api";
import BoardItem from "../BoardItem/BoardItem";

export function Boards() {
  const [boards, setBoards] = React.useState<IShortBoard[]>([]);

  React.useEffect(() => {
    getShortBoards().then((res: any) => {
      if (res.data) {
        setBoards(res.data);
      }
    })
  }, []);

  const getShortBoards = () => {
    return fetchWithAuth('/board/get-boards-by-user', {
      ...REQUEST_CONFIG,
      method: 'GET'
    });
  }


  return (
    <Box display='flex' flexDirection='row' width='100%' height='100%' flexWrap='wrap' padding='20px'>
      {
        boards?.length && boards.map((board) => <BoardItem key={board.id} board={board} />)
      }
    </Box>
  );
}