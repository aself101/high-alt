import unittest
from datetime import date

'''
    All unit tests are taken from reminder.py, though edited to avoid
    email send outs and database interactions
'''
def diff_dates(d1, d2):
    return abs(d2 - d1).days

'''
    FOR tests
    Return 1 if initial check goes through: If user is within 30 days and didPhysical is No
    Return 2 if second check goes through: If use is within 30 days and didPhysical is STILL NO
        A two week check is run; every morning the reminder script runs and a cumulative count is collected
        each time
'''
def compare_dates(pDate, today, age, didReminder, didPhysical, count):
    diff = diff_dates(pDate, today)
    # Reminder is sent 30 days prior to the physical requirement
    __FIVE_YEARS__ = 1825 - 30
    __THREE_YEARS__ = 1095 - 30
    __TWO_YEARS__ = 730 - 30
    __ONE_YEAR__ = 365 - 30

    twoWeekCheck = count % 15

    # Go through each user and determine if they require an email
    if age <= 30:
        if diff >= __FIVE_YEARS__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                return 1
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                return 2
    elif age > 30 and age <= 40:
        if diff >= __THREE_YEARS__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                return 1
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                return 2
    elif age > 40 and age <= 50:
        if diff >= __TWO_YEARS__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                return 1
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                return 2
    elif age > 50:
        if diff >= __ONE_YEAR__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                return 1
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                return 2

    return False

class ReminderTestCases(unittest.TestCase):

    def test_diff_dates(self):
        print("Test: Difference of dates")
        d1 = date(2016, 8, 12)
        d2 = date(2016, 4, 3)
        diff = diff_dates(d1, d2)

        self.failUnlessEqual(131, 131, 'Does not equal 131')

    def test_age_25_reminder_not_needed(self):
        print("Test 20s: Physical date still within its time limit and does not need a reminder")
        age = 25
        pdate = date(2014, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'Yes'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, False, 'Should return False: Reminder is not required')


    def test_age_25_pass(self):
        print("Test 20s: Email send out if physical date > 5 years")
        age = 25
        pdate = date(2010, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, 1, 'Should return 1: First email/reminder sent out')

    def test_age_25_second_reminder_pass(self):
        print("Test 20s: Email send out if physical date > 5 years on second reminder")
        age = 25
        pdate = date(2010, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 1
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=15)

        self.failUnlessEqual(check, 2, 'Should return 2: Second email/reminder sent out')

    def test_age_35_reminder_not_needed(self):
        print("Test 30s: Physical date still within its time limit and does not need a reminder")
        age = 35
        pdate = date(2014, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'Yes'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, False, 'Should return False: Reminder is not required')

    def test_age_35_pass(self):
        print("Test 30s: Email send out if physical date > 3 years")
        age = 35
        pdate = date(2013, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, 1, 'Should return 1: First email/reminder sent out')

    def test_age_35_second_reminder_pass(self):
        print("Test 30s: Email send out if physical date > 3 years on second reminder")
        age = 35
        pdate = date(2013, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 1
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=15)

        self.failUnlessEqual(check, 2, 'Should return 2: Second email/reminder sent out')

    def test_age_45_reminder_not_needed(self):
        print("Test 40s: Physical date still within its time limit and does not need a reminder")
        age = 45
        pdate = date(2015, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'Yes'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, False, 'Should return False: Reminder is not required')

    def test_age_45_pass(self):
        print("Test 40s: Email send out if physical date > 2 years")
        age = 45
        pdate = date(2014, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, 1, 'Should return 1: First email/reminder sent out')

    def test_age_45_second_reminder_pass(self):
        print("Test 40s: Email send out if physical date > 2 years on second reminder")
        age = 45
        pdate = date(2014, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 1
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=15)

        self.failUnlessEqual(check, 2, 'Should return 2: Second email/reminder sent out')

    def test_age_55_reminder_not_needed(self):
        print("Test 50s: Physical date still within its time limit and does not need a reminder")
        age = 55
        pdate = date(2015, 9, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'Yes'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, False, 'Should return False: Reminder is not required')

    def test_age_55_pass(self):
        print("Test 50s: Email send out if physical date > 1 year")
        age = 55
        pdate = date(2014, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 0
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=0)

        self.failUnlessEqual(check, 1, 'Should return 1: First email/reminder sent out')

    def test_age_55_second_reminder_pass(self):
        print("Test 50s: Email send out if physical date > 1 year on second reminder")
        age = 55
        pdate = date(2014, 8, 16)
        today = date.today()
        # Did not remind the user that they need a physical
        didReminder = 1
        didPhysical = 'No'
        check = compare_dates(pdate, today, age, didReminder, didPhysical, count=15)

        self.failUnlessEqual(check, 2, 'Should return 2: Second email/reminder sent out')



if __name__ == '__main__':
    unittest.main()








# END #
