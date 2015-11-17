<?php
try {
	
	$objDb = new PDO('mysql:dbname=countries;host=localhost', 'root', 'password', array(
		PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
		PDO::ATTR_PERSISTENT => true
	));
	
	$sql = "SELECT *
			FROM `countries`
			ORDER BY `name` ASC";
			
	$statement = $objDb->prepare($sql);
	$statement->execute();
	
	if ($statement) {
		
		$results = $statement->fetchAll(PDO::FETCH_ASSOC);
		
		if (!empty($results)) {
			
			$tableArray = array();
			$tableIndexArray = array();
			$textArray = array();
			
			foreach($results as $row) {
				
				$table  = '<tr>';
				$table .= '<td>';
				$table .= $row['name'];
				$table .= '</td>';
				$table .= '<td class="col1 nw tar">';
				$table .= $row['code'];
				$table .= '</td>';
				$table .= '</tr>';
				
				$tableArray[] = $table;
				$tableIndexArray[$row['id']] = $table;
				$textArray[$row['id']] = strtolower($row['name'].' '.$row['code']);
				
				
			}
			
			// PHP 5.4
			if (defined('JSON_UNESCAPED_UNICODE')) {
				
				echo json_encode(array(
					'rows' => $tableArray,
					'rowsIndex' => $tableIndexArray,
					'text' => $textArray
				), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
				
			} else {
				
				echo json_encode(array(
					'rows' => $tableArray,
					'rowsIndex' => $tableIndexArray,
					'text' => $textArray
				), JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
				
			}
			
		} else {
			throw new PDOException('There are no records available');
		}
		
	} else {
		throw new PDOException('Something went wrong with the statement');
	}
	
} catch(PDOException $e) {
	echo $e->getMessage();
}