import { NextResponse } from 'next/server'
import { AxiosError } from 'axios'
import { http } from '@/utils/http'

export async function POST(req: Request) {
  const {
    title,
    slug,
    author,
    content,
    desc,
    sub_desc,
    category,
    tags,
    status,
    image_bg,
    images,
  } = await req.json()

  // ✅ Normalisasi slug agar SEO-friendly
  const Convert_slug = slug?.trim().toLowerCase().replace(/\s+/g, '-')

  // ✅ Validasi wajib
  if (
    !title ||
    !Convert_slug ||
    !author ||
    !content ||
    !desc ||
    !sub_desc ||
    !category ||
    !tags ||
    !status ||
    !images?.length ||
    !image_bg
  ) {
    return NextResponse.json(
      { message: 'Semua field (title, slug, content, dll) wajib diisi.' },
      { status: 400 }
    )
  }

  try {
    // 🔥 Kirim ke backend NestJS
    const response = await http.post('/blogs', {
      title,
      slug: Convert_slug,
      author,
      content,
      desc,
      sub_desc,
      category,
      tags,
      status,
      image_bg,
      images,
    })

    if (response && response.data) {
      return NextResponse.json(
        { message: 'Artikel berhasil disimpan!', data: response.data },
        { status: 201 }
      )
    } else {
      return NextResponse.json(
        { message: 'Gagal menyimpan artikel. Tidak ada respons dari server backend.' },
        { status: 500 }
      )
    }
  } catch (error: unknown) {
    console.error('Error saat mengirim ke backend:', error)

    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || 'Terjadi kesalahan saat menyimpan artikel.',
        },
        { status: error.response?.status || 500 }
      )
    }

    return NextResponse.json({ message: 'Kesalahan tak terduga.' }, { status: 500 })
  }
}
