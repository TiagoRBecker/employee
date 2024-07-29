import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { authUrl } from "./api";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signOut: "/",
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any): Promise<any> {
        try {
          const authLogin = await fetch(`${authUrl}/signin/employee`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ credentials }),
          });
      
          if (!authLogin.ok) {
            
            const errorData = await authLogin.json();
            console.log(errorData);
            throw new Error(errorData.message || 'Erro desconhecido na autenticação');
          }
      
          const data = await authLogin.json();
      
          if (data && data.accessToken) {
            return {
              id: data.id,
              name: data.name,
              email: data.email,
              avatar: data.avatar,
              accessToken: data.accessToken,
            };
          }
          
          throw new Error('Dados de autenticação inválidos');
        } catch (error: any) {
          console.error("Erro na autenticação", error);
          throw error; // Re-throwing the error so it can be handled by the caller
        }
      }
      
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
};
