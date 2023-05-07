import { UserInfoType } from './type';

export const setDateFormat = (date: string) => {
  const hours = new Date(date).getHours().toString().padStart(2, '0');
  const minutes = new Date(date).getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const setSearchFilter = (searchTerm: string, user: UserInfoType) => {
  if (searchTerm === '') {
    return user;
  } else if (user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
    return user;
  }
};
