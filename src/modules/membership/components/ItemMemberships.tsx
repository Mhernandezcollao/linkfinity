import { useTranslation } from "react-i18next";
import { HiOutlineBadgeCheck } from "react-icons/hi";

interface Props {
    name: string,
    price: string,
    available_spots: number | null,
    total_spots: number | null,
    features: string[],
    cta_disabled: boolean
}

export const ItemMemberships = ({name, price, available_spots, total_spots, features, cta_disabled}: Props) => {

  const { t } = useTranslation();

  return (
    <div 
      className="flex flex-col h-full sm:min-h-[520px] justify-between p-6 rounded-lg w-full"
      style={{border: cta_disabled ? "1px solid #EFB810" : "1px solid #e5e7eb"}}
    >
      <div>
        <div className="h-16 w-16 rounded-2xl bg-gray-300" />
        <p className="font-bold text-[12px] mt-3">{name}</p>
        {
          available_spots === null
          ? <p className="text-[10px]">{t("available_slots")}</p>
          : <p className="text-[10px]">{t("remaining_slots_1")} {available_spots}/{total_spots} {t("remaining_slots_2")}</p>
        }
        <p className="text-[20px] font-bold my-4">{price}</p>
        <div>
          {
            features.map((feature, index)=>(
              <div key={index} className="flex my-2">
                <HiOutlineBadgeCheck className="mr-2"/>
                <p className="text-[10px]">{feature}</p>
              </div>
            ))
          }
        </div>
      </div>
      <button  
        className="w-full rounded-full py-[6px] text-[11px] text-white mt-[40px] sm:mt-none" 
        style={{backgroundColor: cta_disabled ? "#CCCCCC" : "#2E4CB7"}}
      >
        {t("upgrade_to")} {name}
      </button>
    </div>
  )
}
