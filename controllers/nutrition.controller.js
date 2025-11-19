const supabase = require("../config/supabase");

// Get athletes assigned to a nutritionist
const getAssignedAthletes = async (req, res) => {
  const nutritionist_id = req.query.nutritionist_id;

  try {
    const { data, error } = await supabase
      .from("nutrition_assignments")
      .select(
        `
        id,
        athlete_id,
        assigned_at,
        athlete:athletes (
          athlete_code,
          gender,
          county,
          date_of_birth,
          user_id
        )
      `
      )
      .eq("nutritionist_id", nutritionist_id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Assign athlete to nutritionist (admin only)
const assignAthlete = async (req, res) => {
  const { nutritionist_id, athlete_id } = req.body;

  try {
    const { data: nutritionistCheck, error: nError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", nutritionist_id)
      .single();

    if (nError || !nutritionistCheck)
      return res.status(400).json({ error: "Nutritionist does not exist" });

    const { data: athleteCheck, error: aError } = await supabase
      .from("athletes")
      .select("id")
      .eq("id", athlete_id)
      .single();

    if (aError || !athleteCheck)
      return res.status(400).json({ error: "Athlete does not exist" });

    const { data, error } = await supabase
      .from("nutrition_assignments")
      .insert([{ nutritionist_id, athlete_id }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAssignedAthletes, assignAthlete };
