import { Box } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import React from "react";
import { IShortBoard } from "../../types/boards";
import { fetchWithAuth, REQUEST_CONFIG } from "../../api";

export function Boards() {
  const user = useAppSelector(({user}) => user);
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
    <Box>
      {
        boards?.length && boards.map((board) => <div key={board.id}>
          {board.id} {board.name}
        </div>)
      }
    </Box>
  );
}