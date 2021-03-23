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
    this._escutarBotoesTela();
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
	},

  _escutarBotoesTela: () => {
		let documento = {};
		let botao;
		document.addEventListener('click', function (e) {
			e.preventDefault();

			if (!e.target.matches('#add-nota') && !e.target.matches('#ex-nota') && !e.target.matches('#ed-nota') && !e.target.matches('.pronta')) return;
			else {
				if (e.target.matches('#add-nota')) {
					documento = JSON.stringify({
						'tipo': 'adicionar-tarefa',
						'tarefaNome': document.getElementById('id-tarefa').value
					});
				} else if (e.target.matches('#ex-nota')) {
					documento = JSON.stringify({
						'tipo': 'excluir-tarefa',
						'tarefaId': e.target.parentElement.parentElement.getElementsByTagName('td')[0].innerHTML
					});
				} else if (e.target.matches('#ed-nota')) {
					documento = JSON.stringify({
						'tipo': 'editar-tarefa',
						'tarefaId': e.target.parentElement.parentElement.getElementsByTagName('td')[0].innerHTML,
						'tarefaNome': document.getElementById('id-tarefa').value
					});
				} else if (e.target.matches('.pronta')) {
					numero = (e.target.innerHTML === 'pendente') ? 1 : 0;

					documento = JSON.stringify({
						'tipo': 'editar-status',
						'tarefaStatus': numero,
						'tarefaId': e.target.parentElement.getElementsByTagName('td')[0].innerHTML
					});
				}

				botao = e.target;
				Controlador.acoesAjax(documento, botao);
			}
		});
	},

  acoesAjax: (documento, botao) => {
		if ( botao.id == 'add-nota' || botao.id == 'ex-nota' || botao.id == 'ed-nota' || document.getElementsByClassName('pronta') ) {

			document.getElementById("backdrop").style.display = "block";
			document.getElementById("modalConfimacao").style.display = "block";
			document.getElementById("modalConfimacao").classList.add("show");
			document.getElementById('div-msg').innerHTML = "Tem certeza que deseja realizar esta ação?";

			document.getElementById('btn-confirma').onclick = function() {
				document.getElementById("backdrop").style.display = "none";
				document.getElementById("modalConfimacao").style.display = "none";
				document.getElementById("modalConfimacao").classList.remove("show");
        
				let xhr = new XMLHttpRequest();
				xhr.onreadystatechange = function () {
					if (xhr.readyState == 4 && xhr.status == 200) {
						Controlador._carregarTarefas();
						document.getElementsByTagName('input')[0].value = '';
					}
				}
				xhr.open('POST', `${Controlador.URL_AJAX_POST}`, true);
				xhr.send(documento);
			};

			let btns = ['btn-fechar', 'span-x'];
			
			for ( let i = 0; i < 2; i++ )
				document.getElementById(`${btns[i]}`).onclick	= function() {
					document.getElementById("backdrop").style.display = "none";
					document.getElementById("modalConfimacao").style.display = "none";
					document.getElementById("modalConfimacao").classList.remove("show");
				};

			let modal = document.getElementById('modalConfimacao');
			window.onclick = function (e) {
				if (e.target == modal) {
					document.getElementById("backdrop").style.display = "none";
					document.getElementById("modalConfimacao").style.display = "none";
					document.getElementById("modalConfimacao").classList.remove("show");
				}
			}
		}
  }
}