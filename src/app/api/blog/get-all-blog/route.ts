// app/api/promo/route.ts
import { http } from '@/utils/http'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await http.get('/blogs/list')
    const data = res

    // Optionally transform data here
    console.error('Error fetching promo data:', data.data)
    return NextResponse.json(data.data)
    
  } catch (error) {
    console.error('Error fetching promo data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}
