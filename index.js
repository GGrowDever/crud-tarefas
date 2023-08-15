const users = [];

function validateIndex(index) {
	return index === undefined || isNaN(index) || index < 0 || index <= users.length;
}

function createTask(title, description, user) {
	if (!user || !user.tasks || title === '' || title === undefined) {
		console.log('O título é obrigatório');
		return;
	}
	user.tasks.push({ title: title, description: description, completed: false });
}

function listTasks(user) {
	user.tasks.forEach((tarefa, index) => {
		console.log(
			`${index} - Título: ${tarefa.title} - Descrição: ${tarefa.description} - Tarefa completada: ${
				tarefa.completed ? 'Sim' : 'Não'
			}`
		);
	});
}

function updateTaskStatus(index, completed, user) {
	if (index < 0 || index >= user.tasks.length) {
		console.log('Índice não encontrado!');
		return;
	}
	user.tasks[index].completed = completed;
}

function updateTask(index, newTitle, newDescription, user) {
	if (index < 0 || index >= user.tasks.length) {
		console.log('Índice não encontrado!');
		return;
	}

	if (!newTitle || newTitle === '') {
		console.log('O título é obrigatório');
		return;
	}

	user.tasks[index].title = newTitle;
	user.tasks[index].description = newDescription;
}

function deleteTask(index, user) {
	if (index < 0 || index >= user.tasks.length) {
		console.log('Índice não encontrado!');
		return;
	}

	user.tasks.splice(index, 1);
}

function createUser(username, password) {
	if (!username || !password) {
		console.log('Atenção!!! informe o nome de usuário e/ou senha!!! ');
		return;
	}
	users.push({ username, password, tasks: [] });
}

function updateTaskDescription(username, taskIndex, newDescription) {
	if (newDescription !== undefined) {
		const user = users.find((user) => user.username === username);
		if (!user) {
			console.log('Usuário não encontrado');
			return;
		}
		if (taskIndex >= 0 && taskIndex < user.tasks.length) {
			user.tasks[taskIndex].description = newDescription;
		} else {
			console.log('Índice da tarefa não existe');
		}
	} else {
		console.log('Descrição não definida');
	}
}

function login(username, password) {
	const user = users.find((user) => user.username === username);
	if (!user) {
		console.log('Usuário não encontrado');
		return;
	}
	if (user.password !== password) {
		console.log('Senha errada!');
		return;
	}
	return user;
}

function managerTasks(user) {
	do {
		const option = parseInt(
			prompt(`Digite uma opção:
				1 - Cadastrar tarefa
				2 - Atualizar status tarefa
				3 - Atualizar tarefa
				4 - Listar tarefas
				5 - Excluir tarefa`)
		);
		switch (option) {
			case 1:
				createTask(prompt('Digite o título'), prompt('Escreva a descrição'), user);
				break;

			case 2:
				const taskIndex = parseInt(prompt('Digite o índice da tarefa:'));
				if (isNaN(taskIndex) || taskIndex < 0 || taskIndex >= user.tasks.length) {
					console.log('Índice inválido!');
					break;
				}
				updateTaskStatus(
					taskIndex,
					prompt('Se a tarefa foi concluída, digite sim, se não digite não.') === 'sim' ? true : false,
					user
				);
				break;

			case 3:
				const taskIndexToUpdate = parseInt(prompt('Digite o índice da tarefa:'));
				if (isNaN(taskIndexToUpdate) || taskIndexToUpdate < 0 || taskIndexToUpdate >= user.tasks.length) {
					console.log('Índice inválido!');
					break;
				}
				updateTask(taskIndexToUpdate, prompt('Digite o título'), prompt('Escreva a descrição'), user);
				break;

			case 4:
				console.log(listTasks(user));
				break;

			case 5:
				const taskIndexToDelete = parseInt(prompt('Qual o index da tarefa que deseja deletar?'));
				if (isNaN(taskIndexToDelete) || taskIndexToDelete < 0 || taskIndexToDelete >= user.tasks.length) {
					console.log('Índice inválido!');
					break;
				}
				deleteTask(taskIndexToDelete, user);
				break;

			default:
				console.log('Opção inválida!');
				break;
		}
	} while (prompt('Deseja continuar? digite sim para continuar, ou não para sair.') === 'sim');
}

function inicio() {
	do {
		const choice = parseInt(prompt('O que deseja fazer: 1 - Cadastro, 2 - Login'));
		switch (choice) {
			case 1:
				createUser(prompt('Digite o nome do usuário'), prompt('Digite a senha'));
				break;

			case 2:
				const user = login(prompt('Digite o nome do usuário'), prompt('Digite a senha'));
				if (user) {
					managerTasks(user);
				}
				break;

			default:
				console.log('Opção inválida!');
				break;
		}
	} while (prompt('Deseja continuar') === 'sim');
}

inicio();
