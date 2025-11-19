const supabase = require("../config/supabase");

module.exports = async function getUser(req) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return null;

  const { data: authData } = await supabase.auth.getUser(token);
  if (!authData?.user) return null;

  // load profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authData.user.id)
    .single();

  return profile;
};
