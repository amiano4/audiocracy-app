export interface IUserRegistration {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IAuthUser {
  name: string;
  email: string;
  role: "admin" | "user";
  created: string;
}
