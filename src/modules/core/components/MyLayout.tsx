import {
  Button,
  useDisclosure,
} from "@heroui/react";
import { NavbarSidebar } from "./NavbarSidebar";
import { IoMenu } from "react-icons/io5";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { DropdownLanguage } from "./DropdownLanguage";
import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { HiOutlineBell } from "react-icons/hi2";
import { PiWalletDuotone } from "react-icons/pi";
import { FiCopy } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";


export const MyLayout = () => {

  const { user } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [height, setHeight] = useState(window.innerHeight);

  const path = pathname.split('/').slice(1);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const myHeight = height - 98;

  return (
    <div className="flex h-screen w-screen bg-bgcustom">

      {/* Sidebar */}
      <NavbarSidebar
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex w-full items-center p-4 lg:py-4 lg:pl-0">
          <div className="flex justify-between items-center w-full h-12 rounded-xl overflow-hidden shadow-lg bg-white">
            <div className="flex items-center">
              {/* Boton menu */}
              <Button isIconOnly aria-label="Like" onPress={onOpen} radius="full" variant="light" color="primary" className="lg:hidden flex">
                <IoMenu size={24} color="#909DAC"/>
              </Button>
              {/* titulo ruta */}
              <p className="text-[12px] lg:ml-4 font-semibold">{t(path)}</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Buscador */}
              <div className="hidden md:flex items-center h-8 bg-[rgba(245,247,253,1)] rounded-full px-4 py-1 w-full max-w-sm">
                <CiSearch  color="#909DAC" size={16}/>
                <input 
                  type="text" 
                  placeholder={t("search")} 
                  className="bg-transparent focus:outline-none w-full text-[12px] text-gray-700 placeholder-gray-400 pl-1"/>
              </div>
              {/* Notificaciones */}
              <div className="hidden xxs:flex cursor-pointer">
                <HiOutlineBell color="#909DAC" size={22} onClick={() => navigate("/notifications")}/>
              </div>
              {/* Seleciconar idioma */}
              <div className="hidden xxs:flex">
                <DropdownLanguage/>
              </div>
              {/* Wallet */}
              <div className="flex mr-4">
                <div className="mr-2">
                  <p className="text-[11px] leading-none text-end font-semibold">{t("wallet")}</p>
                  {
                    user?.wallet_bsc != null
                    ? <div className="flex items-center w-[100px] overflow-hidden">
                        <FiCopy size={12} className="mr-1"/>
                        <p className="text-[10px] leading-none whitespace-nowrap overflow-hidden text-end">
                          {user?.wallet_bsc} hsdbjdbuh
                        </p>
                      </div>
                    : <p className="text-[10px] text-end w-[60px] text-gray-400"> sin wallet</p>
                  }
                </div>
                <PiWalletDuotone size={26}/>
              </div>     
            </div>
          </div>
        </header>
        {/* Contenido dinámico */}
        <div className="flex h-full w-full px-4 pb-4 lg:pl-0">
          <div className="flex flex-1 overflow-auto" style={{height: myHeight}}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}
