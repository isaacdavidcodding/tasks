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

  public function adicionarTarefa($nome) {
		$sql = $this->pdo->prepare("INSERT INTO task_list (nome, dataa, finalizada) VALUES (:nome, :dataa, :finalizada)");
		$sql->bindValue(':nome', $nome);
		$sql->bindValue(':dataa', date('Y-m-d H:i:s'));
		$sql->bindValue(':finalizada', 0);
			
		return $sql->execute();
	}	

  public function excluirTarefa($id) {
		$sql = $this->pdo->prepare("DELETE FROM task_list WHERE id_task = :id");	
		$sql->bindValue(':id', $id);

		return $sql->execute();
	}

	public function editarTarefa($nome, $id) {
		$sql = $this->pdo->prepare("UPDATE task_list SET nome = :nome WHERE id_task = :id");
		$sql->bindValue(':nome', $nome);
		$sql->bindValue(':id', $id);
		
		return $sql->execute(); 
	}

	public function editarTarefaStatus($sstatus, $id) {
		$sql = $this->pdo->prepare("UPDATE task_list SET finalizada = :finalizada WHERE id_task = :id");
		$sql->bindValue(':finalizada', $sstatus);
		$sql->bindValue(':id', $id);
		
		return $sql->execute(); 
	}
}
  
?>