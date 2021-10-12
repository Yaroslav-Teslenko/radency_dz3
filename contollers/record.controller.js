const RecordService = require("../service/record.service");
class RecordController {
  async createRecord(req, res, next) {
    try {
      // console.log(req.body.name);
      const payload = req.body;
      const responce = await RecordService.createRecord(payload);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async getRecord(req, res, next) {
    try {
      const id = req.params.id;
      const responce = await RecordService.getRecord(id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async editRecord(req, res, next) {
    try {
      // console.log(req);
      const id = req.params.id;
      const payload = req.body;
      console.log(id);
      const responce = await RecordService.editRecord(id, payload);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async deleteRecord(req, res, next) {
    try {
      // console.log(req);
      const id = req.params.id;
      const responce = await RecordService.deleteRecord(id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async setAcitiveToggle(req, res, next) {
    try {
      const id = req.params.id;
      const responce = await RecordService.setAcitiveToggle(id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async getRecords(req, res, next) {
    try {
      const responce = await RecordService.getRecords();
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  async getSummaryCat(req, res, next) {
    try {
      const responce = await RecordService.getSummaryCat();
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
}

/* const adminrRole = new Role({ value: "ADMIN" });
      await adminrRole.save(); */
module.exports = new RecordController();
