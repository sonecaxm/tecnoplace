document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    // Adiciona a classe right-panel-active ao container quando clicar em Cadastrar
    signUpButton.addEventListener('click', () => {
        container.classList.add('right-panel-active');
    });

    // Remove a classe right-panel-active do container quando clicar em Entrar
    signInButton.addEventListener('click', () => {
        container.classList.remove('right-panel-active');
    });

    // Validação do formulário de cadastro
    const signUpForm = document.querySelector('.sign-up-container form');
    signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const senha = this.querySelector('input[type="password"]').value;

        if (!nome || !email || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Aqui você pode adicionar a lógica para enviar os dados para o servidor
        console.log('Dados de cadastro:', { nome, email, senha });
        alert('Cadastro realizado com sucesso!');
        container.classList.remove('right-panel-active');
    });

    // Validação do formulário de login
    const signInForm = document.querySelector('.sign-in-container form');
    signInForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const senha = this.querySelector('input[type="password"]').value;

        if (!email || !senha) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Aqui você pode adicionar a lógica para enviar os dados para o servidor
        console.log('Dados de login:', { email, senha });
        
        // Simula um login bem-sucedido
        window.location.href = 'index.html';
    });

    // Validação de email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Adiciona validação de email em tempo real
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !validarEmail(this.value)) {
                alert('Por favor, insira um email válido!');
                this.focus();
            }
        });
    });

    // Adiciona validação de senha em tempo real
    const senhaInputs = document.querySelectorAll('input[type="password"]');
    senhaInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.length < 6) {
                this.setCustomValidity('A senha deve ter pelo menos 6 caracteres');
            } else {
                this.setCustomValidity('');
            }
        });
    });
}); 