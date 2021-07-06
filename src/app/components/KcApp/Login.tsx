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
  kcMessages[kcLanguageTag].loginTitle = "Log in to {0}";

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
    setTitle(title);
    kcMessages[kcLanguageTag].loginTitleHtml = title;

    if (isClient(title)) {
      if (clientConfig[title].favicon) {
        setFav(clientConfig[title].favicon!);
      }
      if (clientConfig[title].hasCustomStyles) {
        if (clientConfig[title].hasLogo) {
          kcMessages[kcLanguageTag].loginTitleHtml =
            '<div class="kc-logo-text"></div>';
        }
      }
      return generateLazyComponent(
        DefaultLogin,
        clientConfig[title].component,
        props
      );
    }
  }

  return <DefaultLogin {...props} />;
};
