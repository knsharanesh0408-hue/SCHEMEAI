-- Initial SQL for SchemeAI

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table (Minimal data, synced with Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone_hash TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    age INTEGER,
    income NUMERIC,
    state TEXT,
    caste TEXT,
    occupation TEXT,
    disability_status BOOLEAN DEFAULT FALSE,
    language_preference TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Schemes Table
CREATE TABLE IF NOT EXISTS schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    eligibility_criteria JSONB,
    category TEXT, -- Senior Citizens, Students, Women, Farmers, etc.
    state TEXT, -- 'Central' or specific state name
    closing_date DATE,
    portal_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Applications Table
CREATE TABLE IF NOT EXISTS applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    scheme_id UUID REFERENCES schemes(id),
    status TEXT DEFAULT 'Pending', -- Pending, Approved, Rejected
    portal_status TEXT,
    applied_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Saved Schemes Table
CREATE TABLE IF NOT EXISTS saved_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    scheme_id UUID REFERENCES schemes(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, scheme_id)
);

-- Documents Table
CREATE TABLE IF NOT EXISTS documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    doc_type TEXT, -- Aadhaar, Income Certificate, etc.
    file_url TEXT,
    compressed_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Operator Queue Table
CREATE TABLE IF NOT EXISTS operator_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    token_number SERIAL,
    user_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'Waiting', -- Waiting, Processing, Completed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Grievances Table
CREATE TABLE IF NOT EXISTS grievances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    issue_description TEXT,
    generated_letter TEXT,
    language TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_schemes_category ON schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON schemes(state);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON applications(user_id);

-- Updated At Trigger Function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_schemes_updated_at BEFORE UPDATE ON schemes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
