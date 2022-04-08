import http from './http';

import { Member } from '../interfaces/Member';
import { AxiosResponse } from 'axios';

export const fetchMembers = async (): Promise<AxiosResponse<Member[]>> => {
  try {
    const members = await http.get('/member');
    return members;
  } catch (ex) {
    throw ex;
  }
};

export const fetchById = async (id: string) => {
  try {
    const member = await http.get(`/member/${id}`);
    return member;
  } catch (ex) {
    throw ex;
  }
};

export const deleteById = async (id: string) => {
  const res = await http.delete(`/member/${id}`);
  return res;
};

export const updateById = async (member: Member) => {
  const res = await http.put(`/member`, member);
  return res;
};
