'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { FontFamily } from '@/extensions/FontFamiliy'
import { FontSize } from '@/extensions/FontSize'
import { CustomImage } from '@/extensions/CustomImage'
import { BubbleMenu } from '@tiptap/react'
import { NodeSelection } from 'prosemirror-state'


import "../../styles/globals.css";

import {

  Bold as BoldIcon,
  Italic as ItalicIcon,
  Heading1,
  Heading2,
  Undo2,
  Redo2,
  Images,
  List as BulletIcon,
  ListOrdered,
  Underline as UnderlineIcon,
  
} from 'lucide-react'

const buttonClass = (active = false) =>
  `p-2 border rounded-md ${
    active ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
  } hover:bg-blue-100 transition`;

export default function Editor({
  content,
  onChange,
  onSubmit,
  loading,
}: {
  content: string
  loading: boolean
  onChange: (value: string) => void
  onSubmit: () => void
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      BulletList,
      OrderedList,
      ListItem,
      TextStyle,
      FontSize,
      FontFamily,
      CustomImage,
    ],

    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  

  if (!editor) return null

  return (
    <div className="">

  
      <div className="sticky top-0 z-40 bg-white pt-10 py-2">
        
        <div className='flex flex-col bg-[#202830] gap-4 space-y-4 rounded-lg '>
          
        <div className='w-full flex justify-end pt-5 px-5'>
          <button
            onClick={onSubmit}
            disabled={loading}
            className={`px-4 py-2 rounded text-white flex items-center gap-2
              ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-blue-700'}
            `}
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Menyimpan...
              </>
            ) : (
              <>Simpan Artikel</>
            )}
          </button>
        </div>


          {/* Toolbar */}
          <div className='flex'>

            <div className='flex flex-wrap gap-2 p-5 w-full'>

              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={buttonClass(editor.isActive('bold'))}
                title="Bold"
              >
                <BoldIcon size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={buttonClass(editor.isActive('italic'))}
                title="Italic"
              >
                <ItalicIcon size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={buttonClass(editor.isActive('underline'))}
                title="Underline"
              >
                <UnderlineIcon size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 1 }))}
                title="Heading 1"
              >
                <Heading1 size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={buttonClass(editor.isActive('heading', { level: 2 }))}
                title="Heading 2"
              >
                <Heading2 size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={buttonClass(editor.isActive('bulletList'))}
                title="Bullet List"
              >
                <BulletIcon size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={buttonClass(editor.isActive('orderedList'))}
                title="Ordered List"
              >
                <ListOrdered size={16} />
              </button>

                 
              <select
                defaultValue="16"
                className="border rounded px-2 py-1 text-sm"
                onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
              >
                <option value="12">12px</option>
                <option value="14">14px</option>
                <option value="16">16px</option>
                <option value="18">18px</option>
                <option value="24">24px</option>
                <option value="32">32px</option>
              </select>

              <select
                defaultValue="Arial"
                onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Verdana">Verdana</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Comic Sans MS">Comic Sans MS</option>
              </select>

              <label className={buttonClass()}>
                <Images size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return

                    const reader = new FileReader()
                    reader.onload = () => {
                      const base64 = reader.result?.toString()
                      if (base64) {
                        editor.chain().focus().setImage({
                          src: base64,
                          width: '300',
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        } as any).run()
                      }
                    }
                    reader.readAsDataURL(file)
                  }}
                  className="hidden"
                />
              </label>   

              <button
                onClick={() => {
                  const imageUrl = prompt('Masukkan URL gambar:')
                  if (imageUrl) {
                    editor
                      .chain()
                      .focus()
                      .insertContent(`<img src="${imageUrl}" style="width: 300px; display: inline-block;" />`)
                      .run()
                  }
                }}
                className={buttonClass()}
                title="Sisipkan Gambar dari URL"
              >
                🌐 Gambar via URL
              </button>

            </div>
            
            {/* Undo & Rudo */}
            <div className='flex-center gap-5 w-full max-w-[10rem]'>
              <button
                onClick={() => editor.chain().focus().undo().run()}
                className={buttonClass()}
                title="Undo"
              >
                <Undo2 size={16} />
              </button>
              <button
                onClick={() => editor.chain().focus().redo().run()}
                className={buttonClass()}
                title="Redo"
              >
                <Redo2 size={16} />
              </button>
            </div>
            

          </div>

        </div>

      </div>

      {/* Editor */}

      <div className="border-[2px] rounded min-h-[150px] mt-5 p-4 bg-white">
        <EditorContent editor={editor} />
      </div>


      {editor && (
        <BubbleMenu
          editor={editor}
          tippyOptions={{ duration: 100 }}
      shouldShow={({ editor }) => {
        const { state } = editor.view
        const selection = state.selection

        // Cek apakah ini NodeSelection (biasanya saat gambar diklik)
        if (selection instanceof NodeSelection) {
          const node = selection.node
          return node.type.name === 'customImage'
        }

        return false
      }}
          className="flex gap-2 bg-white border p-2 rounded shadow-md"
        >
          <button
            onClick={() => {
              const attrs = editor.getAttributes('customImage')

              if (attrs?.src) {
                editor.chain().focus().setImage({
                  src: attrs.src,
                  width: '200',
                  float: attrs.float || 'none',
                }).run()
              }
            }}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            200px
          </button>
          <button
            onClick={() => {
      const attrs = editor.getAttributes('customImage')

      if (attrs?.src) {
        editor.chain().focus().setImage({
          src: attrs.src,
          width: '300',
          float: attrs.float || 'none',
        }).run()
      }
            }}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            300px
          </button>
          <button
            onClick={() => {
      const attrs = editor.getAttributes('customImage')

      if (attrs?.src) {
        editor.chain().focus().setImage({
          src: attrs.src,
          width: '500',
          float: attrs.float || 'none',
        }).run()
      }
            }}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            500px
          </button>
          <button
            onClick={() => {

              const attrs = editor.getAttributes('customImage')

      if (attrs?.src) {
        editor.chain().focus().setImage({
          src: attrs.src,
          width: attrs.width || '300',
          float: 'left',
        }).run()
      }

            }}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Float Left
          </button>
          <button
            onClick={() => {
      const attrs = editor.getAttributes('customImage')

      if (attrs?.src) {
        editor.chain().focus().setImage({
          src: attrs.src,
          width: attrs.width || '300',
          float: 'right',
        }).run()
      }

            }}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            Float Right
          </button>
          <button
            onClick={() => {
      const attrs = editor.getAttributes('customImage')

      if (attrs?.src) {
        editor.chain().focus().setImage({
          src: attrs.src,
          width: attrs.width || '300',
          float: 'none',
        }).run()
      }

            }}
            className="px-2 py-1 text-sm border rounded hover:bg-gray-100"
          >
            No Float
          </button>
          <button
            onClick={() => {
              editor.chain().focus().deleteSelection().run()
            }}
            className="px-2 py-1 text-sm border rounded text-red-500 hover:bg-red-100"
          >
            Hapus
          </button>
        </BubbleMenu>
      )}

    </div>
  )
}
