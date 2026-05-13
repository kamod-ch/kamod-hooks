import { useEffect, useMemo, useRef, useState } from "preact/hooks";
import useMemoizedFn from "../useMemoizedFn";
import useUpdate from "../useUpdate";
import type { SetStateAction } from "#types";

export interface UrlStateOptions {
  navigateMode?: "push" | "replace";
}

type UrlState = Record<string, string | string[] | undefined>;

function parseSearch(search: string): UrlState {
  const q = search.startsWith("?") ? search.slice(1) : search;
  const params = new URLSearchParams(q);
  const out: UrlState = {};
  for (const key of new Set([...params.keys()])) {
    const all = params.getAll(key);
    out[key] = all.length <= 1 ? (all[0] ?? "") : all;
  }
  return out;
}

function buildSearch(merged: UrlState): string {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) {
    if (v === undefined) {
      continue;
    }
    if (Array.isArray(v)) {
      for (const item of v) {
        p.append(k, String(item));
      }
    } else {
      p.set(k, String(v));
    }
  }
  const s = p.toString();
  return s ? `?${s}` : "?";
}

const useUrlState = <S extends UrlState = UrlState>(
  baseState?: S | (() => S),
  options?: UrlStateOptions
) => {
  const { navigateMode = "push" } = options || {};
  const update = useUpdate();
  const baseStateRef = useRef(typeof baseState === "function" ? (baseState as () => S)() : baseState || {});

  const [, setPop] = useState(0);
  useEffect(() => {
    const onPop = () => setPop((n) => n + 1);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const search = typeof window !== "undefined" ? window.location.search : "";
  const queryFromUrl = useMemo(() => parseSearch(search), [search]);

  const targetQuery = useMemo(
    () =>
      ({
        ...baseStateRef.current,
        ...queryFromUrl
      }) as {
        [key in keyof S]: Required<S>[key] extends unknown[] ? string[] : string;
      },
    [queryFromUrl]
  );

  const setState = (s: SetStateAction<typeof targetQuery>) => {
    const newQuery = typeof s === "function" ? s(targetQuery) : s;
    update();
    const merged: UrlState = { ...queryFromUrl, ...(newQuery as UrlState) };
    const nextSearch = buildSearch(merged);
    const url = `${window.location.pathname}${nextSearch}${window.location.hash}`;
    if (navigateMode === "replace") {
      window.history.replaceState(window.history.state, "", url);
    } else {
      window.history.pushState(window.history.state, "", url);
    }
  };

  return [targetQuery, useMemoizedFn(setState)] as const;
};

export default useUrlState;
