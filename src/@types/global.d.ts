type Card = {
  id: string;
  text: string;
};

type List = {
  id: string;
  title: string;
  cards: Card[];
};

type Board = {
  boardId: string;
  lists: List[];
};

type DragHappened = {
  draggableId: string;
  droppableIdEnd: string;
  droppableIdStart: string;
  droppableIndexEnd: number;
  droppableIndexStart: number;
  type: string;
};

// draggableId: "625a3c02ebe60beec8c8ca22"
// droppableIdEnd: "0"
// droppableIdStart: "625a3885ebe60beec8c8ca21"
// droppableIndexEnd: 0
// droppableIndexStart: 0
// type: "DEFAULT"
