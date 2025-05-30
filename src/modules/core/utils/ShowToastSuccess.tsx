import { addToast, cn } from '@heroui/react'

interface Props {
    title: string,
    description: string
}

export const showToastSuccess = ({title, description}: Props): void => {
  addToast({
    title: title,
    description: description,
    color: "success",
    classNames: {
      base: cn([
        "bg-[#17C964] dark:bg-[#17C964] shadow-sm",
        // "border border-l-8 rounded-md rounded-l-none",
        "rounded-md",
        "flex flex-col items-start",
        "text-white",
      ]),
      icon: "w-6 h-6 fill-current text-white",
    },
  });
}
