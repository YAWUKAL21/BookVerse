import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://vviqzxqyaxiuosatsido.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2aXF6eHF5YXhpdW9zYXRzaWRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTA1MDEsImV4cCI6MjA2OTU2NjUwMX0.dskT8I_k_gM6UUscyuzM51APyJ0TdGBNGKo8UW5LCQs";

export const supabase = createClient(supabaseUrl, supabaseKey);

// Sign up new user
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { data, error };
};

// Get currently logged-in user (null if guest)
export const getCurrentUser = async () => {
  try {
    // First check if there's an active session
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) {
      return null; // No user logged in
    }

    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.warn("No active user session.");
      return null;
    }

    return data.user || null;
  } catch (err) {
    console.warn("Error checking current user:", err.message);
    return null;
  }
};

// Log out user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return error;
};
