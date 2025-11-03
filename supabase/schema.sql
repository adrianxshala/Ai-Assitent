-- Create messages table for storing chat messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries by created_at
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (you can customize this based on your auth needs)
CREATE POLICY "Allow all operations on messages" ON messages
  FOR ALL
  USING (true)
  WITH CHECK (true);

