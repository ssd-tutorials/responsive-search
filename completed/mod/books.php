<?php
try {
	
	$objDb = new PDO('mysql:dbname=books;host=localhost', 'root', 'password', array(
		PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
		PDO::ATTR_PERSISTENT => true
	));
	
	$sql = "SELECT *
			FROM `books`
			ORDER BY `title` ASC";
			
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
				$table .= $row['title'];
				$table .= '</td>';
				$table .= '<td class="col1 nw tar">';
				$table .= $row['category'];
				$table .= '</td>';
				$table .= '<td class="col1 nw tar">';
				$table .= $row['author'];
				$table .= '</td>';
				$table .= '<td class="col1 nw tar">&pound;';
				$table .= $row['price'];
				$table .= '</td>';
				$table .= '</tr>';
				
				$tableArray[] = $table;
				$tableIndexArray[$row['id']] = $table;
				$textArray[$row['id']] = strtolower($row['title'].' '.$row['category'].' '.$row['author'].' '.$row['price']);
				
				
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