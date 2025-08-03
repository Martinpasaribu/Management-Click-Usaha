'use client'

import { useState } from 'react'
import Editor from '@/components/Elements/Editor'
import Link from 'next/link'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'
import { http } from '@/utils/http'

export default function CreateArticlePage() {
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [desc, setDesc] = useState('')
  const [subDesc, setSubDesc] = useState('')
  const [category, setCategory] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [tags, setTags] = useState<string[]>([])

  const [singleImage, setSingleImage] = useState<File | null>(null)
  const [singlePreview, setSinglePreview] = useState<string | null>(null)

  const [multipleImages, setMultipleImages] = useState<File[]>([])
  const [multiplePreviews, setMultiplePreviews] = useState<string[]>([])

  const [modalImage, setModalImage] = useState<string | null>(null)


  const handleSingleChange = (file: File | null) => {
    setSingleImage(file)
    setSinglePreview(file ? URL.createObjectURL(file) : null)
  }

const handleMultipleChange = (newFiles: File[]) => {
  const allFiles = [...multipleImages, ...newFiles]
  setMultipleImages(allFiles)
  setMultiplePreviews(allFiles.map(file => URL.createObjectURL(file)))
}

// ...

const handleRemoveImage = (index: number) => {
  const updatedImages = [...multipleImages]
  const updatedPreviews = [...multiplePreviews]

  updatedImages.splice(index, 1)
  updatedPreviews.splice(index, 1)

  setMultipleImages(updatedImages)
  setMultiplePreviews(updatedPreviews)
}

const handleRemoveSingleImage = () => {

  setSingleImage(null)
  setSinglePreview(null)
}

const uploadImages = async (): Promise<{
  image_bg: string
  images: string[]
}> => {
  const formData = new FormData()
  if (singleImage) formData.append('image_bg', singleImage)
  multipleImages.forEach((img) => formData.append('images', img))

  const res = await http.post('/blogs/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return {
    image_bg: res.data.image_bg_url,
    images: res.data.images_url,
  }
}



const handleSubmit = async () => {

  
  try {

    
    if (!title || !slug || !content || !desc || !subDesc || !category || !tags || !status) {
      alert('Semua field harus diisi!')
      return
    }
    setLoading(true);

    const { image_bg, images } = await uploadImages()

    console.log('url image :', image_bg, images);

    const payload = {
      title,
      slug,
      author,
      content,
      desc,
      sub_desc: subDesc,
      category,
      tags,
      status,
      image_bg,
      images, 
    }


    const res = await fetch('/api/blog/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await res.json()

    if (res.ok) {
      alert('✅ Artikel berhasil disimpan!')
      console.log('📦 Data terkirim:', result)
    } else {
      setLoading(false);
      alert('⚠️ Gagal menyimpan artikel: ' + result.message)
    }

  } catch (err) {
    console.error('❌ Error saat submit:', err)
    alert('❌ Gagal submit artikel')

  }finally {
    setLoading(false) // selalu dijalankan walau error
  }
}


  const handleAdd = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    }
  }

  const handleRemove = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }

  const handleClearAll = () => {
    setTags([])
  }


  return (
    <div className='flex mx-auto max-w-6xl'>
      <div className="w-full p-4 space-y-4 relative">

        <div className='p-4 bg-[#202830] text-gray-200 my-5 rounded-lg'>
          <h1 className="text-2xl font-bold text-color1 bg-brand">List Blog</h1>
          <p>Atur blog anda</p>
        </div>

        <div className='flex flex-col justify-between gap-4'>

              {/* Input Nilai */}
              <div className='flex gap-2'>
                <div className='w-1/2 space-y-2'>

                        <input type="text" placeholder="Judul" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full p-2 border rounded" />

                        <div className="w-full">
                          <select
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="bg-[#F6F6F6FF]/20 border border-gray-300 text-gray-400 text-sm rounded-lg 
                                      focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                      dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          >
                            <option value="" className='text-slate-400'>Author</option>
                            <option value="6868e3e07407d759359ea689">Martin Pasaribu</option>
                            <option value="68614333275232e0b45b7d35">Ricky Pasaribu</option>
                          </select>
                        </div>

                        <input type="text" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full p-2 border rounded" />
                        <input type="text" placeholder="Sub Description" value={subDesc} onChange={(e) => setSubDesc(e.target.value)} className="w-full p-2 border rounded" />
                </div>

                <div className='w-1/2 space-y-2'>

                  <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-2 border rounded" />

                  {/* Bagian Select yang sudah diubah */}
                  <div className='w-full flex gap-2'>

                    <div className="w-full">
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="bg-[#F6F6F6FF]/20 border border-gray-300 text-gray-400 text-sm rounded-lg 
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" className='text-slate-400'>Choose Category</option>
                        <option value="technology">Technology</option>
                        <option value="business">Business</option>
                        <option value="world">World</option>
                        <option value="news">News</option>
                        <option value="science">Science</option>
                        <option value="entertainment">Entertainment</option>
                      </select>
                    </div>

                    <div className="w-full">
                      <select
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="bg-[#F6F6F6FF]/20 border border-gray-300 text-gray-400 text-sm rounded-lg 
                                  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
                                  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      >
                        <option value="" className='text-slate-400'>Status</option>
                        <option value="Live">Live</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>

                  </div>

                  <div className=" max-w-xl">
                    <div className="flex gap-2 mb-4">
                      <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Tag"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      />
                      <button
                        onClick={handleAdd}
                        className="border-[1px] hover:bg-gray-100 border-gray-400 text-white px-4 rounded"
                      >
                        <Plus size={15} className='text-black' />
                      </button>
                      <button
                        onClick={handleClearAll}
                        className="bg-gray-700 hover:bg-gray-900 text-white px-4 rounded"
                      >
                        <X size={15} />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-800 border border-gray-300 rounded-full"
                        >
                          <span>{tag}</span>
                          <button onClick={() => handleRemove(tag)} className="text-red-500 hover:text-red-700">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Image Upload */}
              <div className="flex w-full">

                {/* Upload Single */}
                <div className='flex w-full'>
                  <div className='flex flex-col gap-2'>
                    <label className="font-bold text-[14px]">Background</label>

                    <label className="w-[6rem] h-[4rem] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition">

                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSingleChange(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center text-gray-500">
                        <Plus size={20} />
                        <span className="text-[8px] mt-1">Add Images</span>
                      </div>

                    </label>

                  </div>

                  <div className=''>

                    {singlePreview && (
                      <div className='relative'>

                      <Image
                        width={100}
                        height={80}
                        src={singlePreview}
                        alt="preview"
                        className="w-24 h-24 object-cover mt-2 rounded cursor-pointer border"
                        onClick={() => setModalImage(singlePreview)}
                      />

                    <button
                      type="button"
                      onClick={handleRemoveSingleImage}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                      >
                      <X size={14} className="text-red-500" />
                    </button>
                      </div>
                    )}

                  </div>

                </div>

                {/* Upload Multipe */}
                <div className="flex flex-col gap-2 w-full">

                  <label className="font-bold text-sm text-gray-700">Images</label>

                  <div className='w-full flex-center  gap-2'>

                    <label className="w-[6rem] h-[4rem] flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-blue-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleMultipleChange(Array.from(e.target.files || []))}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center text-gray-500">
                        <Plus size={20} />
                        <span className="text-[9px] mt-1">Add Images</span>
                      </div>
                    </label>

                    <div  className="w-full mt-3 grid grid-cols-3 md:grid-cols-4 gap-3">

                      {multiplePreviews.map((src, idx) => (
                        <div key={idx} className='relative'>
                          <Image
                            width={100}
                            height={80}
                            src={src}
                            alt={`preview-${idx}`}
                            className="w-16 h-16 object-cover rounded-md border cursor-pointer"
                            onClick={() => setModalImage(src)}
                          />
                          
                          <p className="text-xs text-center mt-1 truncate text-gray-600">
                            {multipleImages[idx]?.name}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="absolute top-1 right-1 bg-white rounded-full p-1 shadow hover:bg-red-100"
                          >
                            <X size={14} className="text-red-500" />
                          </button>
                        </div>
                      ))}


                    </div>
                    
                  </div>

                </div>

              </div>

        </div>

        <div className=' bg-white relative z-40  h-full'>

          <Editor content={content} onChange={setContent}  onSubmit={handleSubmit} loading={loading} />


        </div>


      </div>

      <figure className='w-[10rem] sticky top-0 h-[10rem] '>

        <div className='border-[1px] bg-[#202830] rounded-xl mt-8 '>
          <h1 className='p-2 text-center text-gray-50'>Menu</h1>
          <div className='grid grid-rows-3 p-2 text-sm'>
            <button className='bg-gray-50 rounded-lg'>
              <Link href="/blog/list-blog" className="font-bold text-sm">
                Preview
              </Link>
            </button>
          </div>
        </div>

      </figure>

            {/* Modal Popup */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={() => setModalImage(null)}>
          <Image src={modalImage} width={100} height={100} alt='' className="max-w-3xl max-h-[90vh] rounded shadow-lg" />
        </div>
      )}

    </div>
  )
}
