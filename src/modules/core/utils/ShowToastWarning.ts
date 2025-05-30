import { addToast, cn } from '@heroui/react'

interface Props {
    title: string,
    description: string
}

export const showToastWarning = ({ title, description }: Props): void => {
  addToast({
    title,
    description,
    color: "danger",
    classNames: {
      base: cn([
        "bg-[#f5a524] dark:bg-[#f5a524] shadow-sm",
        "rounded-md",
        "flex flex-col items-start",
        "text-white",
      ]),
      icon: "w-6 h-6 fill-current text-white",
    },
  });
}
