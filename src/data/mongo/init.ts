import mongoose from "mongoose";

export class DataBase {
  private readonly url: string;
  constructor(url: string) {
    this.url = url;
  }

  async connect() {
    try {
      await mongoose.connect(this.url);
      console.log("Database connected");
    } catch (error) {
      console.log("Database connection error", error);
    }
  }
}
