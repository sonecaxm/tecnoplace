// Variáveis globais para a página de produto
let produtoAtual = null;
let vendedorAtual = null;
let imagensAtual = [];
let imagemAtualIndex = 0;
let chatAberto = false;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    carregarProduto();
    inicializarEventos();
    carregarCarrinho();
});

// Carregar carrinho do localStorage
function carregarCarrinho() {
    try {
        const carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
        console.log('Carrinho carregado:', carrinho);
        
        // Atualizar contador do carrinho
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
            cartCount.textContent = totalItens;
        }
    } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
    }
}

// Carregar produto baseado no ID da URL
function carregarProduto() {
    console.log('Carregando produto...');
    
    const urlParams = new URLSearchParams(window.location.search);
    const produtoId = urlParams.get('id');
    
    console.log('ID do produto da URL:', produtoId);
    
    if (!produtoId) {
        console.error('Nenhum ID de produto encontrado na URL');
        // Se não há ID, redirecionar para home
        window.location.href = 'index.html';
        return;
    }
    
    // Verificar se dataManager está disponível
    if (typeof dataManager === 'undefined') {
        console.error('dataManager não está disponível');
        mostrarNotificacao('Erro ao carregar dados do produto', 'error');
        return;
    }
    
    console.log('dataManager disponível:', dataManager);
    console.log('Produtos disponíveis:', dataManager.data?.produtos?.length || 0);
    
    // Buscar produto no banco de dados
    produtoAtual = dataManager.getProdutoById(produtoId);
    
    console.log('Produto encontrado:', produtoAtual);
    
    if (!produtoAtual) {
        console.error('Produto não encontrado para ID:', produtoId);
        // Produto não encontrado
        mostrarNotificacao('Produto não encontrado', 'error');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
        return;
    }
    
    // Buscar vendedor - usar o vendedor do produto diretamente
    vendedorAtual = produtoAtual.vendedor || { 
        id: 1, 
        nome: 'Vendedor Padrão', 
        avaliacao: 4.5, 
        totalVendas: 100 
    };
    
    console.log('Vendedor encontrado:', vendedorAtual);
    
    // Carregar dados na página
    preencherDadosProduto();
    preencherDadosVendedor();
    configurarImagens();
    atualizarBreadcrumb();
}

