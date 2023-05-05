import { atom, selectorFamily, selector } from 'recoil';
import {
  UserInfoType,
  ChatRoomType,
  ChatMessageType,
  ChatRoomInfoType,
} from './type';

import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const userInfo = atom<UserInfoType>({
  key: 'userInfo',
  default: {
    userId: 0,
    name: 'hyosin',
    statusMessage: 'hyosin',
  },
  effects_UNSTABLE: [persistAtom],
});

export const userGroup = atom<UserInfoType[]>({
  key: 'userGroup',
  default: [],
});

export const chatRooms = atom<ChatRoomType[]>({
  key: 'chatRooms',
  default: Array.from({ length: 4 }, (_, i) => ({
    roomId: i + 1,
    data: {
      curUserId: 0,
      otherUserId: i + 1,
      messages: [{ userId: 0, data: '하하', timestamp: Date() }],
    },
  })),
  effects_UNSTABLE: [persistAtom],
});

const testChatRoom: ChatRoomType = {
  roomId: 1,
  data: [],
};

export const chatRoomCurUserIdSelector = selectorFamily<number, any>({
  key: 'chatRoomCurUserId',
  get:
    (param: number) =>
    ({ get }) =>
      get(chatRooms).find((chatRoom) => chatRoom.roomId === param)?.data
        .curUserId ?? testChatRoom,
});

export const chatRoomOtherUserIdSelector = selectorFamily<number, any>({
  key: 'chatRoomOtherUserId',
  get:
    (param: number) =>
    ({ get }) =>
      get(chatRooms).find((chatRoom) => chatRoom.roomId === param)?.data
        .otherUserId ?? testChatRoom,
});

// 해당 roomId의 data만 반환
export const chatRoomMessages = selectorFamily<
  ChatRoomInfoType,
  { roomId: number }
>({
  key: 'chatRoomMessage',
  get:
    ({ roomId }) =>
    ({ get }) => {
      return (
        get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)?.data ??
        testChatRoom
      );
    },
});

// 채팅 방들의 가장 최신 메시지만 반환
export const getLatestMessage = selector({
  key: 'chatRoomMessages',
  get: ({ get }) =>
    get(chatRooms).map((chatRoom: ChatRoomType) => {
      return {
        roomId: chatRoom?.roomId,
        latestMessage: chatRoom?.data.messages.at(-1).data,
      };
    }),
});

export const chatRoomMessagesSelector = selectorFamily<
  ChatMessageType[],
  { roomId: number }
>({
  key: 'chatRoomMessages',
  get:
    ({ roomId }) =>
    ({ get }) => {
      console.log('get(chatRooms):', get(chatRooms));
      return (
        get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)?.data
          .messages ?? testChatRoom
      );
    },
  set:
    ({ roomId }) =>
    ({ get, set }, newChatList) => {
      // roomId 필터링
      let newRooms = [...get(chatRooms)].filter(
        (rooms) => rooms.roomId !== roomId
      );

      // setter 반영
      const newRoom = {
        roomId: roomId,
        data: {
          ...get(chatRoomMessages({ roomId: roomId })),
          messages: newChatList,
        },
      };

      // 업데이트한 최신 채팅방들 정보
      newRooms = [...newRooms, newRoom].sort((a, b) => a.roomId - b.roomId);

      set(chatRooms, newRooms);
    },
});
