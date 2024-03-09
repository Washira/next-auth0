This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)
- [Auth0 Configuration](#auth0-configuration)
- [Configure SDK](#configure-sdk)
- [Auth0 APIs](#auth0-apis)
- [การใช้งาน](#การใช้งาน)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Auth0 Configuration

เริ่มที่การสร้่าง Application ที่ Auth0 dashboard ที่นี่ [Auth0 Dashboard](https://manage.auth0.com/dashboard)

จากนั้น สร้าง Next.js ขึ้นมา แล้วติดตั้ง `auth0` โดยใช้คำสั่ง

```bash
npm install @auth0/nextjs-auth0
```

## Configure SDK

สร้างไฟล์ `.env.local` และเพิ่มข้อมูลดังนี้

```bash
AUTH0_SECRET='use [openssl rand -hex 32] to generate a 32 bytes value'
AUTH0_BASE_URL='http://localhost:3000'
AUTH0_ISSUER_BASE_URL='YOUR_AUTH0_ISSUER_BASE_URL'
AUTH0_CLIENT_ID='YOUR_AUTH0_CLIENT_ID'
AUTH0_CLIENT_SECRET='YOUR_AUTH0_CLIENT_SECRET'
```

## Auth0 APIs

Auth0 จะมี APIs ที่ใช้ในการทำงาน ดังนี้

- `/api/auth/login` - ใช้ในการเข้าสู่ระบบ
- `/api/auth/logout` - ใช้ในการออกจากระบบ
- `/api/auth/me` - ใช้ในการดึงข้อมูลของผู้ใช้
- `/api/auth/callback` - ใช้ในการรับข้อมูลจาก Auth0 หลังจากที่ผู้ใช้เข้าสู่ระบบ

## การใช้งาน

นำเอา `auth0` มาติดตั้งใน `app/layout.js` ก่อน

```javascript
import { UserProvider } from '@auth0/nextjs-auth0'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>{children}</body>
      </UserProvider>
    </html>
  )
}
```

