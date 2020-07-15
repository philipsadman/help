import React from 'react';
// import { action } from '@storybook/addon-actions';
import Journal from '.';

const students = [{
  name: 'Larisa Ivanova',
  dates: [{
    date: '15-04-2020',
    scores: [null, 5, null]
  }, {
    date: '17-04-2020',
    scores: [null, null, 2]
  }]
}, {
  name: 'Petr Nalich',
  dates: [{
    date: '16-04-2020',
    scores: [4, 5, 3]
  }, {
    date: '18-04-2020',
    scores: [4, 5, 3]
  }, {
    date: '20-04-2020',
    scores: [4, 5, 3]
  }]
}];

export default {
  title: 'Journal',
  component: Journal
};

export const JournalWithData = () => <Journal students={students} />;
