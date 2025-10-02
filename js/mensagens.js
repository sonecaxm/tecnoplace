// Dados simulados de conversas e mensagens
let conversas = [
  {
    id: 0,
    nome: "ChatGPT Assistant",
    avatar: "https://img.freepik.com/vetores-gratis/vetor-de-icone-de-cerebro-de-conexao-de-tecnologia-de-ia-no-conceito-roxo-de-transformacao-digital_53876-112219.jpg",
    ultimaMensagem: "Olá! Como posso ajudá-lo hoje?",
    hora: "15:00",
    notificacoes: 0,
    status: "online",
    isChatGPT: true,
    mensagens: [
      {
        id: 1,
        texto: "Olá! Sou o assistente virtual do Tecnoplace. Posso ajudá-lo com informações sobre produtos, suporte técnico, dúvidas sobre compras e muito mais. Como posso ajudá-lo hoje?",
        hora: "15:00",
        enviada: false,
        lida: true,
        isChatGPT: true
      }
    ]
  },
  {
    id: 1,
    nome: "Felipe Moura Souza",
    avatar: "img/Foto Felipe.jpg",
    ultimaMensagem: "O produto ainda está disponível?",
    hora: "14:30",
    notificacoes: 1,
    status: "offline",
    mensagens: [
      {
        id: 1,
        texto: "Olá! eu sou felipe tudo bem?",
        hora: "14:25",
        enviada: false,
        lida: true
      },
      {
        id: 2,
        texto: "olá Felipe, tudo sim.",
        hora: "14:28",
        enviada: true,
        lida: true
      },
      {
        id: 3,
        texto: "O produto ainda está disponível?",
        hora: "14:30",
        enviada: false,
        lida: false
      }
    ]
  },
  {
    id: 2,
    nome: "Gabriel Freire",
    avatar: "img/Foto Gabriel.jpg",
    ultimaMensagem: "Qual o valor do frete?",
    hora: "13:45",
    notificacoes: 1,
    status: "offline",
    mensagens: [
      {
        id: 1,
        texto: "Oi! Gostei muito da sua placa de vídeo RTX 3060. Qual o valor do frete para São Paulo?",
        hora: "13:40",
        enviada: false,
        lida: true
      },
      {
        id: 2,
        texto: "Olá! O frete para São Paulo fica R$ 25,00. Posso enviar hoje mesmo se você fechar o negócio.",
        hora: "13:42",
        enviada: true,
        lida: true
      },
      {
        id: 3,
        texto: "Qual o valor do frete?",
        hora: "13:45",
        enviada: false,
        lida: true
      }
    ]
  },
  {
    id: 3,
    nome: "Plínio Sanchez",
    avatar: "img/foto Plínio.jpg",
    ultimaMensagem: "Aceita pix?",
    hora: "12:20",
    notificacoes: 1,
    status: "online",
    mensagens: [
      {
        id: 1,
        texto: "Boa tarde! Vi seu anúncio do monitor. Aceita cartão de crédito?",
        hora: "12:15",
        enviada: false,
        lida: true
      },
      {
        id: 2,
        texto: "Infelizmente só aceito PIX ou dinheiro. Posso fazer um desconto de R$ 50,00 se pagar em dinheiro.",
        hora: "12:18",
        enviada: true,
        lida: true
      },
      {
        id: 3,
        texto: "Aceita cartão de crédito?",
        hora: "12:20",
        enviada: false,
        lida: false
      }
    ]
  },
  {
    id: 4,
    nome: "Danilo passos",
    avatar: "img/danilo.png",
    ultimaMensagem: "Pode fazer R$ 800,00?",
    hora: "11:30",
    notificacoes: 0,
    status: "offline",
    mensagens: [
      {
        id: 1,
        texto: "Oi! Gostei do seu teclado mecânico. Pode fazer R$ 800,00?",
        hora: "11:25",
        enviada: false,
        lida: true
      },
      {
        id: 2,
        texto: "Olá! O preço mínimo seria R$ 850,00. É um teclado praticamente novo, só usei por 2 meses.",
        hora: "11:28",
        enviada: true,
        lida: true
      },
      {
        id: 3,
        texto: "Pode fazer R$ 800,00?",
        hora: "11:30",
        enviada: false,
        lida: true
      }
    ]
  },
  {
    id: 5,
    nome: "Jonatas Siqueira da Cruz",
    avatar: "img/jonatas.jpg",
    ultimaMensagem: "Quando posso buscar?",
    hora: "10:15",
    notificacoes: 0,
    status: "online",
    mensagens: [
      {
        id: 1,
        texto: "Bom dia! Comprei sua memória RAM. Quando posso buscar?",
        hora: "10:10",
        enviada: false,
        lida: true
      },
      {
        id: 2,
        texto: "Bom dia! Pode buscar hoje à tarde, entre 14h e 18h. Estarei em casa.",
        hora: "10:12",
        enviada: true,
        lida: true
      },
      {
        id: 3,
        texto: "Quando posso buscar?",
        hora: "10:15",
        enviada: false,
        lida: true
      }
    ]
  }
];

