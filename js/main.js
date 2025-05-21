/**
 * Archivo JavaScript principal
 * Contiene funcionalidades genéricas para toda la aplicación
 */

// Objeto global para la aplicación
window.TechInterviewPro = {
    // Estado de la aplicación
    state: {
        currentPage: 'welcome',
        theme: localStorage.getItem('theme') || 'light',
        isLoggedIn: false
    },

    // Inicialización
    init: function() {
        console.log('Iniciando TechInterviewPro...');
        
        // Inicializar tema
        this.initTheme();
        
        // Inicializar manejadores de eventos
        this.initEventListeners();
        
        // Cargar la página inicial basada en URL o por defecto welcome
        this.loadInitialPage();
    },
    
    // Inicializar tema
    initTheme: function() {
        // Aplicar tema guardado
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const themeIcon = document.getElementById('themeIcon');
            if (themeIcon) {
                themeIcon.textContent = '☀️';
            }
        }
    },
    
    // Inicializar manejadores de eventos globales
    initEventListeners: function() {
        // Botón de tema
        const themeButton = document.getElementById('themeButton');
        if (themeButton) {
            themeButton.addEventListener('click', this.toggleTheme.bind(this));
        }
        
        // Enlaces de navegación
        document.querySelectorAll('[data-page]').forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                const pageName = element.getAttribute('data-page');
                if (pageName) {
                    this.loadPage(pageName);
                }
            });
        });
    },
    
    // Cargar página inicial basada en URL o por defecto
    loadInitialPage: function() {
        // Obtener página de la URL si existe
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('page');
        
        // Cargar página específica o welcome por defecto
        this.loadPage(pageParam || 'welcome');
    },
    
    // Cargar una página
    loadPage: function(pageName) {
        console.log(`Cargando página: ${pageName}`);
        
        // Actualizar estado
        this.state.currentPage = pageName;
        
        // Elemento de contenido
        const contentElement = document.getElementById('pageContent');
        if (!contentElement) {
            console.error('Elemento de contenido no encontrado');
            return;
        }
        
        // Mostrar spinner de carga
        contentElement.innerHTML = '<div class="loading-spinner">Cargando...</div>';
        
        // Cargar página mediante fetch
        fetch(`pages/${pageName}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Actualizar contenido
                contentElement.innerHTML = html;
                
                // Cargar CSS específico si existe
                this.loadPageSpecificStyles(pageName);
                
                // Cargar JS específico si existe
                this.loadPageSpecificScripts(pageName);
                
                // Actualizar URL (historial)
                window.history.pushState({page: pageName}, `${pageName} - TechInterviewPro`, `?page=${pageName}`);
            })
            .catch(error => {
                console.error('Error al cargar la página:', error);
                contentElement.innerHTML = `
                    <div class="error-message">
                        <h3>Error al cargar la página</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="TechInterviewPro.loadPage('welcome')">Volver al inicio</button>
                    </div>
                `;
            });
    },
    
    // Cargar estilos específicos de la página
    loadPageSpecificStyles: function(pageName) {
        // Buscar si ya existe el link de estilo
        const existingLink = document.querySelector(`link[data-page="${pageName}"]`);
        if (existingLink) return;
        
        // Crear link para hoja de estilo específica
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `css/pages/${pageName}.css`;
        link.dataset.page = pageName;
        
        // Error silencioso si no existe el archivo
        link.onerror = () => {
            console.log(`No se encontró hoja de estilo específica para: ${pageName}`);
            link.remove();
        };
        
        document.head.appendChild(link);
    },
    
    // Cargar scripts específicos de la página
    loadPageSpecificScripts: function(pageName) {
        // Buscar si ya existe el script
        const existingScript = document.querySelector(`script[data-page="${pageName}"]`);
        if (existingScript) return;
        
        // Crear script
        const script = document.createElement('script');
        script.src = `js/pages/${pageName}.js`;
        script.dataset.page = pageName;
        
        // Error silencioso si no existe el archivo
        script.onerror = () => {
            console.log(`No se encontró script específico para: ${pageName}`);
            script.remove();
        };
        
        // Llamar a la función de inicialización si existe
        script.onload = () => {
            const initFunctionName = `init${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page`;
            if (typeof this[initFunctionName] === 'function') {
                this[initFunctionName]();
            }
        };
        
        document.body.appendChild(script);
    },
    
    // Alternar tema claro/oscuro
    toggleTheme: function() {
        document.body.classList.toggle('dark-mode');
        const themeIcon = document.getElementById('themeIcon');
        
        if (document.body.classList.contains('dark-mode')) {
            this.state.theme = 'dark';
            if (themeIcon) themeIcon.textContent = '☀️';
        } else {
            this.state.theme = 'light';
            if (themeIcon) themeIcon.textContent = '🌙';
        }
        
        localStorage.setItem('theme', this.state.theme);
        console.log(`Tema cambiado a: ${this.state.theme}`);
    }
};

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar la aplicación
    TechInterviewPro.init();
});