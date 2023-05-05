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

export interface ChatRoomType {
  roomId: number;
  data: any;
  //data: ChatRoomInfoType[];
}

export interface ChatRoomInfoType {
  curUserId: number;
  otherUserId: number;
  messages: ChatMessageType[];
}
