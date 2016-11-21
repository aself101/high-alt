# High Altitude Physical Reminder Application
This CRUD application allows the safety manager to track and inform employees of their required routine physicals in order to visit
Mauna Kea. Every employee who visits the mountain with any regularity is required to undergo a basic physical to ensure health safety.
The interface for the application consists of three simple forms to perform CUD operations and a table to read/sort all data.

### The reminder parameters; i.e. Less than 30 years of age, every 5 years
#### 30 < Every 5 years
#### 30 > & 40 < Every 3 years
#### 40 > & 50 < Every 2 years
#### 50 > Every year

# Development

## Database
#### MySQL https://www.mysql.com/

## Server Lang
#### PHP http://php.net/ (v5.6 IF possible)
#### PHPUnit https://phpunit.de/
###### To Install phpunit
- wget https://phar.phpunit.de/phpunit.phar
- chmod +x phpunit.phar
- sudo mv phpunit.phar /usr/local/bin/phpunit
- phpunit --version

#### Python v2.7 https://www.python.org/

## Client Lang
#### React JS v15.3 https://facebook.github.io/react/

## Server Configuration & Depndencies
#### Node JS v6.3 https://nodejs.org/en/
#### NPM  https://www.npmjs.com/
#### Gulp http://gulpjs.com/


<hr />

### Install node dependencies: npm install
### Install gulp globally: npm install -g gulp
### To run for development: gulp


## Python Reminder Script
The python reminder.py script runs every morning to update the safety reminder database.
It pulls all employees and compares their birthday's with the current date. If any of the employees
are within 30 days of a required physical renewal they will receive an email with instructions
on how and who to visit in order to complete the requirement. If employee's do not complete the
requirement within two weeks of the initial email, another will be sent out every two weeks until
it has been completed. The safety manager is required to edit their information in the app form once
the employee has completed their physical.

Once the employee has finished their physical, their information will be updated by the Safety manager.

## Testing
#### Node: npm run test
#### Python: python build/reminder/test_reminder.py
#### PHP: phpunit --configuration dbInfo.xml test_db.php
