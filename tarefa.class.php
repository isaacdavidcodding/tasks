<?php
class Tarefa {

	private $pdo;

	public function __construct() {
		try {
			$this->pdo = new PDO("mysql:dbname=tasks;host=localhost", "root", "");
  	} catch (PDOException $e) {
    	echo 'PDO exception thrown: ' . $e->getMessage();
  	}
	}

	public function pegarTarefas() {
		$arr = array();
		$sql = $this->pdo->query("SELECT * FROM task_list");

		if ( $sql->rowCount() > 0 ) $arr = $sql->fetchAll();
		else return $arr; 

		$retorno["TAREFAS"] = array_map(function($item) {
			return array(
				'id_task' => $item['id_task'],
				'nome' => $item['nome'],
				'data' => DateTime::createFromFormat('Y-m-d', $item['dataa'])->format("d/m/Y"),
				'finalizada' => ($item['finalizada'] == 0) ? 'pendente' : 'resolvida'
			);
		}, $arr); 

		return $retorno;
	}
}
  
?>