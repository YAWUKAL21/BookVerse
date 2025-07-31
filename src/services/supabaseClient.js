import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vviqzxqyaxiuosatsido.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aXF6eHF5YXhpdW9zYXRzaWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1MDEsImV4cCI6MjA2OTU2NjUwMX0.dskT8I_k_gM6UUscyuzM51APyJ0TdGBNGKo8UW5LCQs";

export const supabase = createClient(supabaseUrl, supabaseKey);
