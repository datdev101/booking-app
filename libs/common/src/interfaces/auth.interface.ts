export interface IRegisterReq {
  email: string;
  password: string;
}

export interface IRegisterRes {
  id: string;
  email: string;
  password: string;
}

export interface ILoginReq {
  email: string;
  password: string;
}

export interface ILoginRes {
  id: string;
  email: string;
  token: string;
}

export interface IVerifyTokenReq {
  token: string;
}

export interface IVerifyTokenRes {
  isValid: boolean;
  user: ILoginRes;
}
