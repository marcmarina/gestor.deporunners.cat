import http from './http';

interface Member {
  firstName: string;
  lastName: string;
  numMember: number;
  email: string;
  dni: string;
  telephone: string;
  address: {
    postCode: string;
    streetAddress: string;
    town: {
      _id: string;
      name: string;
    };
  };
}

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
