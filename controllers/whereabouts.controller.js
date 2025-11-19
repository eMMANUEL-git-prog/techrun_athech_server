const supabase = require("../config/supabase");

// -------------------- Submissions --------------------

// Fetch all submissions (for dev, can filter by athlete later)
const fetchSubmissions = async (req, res) => {
  try {
    const { data, error } = await supabase.from("whereabouts_submissions")
      .select(`
        *,
        athlete:athletes (
          athlete_code,
          user_id
        )
      `);
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Add a new submission
const addSubmission = async (req, res) => {
  const { athlete_id, location, start_time, end_time, notes } = req.body;

  try {
    // Check athlete exists
    const { data: athleteCheck, error: athleteError } = await supabase
      .from("athletes")
      .select("id")
      .eq("id", athlete_id)
      .single();

    if (athleteError || !athleteCheck) {
      return res.status(400).json({ error: "Athlete does not exist" });
    }

    const { data, error } = await supabase
      .from("whereabouts_submissions")
      .insert([{ athlete_id, location, start_time, end_time, notes }])
      .select();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Updates --------------------

// Fetch updates for a submission
const fetchUpdates = async (req, res) => {
  const { submission_id } = req.query;

  try {
    const { data, error } = await supabase
      .from("whereabouts_updates")
      .select("*")
      .eq("submission_id", submission_id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Add update to a submission
const addUpdate = async (req, res) => {
  const {
    submission_id,
    updated_location,
    updated_start_time,
    updated_end_time,
    reason,
  } = req.body;

  try {
    // Check submission exists
    const { data: submissionCheck, error: submissionError } = await supabase
      .from("whereabouts_submissions")
      .select("id")
      .eq("id", submission_id)
      .single();

    if (submissionError || !submissionCheck) {
      return res.status(400).json({ error: "Submission does not exist" });
    }

    const { data, error } = await supabase
      .from("whereabouts_updates")
      .insert([
        {
          submission_id,
          updated_location,
          updated_start_time,
          updated_end_time,
          reason,
        },
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// -------------------- Verifications --------------------

// Fetch verifications for a submission
const fetchVerifications = async (req, res) => {
  const { submission_id } = req.query;

  try {
    const { data, error } = await supabase
      .from("whereabouts_verifications")
      .select("*")
      .eq("submission_id", submission_id);

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Add verification (status = 'pending' by default)
const addVerification = async (req, res) => {
  const { submission_id, verifier_id, status, comments } = req.body;

  try {
    // Check submission exists
    const { data: submissionCheck, error: submissionError } = await supabase
      .from("whereabouts_submissions")
      .select("id")
      .eq("id", submission_id)
      .single();

    if (submissionError || !submissionCheck) {
      return res.status(400).json({ error: "Submission does not exist" });
    }

    const { data, error } = await supabase
      .from("whereabouts_verifications")
      .insert([
        { submission_id, verifier_id, status: status || "pending", comments },
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  fetchSubmissions,
  addSubmission,
  fetchUpdates,
  addUpdate,
  fetchVerifications,
  addVerification,
};
