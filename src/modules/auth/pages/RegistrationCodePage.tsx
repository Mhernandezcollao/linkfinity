import { useTranslation } from "react-i18next";
import { AuthLayout, CodeInput, GlowButton, MyDiv, MyLink, MySubtitle, MyTitle, TextLink } from "../components"
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


export const RegistrationCodePage = () => {

  const { t } = useTranslation();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("")
  const location = useLocation();
  const email = location.state?.email;

  const handleCodeComplete = (code: string) => {
    // console.log('Código ingresado:', code);
    setVerificationCode(code)
  };

  const handleNext = () => {
    navigate('/create-account', { state: { verificationCode, email } })
  }


  return (
    <AuthLayout>
      <div className="w-full">
        <MyTitle title={t("registration_code")}/>
        <MySubtitle subtitle={t("check_email_for_code")}/>
        <MyDiv>
          <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("enter_6_digit_code")}</p>
          <CodeInput length={6} onComplete={handleCodeComplete} />
        </MyDiv>
        <MyLink 
          text={t("resend_code")}
          href="/register"
        />
        <MyDiv>
          <GlowButton 
            text_button={t("next")}
            border={true}
            onClick={handleNext}
          />
        </MyDiv>     
        <TextLink 
          text={t("already_have_account")}
          link={t("sign_in_now")}
          href="/"
        />
      </div>
    </AuthLayout>
  )
}
