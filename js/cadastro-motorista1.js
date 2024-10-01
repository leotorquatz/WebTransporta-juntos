document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript carregado'); // Verifica se o script está carregado

    const nome = document.getElementById('nome');
    const nomeError = document.getElementById('nomeError'); // Elemento para a mensagem de erro do nome
    const foto_url = document.getElementById('foto_url');
    const data_nascimento = document.getElementById('data');
    const button = document.getElementById('next');

    console.log('nome:', nome); // Verifica se o elemento foi encontrado
    console.log('foto_url:', foto_url);
    console.log('data_nascimento:', data_nascimento);
    console.log('button:', button);

    if (!nome || !foto_url || !data_nascimento || !button) {
        console.error('Um ou mais elementos não foram encontrados.');
        return;
    }

    // Função para validar o nome (somente letras)
    function validarNome(nome) {
        const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/; // Permite apenas letras (acentuadas ou não) e espaços
        return regex.test(nome);
    }

    button.addEventListener('click', (event) => {
        event.preventDefault();  // Impede o comportamento padrão do formulário

        const nomeInput = nome.value;
        const foto_urlInput = foto_url.value;
        const dataInput = data_nascimento.value;

        // Limpar mensagens de erro anteriores
        nomeError.style.display = 'none';
        nomeError.textContent = '';

        // Validação dos campos
        if (!nomeInput || !foto_urlInput || !dataInput) {
            console.error('Todos os campos são obrigatórios.');
            return;
        }

        // Validação do nome
        if (!validarNome(nomeInput)) {
            nomeError.textContent = 'Nome inválido. Deve conter apenas letras e espaços.';
            nomeError.style.display = 'block';  // Exibe a mensagem de erro
            return;
        }

        const insert = {
            foto_url: foto_urlInput,
            nome: nomeInput,
            data_nascimento: dataInput,
        };

        localStorage.setItem('cadastromotorista1', JSON.stringify(insert));
        window.location.href = '../html/cadastro-motorista2.html';
    });
});
