import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";
import { getPool, sql } from "./_db.js";

type OrderBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  idNumber?: string;
  address?: string;
  suburb?: string;
  city?: string;
  province?: string;
  service?: string;
  plan?: string;
  installation?: string;
  notes?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  fibre: "Fibre Connectivity",
  "5g": "5G Solutions",
  ict: "ICT Solutions",
  analytics: "Business Analytics",
  iot: "Internet of Things",
  digital: "Digital Advertising",
};

function customerEmailHtml(body: OrderBody, reference: string): string {
  const serviceName = SERVICE_LABELS[body.service!] ?? body.service!;
  const fullName = `${body.firstName} ${body.lastName}`;
  const address = [body.address, body.suburb, body.city, body.province].filter(Boolean).join(", ");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>Order Confirmation – Isu Elihle Solutions</title>
</head>
<body style="margin:0;padding:0;background:#07071a;font-family:'Segoe UI',Arial,sans-serif;color:#ffffff;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:linear-gradient(135deg,#bf2293,#5c2f92 50%,#2c3792);padding:36px 20px;text-align:center;">
        <img src="https://isu-elihle.co.za/logo.png" alt="Isu Elihle Solutions" height="64" style="display:block;margin:0 auto 16px;" />
        <p style="margin:0;font-size:13px;letter-spacing:0.18em;text-transform:uppercase;color:rgba(255,255,255,.75);font-weight:600;">Order Confirmation</p>
      </td>
    </tr>
  </table>

  <!-- Reference number -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#0d0d2e;padding:36px 20px;text-align:center;">
        <p style="margin:0 0 12px;font-size:12px;color:rgba(255,255,255,.5);letter-spacing:0.15em;text-transform:uppercase;">Your Reference Number</p>
        <table align="center" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="background:rgba(191,34,147,.12);border:2px solid #bf2293;border-radius:12px;padding:14px 36px;">
              <span style="font-size:30px;font-weight:800;color:#bf2293;letter-spacing:0.08em;font-family:'Courier New',monospace;">${reference}</span>
            </td>
          </tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:rgba(255,255,255,.55);">Keep this safe — use it to track your order status on our website.</p>
      </td>
    </tr>
  </table>

  <!-- Greeting -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#07071a;padding:32px 40px 8px;">
        <p style="margin:0;font-size:15px;color:rgba(255,255,255,.85);line-height:1.7;">Hi <strong>${fullName}</strong>,</p>
        <p style="margin:12px 0 0;font-size:14px;color:rgba(255,255,255,.6);line-height:1.75;font-weight:300;">
          Thank you for choosing Isu Elihle Solutions! We have received your order and our team is already on it.
          Below is a summary of what you've ordered.
        </p>
      </td>
    </tr>
  </table>

  <!-- Order summary table -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#07071a;padding:24px 40px 32px;">
        <p style="margin:0 0 16px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#bf2293;font-weight:600;">Order Details</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:12px;overflow:hidden;border:1px solid rgba(255,255,255,.08);">
          <tr style="background:rgba(255,255,255,.03);">
            <td style="padding:12px 16px;font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:0.1em;width:35%;">Service</td>
            <td style="padding:12px 16px;font-size:14px;color:#fff;font-weight:600;">${serviceName}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid rgba(255,255,255,.06);">Plan</td>
            <td style="padding:12px 16px;font-size:14px;color:#fff;border-top:1px solid rgba(255,255,255,.06);">${body.plan}</td>
          </tr>
          <tr style="background:rgba(255,255,255,.03);">
            <td style="padding:12px 16px;font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid rgba(255,255,255,.06);">Installation</td>
            <td style="padding:12px 16px;font-size:14px;color:#fff;border-top:1px solid rgba(255,255,255,.06);">${body.installation === "priority" ? "Priority Installation" : "Standard Installation"}</td>
          </tr>
          <tr>
            <td style="padding:12px 16px;font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid rgba(255,255,255,.06);">Address</td>
            <td style="padding:12px 16px;font-size:14px;color:#fff;border-top:1px solid rgba(255,255,255,.06);">${address}</td>
          </tr>
          ${body.notes ? `<tr style="background:rgba(255,255,255,.03);">
            <td style="padding:12px 16px;font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:0.1em;border-top:1px solid rgba(255,255,255,.06);">Notes</td>
            <td style="padding:12px 16px;font-size:14px;color:rgba(255,255,255,.7);border-top:1px solid rgba(255,255,255,.06);">${body.notes}</td>
          </tr>` : ""}
        </table>
      </td>
    </tr>
  </table>

  <!-- Next steps -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#07071a;padding:0 40px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(44,55,146,.18);border:1px solid rgba(44,55,146,.45);border-radius:14px;padding:0;">
          <tr>
            <td style="padding:24px 28px;">
              <p style="margin:0 0 18px;font-size:14px;font-weight:700;color:#fff;">What Happens Next?</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,.75);line-height:1.5;">&#9989;&nbsp;&nbsp;Your order has been received and logged in our system.</td></tr>
                <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,.75);line-height:1.5;">&#128222;&nbsp;&nbsp;Our team will call you within <strong style="color:#fff;">1–2 business days</strong> to confirm your address and schedule installation.</td></tr>
                <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,.75);line-height:1.5;">&#128295;&nbsp;&nbsp;Our technicians will visit and complete your installation at the agreed time.</td></tr>
                <tr><td style="padding:6px 0;font-size:13px;color:rgba(255,255,255,.75);line-height:1.5;">&#127760;&nbsp;&nbsp;You'll be online and connected — enjoy blazing-fast connectivity!</td></tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Contact -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#0d0d2e;padding:32px 40px;text-align:center;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#fff;">Questions? We're here to help.</p>
        <p style="margin:0 0 0;font-size:13px;color:rgba(255,255,255,.55);">
          &#127760;&nbsp;<a href="https://isu-elihle.co.za" style="color:#bf2293;text-decoration:none;">www.isu-elihle.co.za</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          &#128231;&nbsp;<a href="mailto:hello@isu-elihle.co.za" style="color:#bf2293;text-decoration:none;">hello@isu-elihle.co.za</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          &#128222;&nbsp;043 004 0262
        </p>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#07071a;border-top:1px solid rgba(255,255,255,.06);padding:20px 40px;text-align:center;">
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,.25);line-height:1.7;">
          &copy; 2025 Isu Elihle Solutions (Pty) Ltd &middot; Reg: 2023/241519/07<br>
          100% Black-Owned &middot; B-BBEE Level 1 &middot; Eastern Cape, South Africa
        </p>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

