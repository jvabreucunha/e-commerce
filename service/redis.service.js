require("dotenv").config();
const redis = require("redis");

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => console.error("❌ Erro no Redis:", err));
client.on("connect", () => console.log("✅ Conectado ao Redis"));

(async () => {
  if (!client.isOpen) {
    await client.connect();
  }
})();

module.exports = client;
