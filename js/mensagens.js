// Dados simulados de conversas e mensagens
let conversas = [
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
        texto: "Olá! eu sou o Felipe e gosto de Jogar Genshin Impact",
        hora: "14:25",
        enviada: false,
        lida: true
      },
      {
        id: 2,
        texto: "Slk nn compensa.",
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
    nome: "Deputada Nikole",
    avatar: "img/nikole.webp",
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
  div.className = `mensagem ${mensagem.enviada ? 'enviada' : 'recebida'}`;

  const statusIcon = mensagem.enviada ? 
    (mensagem.lida ? '<i class="fas fa-check-double status-lido"></i>' : '<i class="fas fa-check status-enviado"></i>') : '';

  div.innerHTML = `
    <img src="${mensagem.enviada ? 'img/eu mesmo.png' : conversaAtiva.avatar}" alt="Avatar" class="mensagem-avatar">
    <div class="mensagem-conteudo">
      <div class="mensagem-balao">${mensagem.texto}</div>
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

  // Simular resposta automática após 2 segundos
  setTimeout(() => {
    simularResposta();
  }, 2000);

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
