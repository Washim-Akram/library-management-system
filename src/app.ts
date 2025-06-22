import cors from "cors";
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import routes from "./modules/routes";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send({ success: true, message: "Hello World" });
  } catch (error) {
    next(error);
  }
});

// handle 404-(Not Found) responses
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ message: "Sorry! Route Not Found" });
});

// Global/default error handler
app.use(((error: any, req: Request, res: Response, next: NextFunction) => {
  // Mongoose Validation Error
  if (error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      error,
    });
  }

  // Mongoose CastError (invalid ObjectId)
  if (error.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Invalid ID format",
      error,
    });
  }

  // Default case
  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Something went wrong",
    error,
  });
}) as ErrorRequestHandler);

export default app;