let conversaAtiva = null;
let conversasFiltradas = [...conversas];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  carregarConversas();
  verificarResponsividade();
});

// Carregar lista de conversas
function carregarConversas() {
  const container = document.getElementById('conversasContainer');
  container.innerHTML = '';

  conversasFiltradas.forEach(conversa => {
    const conversaElement = criarElementoConversa(conversa);
    container.appendChild(conversaElement);
  });
}

// Criar elemento de conversa
function criarElementoConversa(conversa) {
  const div = document.createElement('div');
  div.className = 'conversa-item';
  div.onclick = () => selecionarConversa(conversa.id);

  const statusClass = conversa.status === 'online' ? 'status-online' : 'status-offline';
  
  div.innerHTML = `
    <img src="${conversa.avatar}" alt="${conversa.nome}" class="conversa-avatar">
    <div class="conversa-info">
      <div class="conversa-nome">${conversa.nome}</div>
      <div class="conversa-ultima-msg">${conversa.ultimaMensagem}</div>
    </div>
    <div class="conversa-meta">
      <div class="conversa-hora">${conversa.hora}</div>
      ${conversa.notificacoes > 0 ? `<div class="conversa-notificacao">${conversa.notificacoes}</div>` : ''}
    </div>
  `;

  return div;
}

// Selecionar conversa
function selecionarConversa(conversaId) {
  conversaAtiva = conversas.find(c => c.id === conversaId);
  
  // Atualizar lista de conversas
  document.querySelectorAll('.conversa-item').forEach(item => {
    item.classList.remove('active');
  });
  
  // Marcar conversa como ativa
  const conversaElement = document.querySelector(`[onclick="selecionarConversa(${conversaId})"]`);
  if (conversaElement) {
    conversaElement.classList.add('active');
  }

  // Limpar notificações
  conversaAtiva.notificacoes = 0; 
  
  // Mostrar chat
  mostrarChat();
  
  // Carregar mensagens
  carregarMensagens();
  
  // Atualizar header do chat
  atualizarHeaderChat();
  
  // Em dispositivos móveis, esconder lista de conversas
  if (window.innerWidth <= 768) {
    document.getElementById('conversasLista').classList.remove('mobile-visible');
    document.getElementById('chatArea').classList.remove('mobile-hidden');
  }
}

// Mostrar chat
function mostrarChat() {
  document.getElementById('chatVazio').style.display = 'none';
  document.getElementById('chatAtivo').style.display = 'flex';
}

// Carregar mensagens
function carregarMensagens() {
  const container = document.getElementById('mensagensArea');
  container.innerHTML = '';

  if (!conversaAtiva) return;

  conversaAtiva.mensagens.forEach(mensagem => {
    const mensagemElement = criarElementoMensagem(mensagem);
    container.appendChild(mensagemElement);
  });

  // Rolar para a última mensagem
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 100);
}

// Criar elemento de mensagem
function criarElementoMensagem(mensagem) {
  const div = document.createElement('div');
  const isChatGPT = mensagem.isChatGPT || (conversaAtiva && conversaAtiva.isChatGPT && !mensagem.enviada);
  
  div.className = `mensagem ${mensagem.enviada ? 'enviada' : 'recebida'} ${isChatGPT ? 'chatgpt-mensagem' : ''}`;

  const statusIcon = mensagem.enviada ? 
    (mensagem.lida ? '<i class="fas fa-check-double status-lido"></i>' : '<i class="fas fa-check status-enviado"></i>') : '';

  const avatarSrc = mensagem.enviada ? 'img/eu mesmo.png' : (conversaAtiva ? conversaAtiva.avatar : '');
  const nomeUsuario = isChatGPT ? 'ChatGPT' : '';

  div.innerHTML = `
    <img src="${avatarSrc}" alt="Avatar" class="mensagem-avatar">
    <div class="mensagem-conteudo">
      ${isChatGPT ? `<div class="mensagem-nome">${nomeUsuario}</div>` : ''}
      <div class="mensagem-balao ${isChatGPT ? 'chatgpt-balao' : ''}">${mensagem.texto}</div>
      <div class="mensagem-info">
        <span class="mensagem-hora">${mensagem.hora}</span>
        ${statusIcon}
      </div>
    </div>
  `;

  return div;
}

