export type RegisterDto = {
  email: string;
  name: string;
  middleName: string;
  surName: string;
  phone: string;
  isSubscribed: boolean;
};

export type RegisteredDto = RegisterDto & {
  id: number;
  isApproved: boolean;
  role: string;
  createdAt: string;
};
export type ConfirmCodeDto = {
  phone: string;
  code: string;
};

export type RequestCodeDto = {
  phone: string;
};

export type RequestAdminCodeDto = {
  email: string;
  password: string;
};

export type LoginDto = {
  code: string;
};
