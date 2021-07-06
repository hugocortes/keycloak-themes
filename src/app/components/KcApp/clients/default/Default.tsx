import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";
import "./Default.scss";

const DefaultLogin = memo((props: KcContextLoginProps) => {
  return <Login {...props} />;
});
DefaultLogin.displayName = "DefaultLogin";

export default DefaultLogin;
