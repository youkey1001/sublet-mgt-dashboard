type Card = {
  id: string;
  text: string;
};

type CardID = string;

type List = {
  id: string;
  title: string;
  cards: Card[];
};

type ListID = string;

type Board = {
  boardId: string;
  lists: List[];
};

type Ids = {
  listID: ListID;
  cardID: CardID;
};

type DragHappened = {
  draggableId: string;
  droppableIdEnd: string;
  droppableIdStart: string;
  droppableIndexEnd: number;
  droppableIndexStart: number;
  type: string;
};

// draggableId: 0
// droppableIdEnd: 0
// droppableIdStart: 1
// droppableIndexEnd: 0
// droppableIndexStart: 625a3c02ebe60beec8c8ca22
// type: DEFAULT

// draggableId: "625a3c02ebe60beec8c8ca22"
// droppableIdEnd: "0"
// droppableIdStart: "625a3885ebe60beec8c8ca21"
// droppableIndexEnd: 0
// droppableIndexStart: 0
// type: "DEFAULT"

// draggableId: "all-lists"
// droppableIdEnd: "all-lists"
// droppableIdStart: "1"
// droppableIndexEnd: 0
// droppableIndexStart: 0
// type: "list"

type ListProps = {
  title: string;
  listID: string;
  cards: Card[];
  index: number;
};

type CardProps = {
  text: string;
  id: string;
  index: number;
  listID: string;
};
