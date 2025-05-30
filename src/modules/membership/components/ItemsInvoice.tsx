import { useTranslation } from 'react-i18next';
import { IoCheckmark } from 'react-icons/io5';

interface Props {
  membership: string,
  amount: string,
  paymentCompleted: string
}

export const ItemsInvoice = ({membership, amount, paymentCompleted}: Props) => {
  
  const { t } = useTranslation();

  return (
    <div className="flex flex-col h-full w-full justify-between">
      <div className="flex justify-between py-2 px-2">
        <p className="text-[12px]">{t("your_plan")}</p>
        <p className="text-[12px]">{membership}</p>
      </div>
      <div className="flex justify-between py-2 px-2">
        <p className="text-[12px]">{t("billing_cycle")}</p>
        <p className="text-[12px]">Mensual</p>
      </div>
      <div className="flex justify-between py-2 px-2">
        <p className="text-[12px]">{t("payment_completed")}</p>
        <p className="text-[12px]">{paymentCompleted}</p>
      </div>
      <div className="flex justify-between py-2 px-2">
        <p className="text-[12px]">{t("total")}</p>
        <p className="text-[12px]">{amount}</p>
      </div>
      <div className="flex justify-between py-2 bg-bginput px-2 rounded-md">
        <p className="text-[12px]">{t("status")}</p>
        <div className='flex items-center'>
          <p className="text-[12px] mr-1">Activo</p>
          <IoCheckmark className='text-green-400' size={18}/>
        </div>
      </div>
    </div>
  )
}
