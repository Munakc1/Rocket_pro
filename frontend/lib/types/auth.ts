export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
};

export type LoginPayload = {
  emailOrPhone: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};