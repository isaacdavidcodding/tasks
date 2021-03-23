<?php ?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Tarefas de hoje</title>

  <!-- importacao css -->
  <link href="utilities/bootstrap.min.css" rel="stylesheet" type="text/css" /> 
  <link href="styles/style.css" rel="stylesheet" type="text/css" /> 
</head>

<body>
  <!-- container para montar a tabela de atividades -->
  <div class="container">
    <h2>Lista de tarefas</h2>
    <p>Esta aplicação é útil para auxiliar no planejamento e cumprimento de atividades diárias.</p>
    
    <form method="POST" novalidate id="modal-enviar">
      <div class="form-group">
        <input type="text" class="form-control" id="id-tarefa" placeholder="Escreva aqui" name="id-tarefa" required>
        <div class="valid-feedback">Válido.</div>
        <div class="invalid-feedback">É necessário preencher o campo.</div>
      </div>
      <button id="add-nota" type="submit" class="btn btn-outline-primary">Adicionar Tarefa</button><hr>
    </form>

    <table class="table">
      <thead class="thead-light">
        <tr>
          <th>Número</th>
          <th>Atividade</th>
          <th>Data</th>
          <th>Status (clique)</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody class="lista-atividades"></tbody>
    </table>
  </div>

  <!-- importacao js  -->
  <script src="utilities/mustache.min.js"></script>
  
  <!-- iniciando o controle da pag com o obj js -->
  <script type="text/javascript" src="Controlador.js"></script>
  <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() { Controlador.iniciar(); });
  </script>
</body>

</html>