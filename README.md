# Neon (Postgres) + Netlify Functions – Starter

Dette er en **gratis** (Free plan) starter for å lagre leads fra nettsiden din til **Neon (Postgres)** via **Netlify Functions**.

## Rask start (lokalt)

1. Installer avhengigheter:
   ```bash
   npm i
   ```

2. Lag en `.env`-fil i rotmappen med din Neon-connection string:
   ```bash
   echo "NEON_DATABASE_URL=postgresql://user:pass@ep-xxx.neon.tech/neondb" > .env
   ```

3. Kjør lokalt:
   ```bash
   npm run dev
   ```
   Netlify CLI proxy'er funksjonen på `/.netlify/functions/lead`.

## Oppsett i Neon

Kjør `sql/schema.sql` i Neons SQL editor for å lage tabeller.

## Deploy til Netlify (gratis)

1. Opprett et nytt _Site_ i Netlify og koble til dette prosjektet (Git) **eller** bruk `netlify deploy`.
2. I Netlify: **Site settings → Build & deploy → Environment → Environment variables**
   - Key: `NEON_DATABASE_URL`
   - Value: din connection string
3. Deploy på nytt. Skjemaet i `public/index.html` vil poste til `/.netlify/functions/lead`.

## Endepunkter

- `POST /.netlify/functions/lead`
  - Body (JSON): `{ "name": "...", "email": "...", "phone": "...", "message": "...", "source": "website" }`
  - Returnerer `{"ok": true, "lead": { "id": "...", "created_at": "..." }}`

## Sikkerhet

- Ikke eksponer `NEON_DATABASE_URL` i frontend-kode. Den skal kun ligge i miljøvariabler på server/Netlify.
- Skjemaet i `public/index.html` poster til en serverless-funksjon (ikke direkte til databasen).

Lykke til! 🚀
