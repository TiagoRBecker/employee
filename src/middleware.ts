export {default} from "next-auth/middleware"

export const config = {
  matcher: ['/magazines/:path*']
}