const mongoose = require("mongoose");

// Connection monitoring (Mongoose reconnects on its own; these just log it)
mongoose.connection.on("disconnected", () =>
  console.warn(
    "⚠️  [MongoDB] Disconnected. Mongoose will keep trying to reconnect...",
  ),
);
mongoose.connection.on("reconnected", () =>
  console.log("🔄 [MongoDB] Reconnected to database"),
);
mongoose.connection.on("error", (err) =>
  console.error("❌ [MongoDB] Connection error:", err.message),
);

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/finals_mevn_db";
    await mongoose.connect(uri);
    console.log(
      `✅ [MongoDB] Connected to database: ${mongoose.connection.name}`,
    );
  } catch (error) {
    console.error("❌ [MongoDB] Connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
