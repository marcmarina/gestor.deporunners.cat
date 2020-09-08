import http from './http';

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
