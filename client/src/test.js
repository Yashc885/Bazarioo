const bcrypt = require("bcryptjs");

const testPassword = "123456";  // The password you're entering
const storedHash = "$2b$10$ligd/aJP61QrTbG51WFbierXqzj6E7OGKHnCFqbwEs.nEVSt3Y2ZK"; // Replace with your actual hash

bcrypt.compare(testPassword, storedHash, (err, result) => {
  if (err) console.error("Error:", err);
  console.log("✅ Password match:", result); // Should print `true` if password matches
});
