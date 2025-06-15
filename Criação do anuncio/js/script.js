// Funções do Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('active');
    overlay.style.display = 'none';
}

// Funções do Formulário
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('anuncioForm');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const maxImages = 5;

    // Adicionar nova linha de especificação
    window.addSpecRow = function() {
        const specsList = document.getElementById('specsList');
        const newRow = document.createElement('div');
        newRow.className = 'spec-row';
        newRow.innerHTML = `
            <input type="text" placeholder="Nome da Especificação" class="spec-name">
            <input type="text" placeholder="Valor" class="spec-value">
            <button type="button" class="btn btn-secondary remove-spec-btn" onclick="removeSpecRow(this)">
                <i class="fas fa-times"></i>
            </button>
        `;
        specsList.appendChild(newRow);
    };

    // Remover linha de especificação
    window.removeSpecRow = function(button) {
        const row = button.parentElement;
        row.remove();
    };

    // Preview de imagens
    imageInput.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        
        if (files.length > maxImages) {
            alert(`Você pode selecionar no máximo ${maxImages} imagens.`);
            imageInput.value = '';
            return;
        }

        imagePreview.innerHTML = '';
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const previewItem = document.createElement('div');
                    previewItem.className = 'preview-item';
                    previewItem.innerHTML = `
                        <img src="${e.target.result}" alt="Preview">
                        <button type="button" class="remove-btn" onclick="removeImage(this)">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    imagePreview.appendChild(previewItem);
                };
                reader.readAsDataURL(file);
            }
        });
    });

    // Remover imagem do preview
    window.removeImage = function(button) {
        const previewItem = button.parentElement;
        previewItem.remove();
    };

    // Validação e envio do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const formData = new FormData(form);
        const specs = [];
        
        // Coletar especificações
        document.querySelectorAll('.spec-row').forEach(row => {
            const name = row.querySelector('.spec-name').value;
            const value = row.querySelector('.spec-value').value;
            if (name && value) {
                specs.push({ name, value });
            }
        });

        // Adicionar especificações ao FormData
        formData.append('specs', JSON.stringify(specs));

        // Aqui você pode adicionar o código para enviar os dados para o servidor
        console.log('Dados do formulário:', Object.fromEntries(formData));
        
        // Exemplo de feedback visual
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        // Simular envio (remover em produção)
        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Anúncio publicado!';
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar anúncio';
                submitBtn.disabled = false;
                form.reset();
                imagePreview.innerHTML = '';
            }, 2000);
        }, 1500);
    });
}); 