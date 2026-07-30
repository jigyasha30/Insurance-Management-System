const express = require("express");

const router = express.Router();

const {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  updateDocument,
  downloadDocument,
  deleteDocument,
} = require("../controllers/documentController");


const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const upload = require("../utils/upload");



// ==========================
// Upload Document
// ==========================

router.post(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "agent",
    "customer"
  ),
  upload.single("document"),
  uploadDocument
);




// ==========================
// Get All Documents
// ==========================

router.get(
  "/",
  protect,
  authorizeRoles(
    "admin",
    "agent"
  ),
  getAllDocuments
);




// ==========================
// Get Document By ID
// ==========================

router.get(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "agent",
    "customer"
  ),
  getDocumentById
);




// ==========================
// Update Document
// ==========================

router.put(
  "/:id",
  protect,
  authorizeRoles(
    "admin",
    "agent"
  ),
  upload.single("document"),
  updateDocument
);




// ==========================
// Download Document
// ==========================

router.get(
  "/download/:id",
  protect,
  authorizeRoles(
    "admin",
    "agent",
    "customer"
  ),
  downloadDocument
);




// ==========================
// Delete Document
// ==========================

router.delete(
  "/:id",
  protect,
  authorizeRoles(
    "admin"
  ),
  deleteDocument
);



module.exports = router;