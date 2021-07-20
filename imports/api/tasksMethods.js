import { check } from 'meteor/check';
import { TasksCollection } from './TasksCollection';

Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    if (!text) {
      throw new Meteor.Error('빈 값이 왔어요 😫');
    }
    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });
  },

  'tasks.remove'(taskId) {
    check(taskId, String);

    TasksCollection.remove(taskId);
  },

  'tasks.setIsChecked'(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
