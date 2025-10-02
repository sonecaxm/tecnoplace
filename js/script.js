// Script principal do Tecnoplace
document.addEventListener('DOMContentLoaded', function() {
    console.log('Tecnoplace inicializando...');
    console.log('dataManager disponível:', typeof dataManager !== 'undefined');
    inicializarSite();
});

function inicializarSite() {
    carregarProdutosPromocao();
    carregarProdutosDestaque();
    atualizarContadorCarrinho();
    inicializarBanner();
    configurarEventos();
    atualizarFotoUsuarioHeader();
}

// Configurar eventos
function configurarEventos() {
    // Evento de busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                buscarProdutos();
            }
        });
    }

    // Evento do formulário de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', inscreverNewsletter);
    }
}

// Funções do Banner
let bannerIndex = 0;
let bannerInterval;

function inicializarBanner() {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;

    // Iniciar rotação automática
    bannerInterval = setInterval(() => {
        proximoSlide();
    }, 4000);

    // Pausar ao passar o mouse
    const bannerContainer = document.querySelector('.banner-container');
    if (bannerContainer) {
        bannerContainer.addEventListener('mouseenter', () => {
            clearInterval(bannerInterval);
        });

        bannerContainer.addEventListener('mouseleave', () => {
            bannerInterval = setInterval(() => {
                proximoSlide();
            }, 4000);
        });
    }
}

function proximoSlide() {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;

    slides[bannerIndex].classList.remove('active');
    indicators[bannerIndex].classList.remove('active');
    
    bannerIndex = (bannerIndex + 1) % slides.length;
    
    slides[bannerIndex].classList.add('active');
    indicators[bannerIndex].classList.add('active');
}

