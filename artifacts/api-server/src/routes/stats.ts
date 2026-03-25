import { Router, type IRouter } from "express";
import { GetStatsResponse } from "@workspace/api-zod";
import { getStats } from "../matchmaking";

const router: IRouter = Router();

router.get("/stats", (_req, res) => {
  const data = GetStatsResponse.parse(getStats());
  res.json(data);
});

export default router;
