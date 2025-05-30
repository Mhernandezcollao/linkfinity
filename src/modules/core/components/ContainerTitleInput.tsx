import type { JSX } from "react"

interface Props {
    title: string,
    children: JSX.Element | JSX.Element[]
}

export const ContainerTitleInput = ({title, children}: Props) => {
  return (
    <div className='sm:flex flex-row w-full justify-between mb-[28px]'>
        <div className='flex w-full max-w-[180px] sm:mb-none mb-[10px]'>
            <p className='text-[12px]'>{title}</p>
        </div>
        {children}
    </div>
  )
}
