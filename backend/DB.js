const mongoose=require('mongoose');
const dotenv=require('dotenv')
dotenv.config();


const connectDB = async () => {
  try {
    // Replace with your MongoDB Atlas or local connection string
    const conn = await mongoose.connect(process.env. MONGODB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports=connectDB;