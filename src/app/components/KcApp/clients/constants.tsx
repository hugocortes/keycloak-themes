import { lazy } from "react";

import { Client, ClientConfig } from "./types";

// TODO perhaps move to a public bucket?
import bookstackFaviconUrl from "app/assets/bookstack/img/favicon.ico";
import grafanaFaviconUrl from "app/assets/grafana/img/favicon.ico";
import helmFaviconUrl from "app/assets/helm/img/favicon.ico";
import insomniaFaviconUrl from "app/assets/insomnia/img/favicon.ico";
import minifluxFaviconUrl from "app/assets/miniflux/img/favicon.ico";
import pomeriumFaviconUrl from "app/assets/pomerium/img/favicon.ico";
import sonarrFaviconUrl from "app/assets/sonarr/img/favicon.ico";
import spinnakerFaviconUrl from "app/assets/spinnaker/img/favicon.ico";

/**
 * Lazy import client components for code splitting
 */
const SpinnakerLogin = lazy(() => {
  return Promise.resolve(import("./spinnaker/Spinnaker"));
});
const GrafanaLogin = lazy(() => {
  return Promise.resolve(import("./grafana/Grafana"));
});

// TODO how to rely on component for custom styles and logo?
export const clientConfig: { [key in Client]: ClientConfig } = {
  bookstack: {
    favicon: bookstackFaviconUrl,
    hasCustomStyles: true,
    hasLogo: false,
  },
  grafana: {
    component: GrafanaLogin,
    favicon: grafanaFaviconUrl,
    hasCustomStyles: true,
    hasLogo: true,
  },
  helm: {
    favicon: helmFaviconUrl,
    hasCustomStyles: false,
    hasLogo: false,
  },
  insomnia: {
    favicon: insomniaFaviconUrl,
    hasCustomStyles: false,
    hasLogo: false,
  },
  miniflux: {
    favicon: minifluxFaviconUrl,
    hasCustomStyles: false,
    hasLogo: false,
  },
  pomerium: {
    favicon: pomeriumFaviconUrl,
    hasCustomStyles: true,
    hasLogo: true,
  },
  sonarr: {
    favicon: sonarrFaviconUrl,
    hasCustomStyles: true,
    hasLogo: true,
  },
  spinnaker: {
    component: SpinnakerLogin,
    favicon: spinnakerFaviconUrl,
    hasCustomStyles: true,
    hasLogo: true,
  },
};