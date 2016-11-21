/*
  Difference static data lists for different parts of the application

*/

export var uuid = () => { return Math.random().toString(12).slice(2); }
var randomDate = () => { return (Math.floor(Math.random() * (2016 - 2003)) + 2003); }
var randomAge = () => { return Math.floor(Math.random() * (75 - 18) + 18); }

export const Links = [
  { href: '#', name: 'Development' },
  { href: '#', name: 'Science' },
  { href: '#', name: 'Administration' },
  { href: '#', name: 'Safety' },
  { href: '#', name: 'ITS' }
];

export const TableHeaders = [
  { name: 'Name', id: '_name' },
  { name: 'Email', id: '_email' },
  { name: 'Date of Hire', id: '_hireDate' },
  { name: 'Date of Physical', id: '_physicalDate' },
  { name: 'Completed Physical', id: '_didPhysical' },
  { name: 'Age', id: '_age' },
  { name: 'Next Physical', id: '_nextPhysical' }
];

export const DummyData = [
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'Yes', nextPhysical: randomDate(), age: randomAge() },
  { name: uuid(), hireDate: randomDate(), physicalDate: randomDate(), didPhysical: 'No', nextPhysical: randomDate(), age: randomAge() },
];

export const Months = {
  'January': 1,
  'February': 2,
  'March': 3,
  'April': 4,
  'May': 5,
  'June': 6,
  'July': 7,
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12
};





















/* END */
