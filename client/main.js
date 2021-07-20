import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { TasksCollection } from '../imports/api/TasksCollection';
import './main.html';

const cl = console.log;
const LocalMongo = new Mongo.Collection(null);
Session.set('theme', 'light');

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  cl('onCreated', this);
  this.counter = new ReactiveVar(0); //state
  cl('localMongo', LocalMongo);
});

Template.hello.helpers({
  counter() {
    cl('helpers', Template.instance());
    return Template.instance().counter.get();
  },
});

Template.mainContainer.helpers({
  // tasks: [
  //   { text: 'This is task 1' },
  //   { text: 'This is task 2' },
  //   { text: 'This is task 3' },
  // ],
  // tasks() {
  //   return TasksCollection.find({});
  // },
  tasks() {
    return TasksCollection.find({}, { sort: { createdAt: -1 } });
  },
  theme() {
    return Session.get('theme');
  },
});

Template.hello.events({
  'click button'(event, instance) {
    cl('counter', this);
    instance.counter.set(instance.counter.get() + 1);
  },
});

Template.form.events({
  'submit .task-form'(event) {
    // document
    //   .querySelector('.task-form')
    //   .addEventListener('submit', function (e) {
    //     e.preventDefault();
    //   });

    //form submit 막기
    event.preventDefault();

    const target = event.target;
    const text = target.text.value;

    TasksCollection.insert({
      text,
      createdAt: new Date(),
    });

    // 1. 클라이언트가 보안 환경에서 서버의 메소드를 실행하도록 요청을 보냄.
    // 2. call의 결과를 예측할 수 있도록 메소드의 시뮬레이션이 클라이언트 사이드에서 일어남. 실제로 method가 완료 되기 전 UI에 나타남.
    // 3. 이 시뮬레이션의 결과가 실제 결과와 같다면, 그대로 UI는 유지되고, 그렇지 않다면 서버의 상태로 UI가 바뀜
    Meteor.call('tasks.insert', text);

    target.text.value = '';
  },
});

Template.task.events({
  'click .toggle-checked'() {
    cl('toggle events', this);

    TasksCollection.update(this._id, {
      $set: { isChecked: !this.isChecked },
    });
    // Meteor.call('tasks.setIsChecked', this._id, !this.isChecked);
  },
  'click .delete'() {
    TasksCollection.remove(this._id);
    // Meteor.call('tasks.remove', this._id);
  },
});
