const supabase = require("../config/supabase");

// Fetch all athletes
const fetchAthletes = async (req, res) => {
  try {
    const { data, error } = await supabase.from("athletes").select(`
        *,
        user:profiles (
          full_name,
          role
        )
      `); // join profiles for convenience

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Add new athlete (must have profile already)
const addAthlete = async (req, res) => {
  const { user_id, athlete_code, gender, nationality, county, date_of_birth } =
    req.body;

  try {
    // 1️⃣ Ensure the profile exists
    const { data: profileCheck, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user_id)
      .single();

    if (profileError || !profileCheck) {
      return res
        .status(400)
        .json({ error: "Profile does not exist for this user_id" });
    }

    // 2️⃣ Insert athlete
    const { data, error } = await supabase
      .from("athletes")
      .insert([
        { user_id, athlete_code, gender, nationality, county, date_of_birth },
      ])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchAthletes, addAthlete };
