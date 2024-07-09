// import { getData } from '@/app/utils/storage';
// import { NextResponse } from 'next/server';

// export function middleware(request) {
//   const path = request.nextUrl.pathname;
  
//   // Lấy token từ localStorage (phía client)
//   const token = getData('token');

//   if (path.startsWith('/admin') && !token) {
//     return NextResponse.redirect(new URL('/admin', request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };