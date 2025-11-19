const supabase = require("../config/supabase");

// Get athletes assigned to a coach
const getAssignedAthletes = async (req, res) => {
  const coach_id = req.query.coach_id;

  try {
    const { data, error } = await supabase
      .from("coach_assignments")
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
      .eq("coach_id", coach_id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Assign athlete to coach (admin only)
const assignAthlete = async (req, res) => {
  const { coach_id, athlete_id } = req.body;

  try {
    // Check if coach exists
    const { data: coachCheck, error: coachError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", coach_id)
      .single();

    if (coachError || !coachCheck)
      return res.status(400).json({ error: "Coach does not exist" });

    // Check if athlete exists
    const { data: athleteCheck, error: athleteError } = await supabase
      .from("athletes")
      .select("id")
      .eq("id", athlete_id)
      .single();

    if (athleteError || !athleteCheck)
      return res.status(400).json({ error: "Athlete does not exist" });

    const { data, error } = await supabase
      .from("coach_assignments")
      .insert([{ coach_id, athlete_id }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAssignedAthletes, assignAthlete };
