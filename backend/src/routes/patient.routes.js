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

router.route("/create-Patient")
  .post(createPatient);

router.route("/get-Doctor-Patient").get(getDoctorPatients);
  

router.route("/:id/get-Patient")
  .get(getPatientById)

  router.route("/:id/update-Patient").patch(updatePatient);

  router.route("/:id/delete-Patient").delete(deletePatient)

export default router;