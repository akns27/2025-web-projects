import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { LoginSchema } from '@/db/LoginSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = LoginSchema.parse(body);
    
    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, validatedData.email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { success: false, error: '이메일 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // TODO: 실제로는 비밀번호 해싱 후 비교해야 합니다
    if (user[0].password !== validatedData.password) {
      return NextResponse.json(
        { success: false, error: '이메일 또는 비밀번호가 일치하지 않습니다.' },
        { status: 401 }
      );
    }

    // 로그인 성공 시 사용자 정보 반환 (비밀번호 제외)
    const { password, ...userWithoutPassword } = user[0];
    
    return NextResponse.json({ 
      success: true, 
      data: userWithoutPassword 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '로그인에 실패했습니다.' },
      { status: 400 }
    );
  }
} 