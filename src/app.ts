import { envs } from "./config/envs";
import { Server } from "./presentation/server";
import { AppRoutes } from "./presentation/routes";
import { DataBase } from "./data";

(() => {
  main();
})();

function main() {
  
  const server = new Server({
    port: envs.PORT,
    routes: AppRoutes.routes,
  });
  const db = new DataBase(envs.DB_URI);

  server.start();
  db.connect();
}
