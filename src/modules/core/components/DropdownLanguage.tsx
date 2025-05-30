import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { useMemo, useState } from "react";
import { STORAGE_KEY_LANGUAGE } from "../utils/TranslationConfig";
import { TranslationLanguagesSelection } from "../utils/TranslationLanguages";
import { useTranslation } from "react-i18next";

export const DropdownLanguage = () => {

    const { i18n } = useTranslation();
    const [selectedKeys, setSelectedKeys] = useState(new Set([i18n.language]));
  
    const selectedValue = useMemo(() => {
      const selected = TranslationLanguagesSelection.find(({ value }) => value === i18n.language);
      return selected ? selected.label : "🇪🇸 Español";
    }, [i18n.language]);
  
    const handleChangeLanguage = (value: string) => {
      i18n.changeLanguage(value);
      localStorage.setItem(STORAGE_KEY_LANGUAGE, value);
      setSelectedKeys(new Set([value])); // Actualiza la selección
    };

    const flag = selectedValue.split(" ")[0];
  
    return (
      <Dropdown>
        <DropdownTrigger>
          <button 
            className="capitalize text-[26px] h-8 min-w-8 leading-none"
            color="primary"
        >
            {flag}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Language selection"
          selectedKeys={selectedKeys}
          selectionMode="single"
          className="bg-white shadow text-[12px]"
          onSelectionChange={(keys) => handleChangeLanguage(Array.from(keys)[0] as string)}
        >
          {TranslationLanguagesSelection.map(({ label, value }) => (
            <DropdownItem key={value} className="text-primary">
                {label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    );
}