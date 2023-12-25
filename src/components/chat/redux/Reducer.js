import * as actions from "./Type";

const initialState = {
  isLoading: false,
  chatLists: [],
  chats: [],
  profile: "",
  chatCount: 0,
  pagination: "",
  receiverGigs: [],
  aboutReceiver: "",
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.FETCH_CHATLIST_SUCCESS:
      const chatLists = action.payload.res.data.data.chatRooms.filter(
        (item) =>
          !item?.latestMessage?.read_at &&
          item?.latestMessage?.sender?.id !== action.payload?.userId
      );

      return {
        ...state,
        isLoading: false,
        chatLists: action.payload.res.data.data.chatRooms,
        chatCount: chatLists?.length,
      };

    case actions.CHANGE_SEEN_USERMESSAGE:
      const latestChatList = state.chatLists?.map((item) =>
        item.id === action.payload
          ? {
              ...item,
              latestMessage: { ...item?.latestMessage, read_at: "2020/12/20" },
            }
          : item
      );
      return { ...state, chatLists: latestChatList };

    case actions.FETCH_USERMESSAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        chats: action.payload?.chat?.messages,
        profile: action.payload?.aboutReceiver,
        pagination: action.payload?.chat?.pagination,
        receiverGigs: action.payload?.receiverGigs,
        aboutReceiver: action.payload?.aboutReceiver,
      };

    case actions.APPEND_USERMESSAGE:
      return {
        ...state,
        isLoading: false,
        chats: [...state.chats, ...action.payload.data?.chat?.messages],
      };
    case actions.ADD_CHATLIST:
      const chat_room = action.payload?.data?.chatRoom;
      const chat_room_id = chat_room?.id;
      const newChatList = state.chatLists.filter(
        (item) => item.id !== chat_room_id
      );
      const filteredList = state.chatLists.filter(
        (item) => item.id === chat_room_id
      )[0];
      const newfilteredList = {
        ...filteredList,
        id: chat_room_id,
        title: chat_room?.title,
        receiver: chat_room?.receiver,
        latestMessage: action.payload?.data?.chatMessage,
      };
      const finalChatList = [newfilteredList, ...newChatList];

      const chatCount = finalChatList.filter(
        (item) =>
          !item?.latestMessage?.read_at &&
          item?.latestMessage?.sender?.id !== action.payload?.userId
      );

      return {
        ...state,
        isLoading: false,
        chatLists: finalChatList,
        chatCount: chatCount?.length,
      };

    case actions.ADD_USERMESSAGE:
      return {
        ...state,
        isLoading: false,
        chats: [action.payload, ...state.chats],
      };

    case actions.FETCH_CHATLIST_BEGIN:
    case actions.FETCH_USERMESSAGE_BEGIN:
      return { ...state, isLoading: true };

    case actions.FETCH_CHATLIST_ERROR:
    case actions.FETCH_USERMESSAGE_ERROR:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};
