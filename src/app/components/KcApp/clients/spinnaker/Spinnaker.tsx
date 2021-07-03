import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";
import "./Spinnaker.scss";

const SpinnakerLogin = memo((props: KcContextLoginProps) => {
  return <Login {...props} />;
});
SpinnakerLogin.displayName = "SpinnakerLogin";

export default SpinnakerLogin;
