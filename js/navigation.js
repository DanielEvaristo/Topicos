/**
 * Navegación entre páginas y gestión de historial
 */

// Añadir al objeto principal
(function(app) {
    // Navegación entre pantallas con historial
    app.navigation = {
        // Historial de navegación
        history: [],
        
        // Máximo de entradas en el historial
        maxHistoryItems: 20,
        
        // Inicializar navegación
        init: function() {
            // Escuchar eventos de navegación del navegador
            window.addEventListener('popstate', this.handlePopState.bind(this));
            
            // Añadir página actual al historial
            this.addToHistory(app.state.currentPage);
        },
        
        // Manejar eventos del historial del navegador
        handlePopState: function(event) {
            if (event.state && event.state.page) {
                // Cargar la página del historial sin añadir nueva entrada
                app.loadPage(event.state.page);
            } else {
                // Si no hay estado, cargar página de bienvenida
                app.loadPage('welcome');
            }
        },
        
        // Ir a la página anterior
        goBack: function() {
            if (this.history.length > 1) {
                // Quitar página actual del historial
                this.history.pop();
                
                // Obtener página anterior
                const previousPage = this.history[this.history.length - 1];
                
                // Cargar página anterior
                app.loadPage(previousPage);
                
                return true;
            }
            
            return false;
        },
        
        // Añadir página al historial
        addToHistory: function(pageName) {
            // Evitar duplicar la última página en el historial
            if (this.history.length > 0 && this.history[this.history.length - 1] === pageName) {
                return;
            }
            
            // Añadir página al historial
            this.history.push(pageName);
            
            // Limitar tamaño del historial
            if (this.history.length > this.maxHistoryItems) {
                this.history.shift();
            }
        }
    };
    
    // Inicializar navegación cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        app.navigation.init();
    });
})(window.TechInterviewPro);