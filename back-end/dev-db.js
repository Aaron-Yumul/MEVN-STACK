const { MongoMemoryServer } = require("mongodb-memory-server");
const fs = require("fs");
const path = require("path");

(async () => {
  // Stored outside backend/ so nodemon doesn't restart when data changes
  const dbPath = path.join(__dirname, "..", ".local-db");
  fs.mkdirSync(dbPath, { recursive: true });

  const mongod = await MongoMemoryServer.create({
    instance: { port: 27017, dbPath, storageEngine: "wiredTiger" },
  });

  console.log("✅ Local MongoDB running at", mongod.getUri());
  console.log("Keep this terminal open. Press Ctrl+C to stop.");

  process.on("SIGINT", async () => {
    await mongod.stop();
    process.exit(0);
  });
})();
