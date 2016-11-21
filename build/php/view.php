<?php
  // Check env host before loading config.ini
  if(is_ajax()) {
  	$config = parse_ini_file('../config.ini');
  	$dbname = $config['dbname'];

  	try {
  		$db = new PDO("mysql:host=localhost;dbname=$dbname;charset=utf8",$config['username'],$config['password']);
  	} catch(PDOException $ex) {
  		print("No db connection");
  	}
    if (isset($_GET['users'])) {
        getUsers($db);
    }
    else if (isset($_GET['userSearch'])) {
        autoComplete($db);
    }
    else if (isset($_GET['sortColumn'])) {
        sortColumn($db);
    }
    else if (isset($_GET['deleteUser'])) {
        deleteUser($db);
    }
    else if (isset($_GET['pagOnClick'])) {
        pullPagTable($db);
    }
    else if (isset($_GET['pullAllUsers'])) {
        pullUserToDelete($db);
    }
    else if (isset($_GET['pullUsersForEdit'])) {
        pullUserToEdit($db);
    }
    else if (isset($_GET['pullEditInfo'])) {
        pullEditInfo($db);
    }
    else if (isset($_GET['updateUser'])) {
        updateUser($db);
  	}
    else if (isset($_POST['data']) && !empty($_POST['data'])) {
        insertUser($db);
  	}
    else {
        echo json_encode("There is no get/post and somehow you are here.");
    }
  }// end IF

  function is_ajax() {
  	return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
  }

  function insertUser($db) {
    $user = $_POST['data']['userName'];
    $hireDate = $_POST['data']['hireDate'];
    $physicalDate = $_POST['data']['physicalDate'];
    $didPhysical = $_POST['data']['didPhysical'];
    $guid = $_POST['data']['uuid'];
    $birthDate = $_POST['data']['birthDate'];
    $age = $_POST['data']['age'];
    $nextPhysical = $_POST['data']['nextPhysical'];
    $email = $_POST['data']['email'];

    // Check if user exists
    $stmt = $db->prepare("SELECT name FROM users WHERE name='$user'");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //echo json_encode(gettype($rows));

    if (count($rows) == 1) {
      echo json_encode(0);
    } else {
      $stmt = $db->prepare("INSERT INTO users(name, hireDate, physicalDate, didPhysical, birthDate, guid, age, nextPhysical, email)
        VALUES(?,?,?,?,?,?,?,?,?)");
      $stmt->execute(array($user,$hireDate,$physicalDate,$didPhysical,$birthDate,$guid,$age,$nextPhysical,$email));
      echo json_encode("Success!");
    }
  }

  function getUsers($db) {
    //CEILING(COUNT(*) / 11) AS totalPageRecords
    $stmt = $db->prepare("SELECT id, name, hireDate, physicalDate, didPhysical, nextPhysical, birthDate, guid, TIMESTAMPDIFF(YEAR, birthDate, CURDATE()) AS age, email, didReminder, reminderCount FROM users ORDER BY name LIMIT 11");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $db->prepare("SELECT CEILING(COUNT(*) / 11) AS totalPageRecords FROM users");
    $stmt->execute();
    $count = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array($rows,$count));
  }

  function autoComplete($db) {
    $user = $_GET['data'];

    $stmt = $db->prepare("SELECT id, name, hireDate, physicalDate, didPhysical, nextPhysical, birthDate, guid, TIMESTAMPDIFF(YEAR, birthDate, CURDATE()) AS age, email, didReminder, reminderCount FROM users WHERE name LIKE ? ORDER BY name LIMIT 11");
    $stmt->execute(array($user.'%'));
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $stmt = $db->prepare("SELECT CEILING(COUNT(*) / 11) AS totalPageRecords FROM users");
    $stmt->execute();
    $count = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array($rows,$count));
  }

  function sortColumn($db) {
    $name = $_GET['data'];
    $sortCount = $_GET['sortCount'];
    $type = '';

    if ($sortCount == 0) {
      $type = 'ASC';
    } else if ($sortCount == 1) {
      $type = 'DESC';
    }

    $stmt = $db->prepare("SELECT id, name, hireDate, physicalDate, didPhysical, nextPhysical, birthDate, guid, TIMESTAMPDIFF(YEAR, birthDate, CURDATE()) AS age, email, didReminder, reminderCount FROM users ORDER BY $name $type LIMIT 11");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    // For Pagination
    $stmt = $db->prepare("SELECT CEILING(COUNT(*) / 11) AS totalPageRecords FROM users");
    $stmt->execute();
    $count = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(array($rows,$count));
  }

  function deleteUser($db) {
    $user = $_GET['data'];
    // Delete User
    $stmt = $db->prepare("DELETE FROM users WHERE name='$user'");
    $stmt->execute();

    $stmt2 = $db->prepare("SELECT * FROM users ORDER BY name LIMIT 11");
    $stmt2->execute();
    $rows = $stmt2->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);
  }

  function pullUserToDelete($db) {
    $user = $_GET['data'];
    $obj = array();

    if ($user == '' || $user == null) {
      echo json_encode($obj);
    }
    else {
      $stmt = $db->prepare("SELECT name FROM users WHERE name LIKE ? ORDER BY name LIMIT 8");
      $stmt->execute(array($user.'%'));
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($rows);
    }
  }

  function pullUserToEdit($db) {
    $user = $_GET['data'];
    $obj = array();
    // If there is no user, populate with empty array
    if ($user == '' || $user == null) {
      echo json_encode($obj);
    }
    else {
      $stmt = $db->prepare("SELECT name FROM users WHERE name LIKE ? ORDER BY name LIMIT 8");
      $stmt->execute(array($user.'%'));
      $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

      echo json_encode($rows);
    }
  }

  function pullEditInfo($db) {
    $user = $_GET['data'];

    $stmt = $db->prepare("SELECT hireDate, physicalDate, birthDate, didPhysical, email FROM users WHERE name='$user'");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);
  }

  function updateUser($db) {
    $user = $_GET['data'][0]['userName'];
    $hireDate = $_GET['data'][1]['hireDate'];
    $physicalDate = $_GET['data'][2]['physicalDate'];

    $didPhysical = ucfirst($_GET['data'][3]['didPhysical']);

    $birthDate = $_GET['data'][4]['birthDate'];
    $age = $_GET['data'][5]['age'];
    $nextPhysical = $_GET['data'][6]['nextPhysical'];
    $email = $_GET['data'][7]['email'];
        $stmt = $db->prepare("UPDATE users SET name=?,hireDate=?,physicalDate=?,didPhysical=?,
                          birthDate=?,age=?,nextPhysical=?,email=?
                          WHERE name=?");

    $stmt->execute(array($user,$hireDate,$physicalDate,$didPhysical,$birthDate,$age,$nextPhysical,$email,$user));

    echo json_encode("Success");
  }

  function pullPagTable($db) {
    $data = $_GET['data'];
    $startNum = $_GET['data']['pagNum'];
    $column = $_GET['data']['column'];
    $sortCount =  $_GET['data']['sortType'];
    $type = '';
    $endNum = 11;

    if ($sortCount == 0) {
      $type = 'DESC';
    } else if ($sortCount == 1) {
      $type = 'ASC';
    }

    $startNum = determinePageNums($startNum, $endNum);

    $stmt = $db->prepare("SELECT id, name, hireDate, physicalDate, didPhysical, nextPhysical, birthDate, guid, TIMESTAMPDIFF(YEAR, birthDate, CURDATE()) AS age, email, didReminder, reminderCount FROM users ORDER BY $column $type LIMIT $startNum, $endNum");
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($rows);
  }



  function determinePageNums($startNum, $endNum) {
    // 165 Records to paginate through; can always add more
    // Optimize later
    switch ($startNum) {
      case 0:
        $startNum = 0;
        break;
      case 1:
        $startNum = $endNum;
        break;
      case 2:
        $startNum = $endNum * 2;
        break;
      case 3:
        $startNum = $endNum * 3;
        break;
      case 4:
        $startNum = $endNum * 4;
        break;
      case 5:
        $startNum = $endNum * 5;
        break;
      case 6:
        $startNum = $endNum * 6;
        break;
      case 7:
        $startNum = $endNum * 7;
        break;
      case 8:
        $startNum = $endNum * 8;
        break;
      case 9:
        $startNum = $endNum * 9;
        break;
      case 10:
        $startNum = $endNum * 10;
        break;
      case 11:
        $startNum = $endNum * 11;
        break;
      case 12:
        $startNum = $endNum * 12;
        break;
      case 13:
        $startNum = $endNum * 13;
        break;
      case 14:
        $startNum = $endNum * 14;
        break;
      default:
        $startNum = 1;
        break;
    }

    return $startNum;
  }














?>
