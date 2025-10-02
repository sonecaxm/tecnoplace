function salvarUsuario() {
    const nome = document.getElementById("nome").value;
    const file = document.getElementById("fotoInput").files[0];
  
    if (!nome || !file) {
      alert("Preencha o nome e selecione uma foto!");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = function(e) {
      // Criando objeto usuário
      let usuario = {
        nome: nome,
        foto: e.target.result // imagem em base64
      };
  
      // Salvando no localStorage
      localStorage.setItem("usuario", JSON.stringify(usuario));
  
      mostrarUsuario();
    };
  
    reader.readAsDataURL(file); // converte a imagem em base64
  }
  
  function mostrarUsuario() {
    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));
    if (usuarioSalvo) {
      document.getElementById("resultado").innerHTML = `
        <p><b>Nome:</b> ${usuarioSalvo.nome}</p>
        <img src="${usuarioSalvo.foto}" width="150" style="border-radius:8px;">
      `;
    }
  }
  
  // quando a página carrega, tenta mostrar o usuário já salvo
  window.onload = mostrarUsuario;
  