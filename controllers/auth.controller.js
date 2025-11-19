const supabase = require("../config/supabase");

// --------------------- SIGN UP ---------------------
const signUp = async (req, res) => {
  const { email, password, full_name } = req.body;
  try {
    const { data: authData, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // auto-confirm for dev
      });
    if (authError) return res.status(400).json({ error: authError.message });

    const userId = authData?.user?.id;
    if (!userId)
      return res.status(500).json({ error: "Failed to get user ID" });

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .insert([{ id: userId, full_name, role: "athlete" }])
      .select();

    if (profileError)
      return res.status(400).json({ error: profileError.message });

    res.status(201).json({
      message: "User created",
      user: authData.user,
      profile: profileData[0],
    });
  } catch (err) {
    console.error("signUp error:", err);
    res.status(500).json({ error: err.message });
  }
};

// --------------------- SIGN IN ---------------------
const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return res.status(400).json({ error: error.message });
    if (!data.session)
      return res.status(401).json({ error: "No session returned" });

    res.json({
      message: "Login successful",
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: data.user,
    });
  } catch (err) {
    console.error("signIn error:", err);
    res.status(500).json({ error: err.message });
  }
};

// --------------------- GET ME ---------------------
const getMe = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    res.json({ message: "User fetched successfully", user: req.user.user });
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { signUp, signIn, getMe };
