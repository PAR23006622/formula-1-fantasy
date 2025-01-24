/*
  # Authentication Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `hashed_password` (text)
      - `email_verified` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    - `verification_tokens`
      - `identifier` (text, primary key)
      - `token` (text)
      - `expires` (timestamp)
    - `sessions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `expires` (timestamp)
      - `session_token` (text, unique)
    - `accounts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `type` (text)
      - `provider` (text)
      - `provider_account_id` (text)
      - `refresh_token` (text)
      - `access_token` (text)
      - `expires_at` (bigint)
      - `token_type` (text)
      - `scope` (text)
      - `id_token` (text)
      - `session_state` (text)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  hashed_password text,
  email_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create verification tokens table
CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier text PRIMARY KEY,
  token text NOT NULL,
  expires timestamptz NOT NULL
);

-- Create sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  expires timestamptz NOT NULL,
  session_token text UNIQUE NOT NULL
);

-- Create accounts table for OAuth providers
CREATE TABLE IF NOT EXISTS accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text NOT NULL,
  provider text NOT NULL,
  provider_account_id text NOT NULL,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  UNIQUE(provider, provider_account_id)
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Public can create users"
  ON users
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Session policies
CREATE POLICY "Users can read own sessions"
  ON sessions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own sessions"
  ON sessions
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Account policies
CREATE POLICY "Users can read own accounts"
  ON accounts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own accounts"
  ON accounts
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create function to handle user updates
CREATE OR REPLACE FUNCTION handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for user updates
CREATE TRIGGER on_user_update
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION handle_user_update();