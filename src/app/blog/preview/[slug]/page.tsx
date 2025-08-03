'use client'
// app/blog/[slug]/page.tsx (Next.js 14 App Router)
import { useEffect, useState } from 'react'
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { Blog } from '@/models/blog/blog_models';
import { useParams,useSearchParams } from 'next/navigation'
import { Eye, MessageCircle } from 'lucide-react';
import { formatDate, getTimeFromNow } from '@/components/Function';

interface Heading {
  heading: string
  text: string
}

export default function BlogDetailPage() {

  const searchParams = useSearchParams()
  const { slug } = useParams() as { slug: string }
  const id = searchParams.get('id') // dapatkan id dari query string

  const [blog, setBlog] = useState<Blog>()
  const [heading, setHeading] = useState<Heading []>([])
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [modifiedContent, setModifiedContent] = useState<string>("")



  // eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateHeading = (htmlContent: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')
  const h1Elements = doc.querySelectorAll('h1')

  h1Elements.forEach((el, index) => {
    el.id = `content${index}`
  })

  const extractedHeadings: Heading[] = Array.from(h1Elements).map((el, index) => ({
    heading: `content${index}`,
    text: el.textContent || '',
  }))

  setHeading(extractedHeadings)
  setModifiedContent(doc.body.innerHTML) // Tambahan: render HTML yang sudah dimodifikasi
}

useEffect(() => {
  const fetchData = async () => {
    
    if (!id) return console.error('❌ ID Empty:')

    try {
        const res = await fetch(`/api/blog/detail-blog?slug=${slug}&id=${id}`)
      const data = await res.json()
      setBlog(data.data)
      CreateHeading(data.data.content)
    } catch (error) {
      console.error('❌ Gagal fetch blog:', error)
    } finally {
      setLoading(false)
    }
  }

  if (slug) {
    fetchData()
  }
}, [slug]) // ✅ hanya slug

