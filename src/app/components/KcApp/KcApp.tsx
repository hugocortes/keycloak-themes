import { defaultKcProps, KcApp as KcAppBase } from "keycloakify";

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
  }

  return <KcAppBase {...{ kcContext, ...kcProps }} />;
};
KcApp.displayName = "KcApp";
