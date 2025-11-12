import mongoose from "mongoose";

const DBConnection = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.cuisti5.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`,
      {
        dbName: process.env.DB_NAME,
      }
    );
    if (conn) {
      console.log(
        `DB Connction Successfully :- ${conn.connection.host}/${conn.connection.name}`
      );
    }
  } catch (error) {
    console.log(`DB Failed :- ${error}`);
    process.exit(1);
  }
};

export default DBConnection;
