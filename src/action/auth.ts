import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { z } from "zod";
import { db } from "@/db";
import { createInsertSchema } from "drizzle-zod"; // createInsertSchema import 추가

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInActionParams = z.infer<typeof signInSchema>;

export const signInAction = async (data: TSignInActionParams) => {
  const { email, password } = signInSchema.parse(data);

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return { error: "유저를 찾을 수 없습니다", data: null };
  }
  
  // signInAction에는 성공했을 때의 반환문 추가
  return { success: "로그인 성공", data: user };
};

// 중복된 선언 제거
export const signUpSchema = createInsertSchema(users)
  .omit({
    id: true,
  })
  .extend({
    email: z.string().email(),
    password: z.string().min(8),
  });

export type TSignUpActionParams = z.infer<typeof signUpSchema>;

export const signUpAction = async (data: TSignUpActionParams) => {
  const {email, password} = signUpSchema.parse(data);
  const user = await db.insert(users).values({email, password}).returning();
  return {success:"유저 회원가입 완료", data: user[0]};
};