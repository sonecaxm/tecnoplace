// Script para gerenciar a página Meus Anúncios
document.addEventListener('DOMContentLoaded', function() {
    inicializarMeusAnuncios();
});

function inicializarMeusAnuncios() {
    verificarLogin();
    carregarAnuncios();
    atualizarContadorCarrinho();
}

function verificarLogin() {
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) {
        mostrarNotificacao('Faça login para ver seus anúncios', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
}

function carregarAnuncios() {
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) return;

    // Carregar produtos do usuário
    const produtos = dataManager.getProdutosByVendedor(usuario.id);
    
    // Carregar estatísticas
    carregarEstatisticas(produtos);
    
    // Carregar grid de anúncios
    carregarGridAnuncios(produtos);
}

function carregarEstatisticas(produtos) {
    const statsContainer = document.getElementById('anunciosStats');
    
    const totalAnuncios = produtos.length;
    const anunciosAtivos = produtos.filter(p => p.estoque > 0).length;
    const totalVendas = produtos.reduce((total, p) => total + (p.vendas || 0), 0);
    const valorTotal = produtos.reduce((total, p) => total + (p.preco * (p.estoque || 0)), 0);

    statsContainer.innerHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalAnuncios}</div>
            <div class="stat-label">Total de Anúncios</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${anunciosAtivos}</div>
            <div class="stat-label">Anúncios Ativos</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${totalVendas}</div>
            <div class="stat-label">Total de Vendas</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">R$ ${valorTotal.toFixed(2).replace('.', ',')}</div>
            <div class="stat-label">Valor em Estoque</div>
        </div>
    `;
}

function carregarGridAnuncios(produtos) {
    const gridContainer = document.getElementById('anunciosGrid');
    
    if (produtos.length === 0) {
        gridContainer.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1;">
                <i class="fas fa-tag"></i>
                <h3>Nenhum anúncio encontrado</h3>
                <p>Você ainda não criou nenhum anúncio. Comece agora mesmo!</p>
                <a href="criar-anuncio.html" class="btn-criar-anuncio" style="margin-top: 20px;">
                    <i class="fas fa-plus"></i> Criar Primeiro Anúncio
                </a>
            </div>
        `;
        return;
    }

    gridContainer.innerHTML = produtos.map(produto => `
        <div class="anuncio-card">
            <img src="${produto.imagem}" alt="${produto.nome}" class="anuncio-image">
            <div class="anuncio-content">
                <h3 class="anuncio-title">${produto.nome}</h3>
                <div class="anuncio-price">
                    R$ ${produto.preco.toFixed(2).replace('.', ',')}
                    ${produto.precoAntigo ? `<span class="anuncio-old-price">R$ ${produto.precoAntigo.toFixed(2).replace('.', ',')}</span>` : ''}
                </div>
                <div class="anuncio-info">
                    <span>Estoque: ${produto.estoque} unidades</span>
                    <span class="anuncio-status ${produto.estoque > 0 ? 'status-ativo' : 'status-inativo'}">
                        ${produto.estoque > 0 ? 'Ativo' : 'Inativo'}
                    </span>
                </div>
                <div class="anuncio-actions">
                    <button class="btn-action btn-edit" onclick="editarAnuncio(${produto.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn-action btn-delete" onclick="excluirAnuncio(${produto.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function filtrarAnuncios() {
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) return;

    const statusFilter = document.getElementById('statusFilter').value;
    const categoriaFilter = document.getElementById('categoriaFilter').value;
    const searchFilter = document.getElementById('searchFilter').value.toLowerCase();

    let produtos = dataManager.getProdutosByVendedor(usuario.id);

    // Filtrar por status
    if (statusFilter) {
        if (statusFilter === 'ativo') {
            produtos = produtos.filter(p => p.estoque > 0);
        } else if (statusFilter === 'inativo') {
            produtos = produtos.filter(p => p.estoque <= 0);
        }
    }

    // Filtrar por categoria
    if (categoriaFilter) {
        produtos = produtos.filter(p => p.categoria === categoriaFilter);
    }

    // Filtrar por busca
    if (searchFilter) {
        produtos = produtos.filter(p => 
            p.nome.toLowerCase().includes(searchFilter) ||
            p.descricao.toLowerCase().includes(searchFilter)
        );
    }

    // Recarregar grid com produtos filtrados
    carregarGridAnuncios(produtos);
}

function editarAnuncio(produtoId) {
    // Por enquanto, redirecionar para criar anúncio com dados pré-preenchidos
    // Em uma implementação completa, seria uma página de edição separada
    mostrarNotificacao('Funcionalidade de edição em desenvolvimento', 'info');
    
    // Salvar ID do produto para edição no localStorage
    localStorage.setItem('editando_produto_id', produtoId);
    
    // Redirecionar para página de criação (que pode ser adaptada para edição)
    setTimeout(() => {
        window.location.href = 'criar-anuncio.html';
    }, 1500);
}

function excluirAnuncio(produtoId) {
    if (!confirm('Tem certeza que deseja excluir este anúncio? Esta ação não pode ser desfeita.')) {
        return;
    }

    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) return;

    // Remover produto da base de dados
    dataManager.removerProduto(produtoId);

    // Remover dos anúncios do usuário
    if (usuario.anuncios) {
        usuario.anuncios = usuario.anuncios.filter(id => id !== produtoId);
        dataManager.saveUsuarioToStorage(usuario);
    }

    mostrarNotificacao('Anúncio excluído com sucesso!', 'success');
    
    // Recarregar página
    setTimeout(() => {
        carregarAnuncios();
    }, 1000);
}

// Função para carregar dados de um produto para edição
function carregarDadosParaEdicao() {
    const produtoId = localStorage.getItem('editando_produto_id');
    if (!produtoId) return;

    const produto = dataManager.getProdutoById(parseInt(produtoId));
    if (!produto) return;

    // Preencher formulário com dados do produto
    document.getElementById('titulo').value = produto.nome;
    document.getElementById('categoria').value = produto.categoria;
    document.getElementById('marca').value = produto.marca || '';
    document.getElementById('preco').value = produto.preco;
    document.getElementById('precoAntigo').value = produto.precoAntigo || '';
    document.getElementById('estoque').value = produto.estoque;
    document.getElementById('tag').value = produto.tag || '';
    document.getElementById('descricao').value = produto.descricao;

    // Carregar especificações
    if (produto.especificacoes) {
        const specsContainer = document.getElementById('specsContainer');
        specsContainer.innerHTML = '';
        
        Object.entries(produto.especificacoes).forEach(([label, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <input type="text" placeholder="Ex: Tamanho" class="spec-label" value="${label}">
                <input type="text" placeholder="Ex: 27 polegadas" class="spec-value" value="${value}">
                <button type="button" class="btn-remove-spec" onclick="removerEspecificacao(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            specsContainer.appendChild(specItem);
        });
    }

    // Carregar imagens
    if (produto.imagens && produto.imagens.length > 0) {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = '';
        
        produto.imagens.forEach((src, index) => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            imageItem.innerHTML = `
                <img src="${src}" alt="Imagem ${index + 1}">
                <button type="button" class="image-remove" onclick="removerImagem(this)">
                    <i class="fas fa-times"></i>
                </button>
            `;
            imagePreview.appendChild(imageItem);
        });
    }

    // Limpar ID de edição
    localStorage.removeItem('editando_produto_id');
}

// Sobrescrever função toggleUserMenu para redirecionar para página de conta
function toggleUserMenu() {
    const usuario = dataManager.getUsuarioLogado();
    if (usuario) {
        // Se já estiver na página de anúncios, redirecionar para conta
        if (window.location.pathname.includes('meus-anuncios.html')) {
            window.location.href = 'login.html';
        } else {
            // Redirecionar para página de anúncios
            window.location.href = 'meus-anuncios.html';
        }
    } else {
        // Redirecionar para página de login
        window.location.href = 'login.html';
    }
}



