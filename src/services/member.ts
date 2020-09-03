import axios from 'axios';

export const fetchMembers = async () => {
  try {
    const members = await axios.get('/api/member');
    return members;
  } catch (ex) {
    throw ex;
  }
};
