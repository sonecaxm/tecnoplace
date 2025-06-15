document.addEventListener('DOMContentLoaded', function() {
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.btn-send');
    const chatMessages = document.querySelector('.chat-messages');
    const conversationItems = document.querySelectorAll('.conversation-item');
    const searchInput = document.querySelector('.search-conversations input');

    // Função para adicionar nova mensagem
    function addMessage(text, isSent = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isSent ? 'sent' : 'received'}`;
        
        const now = new Date();
        const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Enviar mensagem
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatInput.value = '';
            
            // Simular resposta após 1 segundo
            setTimeout(() => {
                addMessage('Mensagem recebida! Em breve responderei.', false);
            }, 1000);
        }
    }

    // Event listeners para envio de mensagem
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Trocar de conversa
    conversationItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remover classe active de todas as conversas
            conversationItems.forEach(i => i.classList.remove('active'));
            
            // Adicionar classe active na conversa clicada
            this.classList.add('active');
            
            // Atualizar informações do chat
            const userName = this.querySelector('h3').textContent;
            const userAvatar = this.querySelector('img').src;
            const status = this.querySelector('.status').classList.contains('online') ? 'Online' : 'Offline';
            
            // Atualizar cabeçalho do chat
            document.querySelector('.chat-user-info img').src = userAvatar;
            document.querySelector('.chat-user-info h3').textContent = userName;
            document.querySelector('.status-text').textContent = status;
            
            // Limpar mensagens e adicionar data
            chatMessages.innerHTML = `
                <div class="message-date">Hoje, ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</div>
            `;
        });
    });

    // Buscar conversas
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        conversationItems.forEach(item => {
            const userName = item.querySelector('h3').textContent.toLowerCase();
            const lastMessage = item.querySelector('.last-message').textContent.toLowerCase();
            
            if (userName.includes(searchTerm) || lastMessage.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Upload de arquivo
    const fileButton = document.querySelector('.chat-input .btn-icon:first-child');
    fileButton.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    addMessage(`<img src="${e.target.result}" alt="Imagem enviada" style="max-width: 200px; border-radius: 5px;">`, true);
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Emojis (simulado)
    const emojiButton = document.querySelector('.chat-input .btn-icon:nth-child(3)');
    emojiButton.addEventListener('click', function() {
        alert('Seletor de emojis será implementado em breve!');
    });

    // Ações do cabeçalho
    const actionButtons = document.querySelectorAll('.chat-actions .btn-icon');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.querySelector('i').className;
            if (action.includes('phone')) {
                alert('Iniciando chamada de voz...');
            } else if (action.includes('video')) {
                alert('Iniciando chamada de vídeo...');
            } else if (action.includes('info')) {
                alert('Informações do usuário serão exibidas aqui.');
            }
        });
    });
}); 