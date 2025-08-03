/* eslint-disable @typescript-eslint/no-explicit-any */
// app/api/blog/detail-blog/route.ts
import { http } from '@/utils/http'
import { NextResponse } from 'next/server'


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const id = searchParams.get('id') // dapatkan id dari query string

  if (!slug) {
    return NextResponse.json({ message: 'Slug is required' }, { status: 400 })
  }

  try {
    const res = await http.get(`/blogs/detail-blog/${slug}?id=${id}`)
    const data = res.data?.data

    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    console.error('❌ Error saat fetch blog:', error)

    // Tangkap error response dari server
    if (error.response) {
      const status = error.response.status || 500
      const message = error.response.data?.message || 'Unexpected error from server'

      return NextResponse.json({ message }, { status })
    }

    // Fallback error (misalnya network error)
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 })
  }
}

