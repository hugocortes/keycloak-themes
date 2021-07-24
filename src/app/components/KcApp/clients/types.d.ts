import { Clients, Client } from "./generated";

export function isClient(possibleClient: string): possibleClient is Client {
  return Clients.some((client) => client === possibleClient);
}

export type ClientConfig = {
  login: LazyExoticComponent<MemoExoticComponent<KcContextLoginComponent>>;
};
