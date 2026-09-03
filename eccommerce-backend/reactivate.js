import dns from "node:dns";
dns.setServers(['1.1.1.1', '8.8.8.8']);
import "dotenv/config";
import mongoose from "mongoose";

const reactivateAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI;
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(uri, {
      family: 4, // IPv4 resolve enforcement for ECONNREFUSED
    });

    const User = mongoose.models.User || mongoose.model("User", new mongoose.Schema({}, { strict: false }));
    
    // Apna Admin Email yahan change karein
    const targetEmail = "admin@example.com"; 

    const result = await User.updateOne(
      { email: targetEmail }, 
      { $set: { isActive: true, status: "active", role: "admin" } }
    );

    console.log("Reactivation result:", result);
    if (result.matchedCount === 0) {
      console.log(`No user found with email: ${targetEmail}`);
    } else {
      console.log("Admin account reactivated successfully!");
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error reactivating admin:", error);
    process.exit(1);
  }
};

reactivateAdmin();