// Atualizar header do chat
function atualizarHeaderChat() {
  if (!conversaAtiva) return;

  document.getElementById('chatAvatar').src = conversaAtiva.avatar;
  document.getElementById('chatNome').textContent = conversaAtiva.nome;
  document.getElementById('chatStatus').textContent = conversaAtiva.status === 'online' ? 'Online' : 'Offline';
}

// Enviar mensagem
function enviarMensagem() {
  const input = document.getElementById('mensagemInput');
  const texto = input.value.trim();

  if (!texto || !conversaAtiva) return;

  // Criar nova mensagem
  const novaMensagem = {
    id: Date.now(),
    texto: texto,
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    enviada: true,
    lida: false
  };

  // Adicionar à conversa ativa
  conversaAtiva.mensagens.push(novaMensagem);
  conversaAtiva.ultimaMensagem = texto;
  conversaAtiva.hora = novaMensagem.hora;

  // Adicionar ao chat
  const mensagemElement = criarElementoMensagem(novaMensagem);
  document.getElementById('mensagensArea').appendChild(mensagemElement);

  // Limpar input
  input.value = '';
  autoResize(input);

  // Rolar para a última mensagem
  setTimeout(() => {
    document.getElementById('mensagensArea').scrollTop = document.getElementById('mensagensArea').scrollHeight;
  }, 100);

  // Verificar se é conversa com ChatGPT
  if (conversaAtiva.isChatGPT) {
    // Mostrar indicador de digitação
    mostrarIndicadorDigitacao();
    
    // Chamar ChatGPT
    setTimeout(() => {
      chamarChatGPT(texto);
    }, 1500);
  } else {
    // Simular resposta automática após 2 segundos para conversas normais
    setTimeout(() => {
      simularResposta();
    }, 2000);
  }

  // Atualizar lista de conversas
  carregarConversas();
}

// Simular resposta automática
function simularResposta() {
  if (!conversaAtiva) return;

  const respostas = [
    "Entendi!",
    "Vou pensar sobre isso.",
    "Obrigado pela mensagem!",
    "Vou verificar e te respondo.",
    "Perfeito!",
    "Concordo com você.",
    "Vou analisar essa proposta.",
    "Muito bem!",
    "Interessante!",
    "Vou considerar isso."
  ];

  const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];

  const novaMensagem = {
    id: Date.now(),
    texto: respostaAleatoria,
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    enviada: false,
    lida: true
  };

  // Adicionar à conversa ativa
  conversaAtiva.mensagens.push(novaMensagem);
  conversaAtiva.ultimaMensagem = respostaAleatoria;
  conversaAtiva.hora = novaMensagem.hora;

  // Adicionar ao chat
  const mensagemElement = criarElementoMensagem(novaMensagem);
  document.getElementById('mensagensArea').appendChild(mensagemElement);

  // Rolar para a última mensagem
  setTimeout(() => {
    document.getElementById('mensagensArea').scrollTop = document.getElementById('mensagensArea').scrollHeight;
  }, 100);

  // Atualizar lista de conversas
  carregarConversas();
}

// Filtrar conversas
function filtrarConversas() {
  const termo = document.querySelector('.search-conversas').value.toLowerCase();
  
  conversasFiltradas = conversas.filter(conversa => 
    conversa.nome.toLowerCase().includes(termo) ||
    conversa.ultimaMensagem.toLowerCase().includes(termo)
  );

  carregarConversas();
}

// Auto-resize do textarea
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 100) + 'px';
}

// Handle key press
function handleKeyPress(event) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    enviarMensagem();
  }
}

// Mostrar conversas (mobile)
function mostrarConversas() {
  document.getElementById('conversasLista').classList.add('mobile-visible');
  document.getElementById('chatArea').classList.add('mobile-hidden');
}

// Verificar responsividade
function verificarResponsividade() {
  if (window.innerWidth <= 768) {
    document.getElementById('conversasLista').classList.add('mobile-visible');
    document.getElementById('chatArea').classList.add('mobile-hidden');
  }
}

