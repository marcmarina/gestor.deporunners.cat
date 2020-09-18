export interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  numMember: number;
  email: string;
  dni: string;
  telephone: string;
  iban?: string;
  tshirtSize: {
    _id: string;
    name: string;
    orderNum: number;
  };
  address: {
    postCode: string;
    streetAddress: string;
    town: {
      _id: string;
      name: string;
    };
  };
}
