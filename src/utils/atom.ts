import { atom, selectorFamily, selector } from 'recoil';
import {
  UserInfoType,
  ChatRoomType,
  ChatMessageType,
  ChatRoomInfoType,
} from './type';

import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

// 사용자 한 명에 대한 정보
export const userInfo = atom<UserInfoType>({
  key: 'userInfo',
  default: {
    userId: 0,
    name: 'hyosin',
    statusMessage: 'hyosin',
  },
  effects_UNSTABLE: [persistAtom],
});

const nameArr = ['hyosin', 'hani', 'herin', 'hyein', 'minij'];

const defaultUserGroup: UserInfoType[] = Array.from(
  { length: nameArr.length },
  (_, i) => ({
    userId: i,
    name: nameArr[i],
    statusMessage: '호호',
  })
);

// 사용자 그룹 조회할 때 사용
export const userGroup = atom<UserInfoType[]>({
  key: 'userGroup',
  default: defaultUserGroup,
});

const defaultChatRooms: ChatRoomType[] = Array.from({ length: 4 }, (_, i) => ({
  roomId: i + 1,
  data: {
    curUserId: 0,
    otherUserId: i + 1,
    messages: [{ userId: 0, data: '하하', timestamp: Date() }],
  },
}));
// 채팅방 정보
export const chatRooms = atom<ChatRoomType[]>({
  key: 'chatRooms',
  default: defaultChatRooms,
  effects_UNSTABLE: [persistAtom],
});

// selectorFamily: selector사용할 때, 매개변수가 있는 경우에 사용
// 첫번째: 반환 타입, 두번째: 매개변수 타입
// 사용자 유저 아이디 반환하므로 number

const defaultChatRoom = 1;
export const chatRoomCurUserIdSelector = selectorFamily<
  number,
  { roomId: number }
>({
  key: 'chatRoomCurUserId',
  get:
    ({ roomId }) =>
    ({ get }) =>
      get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)!.data
        .curUserId ?? defaultChatRoom,
});

// 상대 유저 아이디 반환하는 셀렉터
export const chatRoomOtherUserIdSelector = selectorFamily<
  number,
  { roomId: number }
>({
  key: 'chatRoomOtherUserId',
  get:
    ({ roomId }) =>
    ({ get }) =>
      get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)!.data
        .otherUserId ?? defaultChatRoom,
});

const defaultChatRoomInfo: ChatRoomInfoType = {
  curUserId: 0,
  otherUserId: 1,
  messages: [],
};
// 해당 roomId의 data만 반환
export const chatRoomMessages = selectorFamily<
  ChatRoomInfoType,
  { roomId: number }
>({
  key: 'chatRoomMessage',
  get:
    ({ roomId }) =>
    ({ get }) => {
      return get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)!
        .data;
    },
});

const defaultLatestMessage = {
  userId: 1,
  data: 'latestMessage',
  timestamp: '',
};
// 채팅 방들의 가장 최신 메시지만 반환
export const latestMessage = selector({
  key: 'latestMessage',
  get: ({ get }) =>
    get(chatRooms).map((chatRoom: ChatRoomType) => {
      let latestMessage = chatRoom.data.messages.at(-1);
      if (!latestMessage) latestMessage = defaultLatestMessage;
      return {
        roomId: chatRoom?.roomId,
        latestMessage: latestMessage,
      };
    }),
});

// roomId를 가지고 해당 채팅방의 채팅 내역 불러오는 셀렉터
// set: chatRooms atom
export const chatRoomMessagesSelector = selectorFamily<
  ChatMessageType[],
  { roomId: number }
>({
  key: 'chatRoomMessages',
  get:
    ({ roomId }) =>
    ({ get }) =>
      get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)!.data
        .messages,

  set:
    ({ roomId }) =>
    ({ get, set }, newChatList) => {
      // roomId 필터링
      let newRooms = [...get(chatRooms)].filter(
        (rooms) => rooms.roomId !== roomId
      );

      // setter 반영
      const newRoom: ChatRoomType = {
        roomId: roomId,
        data: {
          ...get(chatRoomMessages({ roomId: roomId })),
          messages: newChatList as ChatMessageType[], // 타입 강제
        },
      };

      // 업데이트한 최신 채팅방들 정보
      newRooms = [...newRooms, newRoom].sort((a, b) => a.roomId - b.roomId);
      set(chatRooms, newRooms);
    },
});

export const toggleUserId = selectorFamily<
  ChatRoomInfoType,
  { roomId: number }
>({
  key: 'toggleUserId',
  get:
    ({ roomId }) =>
    ({ get }) =>
      get(chatRooms).find((chatRoom) => chatRoom.roomId === roomId)!.data,
  set:
    ({ roomId }) =>
    ({ get, set }, newUserIdData) => {
      let newRooms = [...get(chatRooms)].filter(
        (rooms) => rooms.roomId !== roomId
      );
      const newRoom: ChatRoomType = {
        roomId: roomId,
        data: newUserIdData as ChatRoomInfoType,
      };

      newRooms = [...newRooms, newRoom].sort((a, b) => a.roomId - b.roomId);
      set(chatRooms, newRooms);
    },
});
