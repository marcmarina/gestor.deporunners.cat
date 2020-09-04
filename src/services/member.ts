import axios from 'axios';

export const fetchMembers = async () => {
  try {
    const members = await axios.get('/api/member');
    return members;
  } catch (ex) {
    throw ex;
  }
};

export const fetchById = async (id: string) => {
  try {
    const member = await axios.get(`/api/member/${id}`);
    return member;
  } catch (ex) {
    throw ex;
  }
};
