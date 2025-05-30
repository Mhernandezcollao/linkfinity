import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "../../core/hooks";
import { AuthLayout, CodeInput, GlowButton, MyDiv, MyLink, MySubtitle, MyTitle, TextLink } from "../components";
import { useRestorePassword } from "../hooks";
import type { SetPasswordData } from "../interfaces";
import { useNavigate } from "react-router-dom";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { showToastWarning } from "../../core/utils/ShowToastWarning";
import { emailIsValid, passwordIsStrong } from "../helpers/Form";

export const RestorePasswordPage = () => {

  const {loadingCreateNewPassword, loadingRecoverPassword} = useRestorePassword();
  const { t } = useTranslation();
  const [numPairs, setNumPairs] = useState(1);
  const [verificationCode, setVerificationCode] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();
  const { form, onChange } = useForm({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const handleAdd = () => {
    setNumPairs(prev => prev + 1);
  };

  const handleRemove = () => {
    setNumPairs(prev => (prev > 1 ? prev - 1 : 1)); // evita bajar de 1
  };

  const handleCodeComplete = (code: string) => {
    // console.log('Código ingresado:', code);
    setVerificationCode(code)
  };
  
  const handleSendEmail = () => {
    if (!form.email) return showToastWarning({title:"Campo vacío", description:"Ingrese su email para continuar"});
    if (!emailIsValid(form.email)) return showToastWarning({title:"Email inválido", description:"Ingresa un correo electrónico válido."});
    handleAdd();
    // const resp: any = recoverPassword(form.email);

    // if (resp?.success) {
    //   handleAdd();
    // };
  };

  const handleCreateNewPassword = () => {

    if (!form.password) return showToastWarning({title:"Campo vacío", description:"Ingrese su contraseña para continuar"});
    if (!passwordIsStrong(form.password)) return showToastWarning({title:"Contraseña inválida", description:"Usa al menos 6 caracteres, incluyendo mayúsculas, minúsculas y números."});
    if (!form.repeatPassword) return showToastWarning({title:"Campo vacío", description:"Repita su contraseña para continuar"});
    if (form.password != form.repeatPassword) return showToastWarning({title:"Verifica tu contraseña", description:"La contraseña no coincide, intenta nuevamente"});

    const formData:SetPasswordData = { email: form.email, password: form.repeatPassword, totp: verificationCode};

    console.log("Info para crear nueva contraseña", formData);
    navigate('/');
    // const resp: any = createNewPassword(formData);

    // if (resp?.success) {
    //   navigate('/');
    // };
  };



  return (
    <AuthLayout>
      <div className="w-full">
        {
          numPairs == 1 && (
            <>
              <MyTitle title={t("recover_password")}/>
              <MySubtitle subtitle={t("send_code_email")}/>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("email")}</p>
                <input 
                  type="text" 
                  placeholder="ejemplo@email.com"
                  className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
                  value={form.email}
                  onChange={(event) => onChange(event.target.value, 'email')}
                  disabled={loadingRecoverPassword}
                />
              </MyDiv>
              <MyDiv>
                <GlowButton 
                  text_button={t("send_code")}
                  border={true} 
                  onClick={handleSendEmail}
                />
              </MyDiv>
              <TextLink 
                text={t("already_have_password")}
                link={t("sign_in_now")}
                href="/"
              />
            </>
          )
        }
        {
          numPairs == 2 && (
            <div className="w-full">
              <MyTitle title={t("recovery_code")}/>
              <MySubtitle subtitle={t("check_email_for_code")}/>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("enter_6_digit_code")}</p>
                <CodeInput length={6} onComplete={handleCodeComplete} />
              </MyDiv>
              <MyLink 
                text={t("resend_code")}
                onClick={() => handleRemove()}
              />
              <MyDiv>
                <GlowButton 
                  text_button={t("next")}
                  border={true} 
                  onClick={handleAdd}
                />
              </MyDiv>
              <TextLink 
                text={t("already_have_password")}
                link={t("sign_in_now")}
                href="/"
              />
            </div>
          )
        }
        {
          numPairs == 3 && (
            <>
              <MyTitle title={t("new_password")}/>
              <MySubtitle subtitle={t("password_instruction")}/>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("password")}</p>
                <div className="relative w-full">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3 pr-10"
                    value={form.password}
                    onChange={(e) => onChange(e.target.value, "password")}
                    disabled={loadingCreateNewPassword}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                  </div>
                </div>
              </MyDiv>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("repeat_password")}</p>
                <div className="relative w-full">
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="************"
                    className={`w-full h-[40px] text-white bg-darkblue rounded-md outline-none text-[11px] px-3 pr-10
                      ${form.password !== form.repeatPassword && form.repeatPassword ? "border border-red-500" : "focus:border-[1px] focus:border-skycustom"}`
                    }
                    value={form.repeatPassword}
                    onChange={(e) => onChange(e.target.value, "repeatPassword")}
                    disabled={loadingCreateNewPassword}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                  >
                    {showRepeatPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                  </div>
                </div>
              </MyDiv>
              <MyDiv>
                <GlowButton 
                  text_button={t("recover_password")}
                  border={true} 
                  onClick={handleCreateNewPassword}
                />
              </MyDiv>
              <TextLink 
                text={t("already_have_password")}
                link={t("sign_in_now")}
                href="/"
              />
            </>
          )
        }
      </div>
    </AuthLayout>
  )
}

