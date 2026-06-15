// ─── Variáveis com ID ──────────────────────────

const nameInput = document.getElementById('name');
const nameFeedbackInvalid = document.getElementById('nameFeedbackInvalid');
const nameFeedbackValid = document.getElementById('nameFeedbackValid');

// ─── Utilitários ────────────────────────────────────────────────

function setValid(input, feedbackValid, feedbackInvalid) {
    input.classList.add('is-valid');
    input.classList.remove('is-invalid');
    feedbackValid.style.display = 'block';
    feedbackInvalid.style.display = 'none';
}

function setInvalid(input, feedbackValid, feedbackInvalid) {
    input.classList.add('is-invalid');
    input.classList.remove('is-valid');
    feedbackValid.style.display = 'none';
    feedbackInvalid.style.display = 'block';
}

function clearState(input, feedbackValid, feedbackInvalid) {
    input.classList.remove('is-valid', 'is-invalid');
    feedbackValid.style.display = 'none';
    feedbackInvalid.style.display = 'none';
}

// ─── Validação — Nome ───────────────────────────────────────────

nameInput.addEventListener('input', () => {
    const value = nameInput.value.trim();

    if (value === '') {
        clearState(nameInput, nameFeedbackValid, nameFeedbackInvalid);
    } else if (value.length >= 3) {
        setValid(nameInput, nameFeedbackValid, nameFeedbackInvalid);
    } else {
        setInvalid(nameInput, nameFeedbackValid, nameFeedbackInvalid);
    }
});

// Valida ao sair do campo vazio
nameInput.addEventListener('blur', () => {
    if (nameInput.value.trim() === '') {
        setInvalid(nameInput, nameFeedbackValid, nameFeedbackInvalid);
    }
});

// ─── Validação ao clicar em Enviar ─────────────────────────────

document.getElementById('btnCadastrar').addEventListener('click', () => {

    if (nameInput.value.trim() === '') {
        setInvalid(nameInput, nameFeedbackValid, nameFeedbackInvalid);
    }

    if (!nameInput.classList.contains('is-valid')) {
        return;
    }

    console.log('Nome válido, prosseguindo...');
});

// ============================================
// VALIDADORES
// ============================================

class ValidadorRegistro {
    // Validar Email
    static validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Validar Senha
    static validarSenha(senha) {
        // Mínimo 8 caracteres, 1 maiúscula, 1 minúscula, 1 número, 1 caractere especial
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(senha);
    }

    // Validar CPF
    static validarCPF(cpf) {
        // Remove caracteres especiais
        cpf = cpf.replace(/\D/g, '');

        // Verifica se tem 11 dígitos
        if (cpf.length !== 11) return false;

        // Verifica se todos os dígitos são iguais
        if (/^(\d)\1{10}$/.test(cpf)) return false;

        // Calcula primeiro dígito verificador
        let soma = 0;
        let resto;

        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(9, 10))) return false;

        // Calcula segundo dígito verificador
        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }

        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.substring(10, 11))) return false;

        return true;
    }

    // Validar Nome
    static validarNome(nome) {
        // Mínimo 3 caracteres e apenas letras e espaços
        const regex = /^[a-zA-ZÀ-ÿ\s]{3,}$/;
        return regex.test(nome.trim());
    }
}

// ============================================
// GERENCIADOR DE UI
// ============================================

class GerenciadorUI {
    static mostrarFeedback(elementoId, tipo) {
        const input = document.getElementById(elementoId);
        const feedbackInvalid = document.getElementById(`${elementoId}FeedbackInvalid`);
        const feedbackValid = document.getElementById(`${elementoId}FeedbackValid`);

        input.classList.remove('is-valid', 'is-invalid');
        if (feedbackInvalid) feedbackInvalid.style.display = 'none';
        if (feedbackValid) feedbackValid.style.display = 'none';

        if (tipo === 'valid') {
            input.classList.add('is-valid');
            if (feedbackValid) feedbackValid.style.display = 'block';
        } else if (tipo === 'invalid') {
            input.classList.add('is-invalid');
            if (feedbackInvalid) feedbackInvalid.style.display = 'block';
        } else {
            input.classList.remove('is-valid', 'is-invalid');
        }
    }

    static limparFeedback(elementoId) {
        this.mostrarFeedback(elementoId, null);
    }
}

