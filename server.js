require("dotenv").config();
const app = require("./app");
const supabase = require("./config/supabase");

const PORT = process.env.PORT || 5000;

// Test DB connection on startup
const testDbConnection = async () => {
  try {
    const { data, error } = await supabase
      .from("athletes")
      .select("*")
      .limit(1);
    if (error) throw error;
    console.log("✅ Supabase connected successfully!");
  } catch (err) {
    console.error("❌ Supabase connection failed:", err.message);
    process.exit(1); // stop server if DB is unreachable
  }
};

testDbConnection();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
