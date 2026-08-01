// Supabase connection for Charlie's 1st Birthday RSVP app.
// The anon (publishable) key is SAFE to expose in the browser — it is protected
// by row-level security: the public can only INSERT an RSVP, never read them.
// The guest list is readable only through the passcode-gated admin function.
window.CHARLIE_CONFIG = {
  SUPABASE_URL: "https://kvixnerqxegaehpmfidh.supabase.co",
  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2aXhuZXJxeGVnYWVocG1maWRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3MzkzNTQsImV4cCI6MjA3OTMxNTM1NH0.uFc8N4rUAkLlItV6OafSmmp0RAeN7y2fgaRaAXrCA9o",
};
