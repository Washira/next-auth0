This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- [Getting Started](#getting-started)
- [Learn More](#learn-more)
- [Deploy on Vercel](#deploy-on-vercel)
- [Auth0 Configuration](#auth0-configuration)
- [Configure SDK](#configure-sdk)
- [Auth0 APIs](#auth0-apis)
- [การใช้งาน](#การใช้งาน)
- [ตั้งค่าใน Auth0 dashboard settings](#ตั้งค่าใน-auth0-dashboard-settings)
- [User Management](#user-management)
- [Profile page](#profile-page)
  - [Redirecting to the profile page](#redirecting-to-the-profile-page)

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

จากนั้น นำเอา `<a href="/api/auth/login">Login</a>` ไปเพิ่มใน `app/page.js` เพื่อให้ไปหน้า login

แต่ยังไม่สามารถ login ได้เพราะยังไม่ได้ตั้งค่าใน Auth0 ให้เรียบร้อย

## ตั้งค่าใน Auth0 dashboard settings

เข้าไปที่ dashboard > Applications > Applications > เลือก application ที่เราสร้างขึ้นมา > Settings

1. ไปที่ [Auth0 Dashboard](https://manage.auth0.com/dashboard)
2. ไปที่ `Applications` แล้วสร้าง Application ใหม่
3. ตั้งค่า `Allowed Callback URLs` เป็น path ที่เราต้องการให้ redirect เมื่อกด login เช่น `http://localhost:3000/api/auth/callback`
4. ตั้งค่า `Allowed Web Origins` ให้ตรงกับที่เราใช้งาน เช่น `http://localhost:3000`
5. ตั้งค่า `Allowed Origins (CORS)` ให้ตรงกับที่เราใช้งาน เช่น `http://localhost:3000`
6. ตั้งค่า `Application URIs` ให้ตรงกับที่เราใช้งาน เช่น `http://localhost:3000`
7. ตั้งค่า `Token Endpoint Authentication Method` ให้เป็น `Post`
8. ตั้งค่า `Use Auth0 instead of the IdP to do Single Sign On` ให้เป็น `True`
9.  ตั้งค่า `OIDC Conformant` ให้เป็น `True`
10. ตั้งค่า `Application Type` ให้เป็น `Regular Web Application`
11. ตั้งค่า `Allowed Logout URLs` ให้เป็น path ที่เราต้องการให้ redirect หลังจาก logout แล้ว เช่น `http://localhost:3000`

จากนั้น กด `Save Changes`

เมื่อทำการตั้งค่าเรียบร้อยแล้ว ก็สามารถ login ได้แล้ว

## User Management

เมื่อมีการ login เข้ามา เราสามารถดูคนที่ login ได้ โดยเข้าไปดูที่ dashboard > User Management > Users

จะเห็นหน้่ารายชื่อของคนที่ login เข้ามาทั้งหมด

## Profile page

เราสามารถดึงข้อมูลของผู้ใช้ที่ login เข้ามาได้ 

ถ้าดึงข้อมูลแบบ Server-side ให้ใข้ `useUser` จาก `@auth0/nextjs-auth0`

```javascript
import { getSession } from '@auth0/nextjs-auth0';

export default async function ProfileServer() {
  const { user } = await getSession();

  return (
      user && (
          <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
      )
  );
}
```

ถ้าต้องการ ดึง แบบ Client-side ให้ใช้ `useUser` จาก `@auth0/nextjs-auth0/client`

```javascript
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
```

เราจะสามารถดึงข้อมูลมาแสดงได้เหมือนกับเรียก API `GET /api/auth/me`

### Redirecting to the profile page

เราสามารถทำการ redirect ไปที่ หลังจาก login แล้ว ให้ไปที่ profile page ได้ และถ้าไม่ได้ login ก็ให้ไปที่หน้า login แทน
โดยใช้ middleware

```javascript
```