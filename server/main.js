import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import '/imports/api/tasksMethods'; //특정 method 명시적으로 가져올 필요없음. 그냥 import하면 methods가 startup때 평가되고 등록됨.

const insertTask = (taskText) =>
  TasksCollection.insert({ text: taskText, createdAt: new Date() });
const cl = console.log;

Meteor.startup(() => {
  cl('start up');
  if (TasksCollection.find().count() === 0) {
    [
      'First Task',
      'Second Task',
      'Third Task',
      'Fourth Task',
      'Fifth Task',
      'Sixth Task',
      'Seventh Task',
    ].forEach(insertTask);
  }
});
