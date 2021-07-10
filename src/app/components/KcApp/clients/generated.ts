import { lazy } from "react";

import { Client, ClientConfig } from "./types";

// TODO how to make this dynamic
export const Clients = [
  "bookstack",
  "grafana",
  "helm",
  "insomnia",
  "miniflux",
  "pomerium",
  "spinnaker",
] as const;

/**
 * Lazy import client components for code splitting
 */
const DefaultLogin = lazy(() => {
  return Promise.resolve(import("./default/Default"));
});

const BookstackLogin = lazy(() => {
  return Promise.resolve(import("./bookstack/Bookstack"));
});
const GrafanaLogin = lazy(() => {
  return Promise.resolve(import("./grafana/Grafana"));
});
const PomeriumLogin = lazy(() => {
  return Promise.resolve(import("./pomerium/Pomerium"));
});
const SpinnakerLogin = lazy(() => {
  return Promise.resolve(import("./spinnaker/Spinnaker"));
});

// TODO how to rely on component for custom styles and logo?
export const clientConfig: {
  [key in Client]: ClientConfig;
} = {
  bookstack: {
    login: BookstackLogin,
  },
  grafana: {
    login: GrafanaLogin,
  },
  helm: {
    login: DefaultLogin,
  },
  insomnia: {
    login: DefaultLogin,
  },
  miniflux: {
    login: DefaultLogin,
  },
  pomerium: {
    login: PomeriumLogin,
  },
  spinnaker: {
    login: SpinnakerLogin,
  },
};
