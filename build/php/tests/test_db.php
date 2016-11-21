<?php
  use PHPUnit\Framework\TestCase;

  class test_db extends PHPUnit_Extensions_Database_TestCase
  {
    // only instantiate pdo once for test clean-up/fixture load
    static private $pdo = null;
    // only instantiate PHPUnit_Extensions_Database_DB_IDatabaseConnection once per test
    private $conn = null;

    /** @test */
    public function getConnection()
    {

      if ($this->conn === null) {
        if (self::$pdo == null) {
          self::$pdo = new PDO($GLOBALS['DB_DSN'], $GLOBALS['DB_USER'], $GLOBALS['DB_PASSWD']);
        }
        $this->conn = $this->createDefaultDBConnection(self::$pdo, $GLOBALS['DB_DBNAME']);
      }
      return $this->conn;
    }
    /** @test */
    public function getDataSet() {
      return $this->createFlatXmlDataSet('users.xml');
    }
    /** @test */
    public function queryDataSet() {
      $ds = new PHPUnit_Extensions_Database_DataSet_QueryDataSet($this->getConnection());
      $ds->addTable('users', 'SELECT * FROM users');
    }
    /** @test */
    public function getRowCount() {
      $this->assertEquals(7, $this->getConnection()->getRowCount('users'));
    }
    /** @test */
    public function createDataSet() {
      $tableNames = ['users'];
      $dataset = $this->getConnection()->createDataSet();
    }
    /** @test */
    public function createQueryTable()
    {
        $tableNames = ['users'];
        $queryTable = $this->getConnection()->createQueryTable('users', 'SELECT * FROM users');
    }
    /** @test */
    public function createDataSetAssertion() {
      $dataset = $this->getConnection()->createDataSet(['users']);
      $expectedDataSet = $this->createFlatXmlDataSet('users.xml');
      $this->assertDataSetsEqual($expectedDataSet, $dataset);
    }
  }
?>
