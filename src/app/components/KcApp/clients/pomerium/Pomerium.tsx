import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";

import "./Pomerium.scss";

import { setFav } from "./../utils";
import favicon from "./img/favicon.ico";

import { kcMessages, useKcLanguageTag } from "keycloakify";

const PomeriumLogin = memo((props: KcContextLoginProps) => {
  setFav(favicon);

  const { kcLanguageTag } = useKcLanguageTag();
  kcMessages[kcLanguageTag].loginTitleHtml = '<div class="kc-logo-text"></div>';

  return <Login {...props} />;
});
PomeriumLogin.displayName = "PomeriumLogin";

export default PomeriumLogin;
