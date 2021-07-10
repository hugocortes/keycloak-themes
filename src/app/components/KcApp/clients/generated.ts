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

import { lazy } from "react";

import { Client, ClientConfig } from "./types";

// TODO perhaps move to a public bucket?
import bookstackFaviconUrl from "app/assets/bookstack/img/favicon.ico";
import grafanaFaviconUrl from "app/assets/grafana/img/favicon.ico";
import helmFaviconUrl from "app/assets/helm/img/favicon.ico";
import insomniaFaviconUrl from "app/assets/insomnia/img/favicon.ico";
import minifluxFaviconUrl from "app/assets/miniflux/img/favicon.ico";
import pomeriumFaviconUrl from "app/assets/pomerium/img/favicon.ico";
import spinnakerFaviconUrl from "app/assets/spinnaker/img/favicon.ico";

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
export const clientConfig: { [key in Client]: ClientConfig } = {
  bookstack: {
    component: BookstackLogin,
    favicon: bookstackFaviconUrl,
    hasLogo: false,
  },
  grafana: {
    component: GrafanaLogin,
    favicon: grafanaFaviconUrl,
    hasLogo: true,
  },
  helm: {
    component: DefaultLogin,
    favicon: helmFaviconUrl,
    hasLogo: false,
  },
  insomnia: {
    component: DefaultLogin,
    favicon: insomniaFaviconUrl,
    hasLogo: false,
  },
  miniflux: {
    component: DefaultLogin,
    favicon: minifluxFaviconUrl,
    hasLogo: false,
  },
  pomerium: {
    component: PomeriumLogin,
    favicon: pomeriumFaviconUrl,
    hasLogo: true,
  },
  spinnaker: {
    component: SpinnakerLogin,
    favicon: spinnakerFaviconUrl,
    hasLogo: true,
  },
};
