import { useTranslation } from "react-i18next"
import { AuthLayout, GlowButton, MyDiv, MySubtitle, MyTitle, TextLink } from "../components"
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "../../core/hooks";
import { AuthContext } from "../context/AuthContext";
import type { RegisterData } from "../interfaces";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";

export const CreateAccountPage = () => {

  const { loadingSignUp } = useContext(AuthContext);
  const { t } = useTranslation();
  const [numPairs, setNumPairs] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const verificationCode = location.state?.verificationCode;
  const verificationEmail = location.state?.email;
  const { form, onChange } = useForm({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  
  const handleRegister = () => {
    const formData:RegisterData = { ...form, email: verificationEmail, verification_code: verificationCode};
    navigate('/');
    console.log("Data enviada", formData)

    // const resp: any = signUp(formData);

    // if (resp?.success) {
    //   navigate('/');
    // };
  };

  const handleAdd = () => {
    setNumPairs(prev => prev + 1);
  };

  const handleRemove = () => {
    setNumPairs(prev => (prev > 1 ? prev - 1 : 1)); // evita bajar de 1
  };


  return (
    <AuthLayout>
      <div className="w-full">
        <MyTitle title={t("create_account")}/>
        <MySubtitle subtitle={t("create_account_subtitle")}/>
        {
          numPairs == 1 && (
            <>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("first_name")}</p>
                <input 
                  type="text" 
                  placeholder="Jhon"
                  className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
                  value={form.firstname}
                  onChange={(event) => onChange(event.target.value, 'firstname')}
                  disabled={loadingSignUp}
                />
              </MyDiv>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("last_name")}</p>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
                  value={form.lastname}
                  onChange={(event) => onChange(event.target.value, 'lastname')}
                  disabled={loadingSignUp}
                />
              </MyDiv>
            </>
          )
        }
        {
          numPairs == 2 && (
            <>
              <MyDiv>
                <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("username")}</p>
                <input 
                  type="text" 
                  placeholder={"jhon1990"}
                  className="w-full h-[40px] text-white bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
                  value={form.username}
                  onChange={(event) => onChange(event.target.value, 'username')}
                  disabled={loadingSignUp}              
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
                    disabled={loadingSignUp}
                  />
                  <div
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <PiEyeBold /> : <PiEyeClosedBold />}
                  </div>
                </div>
              </MyDiv>
              {/* <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("phone")}</p>
              <input 
                type="text" 
                placeholder={t("phone_with_country_code")}
                className="w-full h-[40px] bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
              />
              <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("referrals")}</p>
              <input 
                type="text" 
                placeholder={t("referral_code")}
                className="w-full h-[40px] bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
              /> */}
              <MyDiv>
                <div className="flex">
                  <p className="text-white font-light text-[12px]">
                    {t("accept_terms")}
                    <a href="#" className="text-skycustom font-light text-[12px] mx-[4px]">{t("accept_terms1")}</a>
                    {t("accept_terms2")}
                    <a href="#" className="text-skycustom font-light text-[12px] mx-[4px]">{t("accept_terms3")}</a>
                  </p>
                </div>
              </MyDiv>
            </>
          )
        }
        {/* {
          numPairs == 3 && (
            <>
              <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("password")}</p>
              <input 
                type="password" 
                placeholder="************"
                className="w-full h-[40px] bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
              />
              <p className="text-white font-light tracking-wider scale-y-90 text-[11px] my-[12px]">{t("repeat_password")}</p>
              <input 
                type="password" 
                placeholder="************"
                className="w-full h-[40px] bg-darkblue rounded-md outline-none focus:border-[1px] focus:border-skycustom text-[11px] px-3"
              />
            </>
          )
        } */}
          {
            numPairs == 2 && (
              <div className="flex w-full gap-3">
                <MyDiv>
                  <GlowButton 
                    text_button={t("back")}
                    border={false} 
                    onClick={handleRemove}
                  />
                </MyDiv>
                <MyDiv>
                  <GlowButton 
                    text_button={t("create_account_now")}
                    border={true} 
                    onClick={handleRegister}
                  />
                </MyDiv>
              </div>
            )
          }
        {
          numPairs == 1 && (
            <>
              <MyDiv>
                <GlowButton 
                  text_button={t("next")}
                  border={true} 
                  onClick={handleAdd}
                />
              </MyDiv>
              <TextLink 
                text={t("already_have_account")}
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
