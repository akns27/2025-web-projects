export interface FormValues {
  name: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "" | "male" | "female" | "other";
  birthdate: string;
  address?: string;
  hobbies?: string;
  introduction?: string;
}
