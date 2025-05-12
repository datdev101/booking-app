export interface ICreateUserReq {
  email: string;
  password: string;
}

export interface ICreateUserRes {
  id: string;
  email: string;
  password: string;
}

export interface IFindOneUserReq {
  email?: string;
  password?: string;
}
