import bcrypt from "bcrypt";
export class Hash {
  private readonly salt = 10;
  private password: string;

  constructor(password: string) {
    this.password = password;
  }

  public async hash() {
    return await bcrypt.hash(this.password, this.salt);
  }
}
