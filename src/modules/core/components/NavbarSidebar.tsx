import { useLocation, useNavigate } from "react-router-dom";
import { Drawer, DrawerContent } from "@heroui/drawer";
import { useTranslation } from "react-i18next";
import { Image, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import LogoLight from "../../../assets/images/light_background_logo.png"
import { TbUserSquare } from "react-icons/tb";
import { HiOutlineAcademicCap, HiOutlineBuildingStorefront } from "react-icons/hi2";
import { PiUsersFourLight } from "react-icons/pi";
import { CiBadgeDollar } from "react-icons/ci";
import { IoBookOutline } from "react-icons/io5";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { ActionsUser } from "./ActionsUser";
import { useDummyUser } from "../hooks/useDummyUser";
import { useEffect, useState } from "react";
import { HiOutlineBell } from "react-icons/hi2";


interface Props {
  isOpen: boolean
  onOpenChange: () => void
}

const Routes = [
  {
    category: "General", // Título para el grupo de ítems
    items: [
      {
        name: "membership",
        path: "/membership",
        icon: <TbUserSquare size={16} />,
      },
      {
        name: "academy",
        path: "/academy",
        icon: <HiOutlineAcademicCap size={18} />,
      },
      {
        name: "marketplace",
        path: "/marketplace",
        icon: <HiOutlineBuildingStorefront size={16} />,
      },
      {
        name: "my-guests",
        path: "/my-guests",
        icon: <PiUsersFourLight size={18} />,
      },
      {
        name: "my-finances",
        path: "/my-finances",
        icon: <CiBadgeDollar size={18} />,
      },
    ],
  },
  // {
  //   category: "Configuraciones", // Título para el grupo de ítems
  //   items: [
  //     {
  //       name: "salaries",
  //       path: "/salaries",
  //       icon: <FaHandHoldingDollar color="#0098E5" size={16} />,
  //     },
  //   ],
  // },
]

export const NavbarSidebar = ({
  isOpen,
  onOpenChange
}: Props) => {

  const { dummyUser, loadDummyUser } = useDummyUser();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpenPopover, setIsOpenPopover] = useState(false);

  useEffect(() => {
    loadDummyUser()
  }, [])
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        onOpenChange();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, onOpenChange]);

  const navigateToPath = (path: string) => {
    navigate(path);
  }

  return (
    // <aside className={`${styles.sidebar} ${isOpen ? styles.visible : ''}`} >¨
    <>
      <aside className="lg:flex flex-col lg:w-[270px] hidden p-4">
        <div className="flex h-full flex-col justify-between rounded-xl overflow-hidden shadow-lg bg-white">
          <div>
            {/* Logo */}
            <div className="flex items-center justify-center py-10 w-full">
              <Image
                alt="HeroUI hero Image"
                className="object-contain rounded-none"
                src={LogoLight}
                width={140}
              />
            </div>
            {/* Avatar usuario */}
            <Popover isOpen={isOpenPopover} onOpenChange={(open) => setIsOpenPopover(open)} backdrop="blur">
              <PopoverTrigger>
                <div className="flex items-center justify-start cursor-pointer py-4 ml-4">
                  <div className="felx h-10 w-10 rounded-full bg-red-400 border-[2px] border-green-500 overflow-hidden">
                    <img src={dummyUser?.profile_picture} alt=""  className="w-full h-full object-cover"/>
                  </div>
                  <div className="flex flex-col h-full justify-center items-start mx-[10px] cursor-pointer">
                    <p className="text-[13px] leading-none font-semibold">{dummyUser?.firstname} {dummyUser?.lastname}</p>
                    <p className="text-[11px] text-graylight leading-none">{dummyUser?.is_admin ? "Admin" : "@" + dummyUser?.username}</p>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <ActionsUser/>
              </PopoverContent>
            </Popover>
            {/* Sidebar Navigation */}
            <nav className="px-[10px]">
              {Routes.map((menu, index) => (
                <div key={index}>
                  {/* <div className={`w-full mb-[8px] px-[24px] ${index > 0 ? 'mt-[32px]' : ''}`}>
                    <p className="text-[12px] font-semibold text-[#909DAC] tracking-wider">{menu.category}</p>
                  </div> */}
                  {menu.items.map((item) => (
                    <a
                      key={item.path}
                      className={`flex items-center px-[10px] my-[12px] h-[46px] hover:bg-[#c5e4ff] cursor-pointer rounded-md ${pathname === item.path && 'bg-gradient-to-r from-skycustom to-royalDark'}`}
                      style={{ textDecoration: "none" }}
                      onClick={() => navigateToPath(item.path)}
                    >
                      <div 
                        className={`flex h-[35px] w-[35px] justify-center items-center mr-[10px] text-graylight ${pathname === item.path && 'text-white'}`}
                      >
                        {item.icon}
                      </div>
                      <p 
                        className={`flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-[#44586E] select-none ${pathname === item.path && 'text-white'}`}
                      >
                        {t(item.name)}
                      </p>
                    </a>
                  ))}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex h-16 justify-center items-center gap-5">
            <div className="flex justify-center items-center h-9 w-9 rounded-full bg-royalDark">
              <IoBookOutline color="white" size={18}/>
            </div>
            <div className="flex justify-center items-center h-9 w-9 rounded-full bg-royalDark">
              <TfiHeadphoneAlt color="white" size={18}/>
            </div>
            <div className="flex justify-center items-center h-9 w-9 rounded-full bg-red-500">
              <RiLogoutBoxRLine color="white" size={18}/>
            </div>
          </div>
        </div>
      </aside>
      <Drawer backdrop="opaque" isOpen={isOpen} size="xs" placement="left" onOpenChange={onOpenChange} radius="none" className="w-[270px] bg-white shadow-lg">
        <DrawerContent>
          <div className="flex h-full flex-col justify-between rounded-xl overflow-hidden shadow-lg bg-white">
            <div>
              {/* Logo */}
              <div className="flex items-center justify-center py-10 w-full">
                <Image
                  alt="HeroUI hero Image"
                  className="object-contain rounded-none"
                  src={LogoLight}
                  width={140}
                />
              </div>
              {/* Avatar usuario */}
              <div className="flex items-center justify-start cursor-pointer py-4 ml-4">
                <div className="felx h-10 w-10 rounded-full bg-red-400 border-[2px] border-yellow-300 overflow-hidden">
                  <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt=""  className="w-full h-full object-cover"/>
                </div>
                <div className="flex flex-col h-full justify-center items-start mx-[10px]">
                  <p className="text-[13px] leading-none font-semibold">May Hernandez</p>
                  <p className="text-[11px] text-graylight leading-none">Admin</p>
                </div>
              </div>
              {/* Sidebar Navigation */}
              <nav className="px-[10px]">
                {Routes.map((menu, index) => (
                  <div key={index}>
                    {/* <div className={`w-full mb-[8px] px-[24px] ${index > 0 ? 'mt-[32px]' : ''}`}>
                      <p className="text-[12px] font-semibold text-[#909DAC] tracking-wider">{menu.category}</p>
                    </div> */}
                    {menu.items.map((item) => (
                      <a
                        key={item.path}
                        className={`flex items-center px-[10px] my-[12px] h-[46px] hover:bg-[#c5e4ff] cursor-pointer rounded-md ${pathname === item.path && 'bg-gradient-to-r from-skycustom to-royalDark'}`}
                        style={{ textDecoration: "none" }}
                        onClick={() => {
                          navigateToPath(item.path);
                          if(isOpen) {onOpenChange()};
                        }}
                      >
                        <div 
                          className={`flex h-[35px] w-[35px] justify-center items-center mr-[10px] text-graylight ${pathname === item.path && 'text-white'}`}
                        >
                          {item.icon}
                        </div>
                        <p 
                          className={`flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-[#44586E] select-none ${pathname === item.path && 'text-white'}`}
                        >
                          {t(item.name)}
                        </p>
                      </a>
                    ))}
                  </div>
                ))}
                <a
                  className={`flex xxs:hidden items-center px-[10px] my-[12px] h-[46px] hover:bg-[#c5e4ff] cursor-pointer rounded-md ${pathname === "/notifications" && 'bg-gradient-to-r from-skycustom to-royalDark'}`}
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    navigate("/notifications");
                    if(isOpen) {onOpenChange()};
                  }}
                >
                  <div 
                    className={`flex h-[35px] w-[35px] justify-center items-center mr-[10px] text-graylight ${pathname === "/notifications" ? 'text-white' : '#909DAC'}`}
                  >
                    <HiOutlineBell size={16}/>
                  </div>
                  <p 
                    className={`flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-[12px] text-[#44586E] select-none ${pathname === "/notifications" && 'text-white'}`}
                  >
                    {t("notifications")}
                  </p>
                </a>
              </nav>
            </div>
            <div className="flex h-16 justify-center items-center gap-5">
              <div className="flex justify-center items-center h-9 w-9 rounded-full bg-royalDark">
                <IoBookOutline color="white" size={18}/>
              </div>
              <div className="flex justify-center items-center h-9 w-9 rounded-full bg-royalDark">
                <TfiHeadphoneAlt color="white" size={18}/>
              </div>
              <div className="flex justify-center items-center h-9 w-9 rounded-full bg-red-500">
                <RiLogoutBoxRLine color="white" size={18}/>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};