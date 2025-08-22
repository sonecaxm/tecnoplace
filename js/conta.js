// Script específico para a página Minha Conta
document.addEventListener('DOMContentLoaded', function() {
    inicializarPaginaConta();
});

function inicializarPaginaConta() {
    verificarStatusLogin();
    configurarEventosConta();
    atualizarContadorCarrinho();
    
    // Configurar validação de senha em tempo real
    const senhaInput = document.getElementById('registroSenha');
    if (senhaInput) {
        senhaInput.addEventListener('input', validarForcaSenha);
    }
}

function configurarEventosConta() {
    // Eventos de formulário já estão configurados via onsubmit no HTML
    // Configurar outros eventos se necessário
}

// Verificar se o usuário já está logado
function verificarStatusLogin() {
    const usuario = dataManager.getUsuarioLogado();
    
    if (usuario) {
        mostrarPainelUsuario(usuario);
    } else {
        mostrarSecaoAuth();
    }
}

// Mostrar seção de autenticação
function mostrarSecaoAuth() {
    document.getElementById('authSection').classList.remove('hidden');
    document.getElementById('userPanel').classList.add('hidden');
}

// Mostrar painel do usuário
function mostrarPainelUsuario(usuario) {
    document.getElementById('authSection').classList.add('hidden');
    document.getElementById('userPanel').classList.remove('hidden');
    
    // Preencher informações do usuário
    document.getElementById('userName').textContent = usuario.nome;
    document.getElementById('userEmail').textContent = usuario.email;
    document.getElementById('perfilNome').value = usuario.nome;
    document.getElementById('perfilEmail').value = usuario.email;
    
    // Preencher endereço se existir
    if (usuario.endereco) {
        const enderecoTexto = `${usuario.endereco.rua}<br>${usuario.endereco.cidade} - ${usuario.endereco.estado}<br>${usuario.endereco.cep}`;
        document.getElementById('userAddress').innerHTML = enderecoTexto;
    }
    
    // Carregar pedidos do usuário
    carregarPedidosUsuario();
}

// Alternar entre abas de login/registro
function showTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registroForm = document.getElementById('registroForm');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    // Remover classe active de todos os botões
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    if (tab === 'login') {
        loginForm.classList.remove('hidden');
        registroForm.classList.add('hidden');
        tabBtns[0].classList.add('active');
    } else {
        loginForm.classList.add('hidden');
        registroForm.classList.remove('hidden');
        tabBtns[1].classList.add('active');
    }
}

// Alternar entre abas do painel
function showPanelTab(tab) {
    const tabs = ['perfil', 'pedidos', 'favoritos', 'endereco'];
    const tabBtns = document.querySelectorAll('.panel-tab-btn');
    
    // Esconder todas as abas
    tabs.forEach(t => {
        document.getElementById(t + 'Tab').classList.add('hidden');
    });
    
    // Remover classe active de todos os botões
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Mostrar aba selecionada
    document.getElementById(tab + 'Tab').classList.remove('hidden');
    
    // Adicionar classe active ao botão correspondente
    const tabIndex = tabs.indexOf(tab);
    if (tabIndex !== -1) {
        tabBtns[tabIndex].classList.add('active');
    }
}

// Função de login
function fazerLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const senha = document.getElementById('loginSenha').value;
    
    if (!email || !senha) {
        mostrarNotificacao('Preencha todos os campos', 'warning');
        return;
    }
    
    // Tentar fazer login
    const sucesso = dataManager.login(email, senha);
    
    if (sucesso) {
        mostrarNotificacao('Login realizado com sucesso!', 'success');
        const usuario = dataManager.getUsuarioLogado();
        mostrarPainelUsuario(usuario);
        
        // Limpar formulário
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginSenha').value = '';
    } else {
        mostrarNotificacao('Email ou senha incorretos', 'error');
    }
}

