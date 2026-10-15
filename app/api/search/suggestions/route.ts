import { NextResponse } from "next/server";
import { getSearchIndex } from "@/lib/data/search-index";
import { buildSuggestions } from "@/lib/utils/search-suggestions";

export const dynamic = "force-dynamic";

const MAX_QUERY_LENGTH = 60;

/** GET /api/search/suggestions?q=des  ->  { suggestions: SearchSuggestion[] } */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q")?.trim() ?? "";

  if (!query || query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ suggestions: [] });
  }

  const index = await getSearchIndex();
  return NextResponse.json({ suggestions: buildSuggestions(query, index) });
}
