const supabase = require("../config/supabase");

// Fetch all alerts (optionally filter by user_id)
const fetchAlerts = async (req, res) => {
  const { user_id } = req.query;

  try {
    let query = supabase.from("alerts").select(`
      *,
      user:profiles (
        full_name,
        role
      )
    `);

    if (user_id) {
      query = query.eq("user_id", user_id);
    }

    const { data, error } = await query;

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Add a new alert
const addAlert = async (req, res) => {
  const { user_id, title, message, alert_type } = req.body;

  try {
    // Check if user exists
    const { data: userCheck, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user_id)
      .single();

    if (userError || !userCheck) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Insert alert
    const { data, error } = await supabase
      .from("alerts")
      .insert([{ user_id, title, message, alert_type }])
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Mark alert as read
const markAsRead = async (req, res) => {
  const { alert_id } = req.body;

  try {
    const { data, error } = await supabase
      .from("alerts")
      .update({ read: true })
      .eq("id", alert_id)
      .select();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { fetchAlerts, addAlert, markAsRead };
