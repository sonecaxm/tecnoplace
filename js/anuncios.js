// Script para gerenciar anúncios
document.addEventListener('DOMContentLoaded', function() {
    inicializarAnuncios();
});

function inicializarAnuncios() {
    verificarLogin();
    configurarUploadArea();
    atualizarContadorCarrinho();
}

function verificarLogin() {
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) {
        mostrarNotificacao('Faça login para criar anúncios', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
        return;
    }
}

function configurarUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('fileInput');

    if (!uploadArea || !fileInput) return;

    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    // Click to upload
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
}

function handleFileSelect(event) {
    const files = event.target.files;
    handleFiles(files);
}

function handleFiles(files) {
    const maxFiles = 5;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

    if (files.length > maxFiles) {
        mostrarNotificacao(`Máximo de ${maxFiles} imagens permitidas`, 'warning');
        return;
    }

    Array.from(files).forEach(file => {
        // Validar tipo
        if (!allowedTypes.includes(file.type)) {
            mostrarNotificacao(`Formato não suportado: ${file.name}`, 'error');
            return;
        }

        // Validar tamanho
        if (file.size > maxSize) {
            mostrarNotificacao(`Arquivo muito grande: ${file.name}`, 'error');
            return;
        }

        // Processar imagem
        processarImagem(file);
    });
}

function processarImagem(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        adicionarImagemPreview(e.target.result, file.name);
    };
    reader.readAsDataURL(file);
}

function adicionarImagemPreview(src, filename) {
    const preview = document.getElementById('imagePreview');
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.innerHTML = `
        <img src="${src}" alt="${filename}">
        <button type="button" class="image-remove" onclick="removerImagem(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    preview.appendChild(imageItem);
}

function removerImagem(button) {
    button.parentElement.remove();
}

function adicionarEspecificacao() {
    const container = document.getElementById('specsContainer');
    const specItem = document.createElement('div');
    specItem.className = 'spec-item';
    specItem.innerHTML = `
        <input type="text" placeholder="Ex: Tamanho" class="spec-label">
        <input type="text" placeholder="Ex: 27 polegadas" class="spec-value">
        <button type="button" class="btn-remove-spec" onclick="removerEspecificacao(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(specItem);
}

function removerEspecificacao(button) {
    const container = document.getElementById('specsContainer');
    if (container.children.length > 1) {
        button.parentElement.remove();
    } else {
        mostrarNotificacao('Pelo menos uma especificação é necessária', 'warning');
    }
}

function criarAnuncio(event) {
    event.preventDefault();
    
    const usuario = dataManager.getUsuarioLogado();
    if (!usuario) {
        mostrarNotificacao('Faça login para criar anúncios', 'warning');
        return;
    }

    // Coletar dados do formulário
    const formData = new FormData(event.target);
    const dados = {
        titulo: formData.get('titulo'),
        categoria: formData.get('categoria'),
        marca: formData.get('marca'),
        preco: parseFloat(formData.get('preco')),
        precoAntigo: formData.get('precoAntigo') ? parseFloat(formData.get('precoAntigo')) : null,
        estoque: parseInt(formData.get('estoque')),
        tag: formData.get('tag'),
        descricao: formData.get('descricao')
    };

    // Validações
    if (!validarDadosAnuncio(dados)) {
        return;
    }

    // Coletar especificações
    const especificacoes = {};
    const specItems = document.querySelectorAll('.spec-item');
    specItems.forEach(item => {
        const label = item.querySelector('.spec-label').value.trim();
        const value = item.querySelector('.spec-value').value.trim();
        if (label && value) {
            especificacoes[label] = value;
        }
    });

    // Coletar imagens
    const imagens = [];
    const imageItems = document.querySelectorAll('.image-item img');
    imageItems.forEach(img => {
        imagens.push(img.src);
    });

    if (imagens.length === 0) {
        mostrarNotificacao('Adicione pelo menos uma imagem', 'warning');
        return;
    }

    // Criar produto
    const novoProduto = {
        id: Date.now(), // ID único baseado no timestamp
        nome: dados.titulo,
        categoria: dados.categoria,
        categoriaId: obterCategoriaId(dados.categoria),
        preco: dados.preco,
        precoAntigo: dados.precoAntigo,
        imagem: imagens[0], // Primeira imagem como principal
        imagens: imagens, // Todas as imagens
        tag: dados.tag || 'Novo',
        vendedor: {
            nome: usuario.nome,
            foto: usuario.foto || 'https://via.placeholder.com/50x50/333/FFF?text=' + usuario.nome.charAt(0),
            rating: 5.0,
            avaliacoes: 0
        },
        descricao: dados.descricao,
        especificacoes: Object.keys(especificacoes).length > 0 ? especificacoes : null,
        estoque: dados.estoque,
        promocao: dados.precoAntigo && dados.precoAntigo > dados.preco,
        destaque: false,
        dataCriacao: new Date().toISOString(),
        vendedorId: usuario.id
    };

    // Adicionar à base de dados
    dataManager.adicionarProduto(novoProduto);

    // Adicionar aos anúncios do usuário
    if (!usuario.anuncios) {
        usuario.anuncios = [];
    }
    usuario.anuncios.push(novoProduto.id);
    dataManager.saveUsuarioToStorage(usuario);

    mostrarNotificacao('Anúncio criado com sucesso!', 'success');
    
    // Redirecionar para página de anúncios
    setTimeout(() => {
        window.location.href = 'meus-anuncios.html';
    }, 2000);
}

function validarDadosAnuncio(dados) {
    if (!dados.titulo || dados.titulo.length < 5) {
        mostrarNotificacao('Título deve ter pelo menos 5 caracteres', 'warning');
        return false;
    }

    if (!dados.categoria) {
        mostrarNotificacao('Selecione uma categoria', 'warning');
        return false;
    }

    if (!dados.preco || dados.preco <= 0) {
        mostrarNotificacao('Preço deve ser maior que zero', 'warning');
        return false;
    }

    if (dados.precoAntigo && dados.precoAntigo <= dados.preco) {
        mostrarNotificacao('Preço antigo deve ser maior que o preço atual', 'warning');
        return false;
    }

    if (!dados.estoque || dados.estoque < 0) {
        mostrarNotificacao('Estoque deve ser maior ou igual a zero', 'warning');
        return false;
    }

    if (!dados.descricao || dados.descricao.length < 20) {
        mostrarNotificacao('Descrição deve ter pelo menos 20 caracteres', 'warning');
        return false;
    }

    return true;
}

function obterCategoriaId(slug) {
    const categorias = dataManager.getAllCategorias();
    const categoria = categorias.find(cat => cat.slug === slug);
    return categoria ? categoria.id : 1;
}

// Extensão do DataManager para anúncios
if (typeof dataManager !== 'undefined') {
    dataManager.adicionarProduto = function(produto) {
        this.data.produtos.push(produto);
        // Salvar no localStorage
        localStorage.setItem('tecnoplace_produtos', JSON.stringify(this.data.produtos));
    };

    dataManager.getProdutosByVendedor = function(vendedorId) {
        return this.data.produtos.filter(produto => produto.vendedorId === vendedorId);
    };

    dataManager.removerProduto = function(produtoId) {
        this.data.produtos = this.data.produtos.filter(produto => produto.id !== produtoId);
        localStorage.setItem('tecnoplace_produtos', JSON.stringify(this.data.produtos));
    };
}






