'use strict';

const empresa = document.getElementById('empresa');
const funcionario = document.getElementById('funcionario');

// Alterna seleção entre 'empresa' e 'funcionario'
empresa.addEventListener('change', function() {
    if (empresa.checked) {
        funcionario.checked = false;
    }
});

funcionario.addEventListener('change', function() {
    if (funcionario.checked) {
        empresa.checked = false;
    }
});

const userName = document.getElementById('email');
const password = document.getElementById('senha');
const loginButton = document.getElementById('signin');

const validarLogin = async () => {
    const email = userName.value.trim();
    const senha = password.value.trim();

    if (email === '' || senha === '') {
        alert('Preencha os campos!');
        return;
    }

    const url = 'https://crud-03-09.onrender.com/v1/transportaweb/empresas';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao buscar as empresas');
        }

        const data = await response.json();
        console.log('Dados retornados:', data);

        // Acessando o array de empresas
        const empresas = data.empresas || []; // Ajustado para acessar empresas
        console.log('Empresas:', empresas);

        if (empresas.length === 0) {
            alert('Nenhuma empresa encontrada.');
            return; // Saia da função se não houver empresas
        }

        let validaUser = false;

        empresas.forEach(empresa => {
            // Supondo que a empresa tenha um campo 'senha' para validação
            console.log(`Verificando empresa: ${empresa.nome} com senha: ${empresa.senha}`);
            if (empresa.email === email && empresa.senha === senha) { // Ajuste conforme necessário
                validaUser = true;
                alert('Login efetuado com sucesso!');
                window.location.href = ''; // Redirecionamento
            }
        });

        if (!validaUser) {
            alert('Usuário não cadastrado');
        }

    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao tentar realizar login: ' + error.message);
    }
};

// Adiciona o evento de clique ao botão de login
loginButton.addEventListener('click', validarLogin);
