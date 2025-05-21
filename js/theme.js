/**
 * Gestión del tema claro/oscuro
 * Este archivo complementa la funcionalidad de tema en main.js
 */

// Añadir al objeto principal
(function(app) {
    // Complemento para la gestión de temas
    app.themeExtensions = {
        // Inicializar
        init: function() {
            // Configurar detector de preferencias del sistema
            this.setupSystemPreference();
            
            // Aplicar correcciones para modo oscuro
            this.applyDarkModeCorrections();
        },
        
        // Configurar detector de preferencias del sistema
        setupSystemPreference: function() {
            // Si no hay preferencia guardada, usar la preferencia del sistema
            if (!localStorage.getItem('theme')) {
                const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (prefersDarkMode) {
                    document.body.classList.add('dark-mode');
                    const themeIcon = document.getElementById('themeIcon');
                    if (themeIcon) themeIcon.textContent = '☀️';
                    localStorage.setItem('theme', 'dark');
                    
                    // Aplicar correcciones para modo oscuro
                    this.applyDarkModeCorrections();
                }
            } else if (localStorage.getItem('theme') === 'dark') {
                // Si ya hay preferencia guardada como oscuro, aplicar correcciones
                this.applyDarkModeCorrections();
            }
            
            // Escuchar cambios en la preferencia del sistema
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                // Solo aplicar si no hay preferencia guardada
                if (!localStorage.getItem('theme')) {
                    if (e.matches) {
                        document.body.classList.add('dark-mode');
                        const themeIcon = document.getElementById('themeIcon');
                        if (themeIcon) themeIcon.textContent = '☀️';
                        localStorage.setItem('theme', 'dark');
                        
                        // Aplicar correcciones para modo oscuro
                        this.applyDarkModeCorrections();
                    } else {
                        document.body.classList.remove('dark-mode');
                        const themeIcon = document.getElementById('themeIcon');
                        if (themeIcon) themeIcon.textContent = '🌙';
                        localStorage.setItem('theme', 'light');
                    }
                }
            });
        },
        
        // Aplicar correcciones específicas para el modo oscuro
        applyDarkModeCorrections: function() {
            if (!document.body.classList.contains('dark-mode')) return;
            
            // Correcciones para la página de bienvenida
            setTimeout(() => {
                // Arreglar encabezado de bienvenida
                const welcomeHeading = document.querySelector('.welcome-heading');
                if (welcomeHeading) {
                    welcomeHeading.style.color = '#4361ee';
                }
                
                // Arreglar subtítulo de bienvenida
                const welcomeSubheading = document.querySelector('.welcome-subheading');
                if (welcomeSubheading) {
                    welcomeSubheading.style.color = '#f4f6f9';
                }
                
                // Arreglar títulos de tarjetas de acción
                document.querySelectorAll('.action-title').forEach(title => {
                    title.style.color = '#f4f6f9';
                });
                
                // Arreglar descripciones de tarjetas de acción
                document.querySelectorAll('.action-description').forEach(desc => {
                    desc.style.color = '#bbc5d5';
                });
                
                // Arreglar íconos de tarjetas de acción
                document.querySelectorAll('.action-icon').forEach(icon => {
                    icon.style.backgroundColor = 'rgba(67, 97, 238, 0.2)';
                    icon.style.color = '#4361ee';
                });
                
                console.log('Correcciones aplicadas para modo oscuro en la página de bienvenida');
            }, 50);
        }
    };
    
    // Mejorar la función de cambio de tema original
    const originalToggleTheme = window.TechInterviewPro.toggleTheme;
    
    window.TechInterviewPro.toggleTheme = function() {
        // Llamar a la función original
        originalToggleTheme.call(window.TechInterviewPro);
        
        // Aplicar correcciones si se activó el modo oscuro
        if (document.body.classList.contains('dark-mode')) {
            app.themeExtensions.applyDarkModeCorrections();
        }
    };
    
    // Inicializar cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        app.themeExtensions.init();
    });
})(window.TechInterviewPro);

// Notificar que el script se ha cargado correctamente
console.log('Script de tema cargado');