function currentSlide(n) {
    const slides = document.querySelectorAll('.banner-slide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;

    slides[bannerIndex].classList.remove('active');
    indicators[bannerIndex].classList.remove('active');
    
    bannerIndex = n - 1;
    
    slides[bannerIndex].classList.add('active');
    indicators[bannerIndex].classList.add('active');
}

// Funções da Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Funções de Produtos
function carregarProdutosPromocao() {
    console.log('Carregando produtos em promoção...');
    const container = document.getElementById('produtosPromocao');
    if (!container) {
        console.error('Container produtosPromocao não encontrado');
        return;
    }

    const produtosPromocao = dataManager.getProdutosPromocao().slice(0, 4);
    console.log('Produtos em promoção encontrados:', produtosPromocao.length);
    container.innerHTML = '';

    produtosPromocao.forEach(produto => {
        const produtoHTML = criarCardProduto(produto);
        container.appendChild(produtoHTML);
    });
}

function carregarProdutosDestaque() {
    console.log('Carregando produtos em destaque...');
    const container = document.getElementById('produtosDestaque');
    if (!container) {
        console.error('Container produtosDestaque não encontrado');
        return;
    }

    const produtosDestaque = dataManager.getProdutosDestaque().slice(0, 4);
    console.log('Produtos em destaque encontrados:', produtosDestaque.length);
    container.innerHTML = '';

    produtosDestaque.forEach(produto => {
        const produtoHTML = criarCardProduto(produto);
        container.appendChild(produtoHTML);
    });
}

function criarCardProduto(produto) {
    const vendedor = produto.vendedor;
    const desconto = produto.precoAntigo ? Math.round(((produto.precoAntigo - produto.preco) / produto.precoAntigo) * 100) : 0;
    
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.onclick = () => abrirProduto(produto.id);
    
    card.innerHTML = `
        <div class="produto-imagem">
            <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
            <div class="produto-tag">${produto.tag}</div>
        </div>
        <div class="produto-info">
            <h3>${produto.nome}</h3>
            <div class="vendedor-info">
                <img src="${vendedor ? vendedor.foto : 'https://via.placeholder.com/40'}" alt="${vendedor ? vendedor.nome : 'Vendedor'}" class="vendedor-foto">
                <div class="vendedor-detalhes">
                    <span class="vendedor-nome">${vendedor ? vendedor.nome : 'Vendedor'}</span>
                   <div class="produto-rating">${gerarEstrelas(vendedor ? vendedor.rating : 4.5)} (${vendedor ? vendedor.avaliacoes : 100})</div>
                </div>
            </div>
            <div class="produto-preco">
                <span class="preco-atual">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                ${produto.precoAntigo ? `<span class="preco-antigo">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span>` : ''}
            </div>
            ${desconto > 0 ? `<div class="desconto-badge">${desconto}% OFF</div>` : ''}
            <div class="produto-acoes">
                <button class="btn-comprar" onclick="event.stopPropagation(); abrirModalProduto(${produto.id})">Inspecionar</button>
                <button class="btn-carrinho" onclick="event.stopPropagation(); adicionarAoCarrinho(${produto.id})" title="Adicionar ao carrinho">
                    <i class="fas fa-shopping-cart"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

// Função para abrir página de produto
function abrirProduto(produtoId) {
    window.location.href = `produto.html?id=${produtoId}`;
}

function gerarEstrelas(rating) {
    const estrelas = Math.floor(rating);
    const meia = rating % 1 >= 0.5;
    let html = '';
    
    for (let i = 0; i < estrelas; i++) {
        html += '★';
    }
    if (meia) {
        html += '☆';
    }
    for (let i = estrelas + (meia ? 1 : 0); i < 5; i++) {
        html += '☆';
    }
    
    return html;
}

// Funções de Busca
function buscarProdutos() {
    const searchInput = document.getElementById('searchInput');
    const termo = searchInput.value.trim();
    
    if (termo.length < 2) {
        mostrarNotificacao('Digite pelo menos 2 caracteres para buscar', 'warning');
        return;
    }

    const resultados = dataManager.buscarProdutos(termo);
    exibirResultadosBusca(resultados, termo);
}

function exibirResultadosBusca(produtos, termo) {
    // Limpar produtos existentes
    const promocaoContainer = document.getElementById('produtosPromocao');
    const destaqueContainer = document.getElementById('produtosDestaque');
    
    if (promocaoContainer) promocaoContainer.innerHTML = '';
    if (destaqueContainer) destaqueContainer.innerHTML = '';

    // Atualizar título da seção
    const sectionTitles = document.querySelectorAll('.section-title');
    if (sectionTitles.length > 0) {
        sectionTitles[0].textContent = `Resultados para "${termo}" (${produtos.length} produtos)`;
    }

    // Exibir resultados
    if (produtos.length === 0) {
        if (promocaoContainer) {
            promocaoContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 64px; color: rgba(255,255,255,0.3); margin-bottom: 20px;"></i>
                    <h3>Nenhum produto encontrado</h3>
                    <p>Tente buscar com outros termos</p>
                </div>
            `;
        }
        return;
    }

    // Dividir resultados entre as duas seções
    const metade = Math.ceil(produtos.length / 2);
    const primeiraMetade = produtos.slice(0, metade);
    const segundaMetade = produtos.slice(metade);

    if (promocaoContainer) {
        primeiraMetade.forEach(produto => {
            const produtoHTML = criarCardProduto(produto);
            promocaoContainer.appendChild(produtoHTML);
        });
    }

    if (destaqueContainer && segundaMetade.length > 0) {
        segundaMetade.forEach(produto => {
            const produtoHTML = criarCardProduto(produto);
            destaqueContainer.appendChild(produtoHTML);
        });
    }
}

