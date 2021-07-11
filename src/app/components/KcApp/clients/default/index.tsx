import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";

import "./index.scss";

const ClientLogin = memo((props: KcContextLoginProps) => {
  return <Login {...props} />;
});
ClientLogin.displayName = "DefaultLogin";

export default ClientLogin;
