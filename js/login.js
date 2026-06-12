// ─── Variáveis com ID ──────────────────────────

const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const toggleSenha = document.getElementById('toggleSenha');

const emailFeedbackInvalid = document.getElementById('emailFeedbackInvalid');
const emailFeedbackValid = document.getElementById('emailFeedbackValid');
const senhaFeedbackInvalid = document.getElementById('senhaFeedbackInvalid');
const senhaFeedbackValid = document.getElementById('senhaFeedbackValid');

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

// ─── Validação — E-mail ─────────────────────────────────────────

emailInput.addEventListener('input', () => {
    const value = emailInput.value.trim();

    if (value === '') {
        clearState(emailInput, emailFeedbackValid, emailFeedbackInvalid);
    } else if (emailInput.checkValidity()) {
        setValid(emailInput, emailFeedbackValid, emailFeedbackInvalid);
    } else {
        setInvalid(emailInput, emailFeedbackValid, emailFeedbackInvalid);
    }
});

// ─── Valida ao sair do campo vazio  ─────────────────────────────

emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim() === '') {
        setInvalid(emailInput, emailFeedbackValid, emailFeedbackInvalid);
    }
});

// ─── Validação ao clicar em Entrar ─────────────────────────────

 document.getElementById('btnEntrar').addEventListener('click', () => {

    // ─── Dispara o blur de cada campo para acionar a validação ────────
    if (emailInput.value.trim() === '') {
        setInvalid(emailInput, emailFeedbackValid, emailFeedbackInvalid);
    }

    if (senhaInput.value === '') {
        setInvalid(senhaInput, senhaFeedbackValid, senhaFeedbackInvalid);
    }

    // ─── Se algum campo for inválido, não prossegue  ────────────
    if (!emailInput.classList.contains('is-valid') || !senhaInput.classList.contains('is-valid')) {
        return;
    }

    // ─── Aqui prossegue com o login ────────────
    console.log('Formulário válido, prosseguindo...');
});

// ─── Validação — Senha ──────────────────────────────────────────

senhaInput.addEventListener('input', () => {
    const value = senhaInput.value;

    if (value === '') {
        clearState(senhaInput, senhaFeedbackValid, senhaFeedbackInvalid);
    } else if (value.length >= 8) {
        setValid(senhaInput, senhaFeedbackValid, senhaFeedbackInvalid);
    } else {
        setInvalid(senhaInput, senhaFeedbackValid, senhaFeedbackInvalid);
    }
});

// ─── Valida ao sair do campo vazio ──────────────────
senhaInput.addEventListener('blur', () => {
    if (senhaInput.value === '') {
        setInvalid(senhaInput, senhaFeedbackValid, senhaFeedbackInvalid);
    }
});

// ─── Mostrar / Ocultar senha ────────────────────────────────────

toggleSenha.addEventListener('click', () => {
    const isPassword = senhaInput.type === 'password';

    // ─── Alterna o tipo do input ────────────────────────────────────
    senhaInput.type = isPassword ? 'text' : 'password';

    // ─── Alterna o ícone entre olho aberto e fechado ─────────────────────
    toggleSenha.classList.toggle('bi-eye-fill', !isPassword);
    toggleSenha.classList.toggle('bi-eye-slash-fill', isPassword);
});