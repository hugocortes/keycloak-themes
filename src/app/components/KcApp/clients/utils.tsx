import { LazyExoticComponent, MemoExoticComponent, Suspense } from "react";

import { KcContextLoginProps } from "../types";

/**
 * Set the favicon to provided location
 */
export function setFav(location: string) {
  const favicon = document.getElementById("favicon");
  if (favicon && favicon.hasAttribute("href")) {
    favicon.setAttribute("href", location);
  }
}

/**
 * Set the html title
 */
export function setTitle(client: string) {
  const title = document.getElementById("title");
  if (title) {
    title.innerText = `Log in to ${client}`;
  }
}

/**
 * Generates the lazy component wrapped in <Suspense>
 */
export function generateLazyComponent(
  DefaultComponent: MemoExoticComponent<(props: any) => JSX.Element>,
  Component: LazyExoticComponent<
    MemoExoticComponent<(props: any) => JSX.Element>
  >,
  props: KcContextLoginProps
) {
  return (
    <Suspense fallback={<DefaultComponent {...props} />}>
      <Component {...props} />
    </Suspense>
  );
}
