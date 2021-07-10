import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";

import "./Grafana.scss";

import { setFav } from "./../utils";
import favicon from "./img/favicon.ico";

import { kcMessages, useKcLanguageTag } from "keycloakify";

const GrafanaLogin = memo((props: KcContextLoginProps) => {
  setFav(favicon);

  const { kcLanguageTag } = useKcLanguageTag();
  kcMessages[kcLanguageTag].loginTitleHtml = '<div class="kc-logo-text"></div>';

  return <Login {...props} />;
});
GrafanaLogin.displayName = "GrafanaLogin";

export default GrafanaLogin;
