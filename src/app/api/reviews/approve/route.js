import { ensureTable, query } from "@/lib/db";

function htmlPage({ title, message, ok }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>${title}</title>
<style>
  body{font-family: ui-sans-serif, system-ui, sans-serif; background:#faf5ea; color:#2a1a12; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0;}
  .card{max-width:420px; text-align:center; padding:32px; border-radius:24px; background:#fff; box-shadow:0 10px 30px rgba(0,0,0,0.08);}
  h1{color:${ok ? "#5b1220" : "#b91c1c"}; font-size:22px;}
  a{color:#5b1220;}
</style></head>
<body><div class="card"><h1>${title}</h1><p>${message}</p></div></body></html>`;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  const token = searchParams.get("token") || "";

  if (!id || !token) {
    return new Response(htmlPage({ title: "Invalid link", message: "This approval link looks incomplete.", ok: false }), {
      status: 400,
      headers: { "Content-Type": "text/html" },
    });
  }

  try {
    await ensureTable();
    const result = await query(
      `UPDATE reviews SET status = 'approved' WHERE id = $1 AND approve_token = $2 AND status = 'pending' RETURNING id`,
      [id, token]
    );

    if (result.rowCount === 0) {
      return new Response(
        htmlPage({
          title: "Already handled",
          message: "This review is either already approved or the link is no longer valid.",
          ok: false,
        }),
        { status: 400, headers: { "Content-Type": "text/html" } }
      );
    }

    return new Response(
      htmlPage({
        title: "Review approved!",
        message: "It's now live on the website's reviews section.",
        ok: true,
      }),
      { status: 200, headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("Approve error:", err);
    return new Response(
      htmlPage({ title: "Something went wrong", message: "Please try again in a moment.", ok: false }),
      { status: 500, headers: { "Content-Type": "text/html" } }
    );
  }
}
