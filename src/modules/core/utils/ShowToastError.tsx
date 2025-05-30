import { addToast, cn } from '@heroui/react'

interface Props {
    title: string,
    description: string
}

export const showToastError = ({title, description}: Props): void => {
  addToast({
    title: title,
    description: description,
    color: "danger",
    classNames: {
      base: cn([
        "bg-[#f31260] dark:bg-[#f31260] shadow-sm",
        // "border border-l-8 rounded-md rounded-l-none",
        "rounded-md",
        "flex flex-col items-start",
        "text-white",
      ]),
      icon: "w-6 h-6 fill-current text-white",
    },
  });
}
