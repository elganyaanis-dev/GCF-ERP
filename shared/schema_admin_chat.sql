-- Admin Chat Messages Table (Secret Communication Channel)
CREATE TABLE IF NOT EXISTS admin_chat_messages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_email VARCHAR NOT NULL DEFAULT 'elganya.anis@gmail.com',
  message TEXT NOT NULL,
  sender_role VARCHAR DEFAULT 'supreme_admin',
  message_type VARCHAR DEFAULT 'instruction', -- instruction, feedback, status, alert
  attachments TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_admin_chat_created_at ON admin_chat_messages(created_at DESC);
