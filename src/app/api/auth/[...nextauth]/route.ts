import NextAuth ,{AuthOptions} from "next-auth"


import { authOptions } from "@/src/app/components/utils/authOptions"

const handler = NextAuth(authOptions as any)

export { handler as GET, handler as POST }