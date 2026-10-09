/** Route of the search results page. */
export const SEARCH_PATH = "/search";

/** Query-string key that holds the search text: /search?q=ui+ux+designer */
export const SEARCH_PARAM = "q";

/** "ui ux designer" -> "/search?q=ui%20ux%20designer". Empty text -> "/search". */
export function buildSearchUrl(query = ""): string {
  const term = query.trim();

  return term
    ? `${SEARCH_PATH}?${SEARCH_PARAM}=${encodeURIComponent(term)}`
    : SEARCH_PATH;
}
