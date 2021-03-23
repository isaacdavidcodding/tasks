const Controlador = {
  /* post ou get  */
	URL_AJAX_POST: "req.ajax.php",
	URL_AJAX: "req.ajax.php?tipo=",

	render: (template, dados) => { return Mustache.render(template, dados) },

	renderizarElemento: (componente, seletor) => {
		let node = document.querySelector(seletor);
		if (!node) return;
		node.innerHTML = componente;
	},
  
  /* carrega as tarefas e ativa os listeners */
	iniciar: function () {
    this._carregarTarefas();
	},

  _carregarTarefas: () => {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function () {
			// xhr.responseType = "json"; // se quiser ja especificar o tipo retornado
			if (xhr.readyState == 4 && xhr.status == 200) {
				let template =
				'{{#TAREFAS}}'
					+ '<tr>'
						+ '<td>{{id_task}}</td>'
						+ '<td>{{nome}}</td>'
						+ '<td>{{data}}</td>'
						+ '<td class="{{finalizada}} pronta">{{finalizada}}</td>'

						+ '<td>'
							+ '<button type="button" id="ex-nota" class="btn btn-outline-danger mr-1">Excluir</button>'
							+ '<button type="button" id="ed-nota" class="btn btn-outline-secondary">Editar</button>'
						+ '</td>'
					+ '</tr>'
				+ '{{/TAREFAS}}';

				let componente = Controlador.render(template, JSON.parse(xhr.response));
				Controlador.renderizarElemento(componente, '.lista-atividades');
			} else;
		}
		xhr.open("GET", `${Controlador.URL_AJAX}pegar-lista-tarefas`, true);
		xhr.send();
	}
}