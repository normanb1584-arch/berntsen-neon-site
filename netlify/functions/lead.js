// netlify/functions/lead.js
import { Client } from "pg";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let data = {};
  try {
    data = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  const { name, email, phone, message, source = "website" } = data;
  if (!name || typeof name !== "string") {
    return { statusCode: 400, body: "Name is required" };
  }

  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    const q = `
      insert into leads (name, email, phone, message, source)
      values ($1,$2,$3,$4,$5)
      returning id, created_at
    `;
    const res = await client.query(q, [name, email, phone, message, source]);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true, lead: res.rows[0] }),
    };
  } catch (e) {
    console.error(e);
    return { statusCode: 500, body: "DB error" };
  } finally {
    try { await client.end(); } catch {}
  }
}
