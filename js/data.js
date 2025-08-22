const DATABASE = {
    // Categorias de produtos
    categorias: [
      {
        id: 1,
        nome: "Processadores",
        slug: "processadores",
        icone: "fas fa-microchip",
        descricao: "AMD, Intel e mais",
        totalItens: 324
      },
      {
        id: 2,
        nome: "Memória RAM",
        slug: "memoria",
        icone: "fas fa-memory",
        descricao: "DDR4, DDR5 e mais",
        totalItens: 156
      },
      {
        id: 3,
        nome: "Armazenamento",
        slug: "armazenamento",
        icone: "fas fa-hdd",
        descricao: "SSDs e HDs",
        totalItens: 278
      },
      {
        id: 4,
        nome: "Placas de Vídeo",
        slug: "placas-video",
        icone: "fas fa-desktop",
        descricao: "NVIDIA, AMD e mais",
        totalItens: 198
      },
      {
        id: 5,
        nome: "Monitores",
        slug: "monitores",
        icone: "fas fa-tv",
        descricao: "Gaming, profissionais",
        totalItens: 89
      },
      {
        id: 6,
        nome: "Periféricos",
        slug: "perifericos",
        icone: "fas fa-keyboard",
        descricao: "Teclados, mouses, headsets",
        totalItens: 145
      }
    ],
  
    // Produtos
    produtos: [
      {
        id: 1,
        nome: "teclado mecanico da samsung",
        categoria: "periféricos",
        categoriaId: 6,
        preco: 899.90,
        precoAntigo: 1299.90,
        imagem: "img/chique.jpg",
        tag: "usado",
        vendedor: {
          nome: "Jonatas Siqueira",
          foto: "img/jonatas.jpg",
          rating: 4.5,
          avaliacoes: 100
        },
        descricao: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo est eu est vestibulum viverra. Mauris nulla elit, aliquam vitae.",
        especificacoes: {
          "Tamanho": "14cm de largura",
          "Resolução": "2560x1440 (QHD)",
          "Taxa de Atualização": "144Hz",
          "Tempo de Resposta": "1ms",
          "Conectividade": "HDMI, DisplayPort, USB"
        },
        estoque: 15,
        promocao: true,
        destaque: true
      },
      {
        id: 2,
        nome: "Teclado Mecânico RGB Gamer",
        categoria: "perifericos",
        categoriaId: 6,
        preco: 299.90,
        precoAntigo: 399.90,
        imagem: "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Teclado+RGB",
        tag: "Promoção",
        vendedor: {
          nome: "Gabriel Freire",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=GF",
          rating: 4.8,
          avaliacoes: 89
        },
        descricao: "Teclado mecânico com switches blue, iluminação RGB personalizável e teclas anti-ghosting.",
        especificacoes: {
          "Tipo de Switch": "Blue Mechanical",
          "Iluminação": "RGB 16.7M cores",
          "Layout": "ABNT2",
          "Conectividade": "USB 2.0",
          "Recursos": "Anti-ghosting, N-Key Rollover"
        },
        estoque: 23,
        promocao: true,
        destaque: true
      },
      {
        id: 3,
        nome: "Mouse Gamer Profissional 12000 DPI",
        categoria: "perifericos",
        categoriaId: 6,
        preco: 199.90,
        precoAntigo: 249.90,
        imagem: "https://via.placeholder.com/300x300/06B6D4/FFFFFF?text=Mouse+Gamer",
        tag: "Mais Vendido",
        vendedor: {
          nome: "Felipe Moura Souza",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=FM",
          rating: 4.7,
          avaliacoes: 156
        },
        descricao: "Mouse gamer com sensor óptico de alta precisão, 12000 DPI ajustável e 7 botões programáveis.",
        especificacoes: {
          "DPI": "12000 ajustável",
          "Sensor": "Óptico de alta precisão",
          "Botões": "7 programáveis",
          "Iluminação": "RGB",
          "Conectividade": "USB 2.0"
        },
        estoque: 31,
        promocao: true,
        destaque: true
      },
      {
        id: 4,
        nome: "Headset Gamer 7.1 Surround",
        categoria: "perifericos",
        categoriaId: 6,
        preco: 159.90,
        precoAntigo: 229.90,
        imagem: "https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Headset+7.1",
        tag: "Oferta",
        vendedor: {
          nome: "Plínio Sanchez Mendes",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=PM",
          rating: 4.3,
          avaliacoes: 78
        },
        descricao: "Headset gamer com som surround 7.1, microfone removível e almofadas confortáveis.",
        especificacoes: {
          "Som": "7.1 Surround Virtual",
          "Microfone": "Removível com cancelamento de ruído",
          "Conectividade": "USB + P2",
          "Compatibilidade": "PC, PS4, Xbox, Mobile",
          "Iluminação": "LED RGB"
        },
        estoque: 18,
        promocao: true,
        destaque: true
      },
      {
        id: 5,
        nome: "Processador AMD Ryzen 7 5800X",
        categoria: "processadores",
        categoriaId: 1,
        preco: 1299.90,
        precoAntigo: 1599.90,
        imagem: "https://via.placeholder.com/300x300/ED1C24/FFFFFF?text=AMD+Ryzen+7",
        tag: "Novo",
        vendedor: {
          nome: "TechStore Pro",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=TS",
          rating: 4.9,
          avaliacoes: 234
        },
        descricao: "Processador AMD Ryzen 7 5800X com 8 núcleos, 16 threads e arquitetura Zen 3.",
        especificacoes: {
          "Núcleos": "8",
          "Threads": "16",
          "Clock Base": "3.8 GHz",
          "Clock Boost": "4.7 GHz",
          "Socket": "AM4",
          "TDP": "105W"
        },
        estoque: 8,
        promocao: false,
        destaque: true
      },
      {
        id: 6,
        nome: "Memória RAM Corsair 16GB DDR4 3200MHz",
        categoria: "memoria",
        categoriaId: 2,
        preco: 399.90,
        precoAntigo: 499.90,
        imagem: "https://via.placeholder.com/300x300/000000/FFFFFF?text=Corsair+RAM",
        tag: "Promoção",
        vendedor: {
          nome: "Hardware Center",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=HC",
          rating: 4.6,
          avaliacoes: 167
        },
        descricao: "Kit de memória RAM Corsair Vengeance LPX 16GB (2x8GB) DDR4 3200MHz.",
        especificacoes: {
          "Capacidade": "16GB (2x8GB)",
          "Tipo": "DDR4",
          "Frequência": "3200MHz",
          "Latência": "CL16",
          "Voltagem": "1.35V"
        },
        estoque: 25,
        promocao: true,
        destaque: false
      },
      {
        id: 7,
        nome: "SSD NVMe 1TB Samsung 980 PRO",
        categoria: "armazenamento",
        categoriaId: 3,
        preco: 599.90,
        precoAntigo: 799.90,
        imagem: "https://via.placeholder.com/300x300/1F2937/FFFFFF?text=Samsung+SSD",
        tag: "Oferta",
        vendedor: {
          nome: "Digital Parts",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=DP",
          rating: 4.8,
          avaliacoes: 198
        },
        descricao: "SSD NVMe Samsung 980 PRO de 1TB com velocidades de leitura até 7000 MB/s.",
        especificacoes: {
          "Capacidade": "1TB",
          "Interface": "PCIe 4.0 x4, NVMe 1.3c",
          "Leitura": "Até 7,000 MB/s",
          "Escrita": "Até 5,000 MB/s",
          "Formato": "M.2 2280"
        },
        estoque: 12,
        promocao: true,
        destaque: false
      },
      {
        id: 8,
        nome: "Placa de Vídeo RTX 4060 Ti 16GB",
        categoria: "placas-video",
        categoriaId: 4,
        preco: 2899.90,
        precoAntigo: 3299.90,
        imagem: "https://via.placeholder.com/300x300/76B900/FFFFFF?text=RTX+4060+Ti",
        tag: "Mais Vendido",
        vendedor: {
          nome: "Gaming Store",
          foto: "https://via.placeholder.com/50x50/333/FFF?text=GS",
          rating: 4.7,
          avaliacoes: 145
        },
        descricao: "Placa de vídeo NVIDIA GeForce RTX 4060 Ti com 16GB GDDR6 e Ray Tracing.",
        especificacoes: {
          "GPU": "NVIDIA GeForce RTX 4060 Ti",
          "Memória": "16GB GDDR6",
          "Interface": "PCIe 4.0 x16",
          "Saídas": "3x DisplayPort, 1x HDMI",
          "Tecnologias": "Ray Tracing, DLSS 3"
        },
        estoque: 6,
        promocao: true,
        destaque: true
      }
    ],
  
    // Usuários (para simulação)
    usuarios: [
      {
        id: 1,
        nome: "João Silva",
        email: "joao@email.com",
        senha: "123456", // Em produção, seria hash
        carrinho: [],
        pedidos: [],
        endereco: {
          rua: "Rua das Flores, 123",
          cidade: "São Paulo",
          cep: "01234-567",
          estado: "SP"
        }
      }
    ],
  
    // Configurações do site
    configuracoes: {
      nome: "Tecnoplace",
      descricao: "Marketplace especializado em peças de computador e tecnologia",
      email: "contato@tecnoplace.com",
      telefone: "(11) 9999-9999",
      freteGratis: 200.00,
      taxaEntrega: 15.90
    }
  };
  
  // Funções para gerenciar os dados
  class DataManager {
    constructor() {
      this.data = DATABASE;
      this.carrinho = this.getCarrinhoFromStorage();
      this.usuarioLogado = this.getUsuarioFromStorage();
    }
  
    // Produtos
    getAllProdutos() {
      return this.data.produtos;
    }
  
    getProdutoById(id) {
      return this.data.produtos.find(produto => produto.id === parseInt(id));
    }
  
    getProdutosByCategoria(categoria) {
      return this.data.produtos.filter(produto => produto.categoria === categoria);
    }
  
    getProdutosPromocao() {
      return this.data.produtos.filter(produto => produto.promocao);
    }
  
    getProdutosDestaque() {
      return this.data.produtos.filter(produto => produto.destaque);
    }
  
    buscarProdutos(termo) {
      const termoBusca = termo.toLowerCase();
      return this.data.produtos.filter(produto => 
        produto.nome.toLowerCase().includes(termoBusca) ||
        produto.categoria.toLowerCase().includes(termoBusca) ||
        produto.vendedor.nome.toLowerCase().includes(termoBusca)
      );
    }
  
    // Categorias
    getAllCategorias() {
      return this.data.categorias;
    }
  
    getCategoriaBySlug(slug) {
      return this.data.categorias.find(categoria => categoria.slug === slug);
    }
  
    // Carrinho
    getCarrinhoFromStorage() {
      const carrinho = localStorage.getItem('tecnoplace_carrinho');
      return carrinho ? JSON.parse(carrinho) : [];
    }
  
    saveCarrinhoToStorage() {
      localStorage.setItem('tecnoplace_carrinho', JSON.stringify(this.carrinho));
    }
  
    adicionarAoCarrinho(produtoId, quantidade = 1) {
      const produto = this.getProdutoById(produtoId);
      if (!produto) return false;
  
      const itemExistente = this.carrinho.find(item => item.produtoId === produtoId);
      
      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        this.carrinho.push({
          produtoId: produtoId,
          produto: produto,
          quantidade: quantidade,
          precoUnitario: produto.preco
        });
      }
      
      this.saveCarrinhoToStorage();
      return true;
    }
  
    removerDoCarrinho(produtoId) {
      this.carrinho = this.carrinho.filter(item => item.produtoId !== produtoId);
      this.saveCarrinhoToStorage();
    }
  
    atualizarQuantidadeCarrinho(produtoId, quantidade) {
      const item = this.carrinho.find(item => item.produtoId === produtoId);
      if (item) {
        if (quantidade <= 0) {
          this.removerDoCarrinho(produtoId);
        } else {
          item.quantidade = quantidade;
          this.saveCarrinhoToStorage();
        }
      }
    }
  
    getCarrinho() {
      return this.carrinho;
    }
  
    getTotalCarrinho() {
      return this.carrinho.reduce((total, item) => {
        return total + (item.precoUnitario * item.quantidade);
      }, 0);
    }
  
    getQuantidadeItensCarrinho() {
      return this.carrinho.reduce((total, item) => total + item.quantidade, 0);
    }
  
    limparCarrinho() {
      this.carrinho = [];
      this.saveCarrinhoToStorage();
    }
  
    // Usuário
    getUsuarioFromStorage() {
      const usuario = localStorage.getItem('tecnoplace_usuario');
      return usuario ? JSON.parse(usuario) : null;
    }
  
    saveUsuarioToStorage(usuario) {
      localStorage.setItem('tecnoplace_usuario', JSON.stringify(usuario));
      this.usuarioLogado = usuario;
    }
  
    login(email, senha) {
      const usuario = this.data.usuarios.find(u => u.email === email && u.senha === senha);
      if (usuario) {
        this.saveUsuarioToStorage(usuario);
        return true;
      }
      return false;
    }
  
    logout() {
      localStorage.removeItem('tecnoplace_usuario');
      this.usuarioLogado = null;
    }
  
    isLogado() {
      return this.usuarioLogado !== null;
    }
  
    getUsuarioLogado() {
      return this.usuarioLogado;
    }
  }
  
  // Instância global do gerenciador de dados
  const dataManager = new DataManager();