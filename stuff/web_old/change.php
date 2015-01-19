<?php
	session_start();
	include('db.php');
	$usr = $_SESSION['usr'];
	if(!isset($_GET['getUser']))
	{
		$drink = $_GET['drink'];
		$gender = $_GET['gender'];
		$weight = $_GET['weight'];
		$amount = $_GET['amount'];
		$guid=substr(base64_encode(crc32($_SERVER['HTTP_USER_AGENT'].$_SERVER['REMOTE_ADDR'].$_SERVER['HTTP_ACCEPT_LANGUAGE'])), 0, 8);
		echo "drink: ".$drink.", guid: ".$guid.", time added: ".time();
		$query = "SELECT * FROM  `user` WHERE  `username` = '$usr'";
		$result = $conn->query($query);
		if($result->num_rows > 0)
		{
			echo "fant bruker";
			addDrinkToUser($conn, $usr, $drink, $amount);
		}else
		{
			$query = "INSERT INTO user (username, password, weight, gender, age, alcoholism)
					  VALUES ('$usr', 'blank', $weight, '$gender', 20, 1)";
			if(mysqli_query($conn, $query))
			{
				echo "Added to database";
				addDrinkToUser($conn, $usr, $drink, $amount);
			}else
			{
				echo "Error: ".$query."<br>".$conn->error;
			}
		}
	}else
	{
		$query = "SELECT user.* FROM user WHERE username = '$usr'";
		$result = $conn->query($query);
		if($result->num_rows > 0)
		{
			$tempArr = $result->fetch_array(MYSQLI_ASSOC);
			
			$query = "SELECT event.* FROM event, user WHERE user.id = user_id AND user.username = '$usr'";
			$result = $conn->query($query);
			if($result->num_rows > 0)
			{

			    while($row = $result->fetch_assoc()) {
			        $rows[] = $row;
			    }
				
			}else
			{
				$rows = array(array("x1"=>"0"));;
			}
			$rows = array_merge(array($tempArr), $rows);
			echo json_encode($rows);
		}
		
	}

	function addDrinkToUser($conn, $usr, $drink, $amount)
	{
		$query = "SELECT id FROM  `user` WHERE  `username` = '$usr'";
		$result = $conn->query($query);
		if($result->num_rows > 0)
		{
			$row = $result->fetch_array(MYSQLI_ASSOC);
			$id = $row['id'];
			$query = "INSERT INTO event (user_id, drink, amount)
					  VALUES ($id, $drink, $amount)";
			if(mysqli_query($conn, $query))
			{
				echo "Added drink to DB";
			}else
			{
				echo "Error: ".$query."<br>".$conn->error;
			}
		}
	}

?>