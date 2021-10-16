let records = require("./data");
let categories = require("./category");

class RecordReposit {
  async createRecord(payload) {
    try {
      records[payload.id] = payload;
      const responce = records[payload.id];
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async editRecord(id, payload) {
    try {
      if (records[id]) {
        records[id].name = payload.name;
        records[id].category = payload.category;
        records[id].content = payload.content;
        console.log(records[id]);
        const responce = records[id];
        return { success: true, body: responce };
      }
    } catch (err) {
      return { success: false, error: err };
    }
  }

  async setAcitiveToggle(id) {
    try {
      if (records[id]) {
        records[id].active = !records[id].active;
      }
      const responce = records[id];
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: { message: err.message, errors: err.errors } };
    }
  }
  async deleteRecord(id) {
    try {
      if (records[id]) {
        delete records[id];
      }
      const responce = `Record ${id} deleted`;
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
  async getRecord(id) {
    try {
      const responce = records[id];
      if (responce) return { success: true, body: responce };
      else {
        return { success: false, body: "record not found" };
      }
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
  async getCategory() {
    try {
      const responce = categories;
      return { success: true, body: responce };
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = new RecordReposit();
