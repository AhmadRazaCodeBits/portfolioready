import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) return null;

        await connectDB();

        // Check if user exists in database
        try {
          const dbUser = await User.findOne({ email });
          if (dbUser) {
            const isMatch = await bcrypt.compare(password, dbUser.password);
            if (isMatch) {
              return {
                id: dbUser._id.toString(),
                name: dbUser.name,
                email: dbUser.email,
                role: dbUser.role || 'admin',
              };
            }
            return null; // DB user found but wrong password
          }
        } catch (error) {
          console.error("DB Error in authorize:", error);
        }

        // Fallback: Check super admin from .env
        const adminEmail = process.env.ADMIN_EMAIL || 'ahmadraza20416@gmail.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Portfolio2024';

        if (email === adminEmail && password === adminPassword) {
          // Auto-seed super admin into DB if missing, ensuring they can use "Forgot Password"!
          try {
            const hashedPwd = await bcrypt.hash(password, 10);
            await User.create({ name: 'Super Admin', email: adminEmail, password: hashedPwd });
          } catch (e) {
            // Might already exist or DB restricted, ignore sync error.
          }
          
          return {
            id: '1',
            name: 'Super Admin',
            email: adminEmail,
            role: 'super_admin',
          };
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  // Required for serverless deployments (Netlify/Vercel) — 
  // tells NextAuth to trust the host header instead of requiring NEXTAUTH_URL
  trustHost: true,
  // Debug mode for troubleshooting (disable in stable production)
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
