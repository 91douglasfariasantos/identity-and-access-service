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