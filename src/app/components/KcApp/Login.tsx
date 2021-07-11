import { kcMessages, useKcLanguageTag } from "keycloakify";
import DefaultLogin from "./clients/default";

import {
  generateLazyComponent,
  setTitle,
  isClient,
  clientConfig,
} from "./clients";
import type { KcContextLoginProps } from "./types";
import "./clients/default/index.scss";

export const Login = ({ kcContext, ...kcProps }: KcContextLoginProps) => {
  const { kcLanguageTag } = useKcLanguageTag();

  const props = {
    kcContext,
    ...kcProps,
    // remove default login css for easier class overriding
    styles: [],
    stylesCommon: ["lib/zocial/zocial.css"],
  };

  if (kcContext.client) {
    const { clientId, name } = kcContext.client;

    const title = name || clientId;
    setTitle(name || clientId);
    kcMessages[kcLanguageTag].loginTitleHtml = title;

    if (isClient(clientId)) {
      return generateLazyComponent(
        DefaultLogin,
        clientConfig[clientId].login,
        props
      );
    }
  }

  return <DefaultLogin {...props} />;
};
