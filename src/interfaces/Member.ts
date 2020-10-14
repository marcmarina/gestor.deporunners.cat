export interface Member {
  _id: string;
  firstName: string;
  lastName: string;
  numMember: number;
  email: string;
  dni: string;
  telephone: string;
  iban?: string;
  address: {
    postCode: string;
    streetAddress: string;
    town: {
      _id: string;
      name: string;
    };
  };
}
