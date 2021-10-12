const Router = require("express").Router;
const router = new Router();
const RecordController = require("../contollers/record.controller");

router.get("/records", RecordController.getRecords);
router.get("/record/stats", RecordController.getSummaryCat);

router.post("/record", RecordController.createRecord);
router.get("/record/:id", RecordController.getRecord);
router.put("/record/:id", RecordController.editRecord);
router.put("/record/active/:id", RecordController.setAcitiveToggle);
router.delete("/record/:id", RecordController.deleteRecord);

module.exports = router;
