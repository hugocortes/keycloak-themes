import { getKcContext, KcProps as DefaultKcProps } from "keycloakify";
import { KcContextBase } from "keycloakify/lib/getKcContext/KcContextBase";
import { LazyExoticComponent, MemoExoticComponent } from "react";
import { kcContext } from "./KcContext";

// TODO find how to extend kc props
export type KcProps = DefaultKcProps & {
  kcBodyClass?: string;
};

export type KcContext = NonNullable<typeof kcContext>;

export type KcContextLogin = Extract<
  KcContext,
  {
    pageId: "login.ftl";
  }
>;

export type KcContextLoginProps = { kcContext: KcContextLogin } & KcProps;
export type KcContextLoginComponent = ({
  kcContext,
  ...props
}: KcContextLoginProps) => JSX.Element;
