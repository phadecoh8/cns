CREATE TABLE IF NOT EXISTS waitlist_entries (
  id serial PRIMARY KEY,
  name varchar(120) NOT NULL,
  school varchar(180) NOT NULL,
  faculty varchar(180) NOT NULL,
  department varchar(180) NOT NULL,
  level varchar(30) NOT NULL,
  email varchar(254) NOT NULL UNIQUE,
  consent boolean NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS waitlist_entries_created_at_idx
  ON waitlist_entries (created_at DESC);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id serial PRIMARY KEY,
  email varchar(254) NOT NULL UNIQUE,
  token_hash text NOT NULL,
  confirmed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  confirmed_at timestamptz
);

CREATE INDEX IF NOT EXISTS newsletter_subscribers_created_at_idx
  ON newsletter_subscribers (created_at DESC);
