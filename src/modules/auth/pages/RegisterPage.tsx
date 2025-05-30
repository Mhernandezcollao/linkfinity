import { useTranslation } from "react-i18next"
import { AuthLayout, GlowButton, MyDiv, MySubtitle, MyTitle, TextLink } from "../components"
import { useNavigate } from "react-router-dom";
import { useForm } from "../../core/hooks";
import { useVerifyEmail } from "../hooks/useVerifyEmail";

export const RegisterPage = () => {

  const {loadingEmailVerification} = useVerifyEmail();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { form, onChange } = useForm({
      email: ''
  });


  const handleSend = async () => {
    navigate('/registration-code', { state: { email: form.email } })

    // const resp: any = await emailVerification(form.email);
    
    // if (resp?.success) {
    //     navigate('/registration-code', { state: { email: form.email } })
    // };
  };

  return (
    <AuthLayout>
      <div className="w-full">
        <MyTitle title={t("create_account")}/>
        <MySubtitle subtitle={t("send_code_email")}/>
        <MyDiv>
          <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("email")}</p>
          <input 
            type="text" 
            placeholder="ejemplo@email.com"
            className="w-full text-white h-[40px] bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
            value={form.email}
            onChange={(event) => onChange(event.target.value, 'email')}
            disabled={loadingEmailVerification}
          />
        </MyDiv>
        <MyDiv>
          <GlowButton 
            text_button={t("send_code")}
            border={true}
            onClick={handleSend}
          />
        </MyDiv>
        <TextLink 
          text={t("already_have_account")}
          link={t("sign_in_now")}
          href="/register"
        />
      </div>
    </AuthLayout>
  )
}
