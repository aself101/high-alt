import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import Table from '../src/components/table';
import List from '../src/components/list';

const {renderIntoDocument,
       scryRenderedDOMComponentsWithTag,
       Simulate} = TestUtils;

describe('App Display', () => {
  it('Renders a table with headers and data', () => {
    const data = [
      {name: 'Test 1', email: 'test1@gemini.edu', hireDate: '12-22-2016', physicalDate: '12-23-2016', didPhysical: 'No', age: 45, nextPhysical: '12-23-2018'},
      {name: 'Test 2', email: 'test2@gemini.edu', hireDate: '12-22-2015', physicalDate: '12-23-2016', didPhysical: 'No', age: 25, nextPhysical: '12-23-2021'},
      {name: 'Test 3', email: 'test3@gemini.edu', hireDate: '12-22-2014', physicalDate: '12-23-2016', didPhysical: 'No', age: 35, nextPhysical: '12-23-2019'},
      {name: 'Test 4', email: 'test4@gemini.edu', hireDate: '12-22-2013', physicalDate: '12-23-2016', didPhysical: 'No', age: 55, nextPhysical: '12-23-2017'},
      {name: 'Test 5', email: 'test5@gemini.edu', hireDate: '12-22-2012', physicalDate: '12-23-2016', didPhysical: 'No', age: 65, nextPhysical: '12-23-2017'},
      {name: 'Test 6', email: 'test6@gemini.edu', hireDate: '12-22-2011', physicalDate: '12-23-2016', didPhysical: 'No', age: 75, nextPhysical: '12-23-2017'}
    ];
    const headers = [
      {id: 'Test 1', name: 'A'},
      {id: 'Test 2', name: 'B'},
      {id: 'Test 3', name: 'C'},
      {id: 'Test 4', name: 'D'},
      {id: 'Test 5', name: 'E'},
      {id: 'Test 6', name: 'F'}
    ];

    renderIntoDocument(
      <Table _class={"bordered highlight centered z-depth-2"} id={"Test"} headers={headers} data={data} />
    );
  });

  it('Renders a clickable list', () => {
    const list = [
      {name: 'A'}, {name: 'B'}, {name: 'C'}, {name: 'D'}, {name: 'E'}, {name: 'F'}, {name: 'G'},
    ];
    const click = (e) => {
      return e.target.id;
    };
    renderIntoDocument(
      <List data={list} onClick={click} />
    );
  });

  it('Computes the next physical date', () => {
    let age1 = 26;
    let age2 = 36;
    let age3 = 46;
    let age4 = 56;

    let date1 = computeNextPhysical(age1);
    let date2 = computeNextPhysical(age2);
    let date3 = computeNextPhysical(age3);
    let date4 = computeNextPhysical(age4);

    expect(date1).to.equal('2020-07-23');
    expect(date2).to.equal('2018-07-23');
    expect(date3).to.equal('2017-07-23');
    expect(date4).to.equal('2016-07-23');
  });

});


/* Same function as in helpers */
function computeNextPhysical(age) {
  let dPhysical = '2015-07-23';
  dPhysical = dPhysical.split('-');

  const dYear = parseInt(dPhysical[0]);
  const dMonth = dPhysical[1];
  const dDate = dPhysical[2];

  let nextPhysicalYear = 0;
  let nextDate;

  switch (true) {
    case (age <= 30):
      nextPhysicalYear = dYear + 5;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case (age > 30 && age <= 40):
      nextPhysicalYear = dYear + 3;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case (age > 40 && age <= 50):
      nextPhysicalYear = dYear + 2;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    case (age > 50):
      nextPhysicalYear = dYear + 1;
      nextDate = nextPhysicalYear + '-' + dMonth + '-' + dDate;
      return nextDate;
      break;
    default:
      //console.log("How did you end up here");
      return;
  }
}
