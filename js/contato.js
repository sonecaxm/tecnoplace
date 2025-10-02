document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const feedback = document.getElementById('contactFeedback');
  
    if (!form) return;
  
    function showFeedback(message, type) {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.className = 'form-feedback ' + (type === 'error' ? 'error' : 'success');
    }
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(String(email).toLowerCase());
    }
  
    form.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const nome = document.getElementById('nome').value.trim();
      const email = document.getElementById('email').value.trim();
      const assunto = document.getElementById('assunto').value.trim();
      const categoria = document.getElementById('categoria').value;
      const mensagem = document.getElementById('mensagem').value.trim();
  
      if (!nome || !email || !assunto || !categoria || !mensagem) {
        showFeedback('Preencha todos os campos obrigatórios.', 'error');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback('Informe um e-mail válido.', 'error');
        return;
      }
  
      // Simulação de envio
      showFeedback('Enviando...', '');
  
      setTimeout(function () {
        showFeedback('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
        form.reset();
      }, 800);
    });
  });
  
  