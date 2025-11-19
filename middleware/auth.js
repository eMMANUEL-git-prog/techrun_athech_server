const supabase = require("../config/supabase");

module.exports = async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    // Validate JWT with Supabase
    const { data: userData, error } = await supabase.auth.getUser(token);

    if (error || !userData?.user) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Query profile with service role key (bypasses RLS safely)
    const { data: profile, error: profileErr } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userData.user.id)
      .single();

    if (profileErr || !profile) {
      return res.status(401).json({ error: "Profile not found" });
    }

    req.user = { user: profile, access_token: token };
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    res.status(500).json({ error: "Auth middleware error" });
  }
};
