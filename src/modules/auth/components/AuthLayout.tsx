import ImageCard from "../../../assets/images/image.png"
import BackgoundAuth from "../../../assets/images/backgound_auth.jpg"
import DarkLogo from "../../../assets/images/dark_background_logo.png"
import { useTranslation } from "react-i18next"
import type { JSX } from "react"
import { Image } from "@heroui/react"
import { Copyright } from "./Copyright"
import { DropdownLanguage } from "../../core/components/DropdownLanguage"

interface Props {
 children: JSX.Element | JSX.Element[]
}

export const AuthLayout = ({children}: Props) => {

    const { t } = useTranslation();
    return (
      <div className="relative">
        <div className="absolute right-0 m-3">
          <DropdownLanguage/>
        </div>
        <div className=' flex justify-center items-center w-screen h-screen bg-cover bg-center' style={{ backgroundImage: `url(${BackgoundAuth})` }}>
          <div className="flex w-full max-w-[1200px] mx-[20px] h-full max-h-[680px] rounded-3xl overflow-hidden shadow-[1px_0px_36px_10px_rgba(54,106,158,0.75)]" style={{border: "2px solid rgba(54, 106, 158, 1)"}}>
            <div 
              className="hidden lg:flex flex-1 bg-cover bg-center"
              style={{ backgroundImage: `url(${ImageCard})` }}
            />
            <div className="flex flex-1 justify-center items-center" style={{backgroundColor: "rgba(21, 54, 102, .9)"}}>
              <div className="flex flex-col justify-between items-center w-full h-full max-w-[360px] py-[86px]">
                <Image
                  alt="HeroUI hero Image"
                  src={DarkLogo}
                  width={200}
                />
                <div className="w-full px-[20px]">
                  {children}
                </div>
                <Copyright text={`© 2025 LinkFinity. ${t("rights_reserved")}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}
