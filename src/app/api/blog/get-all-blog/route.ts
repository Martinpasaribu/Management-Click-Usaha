// app/api/promo/route.ts
import { http } from '@/utils/http'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await http.get('/blogs/data')
    const data = res

    // Optionally transform data here
    return NextResponse.json(data.data)
  } catch (error) {
    console.error('Error fetching promo data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
