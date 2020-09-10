import http from './http';

import { Member } from '../interfaces/Member';

export const fetchMembers = async () => {
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
  try {
    const res = await http.delete(`/member/${id}`);
    return res;
  } catch (ex) {
    throw ex;
  }
};

export const updateById = async (member: Member) => {
  try {
    const res = await http.put(`/member`, member);
    return res;
  } catch (ex) {
    console.log(ex);
  }
};
