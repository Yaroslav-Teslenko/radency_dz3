const RecordService = require("../service/record.service");
const ApiError = require("../service/api.error");

let yup = require("yup");

let schema = yup.object().shape({
  name: yup.string().required(),
  category: yup.string().required(),
  content: yup.string().required(),
  active: yup.boolean().default(true),
  created: yup.date().default(function () {
    return new Date();
  }),
});

class RecordController {
  createRecord(req, res, next) {
    try {
      {
        const payload = req.body;
        schema
          .validate(payload, {
            abortEarly: false,
          })
          .then(() => {
            const responce = RecordService.createRecord(payload);
            return res.json(responce);
          })
          .catch((err) => {
            /*  err.name; // => 'ValidationError'
                err.errors; // => ['Deve ser maior que 18'] */
            next(ApiError.BadRequest("Ошибка при валидации", err.errors));
          });
      }
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
  getRecord(req, res, next) {
    try {
      const id = req.params.id;
      const responce = RecordService.getRecord(id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  editRecord(req, res, next) {
    const id = req.params.id;
    const payload = req.body;
    schema
      .validate(payload, {
        abortEarly: false,
      })
      .then(() => {
        const responce = RecordService.editRecord(id, payload);
        return res.json(responce);
      })
      .catch((err) => {
        next(ApiError.BadRequest("Ошибка при валидации", err.errors));
      });
  }
  deleteRecord(req, res, next) {
    try {
      // console.log(req);
      const id = req.params.id;
      const responce = RecordService.deleteRecord(id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  setAcitiveToggle(req, res, next) {
    try {
      const id = req.params.id;
      const responce = RecordService.setAcitiveToggle(id);
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  getRecords(req, res, next) {
    try {
      const responce = RecordService.getRecords();
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
  getSummaryCat(req, res, next) {
    try {
      const responce = RecordService.getSummaryCat();
      return res.json(responce);
    } catch (e) {
      next(e);
    }
  }
}

/* const adminrRole = new Role({ value: "ADMIN" });
       adminrRole.save(); */
module.exports = new RecordController();
