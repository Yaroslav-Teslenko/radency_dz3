//const RecordModel = require("../models/Record.model");
const ApiError = require("../middlewares/api.error");
let records = require("../repositories/data");
let categories = require("../repositories/category");

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
      let id = `rec-${Math.random()}`;
      records[id] = { ...payload, id, active: true, created: new Date() };
      const responce = records[id];
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
      records[id].name = payload.name;
      records[id].category = payload.category;
      records[id].content = payload.content;
      const responce = records[id];
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async setAcitiveToggle(id) {
    try {
      records[id].active = !records[id].active;
      const responce = records[id];
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: { message: err.message, errors: err.errors } };
    }
  }
  async deleteRecord(id) {
    try {
      delete records[id];
      const responce = `Record ${id} deleted`;
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getRecord(id) {
    try {
      const responce = records[id];
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getRecords() {
    try {
      const responce = records;
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getSummaryCat() {
    try {
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
