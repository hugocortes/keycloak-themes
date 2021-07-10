import { memo } from "react";
import { Login } from "keycloakify/lib/components/Login";
import type { KcContextLoginProps } from "../../types";

import "./Bookstack.scss";

import { setFav } from "./../utils";
import favicon from "./img/favicon.ico";

const BookstackLogin = memo((props: KcContextLoginProps) => {
  setFav(favicon);

  return <Login {...props} />;
});
BookstackLogin.displayName = "BookstackLogin";

export default BookstackLogin;
