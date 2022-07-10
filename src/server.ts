import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

import config from "./config";

console.log(process.env.NODE_ENV);

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const PORT = config.port || 3000;
const app: express.Application = express();
const address: string = `http://localhost:${PORT}`;

app.use(bodyParser.json());
app.use(morgan("short"));

app.get("/", function (_req: Request, res: Response) {
  res.send("Hello World!");
});

app.use("/api/v1", routes);

// Error 404
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message:
      "Are You Lost? Please make sure you are looking for the right place 😎",
  });
});

app.use(errorHandler);

app.listen(PORT, function () {
  console.log(`starting app on: ${address}`);
});
