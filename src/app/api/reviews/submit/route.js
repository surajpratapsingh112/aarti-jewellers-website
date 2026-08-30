import { ensureTable, query } from "@/lib/db";
import crypto from "crypto";

// Default notification recipient - override any time by setting NOTIFY_EMAIL
// in the Vercel project's Environment Variables.
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "surajpratapsingh112@gmail.com";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SITE_URL = (process.env.SITE_URL || "").replace(/\/+$/, ""); // strip trailing slash(es)

export async function POST(request) {
  try {
    const body = await request.json();
    const name = (body.name || "").toString().trim().slice(0, 80);
    const reviewText = (body.review || "").toString().trim().slice(0, 1000);
    const rating = Number(body.rating) || null;
    const honeypot = (body.website || "").toString(); // hidden field - bots fill it, humans don't

    if (honeypot) {
      // Silently pretend success so bots don't learn anything.
      return Response.json({ ok: true });
    }
    if (!name || !reviewText) {
      return Response.json({ ok: false, error: "Name and review are required." }, { status: 400 });
    }

    await ensureTable();

    const token = crypto.randomBytes(24).toString("hex");
    const result = await query(
      `INSERT INTO reviews (name, review_text, rating, status, approve_token)
       VALUES ($1, $2, $3, 'pending', $4) RETURNING id`,
      [name, reviewText, rating, token]
    );
    const id = result.rows[0].id;

    // Send the notification email if Resend is configured. If it isn't set
    // up yet, we still save the review - it just won't auto-email until
    // RESEND_API_KEY is added in Vercel's Environment Variables.
    if (RESEND_API_KEY && SITE_URL) {
      const approveUrl = `${SITE_URL}/api/reviews/approve?id=${id}&token=${token}`;
      const featureUrl = `${SITE_URL}/api/reviews/feature?id=${id}&token=${token}`;
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Aarti Jewellers Website <onboarding@resend.dev>",
            to: [NOTIFY_EMAIL],
            subject: `New review from ${name} - approval needed`,
            html: `
              <div style="font-family: sans-serif; max-width: 480px;">
                <h2>New review on your website</h2>
                <p><strong>${name}</strong>${rating ? ` rated ${rating}/5` : ""}:</p>
                <p style="padding:12px; background:#faf5ea; border-radius:8px;">${reviewText.replace(/</g, "&lt;")}</p>
                <p>
                  <a href="${approveUrl}" style="display:inline-block; background:#5b1220; color:#fff; padding:10px 20px; border-radius:24px; text-decoration:none;">
                    Approve &amp; publish this review
                  </a>
                </p>
                <p style="color:#888; font-size:12px;">If you don't recognize this or don't want it published, just ignore this email - it won't go live unless you click Approve.</p>
                <hr style="border:none; border-top:1px solid #eee; margin:20px 0;" />
                <p style="color:#555; font-size:13px;">
                  Want to pin this review near the top of your reviews section (Top 10)? You can use the button below <strong>any time</strong> - right now or weeks later, once the review is already approved and live:
                </p>
                <p>
                  <a href="${featureUrl}" style="display:inline-block; background:#b8860b; color:#fff; padding:10px 20px; border-radius:24px; text-decoration:none;">
                    Add / Remove from Top 10
                  </a>
                </p>
                <p style="color:#aaa; font-size:11px;">Tip: save this email - clicking the Top 10 button toggles it on and off, so you can reuse this same link whenever you want.</p>
              </div>
            `,
          }),
        });
      } catch (e) {
        // Don't fail the visitor's submission just because the email failed.
        console.error("Failed to send review notification email:", e);
      }
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Review submit error:", err);
    return Response.json({ ok: false, error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
