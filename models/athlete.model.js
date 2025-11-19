const supabase = require("../config/supabase");

const getAthletes = async () => {
  const { data, error } = await supabase.from("athletes").select("*");

  if (error) throw new Error(error.message);
  return data;
};

module.exports = { getAthletes };
