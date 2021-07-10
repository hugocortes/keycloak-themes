import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";

import "./Spinnaker.scss";

import { setFav } from "./../utils";
import favicon from "./img/favicon.ico";

import { kcMessages, useKcLanguageTag } from "keycloakify";

const SpinnakerLogin = memo((props: KcContextLoginProps) => {
  setFav(favicon);

  const { kcLanguageTag } = useKcLanguageTag();
  kcMessages[kcLanguageTag].loginTitleHtml = '<div class="kc-logo-text"></div>';

  return <Login {...props} />;
});
SpinnakerLogin.displayName = "SpinnakerLogin";

export default SpinnakerLogin;

// this check needs to be in typescript generator
// const favPath = "./img/favicon.ico";
// const file = statSync(favPath);
// if (file.isFile()) {
//   setFav(favPath);
// }
