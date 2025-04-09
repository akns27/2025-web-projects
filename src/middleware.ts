// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// // This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   // return NextResponse.redirect(new URL("/", request.url));
//   return NextResponse.next();

// }


// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/about/:path*", //넥스트 route, about에 아무 권한 없는 놈이 들어오면 홈으로 보내버림
//   //공통적인 로직을 여기서 처리함, 서버 관련된 코드만 쓸 수 있다.
// };

export {auth as middleware} from "@/db/auth";