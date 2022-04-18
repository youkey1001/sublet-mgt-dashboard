import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ObjectID } from "bson";
import { rtdb, auth } from "../firebase";
import { AppDispatch } from "../app/store";

const newID = () => new ObjectID().toHexString();

const initialState: Board = {
  boardId: newID(),
  lists: [],
};

export const updateBoard = (board: Board) => async (dispatch: AppDispatch) => {
  const user = auth.currentUser;
  if (!user) {
    dispatch(updateBoardError());
  } else {
    dispatch(requestUpdateBoard());
    rtdb
      .ref("/board/")
      .child(board.boardId)
      .set(board)
      .then(() => {
        dispatch(receiveUpdatedBoard());
      })
      .catch((err) => {
        dispatch(updateBoardError());
      });
  }
};

export const loadBoard = (uid: string) => async (dispatch: AppDispatch) => {
  dispatch(requestBoard());
  rtdb
    .ref("/board/" + uid)
    .once("value", (snapshot) => {
      const board = {
        boardId: snapshot.val().boardId,
        lists: snapshot.val().lists,
      };
      dispatch(receiveBoard(board));
    })
    .catch((err) => {
      dispatch(receiveBoardError(uid));
    });
};

export const listenBoard = (uid: string) => async (dispatch: AppDispatch) => {
  rtdb.ref("/board/" + uid).on("value", (snapshot) => {
    if (snapshot.val() !== null) {
      const board = {
        boardId: snapshot.val().boardId,
        lists: snapshot.val().lists,
      };
      dispatch(receiveBoard(board));
    }
  });
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<string>) => {
      const newList = {
        title: action.payload,
        cards: [],
        id: newID(),
      };
      if (state.lists) {
        state.lists = [...state.lists, newList];
      } else {
        state.lists = [newList];
      }
    },
    deleteList: (state, action: PayloadAction<string>) => {
      const listID = action.payload;
      const newList = [...state.lists];
      state.lists.forEach((list, index) => {
        if (list.id === listID) {
          newList.slice(index, 1);
        }
      });
      state.lists = newList;
    },
    addCard: (state, action: PayloadAction<Card>) => {},
    requestBoard: (state, action: PayloadAction) => {},
    receiveBoard: (state, action: PayloadAction<Board>) => {
      state.boardId = action.payload.boardId;
      state.lists = action.payload.lists;
    },
    receiveBoardError: (state, action: PayloadAction<string>) => {
      state.boardId = action.payload;
    },
    requestUpdateBoard: (state, action: PayloadAction) => {},
    receiveUpdatedBoard: (state, action: PayloadAction) => {},
    updateBoardError: (state, action: PayloadAction) => {},
    dragHappened: (state, action: PayloadAction<DragHappened>) => {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
      } = action.payload;
      const newState = { ...state };

      if (type === "list") {
        const list = newState.lists.splice(droppableIndexStart, 1);
        newState.lists.splice(droppableIndexEnd, 0, ...list);
        return newState;
      }

      if (droppableIdStart === droppableIdEnd) {
        const list = newState.lists.find(
          (list) => droppableIdStart === list.id
        );
        const card = list?.cards.splice(droppableIndexStart, 1);
        if (list && card) {
          list.cards.splice(droppableIndexEnd, 0, ...card);
        }
      }

      if (droppableIdStart !== droppableIdEnd) {
        const list = newState.lists.find(
          (list) => droppableIdStart === list.id
        );
        const otherList = newState.lists.find(
          (list) => droppableIdEnd === list.id
        );
        const card = list?.cards.splice(droppableIndexStart, 1);
        if (card && otherList && !otherList?.cards) {
          otherList.cards = [...card];
        } else if (otherList && card) {
          otherList.cards.splice(droppableIndexEnd, 0, ...card);
        }
      }
    },
  },
  extraReducers: {},
});

export const {
  addList,
  deleteList,
  requestBoard,
  receiveBoard,
  receiveBoardError,
  receiveUpdatedBoard,
  updateBoardError,
  requestUpdateBoard,
} = boardSlice.actions;

export const selectBoard = (state: RootState) => state.board;

export default boardSlice.reducer;
