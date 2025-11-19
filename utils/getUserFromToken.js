const supabase = require("../config/supabase");

module.exports = async function getUserFromToken(token) {
  if (!token) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user) return null;

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return {
    id: user.id,
    email: user.email,
    full_name: profile.full_name,
    role: profile.role,
  };
};
