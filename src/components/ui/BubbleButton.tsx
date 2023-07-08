import { ComponentProps, ReactNode } from 'react'

export interface BubbleButtonProps extends ComponentProps<'button'> {
  children: ReactNode
}

export function BubbleButton(props: BubbleButtonProps) {
  return (
    <button
      className="flex items-center gap-1.5 p-2 text-sm font-medium leading-none
      text-zinc-200 hover:bg-zinc-600 hover:text-zinc-50
      data-[active=true]:bg-zinc-600 data-[active=true]:text-orange-400"
      {...props}
    />
  )
}
