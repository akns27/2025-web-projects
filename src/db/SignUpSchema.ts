import { z } from "zod";

export const SignUpSchema = z
  .object({
    name: z.string().min(2, "이름은 최소 2글자 이상이어야 합니다.").max(50),
    phoneNumber: z
      .string()
      .regex(/^\d{11}$/, "전화번호는 숫자 11자리여야 합니다."),
    email: z.string().email("올바른 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이어야 합니다.")
      .max(50, "비밀번호는 최대 50글자 입니다."),
    confirmPassword: z
      .string()
      .min(8, "비밀번호는 최소 8글자 이상이어야 합니다.")
      .max(50, "비밀번호는 최대 50글자 입니다."),
    gender: z
      .union([z.enum(["male", "female", "other"]), z.literal("")])
      .refine((val) => val !== "", { message: "성별을 선택해주세요." }),
    birthdate: z.string().nonempty("생년월일을 입력해주세요."),
    address: z
      .string()
      .max(200, "주소는 최대 200글자 입니다.")
      .min(2, "주소는 최소 2글자 이상이어야 합니다.")
      .optional(),
    hobbies: z.string().max(200).optional(),
    introduction: z
      .string()
      .max(500, "자기소개는 최대 500글자 입니다.")
      .min(1, "자기소개는 최소 1글자 이상이어야 합니다.")
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });
