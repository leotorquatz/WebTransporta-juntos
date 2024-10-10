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

    const urls = [
        'https://crud-03-09.onrender.com/v1/transportaweb/empresas',
        'https://crud-03-09.onrender.com/v1/transportaweb/motoristas' 
    ];

    try {
        let validaUser = false;

        for (const url of urls) {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Erro ao buscar as informações');
            }

            const data = await response.json();
            console.log('Dados retornados:', data);

            const usuarios = data.empresas || data.motoristas || []; // Ajustado para acessar motoristas
            console.log('Usuários:', usuarios);

            if (usuarios.length === 0) {
                alert('Nenhum usuário encontrado.');
                return; // Saia da função se não houver usuários
            }

            usuarios.forEach(usuario => {
                console.log(`Verificando usuário: ${usuario.nome} com senha: ${usuario.senha}`);
                if (usuario.email === email && usuario.senha === senha) { // Ajuste conforme necessário
                    validaUser = true;
                    alert('Login efetuado com sucesso!');
                    window.location.href = '../html/home.html';
                }
            });

            if (validaUser) {
                break; // Sai do loop se o usuário foi encontrado
            }
        }

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
