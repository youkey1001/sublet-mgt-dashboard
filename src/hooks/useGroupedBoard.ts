import { useState, useEffect, Dispatch, SetStateAction } from "react";

type List = {
  id: number;
  cardId: string;
  listId: string;
  contents: {
    title: string;
    memo: string;
  };
};

type Board = {
  id: string;
  archive: boolean;
  title: string;
};

type GroupedBoard = {
  [k in string]: {
    title: string;
    archive: boolean;
    lists: List[];
  };
};

type UseGroupedBoard = (
  lists: List[]
) => [
  GroupedBoard,
  Board[],
  List[],
  Dispatch<SetStateAction<List[]>>,
  Dispatch<SetStateAction<Board[]>>
];

const useGroupedBoard: UseGroupedBoard = (items) => {
  const [lists, setLists] = useState<List[]>(items);
  const [boards, setBoards] = useState<Board[]>([]);
  const [groupedLists, setGroupedLists] = useState<GroupedBoard>({});
  useEffect(() => {
    setGroupedLists(
      boards.reduce<GroupedBoard>((acc, current) => {
        const group = current.id;
        acc[group] = {
          title: current.title,
          archive: current.archive,
          lists: lists.filter((v) => v.listId === group),
        };
        return acc;
      }, {})
    );
  }, [lists, boards]);
  return [groupedLists, boards, lists, setLists, setBoards];
};

export default useGroupedBoard;
