-- Booking requests and questions from the Charles Hope Cowork website.
-- Run in the Supabase SQL editor, or with `supabase db push`.

create table if not exists public.enquiries (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  reference        text not null unique,
  kind             text not null check (kind in ('booking', 'question')),
  status           text not null default 'new'
                   check (status in ('new', 'contacted', 'confirmed', 'declined', 'closed', 'spam')),
  product          text check (product in ('site-inspection', 'monthly-desk', 'day-pass', 'hotel-guest',
                                           'private-workspace', 'boardroom', 'glass-meeting-pod', 'phone-booth')),
  desk_type        text check (desk_type in ('basic', 'screen')),
  desks            integer check (desks between 1 and 20),
  days             integer check (days >= 1),
  boardroom_length text check (boardroom_length in ('four-hours', 'full-day')),
  slots            integer check (slots >= 1),
  preferred_date   date,
  preferred_time   time,
  summary          text,
  estimate_zar     integer check (estimate_zar >= 0),   -- from published rates, incl. VAT; not a quote
  name             text not null,
  email            text not null,
  phone            text,
  message          text,
  page             text,
  consent          boolean not null check (consent),
  email_sent       boolean not null default false,
  notes            text                                  -- for your own follow-up
);

comment on table public.enquiries is 'Website booking requests and questions. Written by the Python API with the service role key.';

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_bookings_by_date_idx on public.enquiries (preferred_date) where kind = 'booking';
create index if not exists enquiries_status_idx on public.enquiries (status);

-- Row level security on, with no policies: the anon and authenticated keys can neither read nor write.
-- Only the service role (used on the server by the Python API, and by you in the dashboard) has access.
alter table public.enquiries enable row level security;

-- A view for the dashboard: open booking requests in date order.
create or replace view public.open_bookings
with (security_invoker = true) as
select reference, created_at, status, product, summary, estimate_zar, preferred_date, preferred_time, name, email, phone, message
from public.enquiries
where kind = 'booking' and status in ('new', 'contacted')
order by preferred_date nulls last, created_at;