// ✅ Log heading di effect terpisah
useEffect(() => {
  console.log('📝 Detail heading:', heading)
}, [heading])


    useEffect(() => {

    const handleScroll = () => {
      
      const contentSections = document.querySelectorAll('[id^="content"]')

      let visibleId = null
      let maxVisibleTop = -Infinity

      contentSections.forEach((el) => {
        const rect = el.getBoundingClientRect()

        if (rect.top <= window.innerHeight / 3 && rect.top > maxVisibleTop) {
          maxVisibleTop = rect.top
          visibleId = el.id
        }
      })

      if (visibleId) {
        setActiveSection(visibleId)
      }
    }


    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (loading) return <p>Loading...</p>
  if (!blog) return <p>Blog tidak ditemukan</p>






  // const headers = ['content1', 'content2', 'content3'] // ini bisa kamu generate juga dari data

  return (
    <div className="w-full text-white min-h-screen flex flex-col gap-[3rem]">


      {/* Main Header */}
      <div className="h-screen relative bg-[#202830] flex flex-col justify-between">

        <figure className="w-full max-w-4xl flex flex-col  mx-auto py-10 max-h-[40rem]">

            <div className="text-sm text-gray-200 flex justify-between">

              <div className='flex gap-2'>
                
                <Link href="/">Home</Link> 
                <p>/</p> 
                <Link href="/blog">{blog?.category}</Link> 
                <p>/</p>
                <p>{ blog?.slug}</p>

              </div>

              <div className='flex gap-2'>
                <figure className='flex-center gap-2'>
                  <h1>12</h1>
                  <Eye size={20}/>
                </figure>
                <figure className='flex-center gap-2'>
                  <h1>2</h1>
                  <MessageCircle size={20}/>
                </figure>
              </div>

            </div>

            <h1 className="mt-[5rem] text-5xl md:text-5xl font-extrabold leading-tight w-full max-w-[55rem]">
              {blog?.title}
            </h1>

            <p className="text-gray-300 max-w-5xl mt-5">
              { blog.desc }
            </p>

        </figure>


        <div className="mt-2 w-full max-w-5xl mx-auto h-1/2 ">

          <div className="h-full  relative z-30 flex-center ">

            <Image
              src={blog?.image_bg}
              alt="Branching Out Banner"
              width={550}
              height={500}
              className="w-full max-w-4xl h-full object-contain rounded-xl"
            />

          </div>

        </div>

        <div className="absolute bottom-0 w-full" style={{ background: '#fff', height: '100px' }}></div>

      </div>

      <div className="max-w-[68rem] mx-auto mt-[1rem]">

        {/* Head */}
        <div className="flex md:flex-row justify-between">

          <div className="mt-6 text-gray-400 text-sm flex items-center gap-4">
            <span>{blog?.author.name}</span>
            <span>•</span>
            <span>{formatDate(blog?.createdAt)}</span>
            <span>•</span>
            <span>{getTimeFromNow(blog?.createdAt)}</span>
          </div>

          <div className="list-style-none flex items-center justify-center gap-5 text-black ">
            
              <span className="text-semibold">
                Share:		
              </span>
              <div className="flex space-x-4 text-lg">
                <a href="https://www.facebook.com/people/Savoy-Residences/61551103118837/?_rdr" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
                <a href="https://www.instagram.com/savoyresidences" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://wa.me/6281190000777" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
              </div>
    
          </div>

        </div>

        <div className="border-b-[#545df0] border-[2px] mt-4"></div>

        {/* Body */}
        <div className="flex w-full ">
          
          {/* Left */}
          <section className="w-full px-5">

              {/* Note */}
              <div className=" mt-8 p-4 rounded-md border border-blue-300 text-sm text-gray-900">
                <p className="mb-1 font-semibold">Editor`s note:</p>
                <p>
                  This piece was originally published in our LinkedIn newsletter, Branching Out...{' '}
                  <a href="#" className="text-blue-400 underline">Sign up now for more career-focused content </a>
                </p>
              </div>

              {/* Content */}
              <article className="prose prose-invert prose-lg mt-10 max-w-none text-black ">
                
                <h1 id="content1" className="">Content 1</h1>

                {blog?.content && (
                  <div
                    className="prose prose-invert prose-lg white-space-pre mt-10 max-w-none text-black"
                    // dangerouslySetInnerHTML={{ __html: blog.content }}
                    dangerouslySetInnerHTML={{ __html: modifiedContent }} 

                  />
                )}


                <h1 id="content2" className="mt-[10rem]">Content 2</h1>

          
              </article>

              {/* Tags */}
              <div className=" mt-8 py-4 text-sm text-black text-[18px]">
                <hr className="h-2 w-6 rounded-3xl border-0 mt-0 mb-2 bg-black"></hr>

                <div className="flex justify-start items-center gap-2">
                  <p className="mb-1 font-semibold">Tags :</p>

                  <div className="flex gap-2 flex-wrap">
                    {blog.tags.map((tag, key) => (
                      <p key={key} className="rounded-2xl px-4 p-1 border-[1px] border-gray-500">
                        {tag}
                      </p>
                      
                    ))}
                  </div>

                </div>
              </div>


              {/* Written */}
              <div className="mt-8 mb-8 mb-md-0 text-black">

                <h2 className="text-[18px]">
                  Written by	
                </h2>

                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-3 mb-4 h-1"></div>

                    <article className="author-bio mb-5 mb-md-4">
                      <div className="flex gap-10">
                          
                          <div className="author-bio__avatar w-full max-w-[8rem] ">
                            <Image
                              src="/assets/Image/blog/written.png"
                              alt="Branching Out Banner"
                              width={800}
                              height={500}
                              className="w-full h-auto rounded-full"
                            />
                          </div>

                          <div>
                            <header className="">

                              <h3 className="text-[19px] text-bold mb-1">
                                <a href="https://github.blog/author/lclindeman/" className="text-black">Laura Lindeman</a>
                              </h3>

                              <p className="mb-0 f4 lh-condensed mt-3 text-blue-500">
                                  <a href="https://github.com/lclindeman" target="_blank">@lclindeman</a>
                              </p>
                            </header>

                            <div className="mt-5 text-slate-500">
                              <p>Laura Lindeman is a Blog Editor &amp; Strategist for the GitHub Blog, working with engineers, security practitioners, and product managers to clearly communicate complex technical concepts. She previously worked at Salesforce in employee engagement and technical recruitment marketing.</p>
                            </div>

                          </div>
                        </div>
                    </article>
            
              </div>

              {/* Comment */}
              <div className="mt-8 mb-8 mb-md-0 text-black">

                <h2 className="text-[18px]">
                  Comment
                </h2>

                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mt-3 mb-4 h-1"></div>

                    <article className="author-bio mb-5 mb-md-4">
                      <div className="flex gap-10">
                          
                          <div className="author-bio__avatar w-full max-w-[8rem] ">
                            <Image
                              src="/assets/Image/blog/written.png"
                              alt="Branching Out Banner"
                              width={800}
                              height={500}
                              className="w-full h-auto rounded-full"
                            />
                          </div>

                          <div>
                            <header className="">

                              <h3 className="text-[19px] text-bold mb-1">
                                <a href="https://github.blog/author/lclindeman/" className="text-black">Laura Lindeman</a>
                              </h3>

                              <p className="mb-0 f4 lh-condensed mt-3 text-blue-500">
                                  <a href="https://github.com/lclindeman" target="_blank">@lclindeman</a>
                              </p>
                            </header>

                            <div className="mt-5 text-slate-500">
                              <p>Laura Lindeman is a Blog Editor &amp; Strategist for the GitHub Blog, working with engineers, security practitioners, and product managers to clearly communicate complex technical concepts. She previously worked at Salesforce in employee engagement and technical recruitment marketing.</p>
                            </div>

                          </div>
                        </div>
                    </article>
            
              </div>

          </section>

          {/* Right */}
          <section className="w-full max-w-[20rem] px-5 flex flex-col mb-8 text-black ">


            <div className="flex gap-2 flex-wrap p-2 mt-8">
              {blog.tags.map((tag, key) => (
                <p key={key} className="rounded-2xl px-4 p-1 border-[1px] border-gray-500">
                  {tag}
                </p>
                
              ))}
            </div>

            <div className='flex flex-col gap-[4rem] sticky top-0 pt-8'>

              {/* Table Contain */}
              <div className="">
                  <header className="mb-5">
                      <h1 className="font-semibold text-[16px]">Table of Contents</h1>
                      <div className="border-b-gray-300 border-[1px] mt-1"></div>
                  </header>

                  <div className="flex flex-col gap-4  text-[12px]">
                      
                  {heading.map((h) => (
                    <div
                      key={h.heading}
                      onClick={() => {
                        const target = document.getElementById(h.heading)
                        if (target) {
                          target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                          })
                        }
                      }}
                      className={`p-2 px-4 cursor-pointer transition ${
                        activeSection === h.heading ? 'bg-[#eff2ff] text-black font-semibold rounded-lg' : ''
                      }`}
                    >
                      <p>{h.text}</p>
                    </div>
                  ))}


        
                  </div>

              </div>

              {/* Similiar Topic*/}
              <div className="">
                  <header className="mb-5">
                      <h1 className="font-semibold text-[16px]">More on {blog?.category}</h1>
                      <div className="border-b-gray-300 border-[1px] mt-1"></div>
                  </header>

                  <div className="flex flex-row gap-2 justify-center items-center text-[13px]">
                      
                      <div className="p-2"> 
                        
                        <p>Content 1</p>

                      </div>
                      <div className="p-2"> 
                        
                        <p>Content 1</p>

                      </div>
        
                  </div>

              </div>
              
            </div>
            
          </section>

        </div>

      </div>    
    
    </div>
  );
}
