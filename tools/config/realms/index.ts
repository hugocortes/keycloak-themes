import * as fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { getDirectories } from "../../generator";

import * as example from "./example.json";

const baseConfig = {
  id: "", // replace
  clientId: "", // set to directory name
  name: "", // set to directory name
  rootUrl: "https://www.keycloak.org/app",
  surrogateAuthRequired: false,
  enabled: true,
  alwaysDisplayInConsole: false,
  clientAuthenticatorType: "client-secret",
  redirectUris: ["/*", "https://example.com"],
  webOrigins: [],
  notBefore: 0,
  bearerOnly: false,
  consentRequired: false,
  standardFlowEnabled: true,
  implicitFlowEnabled: true,
  directAccessGrantsEnabled: false,
  serviceAccountsEnabled: false,
  publicClient: true,
  frontchannelLogout: false,
  protocol: "openid-connect",
  attributes: {
    "id.token.as.detached.signature": "false",
    "saml.assertion.signature": "false",
    "saml.force.post.binding": "false",
    "saml.multivalued.roles": "false",
    "saml.encrypt": "false",
    login_theme: "keycloakify",
    "oauth2.device.authorization.grant.enabled": "false",
    "backchannel.logout.revoke.offline.tokens": "false",
    "saml.server.signature": "false",
    "saml.server.signature.keyinfo.ext": "false",
    "use.refresh.tokens": "true",
    "exclude.session.state.from.auth.response": "false",
    "oidc.ciba.grant.enabled": "false",
    "saml.artifact.binding": "false",
    "backchannel.logout.session.required": "true",
    "client_credentials.use_refresh_token": "false",
    saml_force_name_id_format: "false",
    "saml.client.signature": "false",
    "tls.client.certificate.bound.access.tokens": "false",
    "saml.authnstatement": "false",
    "display.on.consent.screen": "false",
    "saml.onetimeuse.condition": "false",
  },
  authenticationFlowBindingOverrides: {},
  fullScopeAllowed: true,
  nodeReRegistrationTimeout: -1,
  defaultClientScopes: ["web-origins", "roles", "profile", "email"],
  optionalClientScopes: [
    "address",
    "phone",
    "offline_access",
    "microprofile-jwt",
  ],
};

async function run() {
  const srcDir = `${__dirname}/../../generator/assets`;
  const outDir = `${__dirname}/example.generated.json`;
  const clientIds = await getDirectories(srcDir);

  const generatedJSON = { ...example };
  clientIds.forEach((clientId) => {
    const config = { ...baseConfig };
    config.id = uuidv4();
    config.clientId = clientId;
    config.name = clientId;

    let client = generatedJSON.clients.find(
      ({ clientId: existingClientId }) => existingClientId === clientId
    );
    if (client) {
      client = { ...config };
    } else {
      generatedJSON.clients.push(config);
      (generatedJSON.roles.client as any)[clientId] = [];
    }
  });
  delete (generatedJSON as any).default;

  fs.writeFileSync(outDir, JSON.stringify(generatedJSON));
}

run();
