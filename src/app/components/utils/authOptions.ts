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
      async authorize(credentials, req): Promise<any> {
        try {
          const authLogin = await fetch(`${authUrl}/signin/employee`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ credentials }),
          });

          // Check if the response is successful
          if (!authLogin.ok) {
            const errorData = await authLogin.json();
            const errorMessage = errorData.message || "Erro na autenticação";
            throw new Error(errorMessage);
          }

          // Parse the response JSON
          const data = await authLogin.json();
          
          // Check if data and accessToken exist
          if (data && data.accessToken) {
            return {
              id: data.id,
              name: data.name,
              email: data.email,
              avatar:data.avatar,
              accessToken: data.accessToken,
              // Add other properties as needed
            };
          } else {
            throw new Error("Dados inválidos retornados pelo servidor");
          }
        } catch (error:any) {
          console.error("Erro na autenticação:", error?.message);
          throw new Error("Falha na autenticação");
        }
      },
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
