declare interface MessageState {
  success?: boolean;
  message?: string;
}

declare interface AuthState<T> extends MessageState {
  validationErrors?: Partial<Record<keyof T, string[]>>;
}

declare interface NewPasswordProps {
  passwordData: {
    password: string;
    confirmPassword: string;
  };
  token?: string | null;
}

declare type Token = {
  email: string;
  identifier: string;
  token: string;
  expires: Date;
};

declare type Course = {
  id: string;
  name: string;
  totalPeriods: number;
};

declare type User = {
  id: string;
  name: string;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string;
  cpf: string;
  phoneNumber: string;
  birthDate: string;
  postalCode: string;
  state: string;
  address: string;
  role: 'admin' | 'user';
  updatedAt: Date;
  createdAt: Date;
};
