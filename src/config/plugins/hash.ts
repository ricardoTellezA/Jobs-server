import bcrypt from "bcrypt";
export class Hash {
  private readonly salt = 10;
  private static password: string;

  constructor(password: string) {
    Hash.password = password;
  }

  public async hash() {
    return await bcrypt.hash(Hash.password, this.salt);
  }
}
