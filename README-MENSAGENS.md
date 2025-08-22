# 📱 Sistema de Mensagens - Tecnoplace

## Visão Geral

O sistema de mensagens da Tecnoplace foi desenvolvido inspirado nas melhores práticas do WhatsApp, Facebook Messenger e Instagram Direct, oferecendo uma experiência de comunicação moderna e intuitiva entre vendedores e compradores.

## 🎨 Características do Design

### Interface Moderna
- **Design responsivo** que se adapta a diferentes tamanhos de tela
- **Tema escuro** com gradientes roxos (#4A00E0, #8B5CF6) mantendo a identidade visual da marca
- **Animações suaves** e transições elegantes
- **Backdrop blur** e efeitos de transparência para um visual premium

### Layout Inspirado em Apps Populares
- **Lista de conversas** à esquerda (desktop) ou em overlay (mobile)
- **Área de chat** principal com header, mensagens e input
- **Indicadores visuais** de status (online/offline, lido/enviado)
- **Notificações** com contadores e animações

## 🚀 Funcionalidades Principais

### 1. Lista de Conversas
- **Busca em tempo real** por nome ou última mensagem
- **Indicadores de status** (online/offline)
- **Contadores de notificação** com animação pulse
- **Última mensagem** e horário
- **Avatares** dos usuários com bordas personalizadas

### 2. Sistema de Chat
- **Mensagens em balões** com design diferenciado para enviadas/recebidas
- **Indicadores de status** (✓ enviado, ✓✓ lido)
- **Timestamps** em cada mensagem
- **Auto-scroll** para a última mensagem
- **Responsividade** para mensagens longas

### 3. Input de Mensagem
- **Auto-resize** do textarea conforme o conteúdo
- **Envio por Enter** (Shift+Enter para nova linha)
- **Botão de anexos** (preparado para futuras implementações)
- **Botão de envio** com animação hover

### 4. Funcionalidades Adicionais
- **Chamadas de voz** e vídeo (simuladas)
- **Menu de opções** do chat
- **Navegação mobile** otimizada
- **Simulação de respostas** automáticas

## 📱 Responsividade

### Desktop (>768px)
- Layout em grid com lista de conversas fixa à esquerda
- Chat ocupa o restante do espaço
- Todas as funcionalidades visíveis simultaneamente

### Mobile (≤768px)
- Layout adaptativo com overlay para lista de conversas
- Botão de voltar para navegar entre conversas e chat
- Otimização de espaçamentos e tamanhos
- Gestos touch-friendly

## 🎯 Experiência do Usuário

### Estados Visuais
- **Hover effects** em todos os elementos interativos
- **Estados ativos** para conversas selecionadas
- **Loading states** preparados para futuras implementações
- **Estados vazios** com ilustrações e mensagens informativas

### Acessibilidade
- **Navegação por teclado** suportada
- **Focus indicators** visíveis
- **Contraste adequado** para leitura
- **Textos alternativos** em imagens

### Performance
- **Animações otimizadas** com CSS transforms
- **Scrollbars personalizadas** para melhor UX
- **Lazy loading** preparado para mensagens
- **Debounce** na busca de conversas

## 🔧 Estrutura de Arquivos

```
mensagens.html          # Página principal
css/mensagens.css       # Estilos específicos
js/mensagens.js         # Lógica e funcionalidades
```

## 📊 Dados Simulados

O sistema inclui dados de exemplo com:
- **5 conversas** com diferentes usuários
- **Mensagens variadas** simulando negociações reais
- **Status online/offline** dinâmicos
- **Notificações** que aparecem aleatoriamente

## 🎨 Paleta de Cores

```css
/* Cores principais */
--primary: #4A00E0;
--secondary: #8B5CF6;
--success: #10B981;
--background: rgba(15, 15, 15, 0.9);
--surface: rgba(26, 26, 26, 0.8);
--text-primary: #ffffff;
--text-secondary: rgba(255, 255, 255, 0.7);
```

## 🔮 Funcionalidades Futuras

### Planejadas
- **Upload de arquivos** e imagens
- **Emojis** e reações
- **Mensagens de voz**
- **Notificações push**
- **Histórico de conversas**
- **Arquivamento** de conversas

### Integração
- **WebSocket** para mensagens em tempo real
- **API REST** para persistência
- **Sistema de usuários** completo
- **Notificações** por email/SMS

## 🛠️ Como Usar

1. **Acesse** a página `mensagens.html`
2. **Selecione** uma conversa da lista
3. **Digite** sua mensagem no campo de texto
4. **Pressione Enter** ou clique no botão de envio
5. **Aguarde** a resposta automática (simulada)

## 📱 Compatibilidade

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers

## 🎯 Objetivos Alcançados

- ✅ Interface moderna e responsiva
- ✅ Experiência similar ao WhatsApp/Facebook
- ✅ Animações suaves e profissionais
- ✅ Funcionalidades básicas de chat
- ✅ Design consistente com a marca
- ✅ Código limpo e organizado
- ✅ Documentação completa

---

**Desenvolvido para a Tecnoplace** - Sistema de mensagens moderno e intuitivo para comunicação entre vendedores e compradores.
