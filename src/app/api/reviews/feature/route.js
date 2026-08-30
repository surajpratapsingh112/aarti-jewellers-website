import { query } from "@/lib/db";

function htmlPage({ title, message, color }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<style>
  body { margin:0; font-family: Arial, sans-serif; background:#f6f1e9; color:#2b2320; display:flex; align-items:center; justify-content:center; min-height:100vh; padding:24px; }
  .card { background:#fff; border-radius:16px; padding:36px 32px; max-width:420px; width:100%; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.08); border-top:6px solid ${color}; }
  h1 { font-size:20px; margin:0 0 12px; color:#3a2a1a; }
  p { font-size:15px; line-height:1.5; color:#5a4c3e; margin:0; }
</style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const token = searchParams.get("token");

    if (!id || !token) {
      return new Response(
        htmlPage({
          title: "Invalid link",
          message: "This link is missing required information.",
          color: "#b91c1c",
        }),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const { rows } = await query(
      `SELECT id, status, featured, approve_token FROM reviews WHERE id = $1`,
      [id]
    );
    const row = rows[0];

    if (!row || row.approve_token !== token) {
      return new Response(
        htmlPage({
          title: "Link not valid",
          message: "This link is invalid or has expired.",
          color: "#b91c1c",
        }),
        { status: 403, headers: { "Content-Type": "text/html" } }
      );
    }

    if (row.status !== "approved") {
      return new Response(
        htmlPage({
          title: "Approve it first",
          message: "Please approve this review before adding it to Top 10. Use the Approve link from the original email first, then click this link again.",
          color: "#b45309",
        }),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    const willFeature = !row.featured;

    if (willFeature) {
      await query(
        `UPDATE reviews SET featured = true, featured_at = now() WHERE id = $1`,
        [id]
      );
    } else {
      await query(
        `UPDATE reviews SET featured = false, featured_at = NULL WHERE id = $1`,
        [id]
      );
    }

    return new Response(
      htmlPage({
        title: willFeature ? "Added to Top 10!" : "Removed from Top 10",
        message: willFeature
          ? "This review will now show near the top of the reviews section on your website."
          : "This review is no longer marked as Top 10. It still stays published — just not pinned at the top.",
        color: willFeature ? "#15803d" : "#6b7280",
      }),
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("feature toggle error", err);
    return new Response(
      htmlPage({
        title: "Something went wrong",
        message: "Please try again in a moment.",
        color: "#b91c1c",
      }),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
