import { useTranslation } from "react-i18next";
import { ItemMemberships, ItemsInvoice } from "../components";
import { CiSearch } from "react-icons/ci";
import { useEffect } from "react";
import { useMembership } from "../hooks";
import { formatCurrency } from "../../core/helpers/FormatCurrency";
import { formatDate } from "../../core/helpers/FormatDate";

const memberships = [
  {
    "id": 1,
    "name": "STARTER",
    "price": "Free",
    "available_spots": null,
    "total_spots": null,
    "features": [
      "Acceso a formación Básica",
      "Acceso a inversiones Parcial",
      "Soporte Estándar"
    ],
  },
  {
    "id": 2,
    "name": "SMART",
    "price": "$200 USDT",
    "available_spots": 1123,
    "total_spots": 1500,
    "features": [
      "All professional features +",
      "Enterprise security suite",
      "Single Sign-On (SSO)",
      "Custom contract terms",
      "Dedicated phone support",
      "Custom integration support",
      "Compliance tools"
    ],
  },
  {
    "id": 3,
    "name": "VIP",
    "price": "$1000 USDT",
    "available_spots": 324,
    "total_spots": 1000,
    "features": [
      "All professional features +",
      "Enterprise security suite",
      "Single Sign-On (SSO)",
      "Custom contract terms",
      "Dedicated phone support",
      "Custom integration support",
      "Compliance tools"
    ],
  }
]

const history = [
  {
    "date": "04/29/2025",
    "transaction_id": "T90151001498-042925",
    "amount": "$1000 USDT"
  },
  {
    "date": "03/29/2025",
    "transaction_id": "T90151001498-042925",
    "amount": "$1000 USDT"
  },
  {
    "date": "02/29/2025",
    "transaction_id": "T90151001498-042925",
    "amount": "$1000 USDT"
  },
  {
    "date": "01/29/2025",
    "transaction_id": "T90151001498-042925",
    "amount": "$1000 USDT"
  },
  {
    "date": "12/29/2024",
    "transaction_id": "T90151001498-042925",
    "amount": "$1000 USDT"
  },
  {
    "date": "11/29/2024",
    "transaction_id": "T90151001498-042925",
    "amount": "$1000 USDT"
  }
]

export const MembershipPage = () => {

  const { t } = useTranslation();
  const { payments, loadPayments } = useMembership();

  useEffect(() => {
    loadPayments();
  }, [])
  
  return (
    <div className="flex flex-col my:grid my:grid-cols-3 my:grid-rows-2 gap-2 w-full h-full">
      {/* Facturación */}
      <div className="rounded-xl my:overflow-hidden p-3 border-[1px] border-gray-300 bg-white">
        <div className="flex w-full h-full flex-col">
          <p className="text-[20px] font-bold mb-12">{t("billing")}</p>
          <ItemsInvoice 
            membership={payments[0]?.membership} 
            amount={formatCurrency(parseFloat(payments[0]?.amount.$numberDecimal))} 
            paymentCompleted={formatDate(payments[0]?.createdAt)} 
          />
        </div>
      </div>
      {/* Membership */}
      <div className="rounded-xl my:overflow-auto p-3 border-[1px] border-gray-300 bg-white lg:col-span-2 lg:row-span-2">
        <p className="text-[20px] font-bold mb-4">{t("memberships")}</p>
        <p className="text-[12px] mb-12">{t("slogan").toUpperCase()}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          {
            memberships.map((item) => (
              <ItemMemberships
                name={item.name}
                price={item.price}
                available_spots={item.available_spots}
                total_spots={item.total_spots}
                features={item.features} 
                cta_disabled={payments[0]?.membership == item.name}              
              />
            ))
          }
        </div>
      </div>
      {/* Historico */}
      <div className="rounded-xl my:overflow-auto p-3 border-[1px] border-gray-300 bg-white">
        <p className="text-[20px] font-bold mb-6">{t("history")}</p>
        <div className="flex items-center h-8 bg-[rgba(245,247,253,1)] rounded-full px-4 py-1 w-full mb-8">
          <CiSearch  color="#909DAC" size={16}/>
          <input 
            type="text" 
            placeholder={t("search")} 
            className="bg-transparent focus:outline-none w-full text-[12px] text-gray-700 placeholder-gray-400 pl-1"/>
        </div>
        {
          history.map((item, index) => (
            <div key={index+1} className="flex justify-between items-center my-4">
              <p className="text-[10px]">{item.date}</p>
              <p className="text-[10px] hidden xxs:block">{item.transaction_id}</p>
              <p className="text-[10px]">{item.amount}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
