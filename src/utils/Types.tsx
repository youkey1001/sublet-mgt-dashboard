export type List = {
  id: string;
  order: number;
  archive: boolean;
  title: string;
};

export type Card = {
  id: string;
  order: number;
  index: number;
  listId: string | undefined;
  contents: {
    title: string;
    memo: string;
  };
};

export type GroupedList = {
  [k in string]: {
    title: string;
    archive: boolean;
    cards: Card[];
  };
};

export type GroupType = {
  title: string;
  archive: boolean;
  cards: Card[];
}

export type MoveHandler = (dragIndex: number, targetIndex: number, targetListId: string | undefined) => void;

export const ItemTypes = {
  CARD: 'card',
  LIST: 'list'
}