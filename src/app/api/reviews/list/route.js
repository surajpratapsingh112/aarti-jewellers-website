import { ensureTable, query } from "@/lib/db";

export async function GET() {
  try {
    await ensureTable();
    const result = await query(
      `SELECT id, name, review_text, rating, created_at, featured, featured_at
       FROM reviews WHERE status = 'approved'
       ORDER BY featured DESC, featured_at DESC NULLS LAST, created_at DESC
       LIMIT 200`
    );
    return Response.json({ ok: true, reviews: result.rows });
  } catch (err) {
    console.error("List reviews error:", err);
    // Fail soft - the site should still render its seed reviews even if the
    // database isn't configured yet.
    return Response.json({ ok: false, reviews: [] });
  }
}
