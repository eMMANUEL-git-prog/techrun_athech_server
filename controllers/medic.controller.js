const supabase = require("../config/supabase");

// Get athletes assigned to a medic
const getAssignedAthletes = async (req, res) => {
  const medic_id = req.query.medic_id;

  try {
    const { data, error } = await supabase
      .from("medic_assignments")
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
      .eq("medic_id", medic_id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Assign athlete to medic (admin only)
const assignAthlete = async (req, res) => {
  const { medic_id, athlete_id } = req.body;

  try {
    const { data: medicCheck, error: mError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", medic_id)
      .single();

    if (mError || !medicCheck)
      return res.status(400).json({ error: "Medic does not exist" });

    const { data: athleteCheck, error: aError } = await supabase
      .from("athletes")
      .select("id")
      .eq("id", athlete_id)
      .single();

    if (aError || !athleteCheck)
      return res.status(400).json({ error: "Athlete does not exist" });

    const { data, error } = await supabase
      .from("medic_assignments")
      .insert([{ medic_id, athlete_id }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAssignedAthletes, assignAthlete };
