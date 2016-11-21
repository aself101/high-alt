#!/usr/bin/python

import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from datetime import date
from db import DB
import sched
import time

# Main function to send an email out after a fault has been submitted
def email_reminder(user, email, physicalDate):
    today = date.today()
    t = today.timetuple()
    cur_year = t[0]
    cur_month = t[1]
    cur_day = t[2]
    cur_date = date.strftime(date.today(),"%B %d, %Y")
    no_reply = 'noreply@gemini'

    email_list = [email, 'jvierra@gemini.edu']
    COMMASPACE = ', '
    # *** FOR PRODUCTION ***
    email_out = COMMASPACE.join(email_list)

    # Create message container - correct MIME type is multipart/alternative
    msg = MIMEMultipart()
    msg['Subject'] = 'Subject'
    msg['From'] = no_reply
    msg['To'] = email_out

    # Create body of the message in html for message formatting
    html = """ \
    <html>
    <head>
    	<style type="text/css">
          .header {
            background: #8a8a8a;
          }
          .header .columns {
            padding-bottom: 0;
          }
          .header p {
            color: #fff;
            padding-top: 15px;
          }
          .header .wrapper-inner {
            padding: 20px;
          }
          .header .container {
            background: transparent;
          }
          .wrapper.secondary {
            background: #f3f3f3;
          }
        </style>
    </head>
    <body>

        <wrapper class="header">
          <container>
            <row class="collapse">
              <columns small="6">

              </columns>
            </row>
          </container>
        </wrapper>

        <container>

          <spacer size="16"></spacer>

          <row>
            <columns small="12">

            </columns>
          </row>

          <wrapper class="secondary">
            <row>
              <columns large="6">

              </columns>
              <columns large="6">

              </columns>
              <hr />
              <columns large="6">

              </columns>
              <hr />
              <columns large="6">

              </columns>
              <hr />

              <columns large="6">

              </columns>
              <hr />
              <br />
              <columns large="6">

              </columns>
              <br />
              <columns large="6">

              </columns>

            </row>
          </wrapper>
        </container>
    </body>
    </html>
    """%(user, physicalDate)

    # Record the MIME type: text/html
    message = MIMEText(html, 'html')

    # Attach into message container
    # HTML is preferred
    msg.attach(message)

    # Send the message
    s = smtplib.SMTP('')
    s.sendmail(no_reply, email_list, msg.as_string())
    s.quit()

# Parses query variables into their own lists
def parse_query(_list):
    users = list()
    physicalDate = list()
    email = list()
    age = list()
    didReminder = list()
    didPhysical = list()
    reminderCount = list()

    for i in xrange(0, len(_list)):
        users.append(_list[i][0])
        physicalDate.append(_list[i][1])
        email.append(_list[i][2])
        age.append(_list[i][3])
        didReminder.append(_list[i][4])
        didPhysical.append(_list[i][5])
        reminderCount.append(_list[i][6])

    return users, physicalDate, email, age, didReminder, didPhysical, reminderCount
# Takes the difference between two datetime objs
def diff_dates(d1, d2):
    return abs(d2 - d1).days


def compare_dates(pDate, today, user, email, age, didReminder, didPhysical, count):
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
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
    elif age > 30 and age <= 40:
        if diff >= __THREE_YEARS__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
    elif age > 40 and age <= 50:
        if diff >= __TWO_YEARS__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
    elif age > 50:
        if diff >= __ONE_YEAR__:
            if (didReminder == 0 and didPhysical == 'No'):
                didReminder = 1
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)
            elif (didReminder == 1 and didPhysical == 'No' and twoWeekCheck == 0):
                didReminder = 0
                db.update(cur, user, didReminder)
                email_reminder(user, email, pDate)


def main():
    # Pull all users in database
    _list = db.query(cur)
    # Parse out names, physical dates, emails, age
    users, pDate, email, age, didReminder, didPhysical, reminderCount = parse_query(_list)
    # Get todays date
    d = date.today()
    #*** When ready to go live ***
    if reminderCount[0] is None:
        reminderCount[0] = 0
    count = reminderCount[0] + 1
    #count = 1
    # Update count
    db.updateCount(cur, count)
    # Comparse todays date with the last physical dates
    # If the physical date is within 30 days of todays date based on the 5,3,2,1 yearly parameters; send reminder
    for i in xrange(0, len(users)):
        compare_dates(pDate[i], d, users[i], email[i], age[i], didReminder[i], didPhysical[i], count)


    #mydb.commit()
    #db.close(mydb)



if __name__ == "__main__":
    db = DB()
    mydb, cur = db.connect()

    '''

    scheduler = sched.scheduler(time.time, time.sleep)
    while (True):
        scheduler(10, 1, main, ())
        scheduler.run()
    '''

    main()
    mydb.commit()
    db.close(mydb)












































## END ##
