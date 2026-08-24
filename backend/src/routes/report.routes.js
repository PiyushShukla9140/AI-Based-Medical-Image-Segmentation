import { Router } from "express";
import {
  createReport,
  getReportById,
  updateDiagnosticReport,
  deleteDiagnosticReport
} from "../controllers/report.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT);

router.route("/")
  .post(authorizeRoles("doctor", "radiologist", "admin"), createReport);

router.route("/:id")
  .get(getReportById)
  .patch(authorizeRoles("doctor", "radiologist", "admin"), updateDiagnosticReport)
  .delete(authorizeRoles("doctor", "radiologist", "admin"),deleteDiagnosticReport);

export default router;