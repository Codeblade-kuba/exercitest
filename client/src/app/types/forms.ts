export interface SignInForm {
  email: string | null;
  password: string | null;
}

export interface SignUpForm {
  name: string | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  privacyPolicy: boolean | null;
}
