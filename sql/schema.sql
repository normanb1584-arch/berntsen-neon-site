-- Kjør dette i Neon sin SQL editor én gang
create extension if not exists pgcrypto; -- for gen_random_uuid på noen planer

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  phone text,
  message text,
  source text default 'website',
  created_at timestamptz default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  address text,
  job_type text,
  preferred_date date,
  notes text,
  created_at timestamptz default now()
);
