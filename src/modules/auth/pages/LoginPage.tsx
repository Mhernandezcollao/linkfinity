import { useTranslation } from "react-i18next"
import { AuthLayout, GlowButton, MyDiv, MyLink, MySubtitle, MyTitle, TextLink } from "../components"
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import type { LoginData } from "../interfaces";
import { useForm } from "../../core/hooks";
import { emailIsValid, passwordIsStrong } from "../helpers/Form";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { showToastWarning } from "../../core/utils/ShowToastWarning";

export const LoginPage = () => {

  const { loadingSignIn } = useContext(AuthContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { form, onChange } = useForm<LoginData>({
    email: '',
    password: '',
  });

  const handleLogin = () => {

    if (!form.email) return showToastWarning({title:"Campo vacío", description:"Ingrese su email para continuar"});
    if (!form.password) return showToastWarning({title:"Campo vacío", description:"Ingrese su contraseña para continuar"});
    if (!emailIsValid(form.email)) return showToastWarning({title:"Email inválido", description:"Ingresa un correo electrónico válido."});
    if (!passwordIsStrong(form.password)) return showToastWarning({title:"Contraseña inválida", description:"Usa al menos 6 caracteres, incluyendo mayúsculas, minúsculas y números."});
    
    // signIn(form);
    console.log("ingresar")
    navigate('/membership')
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <MyTitle title={t("welcome_back")}/>
        <MySubtitle subtitle={t("secure_login")}/>
        <MyDiv>
          <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("email")}</p>
          <input 
            type="text" 
            placeholder="ejemplo@email.com"
            className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
            value={form.email}
            onChange={(event) => onChange(event.target.value, 'email')}
            disabled={loadingSignIn}
          />
        </MyDiv>
        <MyDiv>
          <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("password")}</p>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="************"
              className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3 pr-10"
              value={form.password}
              onChange={(e) => onChange(e.target.value, "password")}
              disabled={loadingSignIn}
            />
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
            </div>
          </div>
        </MyDiv>
        <MyLink 
          text={t("forgot_password")}
          href="/restore-password"
        />
        <MyDiv>
          <GlowButton 
            text_button={t("sign_in")} 
            border={true}
            onClick={handleLogin}
          />
        </MyDiv>
        <TextLink 
          text={t("no_account")} 
          link={t("register_free")}
          href="/register"
        />
      </div>
    </AuthLayout>
  )
}

