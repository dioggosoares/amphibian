import { Editor } from '@tiptap/react'

interface FloatMenuProps {
  editor: Editor
}

export function FloatMenuItems({ editor }: FloatMenuProps) {
  const handleMenuItemClick = (command: () => void) => {
    return () => {
      const selection = editor.state.selection
      const from = selection.from - 1 // Posição do '/'

      // Verifica se o caractere '/' está antes da seleção e o remove
      if (editor.state.doc.textBetween(from, from + 1) === '/') {
        editor.commands.deleteRange({ from, to: from + 1 })
      }

      command()
    }
  }

  return (
    <>
      <button className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600">
        <img
          src="https://www.notion.so/images/blocks/text/en-US.png"
          alt="Text"
          className="w-12 rounded border border-zinc-600"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Text</span>
          <span className="text-xs text-zinc-300">
            Just start writing with plain text
          </span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/header.57a7576a.png"
          alt="Heading 1"
          className="w-12 rounded border border-zinc-600"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Heading 1</span>
          <span className="text-xs text-zinc-300">Big section heading</span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/subheader.9aab4769.png"
          alt="Heading 2"
          className="w-12 rounded border border-zinc-600"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Heading 3</span>
          <span className="text-xs text-zinc-300">Medium section heading</span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/subsubheader.d0ed0bb3.png"
          alt="Heading 3"
          className="w-12 rounded border border-zinc-600"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Heading 3</span>
          <span className="text-xs text-zinc-300">Small section heading</span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleBulletList().run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/bulleted-list.0e87e917.png"
          alt="Bulleted list"
          className="w-12 rounded border border-zinc-600 bg-white"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Bulleted list</span>
          <span className="text-xs text-zinc-300">
            Create a simples bullet list
          </span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleOrderedList().run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/numbered-list.0406affe.png"
          alt="Number list"
          className="w-12 rounded border border-zinc-600 bg-white"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Numbered list</span>
          <span className="text-xs text-zinc-300">Create a list numbering</span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleBlockquote().run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/quote/en-US.png"
          alt="Blockquote"
          className="w-12 rounded border border-zinc-600 bg-white"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Quote</span>
          <span className="text-xs text-zinc-300">Capture a quote</span>
        </div>
      </button>

      <button
        className="flex min-w-[280px] items-center gap-2 rounded p-1 hover:bg-zinc-600"
        onClick={handleMenuItemClick(() =>
          editor.chain().focus().toggleCodeBlock().run(),
        )}
      >
        <img
          src="https://www.notion.so/images/blocks/code.a8b201f4.png"
          alt="Code block"
          className="w-12 rounded border border-zinc-600 bg-white"
        />
        <div className="flex flex-col text-left">
          <span className="text-sm">Code</span>
          <span className="text-xs text-zinc-300">Capture a code snippet</span>
        </div>
      </button>
    </>
  )
}
