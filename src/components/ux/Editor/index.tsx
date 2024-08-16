'use client'

import { useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { motion } from 'framer-motion'
import {
  useEditor,
  EditorContent,
  BubbleMenu,
  FloatingMenu,
} from '@tiptap/react'
import {
  RxFontBold,
  RxFontItalic,
  RxStrikethrough,
  RxCode,
  RxChevronDown,
  RxChatBubble,
  RxLink1,
} from 'react-icons/rx'

import StarterKit from '@tiptap/starter-kit'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'

import { lowlight } from 'lowlight'
import ts from 'highlight.js/lib/languages/typescript'

import { initialContent } from '@/content/initial'
import { BubbleButton } from '@/components/ui/BubbleButton'

import { FloatMenuItems } from '../FloatMenuItems'

import 'highlight.js/styles/monokai-sublime.css'
import './styles/placeholder.css'

lowlight.registerLanguage('ts', ts)

export function Editor() {
  const [linkName, setLinkName] = useState('')
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  function handleClosePopover() {
    setIsPopoverOpen(false)
  }

  function handleLinkOnText() {
    if (!editor?.isActive('link') && linkName.trim() !== '') {
      editor?.commands.setLink({
        href: linkName,
        target: '_blank',
      })
      handleClosePopover()
    } else if (editor?.isActive('link') && linkName.trim() === '') {
      editor?.commands.unsetLink()
      setLinkName('')
      handleClosePopover()
    } else if (editor?.isActive('link') && linkName.trim() !== '') {
      handleClosePopover()
    }
  }

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
        document: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Document.extend({
        content: 'heading block*',
      }),
      Link.configure({
        autolink: false,
        openOnClick: true,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
          class: 'cursor-pointer',
        },
      }),
      CodeBlock.configure({
        languageClassPrefix: 'language-',
        exitOnTripleEnter: true,
        exitOnArrowDown: true,
        HTMLAttributes: {
          class: 'typescript',
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return 'Untitled'
          }

          return "Type '/' to see commands"
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      editor.getHTML()
    },
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'prose prose-pink mx-auto max-w-[700px] pt-16 outline-none',
      },
    },
  })

  return (
    <>
      <EditorContent editor={editor} />
      {editor && (
        <FloatingMenu
          editor={editor}
          shouldShow={({ state }) => {
            const { $from } = state.selection
            const currentLineText = $from.nodeBefore?.textContent

            return currentLineText === '/'
          }}
          className="flex flex-col gap-1 overflow-hidden rounded-lg border
        border-zinc-600 bg-zinc-700 px-2 py-2 shadow-xl shadow-black/20"
        >
          <span className="border-b border-b-zinc-100 py-2 pl-1 text-sm">
            Basic blocks
          </span>
          <FloatMenuItems editor={editor} />
        </FloatingMenu>
      )}
      {editor && (
        <BubbleMenu
          className="flex divide-x divide-zinc-600 overflow-hidden rounded-lg border
          border-zinc-600 bg-zinc-700 shadow-xl shadow-black/20"
          editor={editor}
        >
          <BubbleButton>
            Text
            <RxChevronDown className="h-4 w-4" />
          </BubbleButton>
          <BubbleButton>
            <RxChatBubble className="h-4 w-4" />
            Comment
          </BubbleButton>
          <div className="flex items-center divide-x divide-zinc-600">
            <BubbleButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              data-active={editor.isActive('bold')}
            >
              <RxFontBold className="h-4 w-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              data-active={editor.isActive('italic')}
            >
              <RxFontItalic className="h-4 w-4" />
            </BubbleButton>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              data-active={editor.isActive('strike')}
            >
              <RxStrikethrough className="h-4 w-4" />
            </BubbleButton>
            <Popover.Root open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <Popover.Trigger>
                <BubbleButton data-active={editor.isActive('link')}>
                  <RxLink1 className="h-4 w-4" />
                </BubbleButton>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content className="" align="center" sideOffset={4}>
                  <Popover.Arrow className="fill-zinc-200 transition-all delay-200 ease-linear" />
                  <motion.div
                    className="flex w-max gap-2 rounded-lg bg-zinc-200 p-2 shadow-md"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: 'backInOut' }}
                  >
                    <input
                      type="text"
                      className="flex h-7 max-w-[200px] border-none p-1 text-zinc-800
                    focus:outline-none"
                      value={linkName}
                      onChange={(e) => setLinkName(e.target.value)}
                      placeholder="http://exemplo.com/"
                    />
                    <button
                      className="flex rounded-md bg-zinc-600 px-2 py-1 text-sm text-zinc-200 hover:bg-zinc-500"
                      onClick={handleLinkOnText}
                    >
                      Selecionar
                    </button>
                  </motion.div>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            <BubbleButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              data-active={editor.isActive('code')}
            >
              <RxCode className="h-4 w-4" />
            </BubbleButton>
          </div>
        </BubbleMenu>
      )}
    </>
  )
}
