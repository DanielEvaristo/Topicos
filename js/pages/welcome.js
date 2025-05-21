/**
 * Script específico para la página de bienvenida
 */

// Añadir al objeto principal
(function(app) {
    // Inicialización de la página de bienvenida
    app.initWelcomePage = function() {
        console.log('Inicializando página de bienvenida');
        
        // Configurar manejadores de eventos para tarjetas de acción
        this.setupActionCards();
    };
    
    // Configurar tarjetas de acción
    app.setupActionCards = function() {
        const actionCards = document.querySelectorAll('.action-card');
        
        actionCards.forEach(card => {
            card.addEventListener('click', function() {
                const pageName = this.getAttribute('data-page');
                if (pageName) {
                    app.loadPage(pageName);
                } else {
                    alert('Esta funcionalidad estará disponible próximamente.');
                }
            });
        });
    };
})(window.TechInterviewPro);

// Notificar que el script se ha cargado correctamente
console.log('Script de bienvenida cargado');