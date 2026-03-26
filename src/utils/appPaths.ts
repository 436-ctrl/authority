const trimTrailingSlash = (value: string) => {
  if (value === "/") {
    return value;
  }

  return value.replace(/\/+$/, "");
};

const ensureLeadingSlash = (value: string) => (value.startsWith("/") ? value : `/${value}`);

const BASE_PATH = trimTrailingSlash(import.meta.env.BASE_URL);

export const assetPath = (path: string) => {
  const normalizedPath = ensureLeadingSlash(path);
  return BASE_PATH === "/" ? normalizedPath : `${BASE_PATH}${normalizedPath}`;
};

export const buildAppHref = (
  path: string,
  params?: Record<string, string | number | null | undefined>,
) => {
  const url = new URL(assetPath(path), window.location.origin);

  Object.entries(params ?? {}).forEach(([key, value]) => {
    if (value === null || value === undefined || value === "") {
      url.searchParams.delete(key);
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return `${url.pathname}${url.search}${url.hash}`;
};

export const getRoutePath = () => {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";

  if (BASE_PATH !== "/" && (pathname === BASE_PATH || pathname.startsWith(`${BASE_PATH}/`))) {
    const strippedPath = pathname.slice(BASE_PATH.length) || "/";
    return ensureLeadingSlash(strippedPath);
  }

  return pathname;
};
