document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const editAvatarBtn = document.querySelector('.edit-avatar');
    const editProfileBtn = document.querySelector('.btn-secondary');
    const settingsBtn = document.querySelector('.btn-icon');
    const tabs = document.querySelectorAll('.tab');
    const anunciosGrid = document.querySelector('.anuncios-grid');

    // Função para trocar foto de perfil
    editAvatarBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.querySelector('.profile-avatar img').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };
        
        input.click();
    });

    // Função para editar perfil
    editProfileBtn.addEventListener('click', function() {
        const bio = document.querySelector('.profile-bio');
        const currentName = bio.querySelector('h2').textContent;
        const currentDesc = bio.querySelector('p').textContent;
        const currentLocation = bio.querySelector('p:nth-child(3)').textContent;
        const currentWebsite = bio.querySelector('.website').textContent;

        const newName = prompt('Digite seu nome:', currentName);
        const newDesc = prompt('Digite sua descrição:', currentDesc);
        const newLocation = prompt('Digite sua localização:', currentLocation);
        const newWebsite = prompt('Digite seu site:', currentWebsite);

        if (newName) bio.querySelector('h2').textContent = newName;
        if (newDesc) bio.querySelector('p').textContent = newDesc;
        if (newLocation) bio.querySelector('p:nth-child(3)').textContent = newLocation;
        if (newWebsite) bio.querySelector('.website').textContent = newWebsite;
    });

    // Função para configurações
    settingsBtn.addEventListener('click', function() {
        alert('Configurações serão implementadas em breve!');
    });

    // Função para trocar de aba
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Simular carregamento de conteúdo diferente
            const tabType = this.querySelector('span').textContent.toLowerCase();
            if (tabType === 'salvos') {
                anunciosGrid.innerHTML = '<p class="no-content">Nenhum anúncio salvo ainda.</p>';
            } else if (tabType === 'marcados') {
                anunciosGrid.innerHTML = '<p class="no-content">Nenhum anúncio marcado ainda.</p>';
            } else {
                // Recarregar anúncios originais
                location.reload();
            }
        });
    });

    // Função para curtir anúncio
    anunciosGrid.addEventListener('click', function(e) {
        const heartIcon = e.target.closest('.fa-heart');
        if (heartIcon) {
            e.stopPropagation();
            const statSpan = heartIcon.parentElement;
            const currentLikes = parseInt(statSpan.textContent);
            
            if (heartIcon.classList.contains('liked')) {
                heartIcon.classList.remove('liked');
                statSpan.textContent = `${currentLikes - 1}`;
            } else {
                heartIcon.classList.add('liked');
                statSpan.textContent = `${currentLikes + 1}`;
            }
        }
    });

    // Função para abrir anúncio
    anunciosGrid.addEventListener('click', function(e) {
        const anuncioItem = e.target.closest('.anuncio-item');
        if (anuncioItem && !e.target.closest('.anuncio-stats')) {
            const anuncioTitle = anuncioItem.querySelector('h3').textContent;
            alert(`Abrindo anúncio: ${anuncioTitle}`);
        }
    });

    // Adicionar efeito de hover nos anúncios
    const anuncioItems = document.querySelectorAll('.anuncio-item');
    anuncioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.anuncio-overlay').style.opacity = '1';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.anuncio-overlay').style.opacity = '0';
        });
    });
}); 