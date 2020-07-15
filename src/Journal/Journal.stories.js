import React from 'react';
// import { action } from '@storybook/addon-actions';
import Journal from '.';

const students = [{
  id: '11',
  firstName: 'Rob',
  lastName: 'Tutor',
  events: [{
    lessonScore: 1,
    educationPlanEventId: '1.1',
    testScore: 1,
    isTestCompleted: false
  }, {
    isVisited: false,
    educationPlanEventId: '1.2',
    homeworkScore: 5
  }]
}, {
  id: '10',
  firstName: 'Boris',
  lastName: 'Mileev',
  events: [{
    isVisited: false,
    educationPlanEventId: '1.1'
  }, {
    isVisited: false,
    educationPlanEventId: '1.2',
    homeworkScore: 3
  }]
}];

const events = [{
  educationPlanEventId: '1.1',
  bookedStartDate: '2020-08-03T08:35:00.000Z',
  isCompleted: false,
  educationPlanId: '3',
  name: 'Lesson-1',
  lessonId: '5',
  testAttached: true,
  homeworkAttached: false
}, {
  educationPlanEventId: '1.2',
  bookedStartDate: '2020-08-03T08:35:00.000Z',
  isCompleted: false,
  educationPlanId: '4',
  name: 'Lesson-1',
  lessonId: '6',
  testAttached: true,
  homeworkAttached: true
}, {
  educationPlanEventId: '1.3',
  bookedStartDate: '2020-08-03T08:35:00.000Z',
  isCompleted: false,
  educationPlanId: '4',
  name: 'Lesson-1',
  lessonId: '6',
  testAttached: true,
  homeworkAttached: true
}];

export default {
  title: 'Journal',
  component: Journal
};

export const JournalWithData = () => <Journal students={students} events={events} step={2} />;
