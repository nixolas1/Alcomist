<?php
	if(isset($_REQUEST['functionname']))
	{
		switch($_REQUEST['functionname']){
			case "addDrinkToUser":
				//echo("shit");
				addDrinkToUser($_REQUEST['id'], $_REQUEST['drink']);
				//echo("fuck");
				break;
			case "getHistory":
				getHistory($_REQUEST['usr'], $_REQUEST['history']);
				break;

			case "get_drinks_json":
				get_drinks_json();
				break;

			default:
				echo("Wrong function");
				break;
		}
	}

	function user_exists($user)
	{
		global $conn;

		$query = "SELECT * FROM  `user` WHERE  `username` = '$user'";
		$result = $conn->query($query);
		if($result->num_rows > 0){
			// "fant bruker";
			 return true;
		}else{
			//fant ikke bruker
			return false;
		}
	}

	function new_user($usr, $weight, $gender)
	{
		global $conn;
		
		$query = "INSERT INTO user (username, weight, gender, age, alcoholism) VALUES ('$usr', $weight, '$gender', 20, 1)";
		if(mysqli_query($conn, $query)){
			return true;
		}else{
			echo "Error: ".$query."<br>".$conn->error;
			return false;
		}
	}

	function edit_user($user, $weight, $gender)
	{
		global $conn;
		$query="UPDATE user SET weight = '$weight', gender = '$gender' WHERE username='$user'";
		if(mysqli_query($conn, $query)){
			return true;
		}else{
			echo "Error: ".$query."<br>".$conn->error;
			return false;
		}
	}

	function get_xml($file){
		$xml_file = file_get_contents($file);
        return simplexml_load_string($xml_file);
	}

	function get_drinks_json(){
		$xml = get_xml("../static/xml/drinks.xml");
		print(json_encode($xml));
	}
	
	function addDrinkToUser($usr, $drink)
	{
		//echo("nyes");
		include("db.php");
		$query = "SELECT id FROM  `user` WHERE  `id` = '$usr'";
		$result = $conn->query($query);
		if($result->num_rows > 0)
		{
			$row = $result->fetch_array(MYSQLI_ASSOC);
			$id = $row['id'];
			$query = "INSERT INTO event (user_id, drink, amount)
					  VALUES ($id, $drink, 1)";
			if(mysqli_query($conn, $query))
			{
				//echo("added drink");
				return "Added drink to DB";
			}else
			{
				echo "Error: ".$query."<br>".$conn->error;
			}
		}
		//echo("done");
	}

	function get_user_info($usr){
		include('db.php');
		$query = "SELECT user.* FROM user WHERE username = '$usr'";
		$result = $conn->query($query);
		if($result->num_rows > 0)
		{
			return $result->fetch_array(MYSQLI_ASSOC);
		}
		return false;
	}
	
	function getHistory($usr, $history)
	{
		include('db.php');
		$query = "SELECT user.* FROM user WHERE username = '$usr'";
		$result = $conn->query($query);
		if($result->num_rows > 0)
		{
			$user_info = $result->fetch_array(MYSQLI_ASSOC);
            $user_info["servertime"] = time()+1;
			$id = $user_info['id'];
			if($history) $query = "SELECT event.user_id, event.time, event.drink FROM event WHERE event.user_id = $id ORDER by event.time ASC";
			else $query = "SELECT event.user_id, event.time, event.drink FROM event WHERE event.user_id = $id ORDER by event.time ASC LIMIT 30";
			$result = $conn->query($query);
			if($result->num_rows > 0)
			{
			    while($row = $result->fetch_assoc()) 
			    {
				        $rows[] = $row;
			    }
				
			}else
			{
				$rows = array();
			}
			$rows = array_merge(array($user_info), $rows);
			
			echo json_encode($rows);
		}
	}

?>