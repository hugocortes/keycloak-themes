import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";
import "./Bookstack.scss";

const BookstackLogin = memo((props: KcContextLoginProps) => {
  return <Login {...props} />;
});
BookstackLogin.displayName = "BookstackLogin";

export default BookstackLogin;
