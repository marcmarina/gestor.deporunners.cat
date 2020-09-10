export default interface User {
  name: string;
  email: string;
  password: string;
  role: {
    _id: string;
    name: string;
  };
}
