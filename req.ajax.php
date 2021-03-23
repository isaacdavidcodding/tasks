<?php
include 'tarefa.class.php';

$requestPayload = file_get_contents('php://input');
$info = json_decode($requestPayload, true);

$postRequisicao	= isset($info['tipo']) && !empty($info['tipo']) ? $info['tipo'] : NULL;
$getRequisicao	= isset($_GET['tipo']) && !empty($_GET['tipo']) ? $_GET['tipo'] : NULL;

$tipoRequisicao = is_null($getRequisicao) ? $postRequisicao : $getRequisicao; 

$tarefa = new Tarefa($requestPayload);

switch ($tipoRequisicao) {
	case 'pegar-lista-tarefas':
		$dados = $tarefa->pegarTarefas();
		echo json_encode($dados);
		break;
}

?>