// Função de registro
function fazerRegistro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('registroNome').value.trim();
    const email = document.getElementById('registroEmail').value.trim();
    const senha = document.getElementById('registroSenha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const aceitarTermos = document.getElementById('aceitarTermos').checked;
    
    // Validações
    if (!nome || !email || !senha || !confirmarSenha) {
        mostrarNotificacao('Preencha todos os campos', 'warning');
        return;
    }
    
    if (nome.length < 3) {
        mostrarNotificacao('Nome deve ter pelo menos 3 caracteres', 'warning');
        return;
    }
    
    if (senha.length < 6) {
        mostrarNotificacao('Senha deve ter pelo menos 6 caracteres', 'warning');
        return;
    }
    
    if (senha !== confirmarSenha) {
        mostrarNotificacao('Senhas não coincidem', 'warning');
        return;
    }
    
    if (!aceitarTermos) {
        mostrarNotificacao('Você deve aceitar os termos de uso', 'warning');
        return;
    }
    
    // Verificar se email já existe
    const usuarioExistente = dataManager.data.usuarios.find(u => u.email === email);
    if (usuarioExistente) {
        mostrarNotificacao('Este email já está cadastrado', 'error');
        return;
    }
    
    // Criar novo usuário
    const novoUsuario = {
        id: dataManager.data.usuarios.length + 1,
        nome: nome,
        email: email,
        senha: senha, // Em produção, seria hash
        carrinho: [],
        pedidos: [],
        endereco: {
            rua: '',
            cidade: '',
            cep: '',
            estado: ''
        }
    };
    
    // Adicionar à base de dados
    dataManager.data.usuarios.push(novoUsuario);
    
    // Fazer login automático
    dataManager.saveUsuarioToStorage(novoUsuario);
    
    mostrarNotificacao('Conta criada com sucesso!', 'success');
    mostrarPainelUsuario(novoUsuario);
    
    // Limpar formulário
    document.getElementById('registroNome').value = '';
    document.getElementById('registroEmail').value = '';
    document.getElementById('registroSenha').value = '';
    document.getElementById('confirmarSenha').value = '';
    document.getElementById('aceitarTermos').checked = false;
}

// Função de logout
function fazerLogout() {
    dataManager.logout();
    mostrarNotificacao('Logout realizado com sucesso!', 'success');
    mostrarSecaoAuth();
    showTab('login'); // Voltar para aba de login
}

// Validar força da senha
function validarForcaSenha() {
    const senha = document.getElementById('registroSenha').value;
    const strengthDiv = document.getElementById('passwordStrength');
    
    if (!senha) {
        strengthDiv.innerHTML = '';
        return;
    }
    
    let forca = 0;
    const criterios = [
        senha.length >= 8,
        /[a-z]/.test(senha),
        /[A-Z]/.test(senha),
        /\d/.test(senha),
        /[^a-zA-Z\d]/.test(senha)
    ];
    
    forca = criterios.filter(Boolean).length;
    
    let texto = '';
    let classe = '';
    
    if (forca < 3) {
        texto = 'Senha fraca';
        classe = 'weak';
    } else if (forca < 4) {
        texto = 'Senha média';
        classe = 'medium';
    } else {
        texto = 'Senha forte';
        classe = 'strong';
    }
    
    strengthDiv.innerHTML = `
        <div class="strength-indicator ${classe}">
            <div class="strength-bars">
                ${Array(5).fill().map((_, i) => 
                    `<div class="strength-bar ${i < forca ? classe : ''}"></div>`
                ).join('')}
            </div>
            <span class="strength-text">${texto}</span>
        </div>
    `;
}

// Alternar visibilidade da senha
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password i');
    
    if (input.type === 'password') {
        input.type = 'text';
        button.classList.remove('fa-eye');
        button.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        button.classList.remove('fa-eye-slash');
        button.classList.add('fa-eye');
    }
}

// Atualizar perfil
function atualizarPerfil(event) {
    event.preventDefault();
    
    const nome = document.getElementById('perfilNome').value.trim();
    const telefone = document.getElementById('perfilTelefone').value.trim();
    const cpf = document.getElementById('perfilCpf').value.trim();
    
    if (!nome) {
        mostrarNotificacao('Nome é obrigatório', 'warning');
        return;
    }
    
    // Atualizar dados do usuário
    const usuario = dataManager.getUsuarioLogado();
    if (usuario) {
        usuario.nome = nome;
        usuario.telefone = telefone;
        usuario.cpf = cpf;
        
        // Salvar no localStorage
        dataManager.saveUsuarioToStorage(usuario);
        
        // Atualizar interface
        document.getElementById('userName').textContent = nome;
        
        mostrarNotificacao('Perfil atualizado com sucesso!', 'success');
    }
}

