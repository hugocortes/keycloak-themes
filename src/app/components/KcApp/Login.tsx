import { kcMessages, useKcLanguageTag } from "keycloakify";
import { Login as DefaultLogin } from "keycloakify/lib/components/Login";

import {
  generateLazyComponent,
  setTitle,
  setFav,
  isClient,
  clientConfig,
} from "./clients";
import type { KcContextLoginProps } from "./types";
import "./clients/default/Default.scss";

export const Login = ({ kcContext, ...kcProps }: KcContextLoginProps) => {
  const { kcLanguageTag } = useKcLanguageTag();

  const props = {
    kcContext,
    ...kcProps,
    // remove default login css for easier class overriding
    // TODO fix webpack removing !important from url()
    styles: [],
    stylesCommon: ["lib/zocial/zocial.css"],
  };

  if (kcContext.client) {
    const { clientId, name } = kcContext.client;

    const title = name || clientId;
    setTitle(name || clientId);
    kcMessages[kcLanguageTag].loginTitleHtml = title;

    if (isClient(clientId)) {
      if (clientConfig[clientId].favicon) {
        setFav(clientConfig[clientId].favicon!);
      }
      if (clientConfig[clientId].hasLogo) {
        kcMessages[kcLanguageTag].loginTitleHtml =
          '<div class="kc-logo-text"></div>';
      }
      return generateLazyComponent(
        DefaultLogin,
        clientConfig[clientId].component,
        props
      );
    }
  }

  return <DefaultLogin {...props} />;
};