// ============================================
// LISTENERS DE VALIDAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Email - Validação em tempo real
    const emailInput = document.getElementById('email');
    emailInput.addEventListener('blur', () => {
        const email = emailInput.value.trim();

        if (email === '') {
            GerenciadorUI.limparFeedback('email');
            return;
        }

        if (ValidadorRegistro.validarEmail(email)) {
            GerenciadorUI.mostrarFeedback('email', 'valid');
        } else {
            GerenciadorUI.mostrarFeedback('email', 'invalid');
        }
    });

    emailInput.addEventListener('focus', () => {
        GerenciadorUI.limparFeedback('email');
    });

    // Senha - Validação em tempo real com indicador de força
    const passwordInput = document.getElementById('password');
    passwordInput.addEventListener('input', () => {
        const senha = passwordInput.value;

        if (senha === '') {
            GerenciadorUI.limparFeedback('password');
            return;
        }

        if (ValidadorRegistro.validarSenha(senha)) {
            GerenciadorUI.mostrarFeedback('password', 'valid');
        } else {
            GerenciadorUI.mostrarFeedback('password', 'invalid');
        }
    });

    passwordInput.addEventListener('focus', () => {
        GerenciadorUI.limparFeedback('password');
    });

    // CPF - Validação em tempo real com máscara
    const cpfInput = document.getElementById('cpf-user');
    cpfInput.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, '');

        // Máscara: XXX.XXX.XXX-XX
        if (valor.length > 0) {
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
            valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        }

        e.target.value = valor;
    });

    cpfInput.addEventListener('blur', () => {
        const cpf = cpfInput.value;

        if (cpf === '') {
            GerenciadorUI.limparFeedback('cpf-user');
            return;
        }

        if (ValidadorRegistro.validarCPF(cpf)) {
            GerenciadorUI.mostrarFeedback('cpf-user', 'valid');
        } else {
            GerenciadorUI.mostrarFeedback('cpf-user', 'invalid');
        }
    });

    cpfInput.addEventListener('focus', () => {
        GerenciadorUI.limparFeedback('cpf-user');
    });

    // Nome - Validação em tempo real
    const nameInput = document.getElementById('name');
    nameInput.addEventListener('blur', () => {
        const nome = nameInput.value;

        if (nome === '') {
            GerenciadorUI.limparFeedback('name');
            return;
        }

        if (ValidadorRegistro.validarNome(nome)) {
            GerenciadorUI.mostrarFeedback('name', 'valid');
        } else {
            GerenciadorUI.mostrarFeedback('name', 'invalid');
        }
    });

    nameInput.addEventListener('focus', () => {
        GerenciadorUI.limparFeedback('name');
    });

    // Toggle Password
    document.getElementById('togglePassword').addEventListener('click', () => {
        const input = document.getElementById('password');
        const icon = document.getElementById('togglePassword');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });

    // Toggle CPF
    document.getElementById('toggleCpf').addEventListener('click', () => {
        const input = document.getElementById('cpf-user');
        const icon = document.getElementById('toggleCpf');

        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    });

    // Botão Cadastrar
    document.getElementById('btnCadastrar').addEventListener('click', () => {
        const nome = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;
        const cpf = document.getElementById('cpf-user').value;

        // Validar todos os campos
        const nomeValido = ValidadorRegistro.validarNome(nome);
        const emailValido = ValidadorRegistro.validarEmail(email);
        const senhaValida = ValidadorRegistro.validarSenha(senha);
        const cpfValido = ValidadorRegistro.validarCPF(cpf);

        // Mostrar feedback
        nomeValido ? GerenciadorUI.mostrarFeedback('name', 'valid') : GerenciadorUI.mostrarFeedback('name', 'invalid');
        emailValido ? GerenciadorUI.mostrarFeedback('email', 'valid') : GerenciadorUI.mostrarFeedback('email', 'invalid');
        senhaValida ? GerenciadorUI.mostrarFeedback('password', 'valid') : GerenciadorUI.mostrarFeedback('password', 'invalid');
        cpfValido ? GerenciadorUI.mostrarFeedback('cpf-user', 'valid') : GerenciadorUI.mostrarFeedback('cpf-user', 'invalid');

        // Se tudo válido
        if (nomeValido && emailValido && senhaValida && cpfValido) {
            alert('Cadastro realizado com sucesso!');
            // Aqui você enviaria os dados para o servidor
            console.log({ nome, email, senha, cpf });
        } else {
            alert('Por favor, corrija os erros no formulário.');
        }
    });
});
