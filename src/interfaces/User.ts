export default interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: {
    _id: string;
    name: string;
  };
}
