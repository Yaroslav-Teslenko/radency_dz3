//const RecordModel = require("../models/Record.model");
let records = [
  {
    id: 1,
    name: "name1",
    created: "2021-10-07T17:55:40.371Z",
    category: "Task",
    content: " Lorem ipsum 10/07/2021 10/08/2021 10/09/2021 adipisicing elit. 12/25/2021",
    active: true,
  },
  { id: 2, name: "name2", created: "2021-10-07T17:55:40.371Z", category: "Task", content: " Lorem ipsum dolor sit amet consectetur adipisicing elit.  ", active: false },
  { id: 3, name: "name3", created: "2021-10-07T17:55:40.371Z", category: "Idea", content: " Lorem 25/07/2021	.  ", active: false },
  { id: 4, name: "name4", created: "2021-10-07T17:55:40.371Z", category: "Idea", content: " Lorem ipsum dolor sit amet consectetur adipisicing elit.  ", active: true },
  { id: 5, name: "name5", created: "2021-10-07T17:55:40.371Z", category: "Idea", content: " Lorem ipsum dolor sit amet consectetur adipisicing elit.  ", active: false },
].reduce((acc, record, idx) => {
  acc[record.id] = { ...record, idx };
  return acc;
}, {});

let categories = [{ category: "Task" }, { category: "Random Thought" }, { category: "Idea" }];

class RecordService {
  createRecord(payload) {
    let id = `rec-${Math.random()}`;
    records[id] = { ...payload, id, active: true, created: new Date() };
    const responce = records[id];

    return responce;
  }

  setAcitiveToggle(id) {
    records[id].active = !records[id].active;
    const responce = records[id];
    return responce;
  }

  editRecord(id, payload) {
    records[id].name = payload.name;
    records[id].category = payload.category;
    records[id].content = payload.content;

    const responce = records[id];
    return responce;
  }

  deleteRecord(id) {
    delete records[id];
    const responce = { id };
    return responce;
  }
  getRecord(id) {
    const responce = records[id];
    return responce;
  }
  getRecords() {
    const responce = records;
    return responce;
  }
  getSummaryCat() {
    let tmp = categories.reduce((acc, record, idx) => {
      acc[record.category] = { ...record, all: 0, arh: 0 };
      return acc;
    }, {});
    for (const key in records) {
      const element = records[key];
      tmp[element.category].all++;
      if (!element.active) {
        tmp[element.category].arh++;
      }
    }
    //console.log(tmp);
    return tmp;
  }
}

module.exports = new RecordService();
