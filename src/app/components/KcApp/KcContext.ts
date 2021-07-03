import { getKcContext } from "keycloakify";
import { KcContextBase } from "keycloakify/lib/getKcContext/KcContextBase";

export const { kcContext } = getKcContext<
  KcContextBase.Common &
    KcContextBase.Login & {
      pageId: "login.ftl";
      client?: {
        clientId: string;
        name: string;
      };
    }
>({
  // TODO control this through env
  // mockPageId: "login.ftl", // only required for local customization
  /**
   * Customize the simulated kcContext that will let us
   * dev the page outside keycloak (with auto-reload)
   */
  mockData: [
    {
      pageId: "login.ftl",
      social: {
        providers: [
          {
            alias: "google",
            displayName: "Google",
            loginUrl: "#",
            providerId: "google",
          },
        ],
      },
      // change as needed to test clients
      client: {
        clientId: "spinnaker",
        name: "spinnaker",
      },
    },
  ],
});
