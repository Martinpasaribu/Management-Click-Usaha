// extensions/FontSize.ts
import { Mark, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType
    }
  }
}

export const FontSize = Mark.create({

  name: 'fontSize',

  addOptions() {

    return {
      HTMLAttributes: {},
    }

  },

  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: element => element.style.fontSize.replace('px', ''),
        renderHTML: attributes => {
          if (!attributes.size) return {}
          return {
            style: `font-size: ${attributes.size}px`,
          }
        },
      },
    }
  },

  parseHTML() {
    return [{ style: 'font-size' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0]
  },

  addCommands() {

    return {
      setFontSize:
        (size: string) =>

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ({ commands } : any) => {
          return commands.setMark(this.name, { size })
        },
    }

  },
})
