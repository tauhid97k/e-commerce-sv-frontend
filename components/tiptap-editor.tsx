'use client'

import { cn } from '@/lib/utils'
import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Code,
  Undo,
  Redo,
  Highlighter,
  SuperscriptIcon,
  SubscriptIcon,
} from 'lucide-react'

// Editor Toolbar
const Toolbar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <div className="p-2 flex gap-2 flex-wrap border-b">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('bold')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Bold className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('italic')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Italic className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('heading', { level: 1 })
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Heading1 className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('heading', { level: 2 })
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Heading2 className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('subscript')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <SubscriptIcon className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('superscript')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <SuperscriptIcon className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('highlight')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Highlighter className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('bulletList')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <List className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('orderedList')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <ListOrdered className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('strike')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Strikethrough className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('code')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Code className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('undo')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Undo className="size-5" />
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className={cn(
          'p-2 rounded',
          editor.isActive('undo')
            ? 'bg-light-200 text-dark-300'
            : 'hover:bg-light-100'
        )}
      >
        <Redo className="size-5" />
      </button>
    </div>
  )
}

// Editor
const TipTapEditor = ({
  content,
  onChange,
}: {
  content: string
  onChange: (richText: string) => void
}) => {
  const editor = useEditor({
    extensions: [StarterKit, Superscript, Subscript, Highlight],
    immediatelyRender: false,
    content,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'focus-visible:outline-none h-[220px]',
      },
    },
  })

  return (
    <div className="rounded-md border shadow-sm">
      <Toolbar editor={editor} />
      <div className="max-h-[244px] p-3 overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default TipTapEditor
