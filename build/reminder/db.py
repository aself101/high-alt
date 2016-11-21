'''
    MySQL db class
'''
import config
import MySQLdb as mysql
import sys


class DB(object):
    ''' Private variables '''
    def __init__(self):
        self.__info = config.info()
        self.__host = self.__info[0]
        self.__user = self.__info[1]
        self.__passwd = self.__info[2]
        self.__db = self.__info[3]

    # Connects to database returns db instance and cursor
    def connect(self):
        try:
            mydb = mysql.connect(self.__host, self.__user, self.__passwd, self.__db)
            #print "Opening the connection to MySQL..."
            return mydb, mydb.cursor()
        except mysql.Error:
            print "Could not connect to MySQL. Check MySQL login info to ensure correctness: ", mysql.Error
            return sys.exit(1)

    # Close connection to database
    def close(self, db):
        try:
            #print "Closing the connection to MySQL..."
            return db.close()
        except mysql.Error:
            print "Something happened when trying to close the connection: ", mysql.Error

    # Set new database
    def setDB(self, cur, newDB):
        try:
            self.__db = newDB
            sql = "USE %s"%(self.__db)
            cur.execute(sql)
            print "Now using database: ", self.__db
        except mysql.Error:
            print "No such database: ", mysql.Error

    # Return database
    def getDB(self):
        return self.__db

    # Get tables of a given db
    # Returns dictionary of tables
    def getTables(self, cur):
        tables = []
        item_dict = {}
        try:
            sql = """SHOW TABLES"""
            cur.execute(sql)
            results = cur.fetchall()
            for t in results:
                tables.append(t[0])
            for i in xrange(0, len(tables)):
                print '%s. %s' %(i, tables[i])
            for item in xrange(0, len(tables)):
                item_dict[item] = tables[item]
            return item_dict
        except mysql.Error:
            print mysql.Error
            return sys.exit(1)

    # Show the columns of a selected table
    def showTable(self, choice):
        sql = """DESCRIBE %s"""%(choice)
        try:
            c = cur.execute(sql)
            for r in results:
                columns.append(r[0])
            for i in xrange(0, len(columns)):
                print "%s. %s" %(i+1, columns[i])
            # return columns
        except mysql.Error:
            print "Could not show the table and an error occurred: ", mysql.Error

    def query(self, cur):
        record_list = []
        sql = """SELECT name, physicalDate, email, TIMESTAMPDIFF(YEAR, birthDate, CURDATE()) AS age, didReminder, didPhysical, reminderCount FROM users"""
        try:
            cur.execute(sql)
            result = cur.fetchall()
            for i in result:
                record_list.append(i)
            #for i in xrange(0, len(record_list)):
            #    print "%s.  %s" %(i+1, record_list[i])
            return record_list
        except mysql.Error:
            print "An error occurred during the query. ", mysql.Error

    def update(self, cur, name, didReminder):
        sql = """UPDATE users SET didReminder=%s WHERE name='%s'"""%(didReminder,name)
        try:
            cur.execute(sql)
        except mysql.Error:
            print "An error occurred during the update.", mysql.Error

    def updateCount(self, cur, count):
        sql = """UPDATE users SET reminderCount=%s"""%(count)
        try:
            cur.execute(sql)
        except mysql.Error:
            print "An error occurred during the update.", mysql.Error










################################################################################