// Preencher dados do produto na página
function preencherDadosProduto() {
    if (!produtoAtual) return;
    
    // Nome do produto
    document.getElementById('productName').textContent = produtoAtual.nome;
    
    // Preços
    document.getElementById('currentPrice').textContent = `R$ ${produtoAtual.preco.toFixed(2).replace('.', ',')}`;
    
    if (produtoAtual.precoAntigo && produtoAtual.precoAntigo > produtoAtual.preco) {
        document.getElementById('originalPrice').textContent = `R$ ${produtoAtual.precoAntigo.toFixed(2).replace('.', ',')}`;
        const desconto = Math.round(((produtoAtual.precoAntigo - produtoAtual.preco) / produtoAtual.precoAntigo) * 100);
        document.getElementById('discountBadge').textContent = `-${desconto}%`;
    } else {
        document.getElementById('originalPrice').style.display = 'none';
        document.getElementById('discountBadge').style.display = 'none';
    }
    
    // Descrição
    document.getElementById('productDescription').textContent = produtoAtual.descricao;
    
    // Avaliação
    const rating = produtoAtual.avaliacao || 4.5;
    const avaliacoes = produtoAtual.numeroAvaliacoes || 127;
    atualizarEstrelas('productRating', rating);
    document.getElementById('ratingText').textContent = `(${rating}) ${avaliacoes} avaliações`;
    
    // Especificações técnicas
    if (produtoAtual.especificacoes) {
        const specsList = document.getElementById('specsList');
        specsList.innerHTML = '';
        
        Object.entries(produtoAtual.especificacoes).forEach(([key, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-label">${key}:</span>
                <span class="spec-value">${value}</span>
            `;
            specsList.appendChild(specItem);
        });
    }
    
    // Configurar quantidade máxima
    const quantityInput = document.getElementById('quantity');
    quantityInput.max = produtoAtual.estoque || 10;
}

// Preencher dados do vendedor
function preencherDadosVendedor() {
    if (!vendedorAtual) return;
    
    document.getElementById('vendedorNome').textContent = vendedorAtual.nome;
    document.getElementById('chatVendedorNome').textContent = vendedorAtual.nome;
    
    // Avaliação do vendedor
    const rating = vendedorAtual.avaliacao || 4.9;
    const vendas = vendedorAtual.totalVendas || 1200;
    atualizarEstrelas('vendedorRating', rating);
    document.getElementById('vendedorRatingText').textContent = `(${rating}) ${vendas > 1000 ? (vendas/1000).toFixed(1) + 'k' : vendas} vendas`;
}

// Configurar imagens do produto
function configurarImagens() {
    if (!produtoAtual) return;
    
    // Preparar array de imagens
    imagensAtual = [];
    if (produtoAtual.imagem) {
        imagensAtual.push(produtoAtual.imagem);
    }
    if (produtoAtual.imagensAdicionais) {
        imagensAtual.push(...produtoAtual.imagensAdicionais);
    }
    
    // Se não há imagens, usar placeholder
    if (imagensAtual.length === 0) {
        imagensAtual = ['https://via.placeholder.com/500x500/333/fff?text=Sem+Imagem'];
    }
    
    // Configurar imagem principal
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = imagensAtual[0];
    mainImage.alt = produtoAtual.nome;
    
    // Configurar thumbnails
    const thumbnailContainer = document.getElementById('thumbnailImages');
    thumbnailContainer.innerHTML = '';
    
    imagensAtual.forEach((imagem, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.innerHTML = `<img src="${imagem}" alt="Imagem ${index + 1}">`;
        thumbnail.onclick = () => trocarImagem(index);
        thumbnailContainer.appendChild(thumbnail);
    });
    
    // Configurar zoom
    document.getElementById('imageZoom').onclick = () => abrirImagemModal();
}

// Trocar imagem principal
function trocarImagem(index) {
    if (index < 0 || index >= imagensAtual.length) return;
    
    imagemAtualIndex = index;
    document.getElementById('mainProductImage').src = imagensAtual[index];
    
    // Atualizar thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Atualizar breadcrumb
function atualizarBreadcrumb() {
    if (!produtoAtual) return;
    
    // Usar categoria do produto diretamente
    const categoriaNome = produtoAtual.categoria || 'Categoria';
    document.getElementById('breadcrumbCategory').textContent = categoriaNome;
    document.getElementById('breadcrumbProduct').textContent = produtoAtual.nome;
}

// Atualizar estrelas de avaliação
function atualizarEstrelas(elementId, rating) {
    const container = document.getElementById(elementId);
    if (!container) return;
    
    const stars = container.querySelectorAll('i');
    stars.forEach((star, index) => {
        if (index < Math.floor(rating)) {
            star.className = 'fas fa-star';
        } else if (index < rating) {
            star.className = 'fas fa-star-half-alt';
        } else {
            star.className = 'far fa-star';
        }
    });
}

// Controles de quantidade
function increaseQuantity() {
    const input = document.getElementById('quantity');
    const max = parseInt(input.max) || 10;
    const current = parseInt(input.value) || 1;
    if (current < max) {
        input.value = current + 1;
    }
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    const current = parseInt(input.value) || 1;
    if (current > 1) {
        input.value = current - 1;
    }
}

// Adicionar ao carrinho (específico da página de produto)
function adicionarAoCarrinhoProduto() {
    if (!produtoAtual) {
        console.error('Produto atual não está definido');
        return;
    }
    
    const quantidade = parseInt(document.getElementById('quantity').value) || 1;
    
    console.log('Adicionando produto ao carrinho:', produtoAtual.id, 'quantidade:', quantidade);
    
    // Usar a função do script principal
    if (typeof adicionarAoCarrinho === 'function') {
        adicionarAoCarrinho(produtoAtual.id, quantidade);
        mostrarNotificacao(`${produtoAtual.nome} adicionado ao carrinho!`, 'success');
    } else {
        // Fallback se a função não estiver disponível
        console.warn('Função adicionarAoCarrinho não está disponível');
        mostrarNotificacao('Produto adicionado ao carrinho!', 'success');
    }
}

// Comprar agora
function comprarAgora() {
    if (!produtoAtual) return;
    
    // Adicionar ao carrinho e ir para finalização
    adicionarAoCarrinhoProduto();
    
    // Simular redirecionamento para checkout
    setTimeout(() => {
        mostrarNotificacao('Redirecionando para finalização...', 'info');
        // Aqui seria o redirecionamento para página de checkout
    }, 1000);
}

// Toggle favorito
function toggleFavorite() {
    const btn = document.getElementById('favoriteBtn');
    const icon = btn.querySelector('i');
    
    if (icon.classList.contains('far')) {
        icon.className = 'fas fa-heart';
        btn.classList.add('active');
        mostrarNotificacao('Produto adicionado aos favoritos!', 'success');
    } else {
        icon.className = 'far fa-heart';
        btn.classList.remove('active');
        mostrarNotificacao('Produto removido dos favoritos!', 'info');
    }
}

// Ver perfil do vendedor
function verPerfilVendedor() {
    mostrarNotificacao('Funcionalidade em desenvolvimento', 'info');
}

// === FUNCIONALIDADES DO CHAT ===

// Abrir chat
function abrirChat() {
    const chatSection = document.getElementById('chatSection');
    chatSection.classList.add('active');
    chatAberto = true;
    
    // Carregar histórico do chat
    carregarHistoricoChat();
    
    // Focar no input de mensagem
    setTimeout(() => {
        document.getElementById('messageInput').focus();
    }, 300);
}

// Fechar chat
function fecharChat() {
    const chatSection = document.getElementById('chatSection');
    chatSection.classList.remove('active');
    chatAberto = false;
}

// Carregar histórico do chat
function carregarHistoricoChat() {
    if (!produtoAtual || !vendedorAtual) return;
    
    const chatKey = `chat_${vendedorAtual.id}_${produtoAtual.id}`;
    const historico = JSON.parse(localStorage.getItem(chatKey) || '[]');
    
    const messagesContainer = document.getElementById('chatMessages');
    
    // Limpar mensagens existentes (exceto a mensagem inicial)
    const initialMessages = messagesContainer.innerHTML;
    messagesContainer.innerHTML = initialMessages;
    
    // Adicionar mensagens do histórico
    historico.forEach(mensagem => {
        adicionarMensagemAoChat(mensagem.texto, mensagem.tipo, mensagem.timestamp, false);
    });
    
    // Scroll para o final
    scrollChatToBottom();
}

// Enviar mensagem
function enviarMensagem() {
    const input = document.getElementById('messageInput');
    const texto = input.value.trim();
    
    if (!texto) return;
    
    // Adicionar mensagem enviada
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    adicionarMensagemAoChat(texto, 'sent', timestamp);
    
    // Salvar no localStorage
    salvarMensagemNoHistorico(texto, 'sent', timestamp);
    
    // Limpar input
    input.value = '';
    
    // Simular resposta automática do vendedor
    setTimeout(() => {
        simularRespostaVendedor();
    }, 1000 + Math.random() * 2000);
}

// Adicionar mensagem ao chat
function adicionarMensagemAoChat(texto, tipo, timestamp, salvar = true) {
    const messagesContainer = document.getElementById('chatMessages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}`;
    
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${texto}</p>
            <span class="message-time">${timestamp}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    
    if (salvar) {
        salvarMensagemNoHistorico(texto, tipo, timestamp);
    }
    
    scrollChatToBottom();
}

// Salvar mensagem no histórico
function salvarMensagemNoHistorico(texto, tipo, timestamp) {
    if (!produtoAtual || !vendedorAtual) return;
    
    const chatKey = `chat_${vendedorAtual.id}_${produtoAtual.id}`;
    const historico = JSON.parse(localStorage.getItem(chatKey) || '[]');
    
    historico.push({
        texto: texto,
        tipo: tipo,
        timestamp: timestamp,
        data: new Date().toISOString()
    });
    
    // Manter apenas as últimas 100 mensagens
    if (historico.length > 100) {
        historico.splice(0, historico.length - 100);
    }
    
    localStorage.setItem(chatKey, JSON.stringify(historico));
}

// Simular resposta do vendedor
function simularRespostaVendedor() {
    const respostasAutomaticas = [
        'Obrigado pela mensagem! Como posso te ajudar?',
        'Esse produto está disponível em estoque!',
        'Posso te dar mais detalhes sobre as especificações.',
        'Temos desconto para pagamento à vista!',
        'Posso verificar outras opções similares para você.',
        'Esse é um dos nossos produtos mais vendidos!',
        'Posso te ajudar com a instalação também.',
        'Temos garantia estendida disponível.',
        'Posso fazer um preço especial para você!',
        'Esse produto tem excelente custo-benefício.',
        'olá tudo bem?.'
    ];
    
    const resposta = respostasAutomaticas[Math.floor(Math.random() * respostasAutomaticas.length)];
    const timestamp = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    adicionarMensagemAoChat(resposta, 'received', timestamp);
}

// Scroll do chat para o final
function scrollChatToBottom() {
    const messagesContainer = document.getElementById('chatMessages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle Enter key no input de mensagem
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        enviarMensagem();
    }
}

// Funcionalidades de anexos (placeholder)
function enviarFoto() {
    mostrarNotificacao('Funcionalidade de envio de foto em desenvolvimento', 'info');
}

function enviarArquivo() {
    mostrarNotificacao('Funcionalidade de envio de arquivo em desenvolvimento', 'info');
}

function enviarEmoji() {
    const input = document.getElementById('messageInput');
    const emojis = ['😊', '👍', '❤️', '😍', '🔥', '💯', '🎉', '✨'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    input.value += emoji;
    input.focus();
}

// === MODAL DE IMAGEM ===

// Abrir modal de imagem
function abrirImagemModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imagensAtual[imagemAtualIndex];
    modal.classList.add('active');
    
    // Prevenir scroll do body
    document.body.style.overflow = 'hidden';
}

// Fechar modal de imagem
function fecharImagemModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Navegação de imagens no modal
function imagemAnterior() {
    if (imagemAtualIndex > 0) {
        imagemAtualIndex--;
        document.getElementById('modalImage').src = imagensAtual[imagemAtualIndex];
        trocarImagem(imagemAtualIndex);
    }
}

function proximaImagem() {
    if (imagemAtualIndex < imagensAtual.length - 1) {
        imagemAtualIndex++;
        document.getElementById('modalImage').src = imagensAtual[imagemAtualIndex];
        trocarImagem(imagemAtualIndex);
    }
}

// Inicializar eventos
function inicializarEventos() {
    // Fechar modal ao clicar fora
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharImagemModal();
        }
    });
    
    // Fechar chat ao clicar fora (em mobile)
    document.addEventListener('click', function(e) {
        const chatSection = document.getElementById('chatSection');
        const chatBtn = document.querySelector('.btn-chat');
        
        if (chatAberto && !chatSection.contains(e.target) && !chatBtn.contains(e.target)) {
            if (window.innerWidth <= 768) {
                fecharChat();
            }
        }
    });
    
    // Navegação por teclado no modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('imageModal');
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                fecharImagemModal();
            } else if (e.key === 'ArrowLeft') {
                imagemAnterior();
            } else if (e.key === 'ArrowRight') {
                proximaImagem();
            }
        }
        
        // Fechar chat com Escape
        if (chatAberto && e.key === 'Escape') {
            fecharChat();
        }
    });
}

// Função para mostrar notificação (reutilizada do script principal)
function mostrarNotificacao(mensagem, tipo = 'info') {
    if (typeof window.mostrarNotificacao === 'function') {
        window.mostrarNotificacao(mensagem, tipo);
    } else {
        // Fallback simples
        console.log(`${tipo.toUpperCase()}: ${mensagem}`);
    }
}

