export interface UserInfoType {
  userId: number;
  name: string;
  statusMessage: string;
}

export interface ChatMessageType {
  userId: number;
  data: string;
  timestamp: string;
}

// chatRooms 타입 하나 더 만들기
export interface ChatRoomType {
  roomId: number;
  data: ChatRoomInfoType;
}

export interface ChatRoomInfoType {
  curUserId: number;
  otherUserId: number;
  messages: ChatMessageType[];
}
