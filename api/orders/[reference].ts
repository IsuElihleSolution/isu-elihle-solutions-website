import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getPool, sql } from "../_db.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const raw = req.query.reference;
  const reference = (Array.isArray(raw) ? raw[0] : raw)?.trim().toUpperCase();
  if (!reference || !/^IES-[A-Z0-9]{1,20}$/.test(reference)) {
    return res.status(400).json({ error: "Invalid reference format" });
  }

  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("reference", sql.NVarChar(50), reference)
      .query(`
        SELECT reference, status, firstName, city, service, planName AS plan, createdAt
        FROM dbo.Orders
        WHERE reference = @reference;
      `);

    const row = result.recordset[0];
    if (!row) return res.status(404).json({ error: "Order not found" });

    return res.status(200).json({
      reference: row.reference,
      status: row.status,
      firstName: row.firstName,
      city: row.city,
      service: row.service,
      plan: row.plan,
      createdAt: row.createdAt,
    });
  } catch (err) {
    console.error("Failed to fetch order:", err);
    return res.status(500).json({ error: "Failed to fetch order" });
  }
}
