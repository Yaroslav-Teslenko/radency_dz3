const RecordReposit = require("../repositories/data.reposit");
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

class RecordService {
  async createRecord(payload) {
    try {
      await schema.validate(payload, {
        abortEarly: false,
      });
      let newRec = { ...payload, id: `rec-${Math.random()}`, active: true, created: new Date() };

      const responce = (await RecordReposit.createRecord(newRec)).body;

      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async editRecord(id, payload) {
    try {
      await schema.validate(payload, {
        abortEarly: false,
      });
      const responce = (await RecordReposit.editRecord(id, payload)).body;
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async setAcitiveToggle(id) {
    try {
      const responce = (await RecordReposit.setAcitiveToggle(id)).body;

      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: { message: err.message, errors: err.errors } };
    }
  }
  async deleteRecord(id) {
    try {
      const responce = (await RecordReposit.deleteRecord(id)).body;
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getRecord(id) {
    try {
      const responce = await RecordReposit.getRecord(id);
      return { success: true, body: responce.body };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getRecords() {
    try {
      const responce = await RecordReposit.getRecords();
      return { success: true, body: responce.body };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getSummaryCat() {
    try {
      const categories = (await RecordReposit.getCategory()).body;
      const records = (await RecordReposit.getRecords()).body;

      const responce = categories.reduce((acc, record, idx) => {
        acc[record.category] = { ...record, all: 0, arh: 0 };
        return acc;
      }, {});
      for (const key in records) {
        const element = records[key];
        responce[element.category].all++;
        if (!element.active) {
          responce[element.category].arh++;
        }
      }
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = new RecordService();
