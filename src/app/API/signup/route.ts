import { NextResponse } from 'next/server';
import { db } from '@/db';
import { users } from '@/db/schema';
import { SignUpSchema } from '@/db/SignUpSchema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = SignUpSchema.parse(body);
    
    const result = await db.insert(users).values(validatedData).returning();
    
    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: '회원가입에 실패했습니다.' },
      { status: 400 }
    );
  }
} 