// Funções de ação do chat
function fazerLigacao() {
  alert('Iniciando chamada de voz...');
}

function fazerVideoChamada() {
  alert('Iniciando chamada de vídeo...');
}

function mostrarOpcoes() {
  alert('Opções do chat:\n- Silenciar notificações\n- Bloquear usuário\n- Denunciar\n- Ver perfil');
}

function abrirAnexos() {
  alert('Funcionalidade de anexos em desenvolvimento...');
}

// Atualizar status de leitura
function marcarComoLida(conversaId) {
  const conversa = conversas.find(c => c.id === conversaId);
  if (conversa) {
    conversa.notificacoes = 0;
    conversa.mensagens.forEach(m => {
      if (!m.enviada) m.lida = true;
    });
    carregarConversas();
  }
}

// Adicionar nova conversa (para demonstração)
function adicionarNovaConversa() {
  const novaConversa = {
    id: Date.now(),
    nome: "Novo Usuário",
    avatar: "img/miguel.png",
    ultimaMensagem: "Olá! Gostei do seu produto.",
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    notificacoes: 1,
    status: "online",
    mensagens: [
      {
        id: 1,
        texto: "Olá! Gostei do seu produto.",
        hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        enviada: false,
        lida: false
      }
    ]
  };

  conversas.unshift(novaConversa);
  conversasFiltradas = [...conversas];
  carregarConversas();
}

// Simular notificações em tempo real
setInterval(() => {
  if (Math.random() < 0.1 && conversas.length > 0) { // 10% de chance a cada 5 segundos
    const conversaAleatoria = conversas[Math.floor(Math.random() * conversas.length)];
    if (conversaAleatoria !== conversaAtiva) {
      conversaAleatoria.notificacoes++;
      carregarConversas();
    }
  }
}, 5000);

// Configuração da API do ChatGPT
const CHATGPT_CONFIG = {
  apiKey: localStorage.getItem('chatgpt_api_key') || '',
  model: 'gpt-3.5-turbo',
  maxTokens: 500,
  temperature: 0.7
};

// Mostrar indicador de digitação do ChatGPT
function mostrarIndicadorDigitacao() {
  const container = document.getElementById('mensagensArea');
  const indicador = document.createElement('div');
  indicador.className = 'mensagem recebida chatgpt-digitando';
  indicador.id = 'chatgpt-digitando';
  
  indicador.innerHTML = `
    <img src="${conversaAtiva.avatar}" alt="ChatGPT" class="mensagem-avatar">
    <div class="mensagem-conteudo">
      <div class="mensagem-balao chatgpt-digitando-balao">
        <div class="digitando-pontos">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  `;
  
  container.appendChild(indicador);
  
  // Rolar para o indicador
  setTimeout(() => {
    container.scrollTop = container.scrollHeight;
  }, 100);
}

// Remover indicador de digitação
function removerIndicadorDigitacao() {
  const indicador = document.getElementById('chatgpt-digitando');
  if (indicador) {
    indicador.remove();
  }
}

