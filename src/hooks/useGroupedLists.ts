import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Card, List, GroupedList } from "utils/Types";

type UseGroupedList = () => [
  GroupedList,
  List[],
  Dispatch<SetStateAction<List[]>>,
  Dispatch<SetStateAction<Card[]>>
];

const useGroupedLists: UseGroupedList = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [lists, setLists] = useState<List[]>([]);
  const [groupedLists, setGroupedLists] = useState<GroupedList>({});
  useEffect(() => {
    setGroupedLists(
      lists.reduce<GroupedList>((acc, current) => {
        const group = current.id;
        acc[group] = {
          title: current.title,
          archive: current.archive,
          cards: cards.filter((v) => v.listId === group),
        };
        return acc;
      }, {})
    );
  }, [lists, cards]);
  return [groupedLists, lists, setLists, setCards];
};

export default useGroupedLists;
