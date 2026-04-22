-- ======================================================
-- S N Fabrics — Supabase Schema
-- Run this entire file in Supabase SQL Editor ONCE
-- Dashboard → SQL Editor → New Query → Paste → Run
-- ======================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Products ─────────────────────────────────────────
create table if not exists public.products (
  id           uuid primary key default uuid_generate_v4(),
  slug         text unique not null,
  name         text not null,
  website_name text not null,
  description  text not null,
  quality_desc text not null,
  weight       text,
  price_range  text not null,
  width        text not null,
  used_for     text not null,
  whatsapp_msg text not null,
  category     text not null check (category in ('velvet', 'specialty')),
  featured     boolean not null default false,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ── Product Images ────────────────────────────────────
create table if not exists public.product_images (
  id           uuid primary key default uuid_generate_v4(),
  product_id   uuid not null references public.products(id) on delete cascade,
  url          text not null,
  storage_path text,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

-- ── Blogs ─────────────────────────────────────────────
create table if not exists public.blogs (
  id                   uuid primary key default uuid_generate_v4(),
  title                text not null,
  slug                 text unique not null,
  excerpt              text not null,
  content              text not null default '',
  cover_url            text,
  cover_storage_path   text,
  author               text not null default 'S N Fabrics',
  tags                 text[] not null default '{}',
  read_time            text not null default '5 min read',
  status               text not null default 'draft' check (status in ('draft', 'published')),
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- ── Row Level Security ────────────────────────────────
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.blogs enable row level security;

-- Public read
create policy "Public read products"
  on public.products for select using (true);

create policy "Public read product_images"
  on public.product_images for select using (true);

create policy "Public read published blogs"
  on public.blogs for select using (status = 'published' or auth.role() = 'authenticated');

-- Authenticated (admin) full access
create policy "Admin all products"
  on public.products for all using (auth.role() = 'authenticated');

create policy "Admin all product_images"
  on public.product_images for all using (auth.role() = 'authenticated');

create policy "Admin all blogs"
  on public.blogs for all using (auth.role() = 'authenticated');

-- ── Updated_at trigger ────────────────────────────────
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger products_updated_at
  before update on public.products
  for each row execute function public.handle_updated_at();

create trigger blogs_updated_at
  before update on public.blogs
  for each row execute function public.handle_updated_at();

-- ── Storage Buckets ───────────────────────────────────
-- Run these separately if needed (or create via Dashboard → Storage)
insert into storage.buckets (id, name, public)
  values ('shade-cards', 'shade-cards', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('blog-covers', 'blog-covers', true)
  on conflict (id) do nothing;

-- Storage read policies
create policy "Public read shade-cards"
  on storage.objects for select using (bucket_id = 'shade-cards');

create policy "Admin upload shade-cards"
  on storage.objects for insert with check (bucket_id = 'shade-cards' and auth.role() = 'authenticated');

create policy "Admin delete shade-cards"
  on storage.objects for delete using (bucket_id = 'shade-cards' and auth.role() = 'authenticated');

create policy "Public read blog-covers"
  on storage.objects for select using (bucket_id = 'blog-covers');

create policy "Admin upload blog-covers"
  on storage.objects for insert with check (bucket_id = 'blog-covers' and auth.role() = 'authenticated');

create policy "Admin delete blog-covers"
  on storage.objects for delete using (bucket_id = 'blog-covers' and auth.role() = 'authenticated');
