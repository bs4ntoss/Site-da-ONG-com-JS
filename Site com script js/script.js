// Função para controlar o menu responsivo
function toggleMenu() {
    const menu = document.getElementById('navMenu');
    if (menu.style.display === 'block') {
        menu.style.display = '';
    } else {
        menu.style.display = 'block';
    }
}

// Função para validar email
function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Função para validar CPF
function validarCPF(cpf) {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
}

// Função para validar telefone
function validarTelefone(telefone) {
    const telRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
    return telRegex.test(telefone);
}

// Função para formatar CPF automaticamente
function formatarCPF(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 11) {
        value = value.substring(0, 11);
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    input.value = value;
}

// Função para formatar telefone automaticamente
function formatarTelefone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 11) {
        value = value.substring(0, 11);
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    input.value = value;
}

// Inicialização quando o documento estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar formatação automática aos campos
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            formatarCPF(this);
        });
    }

    const telefoneInput = document.getElementById('telefone');
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function() {
            formatarTelefone(this);
        });
    }

    // Validação do formulário
    const form = document.querySelector('.cadastro-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obter valores dos campos
            const email = document.getElementById('email').value.trim();
            const confirmEmail = document.getElementById('confirmEmail').value.trim();
            const cpf = document.getElementById('cpf').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const consent = document.getElementById('consent').checked;

            // Validar email
            if (!validarEmail(email)) {
                alert('Por favor, insira um email válido.');
                document.getElementById('email').focus();
                return;
            }

            // Confirmação de email
            if (email !== confirmEmail) {
                alert('Os emails não coincidem. Verifique e tente novamente.');
                document.getElementById('confirmEmail').focus();
                return;
            }

            // Validar CPF
            if (!validarCPF(cpf)) {
                alert('CPF inválido. Use o formato 000.000.000-00.');
                document.getElementById('cpf').focus();
                return;
            }

            // Validar telefone
            if (!validarTelefone(telefone)) {
                alert('Telefone inválido. Use o formato (00) 90000-0000.');
                document.getElementById('telefone').focus();
                return;
            }

            // Verificar consentimento
            if (!consent) {
                alert('É necessário concordar com o uso dos dados para prosseguir.');
                return;
            }

            // Se passou em todas as validações, mostrar mensagem de sucesso
            const container = document.querySelector('.signup-content');
            container.innerHTML = `
                <h2>Cadastro enviado com sucesso!</h2>
                <p>Obrigado por se cadastrar. Em breve entraremos em contato pelo email informado.</p>
                <div class="success-animation">
                    <span class="checkmark">✓</span>
                </div>
            `;
        });
    }

    // Adicionar classe active ao link do menu correspondente à página atual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('#navMenu a');
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Adicionar smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href !== '#') {
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
