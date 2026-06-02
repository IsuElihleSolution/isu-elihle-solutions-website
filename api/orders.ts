import type { VercelRequest, VercelResponse } from "@vercel/node";
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

async function createZohoLead(body: OrderBody): Promise<void> {
  const { ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN } = process.env;
  if (!ZOHO_CLIENT_ID || !ZOHO_CLIENT_SECRET || !ZOHO_REFRESH_TOKEN) {
    console.warn("Zoho env vars not set — skipping lead creation");
    return;
  }

  // Exchange refresh token for access token
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

    // Fire-and-forget — Zoho failure must not block the order response
    createZohoLead(body).catch((err) => console.error("Zoho lead error:", err));

    return res.status(201).json({ reference, status: "received" });
  } catch (err) {
    console.error("Failed to insert order:", err);
    return res.status(500).json({ error: "Failed to save order" });
  }
}
