
var tbody = document.querySelector('table tbody');
var aluno ={} ;
tbody.innerHTML = '';

function Cadastrar(){
	aluno.Nome = document.querySelector('#nome').value;
	aluno.Sobrenome = document.querySelector('#sobrenome').value;
	aluno.Telefone = document.querySelector('#telefone').value;
	aluno.Ra = document.querySelector('#ra').value;

	console.log(aluno);

	if (aluno.Id === undefined || aluno.Id === 0){
		salvarEstudantes('POST', 0, aluno);
	}
	else 
	{
		salvarEstudantes('PUT', aluno.Id, aluno);
	}

	carregaEstudantes();
	$('#myModal').modal('hide');	

}

function NovoAluno() {
	var btnSalvar = document.querySelector('#btnSalvar');
	var tituloModal = document.querySelector('#tituloModal');

	document.querySelector('#nome').value = '';
	document.querySelector('#sobrenome').value = '';
	document.querySelector('#telefone').value = '';
	document.querySelector('#ra').value = '';

	aluno = {};

	btnSalvar.textContent = 'Cadastrar';
	tituloModal.textContent = 'Cadastrar Aluno';
	$('#myModal').modal('show');

}

function Cancelar(){
	var btnSalvar = document.querySelector('#btnSalvar');
	var tituloModal = document.querySelector('#tituloModal');

	document.querySelector('#nome').value = '';
	document.querySelector('#sobrenome').value = '';
	document.querySelector('#telefone').value = '';
	document.querySelector('#ra').value = '';

	aluno = {};

	btnSalvar.textContent = 'Cadastrar';
	tituloModal.textContent = 'Cadastrar Aluno';
	$('#myModal').modal('hide');

}



function carregaEstudantes(){
	tbody.innerHTML = '';

	var xhr = new XMLHttpRequest();

	xhr.open(`GET`, `http://localhost:60612/api/Aluno/Recuperar`, true);

	xhr.onerror =function () {
		console.log('ERRO', xhr.readyState);
	}

	xhr.onreadystatechange = function(){
		if (this.readyState == 4 ){
			if (this.status == 200){
				var estudantes  = JSON.parse(this.responseText);
				for(var indice in estudantes){
					adicionaLinha(estudantes[indice]);
				}
			}
			else if(this.status == 500){
					var erro  = JSON.parse(this.responseText);
					console.log(erro.Message);
					console.log(erro.ExceptionMessage);
			}
		}
	}
	xhr.send();
}


function salvarEstudantes(metodo, id, corpo){
	var xhr = new XMLHttpRequest();

	if (aluno.Id === undefined || aluno.Id === 0)
		aluno.Id = '';

	xhr.open(metodo, `http://localhost:60612/api/Aluno/${aluno.Id}`, false);
	
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.send(JSON.stringify(corpo));
}

function excluirEstudante(metodo, id ){
	var xhr = new XMLHttpRequest();

	xhr.open(metodo, `http://localhost:60612/api/Aluno/${id}`, false);
	xhr.send();

}

function excluir(estudante){

	bootbox.confirm({
		message: `Deseja realmente excluir o estudante ${estudante.Nome}?`,
		buttons: {
			confirm: {
				label: 'SIM',
				className: 'btn-success'
			},
			cancel: {
				label: 'NÃO',
				className: 'btn-danger'
			}
		},
		callback: function (result) {
			if(result){
				excluirEstudante('DELETE',estudante.Id);
				carregaEstudantes();
			}
		}
	});
}

carregaEstudantes();


function editarEstudante(estudante){
	var btnSalvar = document.querySelector('#btnSalvar');
			//var btnCancelar = document.querySelector('#btnCancelar');
			var tituloModal = document.querySelector('#tituloModal');

			document.querySelector('#nome').value = estudante.Nome;
			document.querySelector('#sobrenome').value = estudante.Sobrenome;
			document.querySelector('#telefone').value = estudante.Telefone;
			document.querySelector('#ra').value = estudante.Ra;

			btnSalvar.textContent = 'Salvar';
			//btnCancelar.textContent = 'Cancelar';

			tituloModal.textContent = `Editar Aluno ${estudante.Nome}`;

			aluno = estudante;

			console.log(aluno);
		}


		function adicionaLinha(estudante){
			
			var trow =`<tr>

			<td>${estudante.Nome}</td>	
			<td>${estudante.Sobrenome}</td>
			<td>${estudante.Telefone}</td>
			<td>${estudante.Ra}</td>
			<td>
			<button type="button" class="btn btn-warning" data-toggle="modal" data-target="#myModal" onclick=  'editarEstudante(${JSON.stringify(estudante)})'>Editar</button>
			</td>
			<td><button class="btn btn-danger" onclick= 'excluir(${JSON.stringify(estudante)})'>Excluir</button></td>

			</tr>
			`
			tbody.innerHTML += trow;				
		}

