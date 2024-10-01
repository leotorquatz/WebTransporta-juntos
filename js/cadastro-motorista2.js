import { postMotorista } from "./funcoes.js";

const cadastromotorista1 = JSON.parse(localStorage.getItem('cadastromotorista1'));

if (cadastromotorista1) {
    console.log(cadastromotorista1); // Verifique se os dados foram recuperados corretamente
} else {
    console.error('Nenhum dado encontrado no localStorage.');
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript carregado');
    const cpf = document.getElementById('cpf');
    const cpfError = document.getElementById('cpfError'); // Elemento da mensagem de erro do CPF
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError'); // Elemento da mensagem de erro do e-mail
    const senha = document.getElementById('senha');
    const senhaError = document.getElementById('senhaError'); // Elemento da mensagem de erro da senha
    const button = document.getElementById('next');

    console.log('cpf:', cpf);
    console.log('email:', email);
    console.log('senha:', senha);
    console.log('button:', button);

    if (!cpf || !email || !senha || !button) {
        console.error('Um ou mais elementos não foram encontrados.');
        return;
    }

    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres que não sejam dígitos
        if (cpf.length !== 11) return false;

        let soma = 0;
        let resto;

        // Validação do primeiro dígito
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        soma = 0;
        // Validação do segundo dígito
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Função para validar o e-mail
    function validarEmail(email) {
        // Verifica se o e-mail tem pelo menos 5 caracteres e inclui o símbolo '@'
        if (email.length >= 5 && email.includes('@')) {
            return true;
        }
        return false;
    }

    // Função para validar a senha
    function validarSenha(senha) {
        const temMaiuscula = /[A-Z]/.test(senha); // Verifica se há pelo menos uma letra maiúscula
        if (senha.length >= 8 && temMaiuscula) {
            return true;
        }
        return false;
    }

    button.addEventListener('click', async (event) => {
        event.preventDefault();  // Impede o comportamento padrão do formulário

        const cpfInput = cpf.value;
        const emailInput = email.value;
        const senhaInput = senha.value;

        // Limpar mensagens de erro anteriores
        cpfError.style.display = 'none';
        cpfError.textContent = '';
        emailError.style.display = 'none';
        emailError.textContent = '';
        senhaError.style.display = 'none';
        senhaError.textContent = '';

        // Validação dos campos
        if (!cpfInput || !senhaInput || !emailInput) {
            console.error('Todos os campos são obrigatórios.');
            return;
        }

        // Validação do CPF
        if (!validarCPF(cpfInput)) {
            cpfError.textContent = 'CPF inválido, deve conter 11 caracteres. Insira novamente com pontos(.), hífens(-) ou somente números.';
            cpfError.style.display = 'block';  // Exibe a mensagem de erro
            return;
        }

        // Validação do e-mail
        if (!validarEmail(emailInput)) {
            emailError.textContent = 'E-mail inválido, deve conter pelo menos 5 caracteres e incluir "@"';
            emailError.style.display = 'block';  // Exibe a mensagem de erro do e-mail
            return;
        }

        // Validação da senha
        if (!validarSenha(senhaInput)) {
            senhaError.textContent = 'Senha inválida, deve conter pelo menos 8 caracteres incluindo uma letra maiúscula';
            senhaError.style.display = 'block';  // Exibe a mensagem de erro da senha
            return;
        }

        cadastromotorista1.cpf = cpfInput;
        cadastromotorista1.email = emailInput;
        cadastromotorista1.senha = senhaInput;

        try {
            // Tenta enviar os dados
            const sucesso = await postMotorista(cadastromotorista1);
            if (sucesso) {
                alert("Cadastro efetuado com sucesso!");
                console.log('Cadastro efetuado com sucesso!');
                window.location.href = '';
            } else {
                alert("Falha ao cadastrar o motorista. Por favor, tente novamente.");
                console.error('Falha ao cadastrar o motorista. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao tentar cadastrar o motorista:', error);
        }
    });
});
