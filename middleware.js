import { NextResponse } from 'next/server'
import {
  withMiddlewareAuthRequired,
  getSession,
} from '@auth0/nextjs-auth0/edge'

export default middleware(async (req) => {
  return withMiddlewareAuthRequired(async (req) => {
    const res = NextResponse.next()
    const user = await getSession(req, res)
    if (!user) {
      return NextResponse.redirect('/api/auth/login')
    }
    return res
  })
})