// Chamar API do ChatGPT
async function chamarChatGPT(mensagem) {
  try {
    // Verificar se a API key está configurada
    if (!CHATGPT_CONFIG.apiKey) {
      mostrarConfiguracaoAPI();
      removerIndicadorDigitacao();
      return;
    }

    // Preparar contexto para o ChatGPT
    const contexto = `Você é um assistente virtual do Tecnoplace, um marketplace de peças de computador e tecnologia. 
    Ajude os usuários com informações sobre produtos, suporte técnico, dúvidas sobre compras e recomendações.
    Seja prestativo, amigável e profissional. Responda sempre em português brasileiro.
    
    Mensagem do usuário: ${mensagem}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CHATGPT_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: CHATGPT_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente virtual do Tecnoplace, um marketplace de peças de computador e tecnologia.'
          },
          {
            role: 'user',
            content: mensagem
          }
        ],
        max_tokens: CHATGPT_CONFIG.maxTokens,
        temperature: CHATGPT_CONFIG.temperature
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }

    const data = await response.json();
    const resposta = data.choices[0].message.content;

    // Remover indicador de digitação
    removerIndicadorDigitacao();

    // Adicionar resposta do ChatGPT
    adicionarRespostaChatGPT(resposta);

  } catch (error) {
    console.error('Erro ao chamar ChatGPT:', error);
    
    // Remover indicador de digitação
    removerIndicadorDigitacao();
    
    // Mostrar mensagem de erro
    adicionarRespostaChatGPT('Desculpe, ocorreu um erro ao processar sua mensagem. Verifique sua conexão com a internet e tente novamente.');
  }
}

// Adicionar resposta do ChatGPT
function adicionarRespostaChatGPT(resposta) {
  if (!conversaAtiva) return;

  const novaMensagem = {
    id: Date.now(),
    texto: resposta,
    hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    enviada: false,
    lida: true,
    isChatGPT: true
  };

  // Adicionar à conversa ativa
  conversaAtiva.mensagens.push(novaMensagem);
  conversaAtiva.ultimaMensagem = resposta;
  conversaAtiva.hora = novaMensagem.hora;

  // Adicionar ao chat
  const mensagemElement = criarElementoMensagem(novaMensagem);
  document.getElementById('mensagensArea').appendChild(mensagemElement);

  // Rolar para a última mensagem
  setTimeout(() => {
    document.getElementById('mensagensArea').scrollTop = document.getElementById('mensagensArea').scrollHeight;
  }, 100);

  // Atualizar lista de conversas
  carregarConversas();
}

// Mostrar configuração da API (função legada)
function mostrarConfiguracaoAPI() {
  abrirConfiguracaoAPI();
}

// Abrir modal de configuração
function abrirConfiguracaoAPI() {
  const modal = document.getElementById('configModal');
  const input = document.getElementById('apiKeyInput');
  
  // Carregar API key existente se houver
  if (CHATGPT_CONFIG.apiKey) {
    input.value = CHATGPT_CONFIG.apiKey;
  }
  
  modal.classList.add('active');
  input.focus();
}

// Fechar modal de configuração
function fecharConfiguracaoAPI() {
  const modal = document.getElementById('configModal');
  modal.classList.remove('active');
}

// Salvar configuração da API
function salvarConfiguracaoAPI() {
  const input = document.getElementById('apiKeyInput');
  const apiKey = input.value.trim();
  
  if (!apiKey) {
    alert('Por favor, insira uma API Key válida.');
    return;
  }
  
  // Validar formato básico da API key
  if (!apiKey.startsWith('sk-')) {
    alert('A API Key deve começar com "sk-". Verifique se você copiou a chave corretamente.');
    return;
  }
  
  CHATGPT_CONFIG.apiKey = apiKey;
  localStorage.setItem('chatgpt_api_key', apiKey);
  
  fecharConfiguracaoAPI();
  
  // Mostrar confirmação
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #4A00E0, #8B5CF6);
    color: white;
    padding: 15px 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(74, 0, 224, 0.3);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
  `;
  toast.innerHTML = '✅ API Key salva com sucesso!';
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 3000);
  
  // Tentar novamente a chamada se houver mensagem pendente
  if (conversaAtiva && conversaAtiva.isChatGPT) {
    const ultimaMensagem = conversaAtiva.mensagens[conversaAtiva.mensagens.length - 1];
    if (ultimaMensagem && ultimaMensagem.enviada) {
      chamarChatGPT(ultimaMensagem.texto);
    }
  }
}

// Fechar modal ao clicar fora dele
document.addEventListener('click', function(event) {
  const modal = document.getElementById('configModal');
  const modalContent = document.querySelector('.config-modal-content');
  
  if (event.target === modal && modal.classList.contains('active')) {
    fecharConfiguracaoAPI();
  }
});

// Fechar modal com ESC
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const modal = document.getElementById('configModal');
    if (modal.classList.contains('active')) {
      fecharConfiguracaoAPI();
    }
  }
});

// Adicionar animação CSS para o toast
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
document.head.appendChild(style);

// Exportar funções para uso global
window.selecionarConversa = selecionarConversa;
window.enviarMensagem = enviarMensagem;
window.filtrarConversas = filtrarConversas;
window.autoResize = autoResize;
window.handleKeyPress = handleKeyPress;
window.mostrarConversas = mostrarConversas;
window.fazerLigacao = fazerLigacao;
window.fazerVideoChamada = fazerVideoChamada;
window.mostrarOpcoes = mostrarOpcoes;
window.abrirAnexos = abrirAnexos;
window.mostrarConfiguracaoAPI = mostrarConfiguracaoAPI;
window.abrirConfiguracaoAPI = abrirConfiguracaoAPI;
window.fecharConfiguracaoAPI = fecharConfiguracaoAPI;
window.salvarConfiguracaoAPI = salvarConfiguracaoAPI;
