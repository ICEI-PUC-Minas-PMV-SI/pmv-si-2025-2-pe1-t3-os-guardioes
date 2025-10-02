// Seletores
const tipoPessoa = document.getElementById('tipoPessoa');
const cpfCnpjInput = document.getElementById('cpfCnpj');
const cpfCnpjLabel = document.getElementById('cpfCnpjLabel');
const celularInput = document.getElementById('celular');

// Função para aplicar máscara simples
function aplicarMascara(valor, tipo) {
    if (tipo === 'cpf') {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else if (tipo === 'cnpj') {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    } else if (tipo === 'celular') {
        return valor
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "($1) $2")
            .replace(/(\d{5})(\d)/, "$1-$2")
            .replace(/(-\d{4})\d+?$/, "$1");
    }
    return valor;
}

// Troca label e placeholder ao mudar o tipo de pessoa
tipoPessoa.addEventListener('change', () => {
    if (tipoPessoa.value === 'fisica') {
        cpfCnpjLabel.textContent = "CPF";
        cpfCnpjInput.placeholder = "000.000.000-00";
        cpfCnpjInput.value = "";
    } else {
        cpfCnpjLabel.textContent = "CNPJ";
        cpfCnpjInput.placeholder = "00.000.000/0000-00";
        cpfCnpjInput.value = "";
    }
});

// Máscara CPF/CNPJ
cpfCnpjInput.addEventListener('input', () => {
    if (tipoPessoa.value === 'fisica') {
        cpfCnpjInput.value = aplicarMascara(cpfCnpjInput.value, 'cpf');
    } else {
        cpfCnpjInput.value = aplicarMascara(cpfCnpjInput.value, 'cnpj');
    }
});

// Máscara Celular
celularInput.addEventListener('input', () => {
    celularInput.value = aplicarMascara(celularInput.value, 'celular');
});
