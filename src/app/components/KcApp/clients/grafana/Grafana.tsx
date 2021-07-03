import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";
import "./Grafana.scss";

const GrafanaLogin = memo((props: KcContextLoginProps) => {
  return <Login {...props} />;
});
GrafanaLogin.displayName = "GrafanaLogin";

export default GrafanaLogin;
