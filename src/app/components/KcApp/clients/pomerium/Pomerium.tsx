import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";
import "./Pomerium.scss";

const PomeriumLogin = memo((props: KcContextLoginProps) => {
  return <Login {...props} />;
});
PomeriumLogin.displayName = "PomeriumLogin";

export default PomeriumLogin;
