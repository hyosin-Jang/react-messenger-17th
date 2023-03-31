import { atom } from 'recoil';
import { UserInfoType } from './type';

export const userInfo = atom<UserInfoType>({
  key: 'userInfo',
  default: {
    userId: 1,
    name: 'hyosin',
  },
});

export const userGroup = atom<UserInfoType[]>({
  key: 'userGroup',
  default: [],
});