// Carregar pedidos do usuário
function carregarPedidosUsuario() {
    const ordersList = document.getElementById('ordersList');
    const usuario = dataManager.getUsuarioLogado();
    
    if (!usuario || !usuario.pedidos || usuario.pedidos.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-bag"></i>
                <h4>Nenhum pedido encontrado</h4>
                <p>Você ainda não fez nenhum pedido</p>
                <a href="index.html" class="btn-secondary">
                    <i class="fas fa-shopping-cart"></i> Começar a Comprar
                </a>
            </div>
        `;
        return;
    }
    
    // Gerar HTML dos pedidos
    const pedidosHTML = usuario.pedidos.map(pedido => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <div class="order-number">Pedido #${pedido.numero}</div>
                    <div style="color: rgba(255,255,255,0.6); font-size: 14px;">${pedido.data}</div>
                </div>
                <div class="order-status status-${pedido.status.toLowerCase().replace(' ', '-')}">
                    ${pedido.status}
                </div>
            </div>
            <div class="order-items">
                ${pedido.itens.map(item => `
                    <div class="order-item">
                        <img src="${item.imagem}" alt="${item.nome}">
                        <div class="order-item-info">
                            <div class="order-item-name">${item.nome}</div>
                            <div class="order-item-details">Qtd: ${item.quantidade} | R$ ${item.preco.toFixed(2).replace('.', ',')}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">Total: R$ ${pedido.total.toFixed(2).replace('.', ',')}</div>
        </div>
    `).join('');
    
    ordersList.innerHTML = pedidosHTML;
}

// Adicionar pedidos de exemplo ao usuário (para demonstração)
function adicionarPedidosExemplo() {
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) return;
    
    if (!usuario.pedidos) {
        usuario.pedidos = [];
    }
    
    // Adicionar alguns pedidos de exemplo se não existirem
    if (usuario.pedidos.length === 0) {
        const produtosExemplo = dataManager.getAllProdutos().slice(0, 3);
        
        const pedidosExemplo = [
            {
                numero: '2024001',
                data: '15/01/2024',
                status: 'Entregue',
                itens: [
                    {
                        nome: produtosExemplo[0].nome,
                        imagem: produtosExemplo[0].imagem,
                        quantidade: 1,
                        preco: produtosExemplo[0].preco
                    }
                ],
                total: produtosExemplo[0].preco
            },
            {
                numero: '2024002',
                data: '22/01/2024',
                status: 'Enviado',
                itens: [
                    {
                        nome: produtosExemplo[1].nome,
                        imagem: produtosExemplo[1].imagem,
                        quantidade: 1,
                        preco: produtosExemplo[1].preco
                    },
                    {
                        nome: produtosExemplo[2].nome,
                        imagem: produtosExemplo[2].imagem,
                        quantidade: 1,
                        preco: produtosExemplo[2].preco
                    }
                ],
                total: produtosExemplo[1].preco + produtosExemplo[2].preco
            }
        ];
        
        usuario.pedidos = pedidosExemplo;
        dataManager.saveUsuarioToStorage(usuario);
    }
}

// Editar endereço
function editarEndereco() {
    mostrarNotificacao('Funcionalidade de edição de endereço em desenvolvimento', 'info');
}

// Adicionar endereço
function adicionarEndereco() {
    mostrarNotificacao('Funcionalidade de adicionar endereço em desenvolvimento', 'info');
}

// Sobrescrever função toggleUserMenu para redirecionar para página de conta
function toggleUserMenu() {
    const usuario = dataManager.getUsuarioLogado();
    if (usuario) {
        // Se já estiver na página de conta, fazer logout
        if (window.location.pathname.includes('conta.html')) {
            fazerLogout();
        } else {
            // Redirecionar para página de conta
            window.location.href = 'conta.html';
        }
    } else {
        // Redirecionar para página de login
        window.location.href = 'conta.html';
    }
}

// Função para finalizar compra (sobrescrever a do script.js)
function finalizarCompra() {
    const itens = dataManager.getCarrinho();
    
    if (itens.length === 0) {
        mostrarNotificacao('Seu carrinho está vazio', 'warning');
        return;
    }
    
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) {
        mostrarNotificacao('Faça login para finalizar a compra', 'warning');
        setTimeout(() => {
            window.location.href = 'conta.html';
        }, 2000);
        return;
    }
    
    // Simular processo de compra
    mostrarNotificacao('Processando pedido...', 'info');
    
    setTimeout(() => {
        // Criar novo pedido
        const novoPedido = {
            numero: `2024${String(Date.now()).slice(-3)}`,
            data: new Date().toLocaleDateString('pt-BR'),
            status: 'Processando',
            itens: itens.map(item => ({
                nome: item.produto.nome,
                imagem: item.produto.imagem,
                quantidade: item.quantidade,
                preco: item.precoUnitario
            })),
            total: dataManager.getTotalCarrinho()
        };
        
        // Adicionar pedido ao usuário
        if (!usuario.pedidos) {
            usuario.pedidos = [];
        }
        usuario.pedidos.unshift(novoPedido); // Adicionar no início
        
        // Salvar usuário atualizado
        dataManager.saveUsuarioToStorage(usuario);
        
        // Limpar carrinho
        dataManager.limparCarrinho();
        atualizarContadorCarrinho();
        toggleCart();
        
        mostrarNotificacao('Pedido realizado com sucesso!', 'success');
        
        // Se estiver na página de conta, atualizar lista de pedidos
        if (window.location.pathname.includes('conta.html')) {
            carregarPedidosUsuario();
        }
    }, 2000);
}

// Inicializar pedidos de exemplo quando o usuário fizer login
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const usuario = dataManager.getUsuarioLogado();
        if (usuario) {
            adicionarPedidosExemplo();
        }
    }, 1000);
});

