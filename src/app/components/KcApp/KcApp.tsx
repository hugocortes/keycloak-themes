import { defaultKcProps } from "keycloakify";
import { Register } from "keycloakify/lib/components/Register";
import { Info } from "keycloakify/lib/components/Info";
import { Error } from "keycloakify/lib/components/Error";
import { LoginResetPassword } from "keycloakify/lib/components/LoginResetPassword";
import { LoginVerifyEmail } from "keycloakify/lib/components/LoginVerifyEmail";
import { LoginOtp } from "keycloakify/lib/components/LoginOtp";
import { LoginUpdateProfile } from "keycloakify/lib/components/LoginUpdateProfile";
import { LoginIdpLinkConfirm } from "keycloakify/lib/components/LoginIdpLinkConfirm";
import { Terms } from "keycloakify/lib/components/Terms";

import { Login } from "./Login";
import type { KcContext } from "./types";

export const KcApp = ({ kcContext }: { kcContext: KcContext }) => {
  const kcProps = {
    ...defaultKcProps,
    locales: "en",
  };

  switch (kcContext.pageId) {
    case "login.ftl":
      return <Login {...{ kcContext, ...kcProps }} />;
    case "register.ftl":
      return <Register {...{ kcContext, ...kcProps }} />;
    case "info.ftl":
      return <Info {...{ kcContext, ...kcProps }} />;
    case "error.ftl":
      return <Error {...{ kcContext, ...kcProps }} />;
    case "login-reset-password.ftl":
      return <LoginResetPassword {...{ kcContext, ...kcProps }} />;
    case "login-verify-email.ftl":
      return <LoginVerifyEmail {...{ kcContext, ...kcProps }} />;
    case "terms.ftl":
      return <Terms {...{ kcContext, ...kcProps }} />;
    case "login-otp.ftl":
      return <LoginOtp {...{ kcContext, ...kcProps }} />;
    case "login-update-profile.ftl":
      return <LoginUpdateProfile {...{ kcContext, ...kcProps }} />;
    case "login-idp-link-confirm.ftl":
      return <LoginIdpLinkConfirm {...{ kcContext, ...kcProps }} />;
  }
};
KcApp.displayName = "KcApp";
