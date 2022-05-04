export interface RegisterResponse {
  status: string;
  data?: UserRegister;
  message?: string | undefined;
}

export interface RegisterDataResponse {
  createdAt: string;
  email: string;
  name: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface UserRegister {
  user?: RegisterDataResponse;
}
