import { Box } from "@chakra-ui/react";
import { useAppSelector } from "../../store/hooks";
import React from "react";
import { IShortBoard } from "../../types/boards";
import { fetchWithAuth, REQUEST_CONFIG } from "../../api";

export function Boards() {
  const user = useAppSelector(({user}) => user);
  const [boards, setBoards] = React.useState<IShortBoard[]>([]);

  React.useEffect(() => {
    getShortBoards();
  });

  const getShortBoards = async () => {
    const response: any = await fetchWithAuth('/board/get-boards-by-user', {
      ...REQUEST_CONFIG,
      method: 'GET'
    });

    if (response.data) {
      setBoards(response.data);
    }
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