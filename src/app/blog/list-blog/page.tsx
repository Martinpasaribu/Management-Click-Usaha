"use client"

import { Blog } from '@/models/blog/blog_models'
import { Eye, EyeClosed, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useMemo } from 'react'




const ListPage = () => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [blog, setBlog] = useState<Blog[]>([])

    const [filters, setFilters] = useState({
        category: '',
        date: '',
        env: 'All Environments',
        status: 'Status',
    })


    useEffect(() => {
        
      const fetchDataAndCheckPopup = async () => {
        try {
          const res = await fetch('/api/blog/get-all-blog'); // ⬅️ ambil data dari API internal
          const data = await res.json();
          setBlog(data.data)
            console.log('Data Blog yang di fetch :', data)
        
          
        } catch (error) {
          console.error('Fetch failed:', error);
        }
      };
    
      fetchDataAndCheckPopup();
    }, []);
    

    // const deployments = useMemo(() => (
    //     [
    //             {
    //     id: '5hLrXD4fr',
    //     branch: 'main',
    //     status: 'Pending',
    //     env: 'Production',
    //     timeAgo: '22h ago',
    //     date: '2025-06-24',
    //     view: 12,
    //     comment:{
    //         qty:12,
    //         keyComment:'C12lkQ22'
    //     },
    //     author: 'Donipratama',
    // },
    // {
    //     id: 'DoSx2BZGq',
    //     branch: 'main',
    //     status: 'Ready',
    //     env: 'Production',
    //     timeAgo: '1d ago',
    //     date: '2025-06-23',
    //     author: 'Martinpasaribu',
    // },
    // {
    //     id: 'FailedXYZ12',
    //     branch: 'dev',
    //     status: 'Ready',
    //     env: 'Staging',
    //     timeAgo: '2d ago',
    //     date: '2025-06-22',
    //     author: 'Martinpasaribu',
    // },
    //     ]
    // ), [])


    const filteredDeployments = useMemo(() => {
        return blog.filter((d) => {
            return (
            (filters.category === '' || d.category.includes(filters.category)) &&
            // (filters.date === '' || d.date === filters.date) &&
            // (filters.env === 'All Environments' || d.env === filters.env) &&
            (filters.status === 'Status' || d.status === filters.status)
            )
        })
    }, [blog, filters])


  return (
    <div>
        
        <div className="min-h-screen w-full max-w-5xl mx-auto">

            <div className='p-4 bg-[#202830] text-gray-200 my-5 rounded-lg'>

                <h1 className="text-2xl font-bold text-color1 bg-brand">List Blog</h1>
                <p>Atur blog anda</p>

            </div>


            <div className="mx-auto my-6 mt-10 min-h-[calc(100vh-366px)] w-[var(--geist-page-width-with-margin)] max-w-full px-6 md:min-h-[calc(100vh-273px)]">


                <div className="flex flex-wrap items-center gap-4 justify-between mb-2">

                    <div className="flex gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="All Branches…"
                        className="px-3 py-2 border-gray-300 border-[1px] rounded text-sm w-48"
                        value={filters.category}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, category: e.target.value }))
                        }
                    />

                    <input
                        type="date"
                        className="px-3 py-2 border-gray-300 rounded border-[1px] text-sm"
                        value={filters.date}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, date: e.target.value }))
                        }
                    />

                    <select
                        className="px-7 py-2 border-gray-300 rounded border-[1px] text-sm"
                        value={filters.env}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, env: e.target.value }))
                        }
                    >
                        <option>All Environments</option>
                        <option>Production</option>
                        <option>Staging</option>
                    </select>

                    <select 
                        className="px-7 py-2 border-gray-300 rounded border-[1px] text-sm"
                        value={filters.status}
                        onChange={(e) =>
                        setFilters((prev) => ({ ...prev, status: e.target.value }))
                        }
                    >
                        <option>Status</option>
                        <option>Ready</option>
                        <option>Failed</option>
                    </select>
                    </div>

                </div>

                <div className="border-[1px] border-gray-300 rounded-md mt-10">
                    {filteredDeployments.map((deploy,index) => (
                        <div
                            key={deploy.id}
                            className="flex justify-between items-center px-4 py-2 hover:bg-gray-50"
                        >
                            <div className=" w-full flex items-center gap-4">
                                {/* <div className="w-full max-w-[12rem] font-mono text-sm">{deploy.id}</div> */}
                                <div>{ index +1} </div>
                                <div className="text-sm text-gray-600">
                                    <p className="font-semibold">{deploy.slug}</p>

                                    <div className='flex-center gap-4 text-[12px]'>
                                        <p className="text-xs">
                                            {deploy.status} • {deploy.category}
                                        </p>
                                        <p className="text-xs">
                                            {/* {deploy.status} • {deploy.timeAgo} */}
                                        </p>
                                        <figure className='flex-center gap-1'>
                                            <p>{ deploy.view }</p>
                                            <Eye size='12' color='#9f23e1'/>
                                        </figure>
                                        <figure className='flex-center gap-1'>
                                            {/* <p>{ deploy.comment?.qty }</p> */}
                                            <MessageCircle size='12' color="#AAB347E1" />
                                        </figure>
                                    </div>
                                </div>

                            </div>

                            <div className="flex w-full max-w-[15rem] items-center gap-2 text-[11px] text-gray-500">
                                <div className="font-medium">
                                    {deploy.status === 'Pending' && (
                                        <h1 className="text-yellow-500">Pending</h1>
                                    )}
                                    {deploy.status === 'Ready' && (
                                        <h1 className="text-green-500">Ready</h1>
                                    )}
                                    {deploy.status === 'Failed' && (
                                        <h1 className="text-red-500">Failed</h1>
                                    )}
                                </div>

                                <span className='w-full max-w-[10rem]'>by {deploy.author}</span>
                            </div>

                            <div>
                                <Link href={`/blog/preview/${deploy.slug}?id=${deploy.id}`}>
                                    <EyeClosed size={15} />
                                </Link>
                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </div>
  
    </div>
  )
}

export default ListPage