// Funções de Categoria
function filtrarPorCategoria(categoria) {
    const produtos = dataManager.getProdutosByCategoria(categoria);
    const categoriaInfo = dataManager.getCategoriaBySlug(categoria);
    
    exibirResultadosBusca(produtos, categoriaInfo ? categoriaInfo.nome : categoria);
    
    // Scroll para a seção de produtos
    document.querySelector('.produtos-destaque').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Funções do Carrinho
function adicionarAoCarrinho(produtoId) {
    const sucesso = dataManager.adicionarAoCarrinho(produtoId);
    
    if (sucesso) {
        atualizarContadorCarrinho();
        mostrarNotificacao('Produto adicionado ao carrinho!', 'success');
        
        // Animação do botão
        const botoes = document.querySelectorAll(`button[onclick="adicionarAoCarrinho(${produtoId})"]`);
        botoes.forEach(botao => {
            botao.style.transform = 'scale(0.95)';
            setTimeout(() => {
                botao.style.transform = 'scale(1)';
            }, 150);
        });
    } else {
        mostrarNotificacao('Erro ao adicionar produto ao carrinho', 'error');
    }
}

function atualizarContadorCarrinho() {
    const contador = document.getElementById('cartCount');
    if (contador) {
        const quantidade = dataManager.getQuantidadeItensCarrinho();
        contador.textContent = quantidade;
        contador.style.display = quantidade > 0 ? 'flex' : 'none';
    }
}

function toggleCart() {
    const modal = document.getElementById('cartModal');
    if (!modal) return;

    const isActive = modal.classList.contains('active');
    
    if (isActive) {
        modal.classList.remove('active');
    } else {
        carregarItensCarrinho();
        modal.classList.add('active');
    }
}

function carregarItensCarrinho() {
    const container = document.getElementById('cartItems');
    const totalElement = document.getElementById('cartTotal');
    
    if (!container || !totalElement) return;

    const itens = dataManager.getCarrinho();
    const total = dataManager.getTotalCarrinho();

    if (itens.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-cart"></i>
                <h3>Seu carrinho está vazio</h3>
                <p>Adicione produtos para continuar</p>
            </div>
        `;
        totalElement.textContent = '0,00';
        return;
    }

    container.innerHTML = '';
    
    itens.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.produto.imagem}" alt="${item.produto.nome}">
            <div class="cart-item-info">
                <h4>${item.produto.nome}</h4>
                <div class="cart-item-price">R$ ${item.precoUnitario.toFixed(2).replace('.', ',')}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="alterarQuantidade(${item.produtoId}, ${item.quantidade - 1})">-</button>
                <span class="quantity-display">${item.quantidade}</span>
                <button class="quantity-btn" onclick="alterarQuantidade(${item.produtoId}, ${item.quantidade + 1})">+</button>
                <button class="remove-item" onclick="removerDoCarrinho(${item.produtoId})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        container.appendChild(itemElement);
    });

    totalElement.textContent = total.toFixed(2).replace('.', ',');
}

function alterarQuantidade(produtoId, novaQuantidade) {
    dataManager.atualizarQuantidadeCarrinho(produtoId, novaQuantidade);
    carregarItensCarrinho();
    atualizarContadorCarrinho();
}

function removerDoCarrinho(produtoId) {
    dataManager.removerDoCarrinho(produtoId);
    carregarItensCarrinho();
    atualizarContadorCarrinho();
    mostrarNotificacao('Produto removido do carrinho', 'info');
}

function finalizarCompra() {
    const itens = dataManager.getCarrinho();
    
    if (itens.length === 0) {
        mostrarNotificacao('Seu carrinho está vazio', 'warning');
        return;
    }

    // Simular processo de compra
    mostrarNotificacao('Redirecionando para o pagamento...', 'info');
    
    setTimeout(() => {
        dataManager.limparCarrinho();
        atualizarContadorCarrinho();
        toggleCart();
        mostrarNotificacao('Compra realizada com sucesso!', 'success');
    }, 2000);
}

// Modal de Produto
function abrirModalProduto(produtoId) {
    console.log('Abrindo modal para produto ID:', produtoId); // Debug
    
    const produto = dataManager.getProdutoById(produtoId);
    console.log('Produto encontrado:', produto); // Debug
    
    if (!produto) {
        console.error('Produto não encontrado para ID:', produtoId);
        return;
    }

    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('productModalBody');
    
    console.log('Modal elements:', { modal, modalBody }); // Debug
    
    if (!modal || !modalBody) {
        console.error('Elementos do modal não encontrados');
        return;
    }

    // Criar conteúdo do modal com melhor estrutura
    modalBody.innerHTML = `
        <div class="product-detail">
            <div class="product-detail-image">
                <img src="${produto.imagem}" alt="${produto.nome}" style="width: 100%; height: auto; border-radius: 10px;">
            </div>
            <div class="product-detail-info">
                <h2 style="color: #ffffff; margin-bottom: 20px; font-size: 28px;">${produto.nome}</h2>
                <div class="product-detail-price" style="margin-bottom: 20px;">
                    <span class="preco-atual" style="font-size: 32px; font-weight: 700; color: #4A00E0;">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                    ${produto.precoAntigo ? `<span class="preco-antigo" style="font-size: 16px; color: #999; text-decoration: line-through; margin-left: 10px;">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span>` : ''}
                </div>
                <div class="vendedor-info" style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border-radius: 10px;">
                    <img src="${produto.vendedor.foto}" alt="${produto.vendedor.nome}" style="width: 50px; height: 50px; border-radius: 50%; object-fit: cover;">
                    <div class="vendedor-detalhes">
                        <div class="vendedor-nome" style="font-size: 16px; font-weight: 500; color: #ffffff;">${produto.vendedor.nome}</div>
                        <div class="produto-rating" style="color: #FFD700; font-size: 14px;">${gerarEstrelas(produto.vendedor.rating)} (${produto.vendedor.avaliacoes} avaliações)</div>
                    </div>
                </div>
                <div class="product-detail-description" style="margin-bottom: 20px;">
                    <p style="color: rgba(255, 255, 255, 0.8); line-height: 1.6; font-size: 16px;">${produto.descricao}</p>
                </div>
                ${produto.especificacoes ? `
                    <div class="product-specs" style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 10px; margin-bottom: 20px;">
                        <h4 style="color: #ffffff; margin-bottom: 15px; font-size: 18px;">Especificações Técnicas</h4>
                        ${Object.entries(produto.especificacoes).map(([key, value]) => `
                            <div class="spec-item" style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.1);">
                                <span class="spec-label" style="color: rgba(255, 255, 255, 0.7);">${key}:</span>
                                <span class="spec-value" style="color: #ffffff; font-weight: 500;">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                <div class="product-actions">
                    <button class="btn-comprar" onclick="adicionarAoCarrinho(${produto.id}); closeProductModal();" style="width: 100%; margin-bottom: 10px; background: linear-gradient(135deg, #4A00E0, #8B5CF6); color: white; border: none; padding: 15px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                        <i class="fas fa-shopping-cart" style="margin-right: 8px;"></i> Adicionar ao Carrinho
                    </button>
                    <div class="product-stock" style="color: rgba(255, 255, 255, 0.7); font-size: 14px; text-align: center;">
                        <i class="fas fa-box" style="margin-right: 5px;"></i> ${produto.estoque} unidades em estoque
                    </div>
                </div>
            </div>
        </div>
    `;

    // Mostrar o modal
    modal.classList.add('active');
    console.log('Modal ativado'); // Debug
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Newsletter
function inscreverNewsletter(event) {
    event.preventDefault();
    
    const emailInput = document.getElementById('emailNewsletter');
    const email = emailInput.value.trim();
    
    if (!email) {
        mostrarNotificacao('Digite um email válido', 'warning');
        return;
    }

    // Simular inscrição
    mostrarNotificacao('Inscrito com sucesso! Você receberá nossas novidades.', 'success');
    emailInput.value = '';
}

// Menu do usuário
function toggleUserMenu() {
    // Implementar menu do usuário (login, perfil, etc.)
    mostrarNotificacao('Funcionalidade em desenvolvimento', 'info');
}

// Sistema de Notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    // Remover notificação existente
    const existente = document.querySelector('.notificacao');
    if (existente) {
        existente.remove();
    }

    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    
    const icones = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    notificacao.innerHTML = `
        <i class="${icones[tipo]}"></i>
        <span>${mensagem}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;

    // Adicionar estilos
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#10B981' : tipo === 'error' ? '#EF4444' : tipo === 'warning' ? '#F59E0B' : '#3B82F6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        max-width: 400px;
        font-weight: 500;
    `;

    // Adicionar animação CSS
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notificacao button {
                background: none;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 0 5px;
                margin-left: auto;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notificacao);

    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notificacao.parentElement) {
            notificacao.remove();
        }
    }, 5000);
}

// Eventos globais
document.addEventListener('click', function(e) {
    // Fechar modais ao clicar fora
    if (e.target.classList.contains('cart-modal')) {
        toggleCart();
    }
    if (e.target.classList.contains('product-modal')) {
        closeProductModal();
    }
});

// Teclas de atalho
document.addEventListener('keydown', function(e) {
    // ESC para fechar modais
    if (e.key === 'Escape') {
        const cartModal = document.getElementById('cartModal');
        const productModal = document.getElementById('productModal');
        
        if (cartModal && cartModal.classList.contains('active')) {
            toggleCart();
        }
        if (productModal && productModal.classList.contains('active')) {
            closeProductModal();
        }
        closeSidebar();
    }
});

// Lazy loading para imagens
function implementarLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Inicializar lazy loading quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', implementarLazyLoading);

// ===== FUNÇÕES DE FOTO DO USUÁRIO =====

// Atualizar foto do usuário no header
function atualizarFotoUsuarioHeader() {
    const usuario = dataManager.getUsuarioLogado();
    if (usuario && usuario.foto) {
        const userAvatarHeaderImg = document.getElementById('userAvatarHeaderImg');
        const userAvatarHeaderIcon = document.getElementById('userAvatarHeaderIcon');
        
        if (userAvatarHeaderImg && userAvatarHeaderIcon) {
            userAvatarHeaderImg.src = usuario.foto;
            userAvatarHeaderImg.style.display = 'block';
            userAvatarHeaderIcon.style.display = 'none';
        }
    }
}