function staffEmailHtml(body: OrderBody, reference: string): string {
  const serviceName = SERVICE_LABELS[body.service!] ?? body.service!;
  const fullName = `${body.firstName} ${body.lastName}`;
  const address = [body.address, body.suburb, body.city, body.province].filter(Boolean).join(", ");
  const submittedAt = new Date().toLocaleString("en-ZA", { timeZone: "Africa/Johannesburg", dateStyle: "full", timeStyle: "short" });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Order: ${reference}</title>
</head>
<body style="margin:0;padding:0;background:#07071a;font-family:'Segoe UI',Arial,sans-serif;color:#ffffff;">

  <!-- Header -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:linear-gradient(135deg,#bf2293,#5c2f92 50%,#2c3792);padding:28px 20px;text-align:center;">
        <img src="https://isu-elihle.co.za/logo.png" alt="Isu Elihle Solutions" height="48" style="display:block;margin:0 auto 12px;" />
        <p style="margin:0;font-size:18px;font-weight:800;color:#fff;letter-spacing:0.03em;">New Order Received</p>
        <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.7);">${submittedAt}</p>
      </td>
    </tr>
  </table>

  <!-- Reference -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#0d0d2e;padding:24px 20px;text-align:center;">
        <p style="margin:0 0 8px;font-size:12px;color:rgba(255,255,255,.45);letter-spacing:0.15em;text-transform:uppercase;">Reference</p>
        <span style="font-size:26px;font-weight:800;color:#bf2293;letter-spacing:0.08em;font-family:'Courier New',monospace;">${reference}</span>
      </td>
    </tr>
  </table>

  <!-- Customer details -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#07071a;padding:28px 40px;">
        <p style="margin:0 0 16px;font-size:13px;letter-spacing:0.12em;text-transform:uppercase;color:#bf2293;font-weight:600;">Customer Details</p>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid rgba(255,255,255,.08);border-radius:12px;overflow:hidden;">
          ${[
            ["Full Name", fullName],
            ["Email", body.email!],
            ["Phone", body.phone!],
            ["ID Number", body.idNumber || "—"],
            ["Address", address],
            ["Service", serviceName],
            ["Plan", body.plan!],
            ["Installation", body.installation === "priority" ? "Priority" : "Standard"],
            ["Notes", body.notes || "—"],
          ].map(([label, value], i) => `
          <tr style="${i % 2 === 0 ? "background:rgba(255,255,255,.03);" : ""}">
            <td style="padding:11px 16px;font-size:12px;color:rgba(255,255,255,.45);text-transform:uppercase;letter-spacing:0.1em;width:35%;${i > 0 ? "border-top:1px solid rgba(255,255,255,.06);" : ""}">${label}</td>
            <td style="padding:11px 16px;font-size:14px;color:#fff;${i > 0 ? "border-top:1px solid rgba(255,255,255,.06);" : ""}">${value}</td>
          </tr>`).join("")}
        </table>
      </td>
    </tr>
  </table>

  <!-- Action prompt -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#07071a;padding:0 40px 32px;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:rgba(191,34,147,.1);border:1px solid rgba(191,34,147,.3);border-radius:12px;">
          <tr>
            <td style="padding:20px 24px;font-size:13px;color:rgba(255,255,255,.75);line-height:1.7;">
              &#128222;&nbsp;Please contact <strong style="color:#fff;">${fullName}</strong> on <strong style="color:#fff;">${body.phone}</strong> or <a href="mailto:${body.email}" style="color:#bf2293;text-decoration:none;">${body.email}</a> within 1–2 business days to confirm coverage and schedule installation.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>

  <!-- Footer -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="background:#0d0d2e;border-top:1px solid rgba(255,255,255,.06);padding:16px 40px;text-align:center;">
        <p style="margin:0;font-size:11px;color:rgba(255,255,255,.25);">
          Isu Elihle Solutions (Pty) Ltd &middot; Internal Notification &middot; Do not reply to this email
        </p>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

async function createZohoLead(body: OrderBody): Promise<void> {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env;
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    console.warn("Zoho env vars not set — skipping lead creation");
    return;
  }

  const tokenParams = new URLSearchParams({
    refresh_token: ZOHO_REFRESH_TOKEN,
    client_id: ZOHO_CLIENT_ID,
    client_secret: ZOHO_CLIENT_SECRET,
    grant_type: "refresh_token",
  });
  const tokenRes = await fetch(
    `https://accounts.zoho.com/oauth/v2/token?${tokenParams}`,
    { method: "POST" }
  );
  if (!tokenRes.ok) {
    console.error("Zoho token request failed:", tokenRes.status, await tokenRes.text());
    return;
  }
  const { access_token } = (await tokenRes.json()) as { access_token?: string };
  if (!access_token) {
    console.error("Zoho token response missing access_token");
    return;
  }

  const leadRes = await fetch("https://www.zohoapis.com/crm/v2/Leads", {
    method: "POST",
    headers: {
      Authorization: `Zoho-oauthtoken ${access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: [
        {
          First_Name: body.firstName,
          Last_Name: body.lastName!,
          Email: body.email,
          Phone: body.phone,
          Street: body.address,
          City: body.city,
          Lead_Source: body.service,
          Description: body.plan,
        },
      ],
    }),
  });
  if (!leadRes.ok) {
    console.error("Zoho lead creation failed:", leadRes.status, await leadRes.text());
  }
}

async function sendEmails(body: OrderBody, reference: string): Promise<void> {
  const { RESEND_API_KEY } = process.env;
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email notifications");
    return;
  }

  const resend = new Resend(RESEND_API_KEY);
  const serviceName = SERVICE_LABELS[body.service!] ?? body.service!;
  const from = "Isu Elihle Solutions <noreply@isu-elihle.co.za>";

  const [customerResult, staffResult] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [body.email!],
      subject: `Order Confirmed – ${reference} | Isu Elihle Solutions`,
      html: customerEmailHtml(body, reference),
    }),
    resend.emails.send({
      from,
      to: ["orders@isu-elihle.co.za", "support@isu-elihle.co.za"],
      subject: `New Order: ${reference} — ${serviceName} (${body.firstName} ${body.lastName})`,
      html: staffEmailHtml(body, reference),
    }),
  ]);

  if (customerResult.status === "rejected") {
    console.error("Failed to send customer email:", customerResult.reason);
  }
  if (staffResult.status === "rejected") {
    console.error("Failed to send staff email:", staffResult.reason);
  }
}

const REQUIRED: (keyof OrderBody)[] = [
  "firstName",
  "lastName",
  "email",
  "phone",
  "address",
  "city",
  "province",
  "service",
  "plan",
];

function generateReference(): string {
  return "IES-" + Date.now().toString(36).toUpperCase().slice(-6);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const body = (req.body ?? {}) as OrderBody;
  const missing = REQUIRED.filter((k) => !body[k]?.toString().trim());
  if (missing.length) {
    return res.status(400).json({ error: "Missing required fields", fields: missing });
  }

  const reference = generateReference();

  try {
    const pool = await getPool();
    await pool
      .request()
      .input("reference", sql.NVarChar(50), reference)
      .input("firstName", sql.NVarChar(100), body.firstName)
      .input("lastName", sql.NVarChar(100), body.lastName)
      .input("email", sql.NVarChar(200), body.email)
      .input("phone", sql.NVarChar(30), body.phone)
      .input("idNumber", sql.NVarChar(30), body.idNumber || null)
      .input("address", sql.NVarChar(300), body.address)
      .input("suburb", sql.NVarChar(100), body.suburb || null)
      .input("city", sql.NVarChar(100), body.city)
      .input("province", sql.NVarChar(50), body.province)
      .input("service", sql.NVarChar(30), body.service)
      .input("plan", sql.NVarChar(50), body.plan)
      .input("installation", sql.NVarChar(30), body.installation || "standard")
      .input("notes", sql.NVarChar(sql.MAX), body.notes || null)
      .query(`
        INSERT INTO dbo.Orders
          (reference, firstName, lastName, email, phone, idNumber,
           address, suburb, city, province, service, planName, installation, notes)
        VALUES
          (@reference, @firstName, @lastName, @email, @phone, @idNumber,
           @address, @suburb, @city, @province, @service, @plan, @installation, @notes);
      `);

    await Promise.all([createZohoLead(body), sendEmails(body, reference)]);

    return res.status(201).json({ reference, status: "received" });
  } catch (err) {
    console.error("Failed to insert order:", err);
    return res.status(500).json({ error: "Failed to save order" });
  }
}
