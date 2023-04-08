import express, { Application } from "express";
import { router } from "./routes";

const app: Application = express();
const port = 5050;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

try {
  app.listen(port, (): void => {
    console.log(`Connected successfully on port ${port}`);
  });
} catch (error) {
  console.error(`Error occured: ${(error as Error).message}`);
}
