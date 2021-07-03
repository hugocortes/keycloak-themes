// TODO how to make this dynamic
export const Clients = [
  "bookstack",
  "grafana",
  "helm",
  "insomnia",
  "miniflux",
  "pomerium",
  "sonarr",
  "spinnaker",
] as const;

export type Client = typeof Clients[number];

export function isClient(possibleClient: string): possibleClient is Client {
  return Clients.some((client) => client === possibleClient);
}

export type ClientConfig = {
  component?: LazyExoticComponent<MemoExoticComponent<KcContextLoginComponent>>;
  favicon?: string;
  hasCustomStyles: boolean;
  hasLogo: boolean;
};
