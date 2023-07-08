// import { Editor } from '@/components/ux/Editor'

import { Editor } from '@/components/ux/Editor'

export default function Home() {
  return (
    <div
      className="min-h-screen bg-gradient-to-r from-pink-500 via-red-500
      to-yellow-500 p-8 text-zinc-50"
    >
      <div
        className="mx-auto grid min-h-[700px] w-full max-w-7xl overflow-hidden
        rounded-xl border border-black/20 bg-white shadow-lg lg:grid-cols-[5rem_1fr]
        laptop-sm:grid-cols-[16rem_1fr] laptop-md:grid-cols-[16rem_1fr] 2xl:grid-cols-[16rem_1fr]"
      >
        <aside className="hidden flex-col gap-8 border-r border-r-zinc-100 bg-zinc-50 p-4 md:flex">
          <nav className="flex gap-2">
            <button className="h-3 w-3 rounded-full bg-zinc-300 hover:bg-red-400" />
            <button className="h-3 w-3 rounded-full bg-zinc-300 hover:bg-yellow-400" />
            <button className="h-3 w-3 rounded-full bg-zinc-300 hover:bg-green-400" />
          </nav>
        </aside>
        <main className="p-4">
          <Editor />
        </main>
      </div>
    </div>
  )
}
