import { getData } from "@/action/getData";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
  const data = await getData();
  return NextResponse.json(data);
};

//링크만 알면 다른 프젝에서도 사용할 수 있는 route

