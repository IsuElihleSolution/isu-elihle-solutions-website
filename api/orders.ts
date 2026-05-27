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

    return res.status(201).json({ reference, status: "received" });
  } catch (err) {
    console.error("Failed to insert order:", err);
    return res.status(500).json({ error: "Failed to save order" });
  }
}
