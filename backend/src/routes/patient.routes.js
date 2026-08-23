import { Router } from "express";
import {
  createPatient,
  getDoctorPatients,
  getPatientById,
  updatePatient,
  deletePatient
} from "../controllers/patient.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Protect all patient endpoints
router.use(verifyJWT);

router.route("/")
  .post(createPatient)
  .get(getDoctorPatients);

router.route("/:id")
  .get(getPatientById)
  .patch(updatePatient)
  .delete(deletePatient);

export default router;