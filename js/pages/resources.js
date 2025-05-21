/**
 * Funcionalidad para la página de Recursos
 */

// Añadir al objeto principal
(function(app) {
    // Módulo para gestionar recursos
    app.resourcesPage = {
        // Estado del módulo
        state: {
            currentSlide: 0,
            totalSlides: 3,
            filters: {
                category: 'all',
                level: 'all',
                skill: 'all'
            },
            savedResources: []
        },
        
        // Inicializar página
        init: function() {
            console.log('Inicializando página de Recursos...');
            
            // Cargar recursos guardados (simulado)
            this.loadSavedResources();
            
            // Inicializar eventos
            this.initEvents();
            
            // Inicializar carrusel
            this.initSlider();
        },
        
        // Cargar recursos guardados (simulado)
        loadSavedResources: function() {
            // En una implementación real, esto cargaría desde localStorage o una API
            const savedFromLocalStorage = localStorage.getItem('savedResources');
            
            if (savedFromLocalStorage) {
                try {
                    this.state.savedResources = JSON.parse(savedFromLocalStorage);
                    console.log('Recursos guardados cargados:', this.state.savedResources.length);
                } catch(e) {
                    console.error('Error al cargar recursos guardados:', e);
                    this.state.savedResources = [];
                }
            } else {
                // Para demostración, simulamos algunos recursos guardados
                this.state.savedResources = ['resource-123', 'resource-456'];
                localStorage.setItem('savedResources', JSON.stringify(this.state.savedResources));
            }
            
            // Actualizar UI para reflejar recursos guardados
            this.updateSavedResourcesUI();
        },
        
        // Inicializar eventos
        initEvents: function() {
            // Botón para alternar panel de filtros
            const filterBtn = document.getElementById('filterResourcesBtn');
            if (filterBtn) {
                filterBtn.addEventListener('click', this.toggleFilterPanel.bind(this));
            }
            
            // Botón para ver recursos guardados
            const savedBtn = document.getElementById('viewSavedBtn');
            if (savedBtn) {
                savedBtn.addEventListener('click', this.viewSavedResources.bind(this));
            }
            
            // Botones de guardado
            document.querySelectorAll('.btn-icon .icon-bookmark-outline, .featured-save').forEach(btn => {
                btn.closest('button').addEventListener('click', this.toggleSaveResource.bind(this));
            });
            
            // Botones de acción principal
            document.querySelectorAll('.btn-primary').forEach(btn => {
                btn.addEventListener('click', this.viewResource.bind(this));
            });
            
            // Botones de "Ver todos"
            document.querySelectorAll('.btn-text').forEach(btn => {
                if (btn.textContent.trim() === 'Ver todos' || btn.textContent.trim() === 'Ver todas') {
                    btn.addEventListener('click', this.viewAllSection.bind(this));
                }
            });
            
            // Botones de colección
            document.querySelectorAll('.collection-card .btn-outlined').forEach(btn => {
                btn.addEventListener('click', this.exploreCollection.bind(this));
            });
            
            // Botones de filtro
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', this.applyFilter.bind(this));
            });
            
            // Campo de búsqueda
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.addEventListener('input', this.handleSearch.bind(this));
                
                // Botón de búsqueda
                const searchBtn = searchInput.nextElementSibling;
                if (searchBtn) {
                    searchBtn.addEventListener('click', () => {
                        this.handleSearch({ target: searchInput });
                    });
                }
            }
            
            // Botones del carrusel
            const prevBtn = document.querySelector('.slider-arrow.prev');
            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.changeSlide(-1));
            }
            
            const nextBtn = document.querySelector('.slider-arrow.next');
            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.changeSlide(1));
            }
            
            // Puntos indicadores del carrusel
            document.querySelectorAll('.slider-dots .dot').forEach((dot, index) => {
                dot.addEventListener('click', () => this.goToSlide(index));
            });
        },
        
        // Inicializar carrusel
        initSlider: function() {
            // Para este ejemplo, tenemos solo un slide visible, pero en una implementación real
            // se mostrarían diferentes recursos destacados
            console.log('Carrusel de recursos destacados inicializado');
            
            // Actualizar puntos indicadores
            this.updateSliderDots();
            
            // Iniciar autoplay (opcional)
            // this.startSliderAutoplay();
        },
        
        // Cambiar slide
        changeSlide: function(direction) {
            const newSlide = this.state.currentSlide + direction;
            
            // Verificar límites
            if (newSlide < 0) {
                this.goToSlide(this.state.totalSlides - 1);
            } else if (newSlide >= this.state.totalSlides) {
                this.goToSlide(0);
            } else {
                this.goToSlide(newSlide);
            }
        },
        
        // Ir a un slide específico
        goToSlide: function(slideIndex) {
            if (slideIndex < 0 || slideIndex >= this.state.totalSlides) return;
            
            // Actualizar estado
            this.state.currentSlide = slideIndex;
            
            // Actualizar UI
            this.updateSliderDots();
            
            // En una implementación real, aquí se actualizaría el contenido del slide
            console.log(`Mostrando slide ${slideIndex + 1} de ${this.state.totalSlides}`);
            
            // Simular cambio visual
            this.simulateSlideChange(slideIndex);
        },
        
        // Actualizar puntos indicadores del carrusel
        updateSliderDots: function() {
            const dots = document.querySelectorAll('.slider-dots .dot');
            
            dots.forEach((dot, index) => {
                if (index === this.state.currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        },
        
        // Simular cambio visual de slide (para demostración)
        simulateSlideChange: function(slideIndex) {
            const featuredCard = document.querySelector('.featured-card');
            if (!featuredCard) return;
            
            // Añadir clase para transición
            featuredCard.style.opacity = '0.5';
            featuredCard.style.transition = 'opacity 0.3s ease';
            
            // Simular cambio de contenido
            setTimeout(() => {
                // En una implementación real, aquí se actualizaría el contenido con datos reales
                const titles = [
                    'Microservicios con Spring Boot y Spring Cloud',
                    'Docker y Kubernetes para Desarrolladores',
                    'Arquitectura Hexagonal en la Práctica'
                ];
                
                const descriptions = [
                    'Aprende a desarrollar arquitecturas basadas en microservicios utilizando las tecnologías más demandadas del ecosistema Spring.',
                    'Masteriza los contenedores y la orquestación para desplegar aplicaciones escalables y resilientes.',
                    'Implementa una arquitectura limpia y mantenible en tus proyectos con patrones de diseño avanzados.'
                ];
                
                // Actualizar título y descripción
                const title = featuredCard.querySelector('.featured-title');
                if (title) title.textContent = titles[slideIndex];
                
                const description = featuredCard.querySelector('.featured-description');
                if (description) description.textContent = descriptions[slideIndex];
                
                // Restaurar opacidad
                featuredCard.style.opacity = '1';
            }, 300);
        },
        
        // Iniciar autoplay del carrusel
        startSliderAutoplay: function() {
            // Cambiar slide cada 5 segundos
            this.sliderInterval = setInterval(() => {
                this.changeSlide(1);
            }, 5000);
        },
        
        // Detener autoplay del carrusel
        stopSliderAutoplay: function() {
            if (this.sliderInterval) {
                clearInterval(this.sliderInterval);
            }
        },
        
        // Alternar panel de filtros
        toggleFilterPanel: function() {
            const filterPanel = document.getElementById('resourcesFilterPanel');
            if (filterPanel) {
                const isVisible = filterPanel.style.display !== 'none';
                
                if (isVisible) {
                    filterPanel.style.display = 'none';
                } else {
                    filterPanel.style.display = 'grid';
                    
                    // Efecto de aparición
                    filterPanel.style.opacity = '0';
                    filterPanel.style.transform = 'translateY(-10px)';
                    filterPanel.style.transition = 'opacity 0.3s, transform 0.3s';
                    
                    setTimeout(() => {
                        filterPanel.style.opacity = '1';
                        filterPanel.style.transform = 'translateY(0)';
                    }, 10);
                }
            }
        },
        
        // Ver recursos guardados
        viewSavedResources: function() {
            // En una implementación real, esto filtraría para mostrar solo recursos guardados
            alert('Mostrando recursos guardados: ' + this.state.savedResources.length);
            
            // Para demostración, mostrar elementos guardados en consola
            console.log('Recursos guardados:', this.state.savedResources);
        },
        
        // Alternar guardar/quitar recurso
        toggleSaveResource: function(event) {
            const btn = event.currentTarget;
            const resourceId = btn.closest('.resource-card, .featured-card')?.dataset.id || 'featured-123';
            
            // Verificar si ya está guardado
            const isAlreadySaved = this.state.savedResources.includes(resourceId);
            
            if (isAlreadySaved) {
                // Quitar de guardados
                this.state.savedResources = this.state.savedResources.filter(id => id !== resourceId);
                
                // Actualizar icono
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = 'icon-bookmark-outline';
                }
                
                this.showNotification('Recurso eliminado de guardados');
            } else {
                // Añadir a guardados
                this.state.savedResources.push(resourceId);
                
                // Actualizar icono
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = 'icon-bookmark';
                }
                
                this.showNotification('Recurso guardado correctamente');
            }
            
            // Guardar en localStorage
            localStorage.setItem('savedResources', JSON.stringify(this.state.savedResources));
            
            // Actualizar contador
            this.updateSavedResourcesUI();
        },
        
        // Actualizar UI para reflejar recursos guardados
        updateSavedResourcesUI: function() {
            // Actualizar botón de guardados con contador
            const savedBtn = document.getElementById('viewSavedBtn');
            if (savedBtn) {
                const savedCount = this.state.savedResources.length;
                
                if (savedCount > 0) {
                    // Mostrar contador
                    savedBtn.innerHTML = `<i class="icon-bookmark"></i> Guardados (${savedCount})`;
                } else {
                    // Sin contador
                    savedBtn.innerHTML = `<i class="icon-bookmark"></i> Guardados`;
                }
            }
            
            // Actualizar iconos de botones de guardar
            document.querySelectorAll('.resource-card, .featured-card').forEach(card => {
                const resourceId = card.dataset.id || (card.classList.contains('featured-card') ? 'featured-123' : null);
                if (!resourceId) return;
                
                const isAlreadySaved = this.state.savedResources.includes(resourceId);
                const saveBtn = card.querySelector('.btn-icon .icon-bookmark-outline, .btn-icon .icon-bookmark')?.parentElement;
                
                if (saveBtn) {
                    const icon = saveBtn.querySelector('i');
                    if (icon) {
                        icon.className = isAlreadySaved ? 'icon-bookmark' : 'icon-bookmark-outline';
                    }
                }
            });
        },
        
        // Ver recurso individual
        viewResource: function(event) {
            const btn = event.currentTarget;
            const card = btn.closest('.resource-card, .featured-card');
            
            if (!card) return;
            
            // Obtener título del recurso
            const title = card.querySelector('.resource-title, .featured-title')?.textContent;
            
            if (title) {
                console.log(`Viendo recurso: ${title}`);
                
                // En una implementación real, esto redirigiría a la página de detalle del recurso
                alert(`Visualizando recurso: ${title}`);
            }
        },
        
        // Ver todos los recursos de una sección
        viewAllSection: function(event) {
            const btn = event.currentTarget;
            const section = btn.closest('.resource-section, .collections-section, .trending-section');
            
            if (!section) return;
            
            // Obtener título de la sección
            const title = section.querySelector('.section-title')?.textContent;
            
            if (title) {
                console.log(`Viendo todos los recursos de: ${title}`);
                
                // En una implementación real, esto cargaría más recursos o redigiría a una página
                alert(`Mostrando todos los recursos de la sección: ${title}`);
            }
        },
        
        // Explorar colección
        exploreCollection: function(event) {
            const btn = event.currentTarget;
            const card = btn.closest('.collection-card');
            
            if (!card) return;
            
            // Obtener título de la colección
            const title = card.querySelector('.collection-title')?.textContent;
            
            if (title) {
                console.log(`Explorando colección: ${title}`);
                
                // En una implementación real, esto redirigiría a la página de la colección
                alert(`Explorando colección: ${title}`);
            }
        },
        
        // Aplicar filtro
        applyFilter: function(event) {
            const btn = event.currentTarget;
            const filterGroup = btn.closest('.filter-section');
            
            if (!filterGroup) return;
            
            // Obtener tipo de filtro
            const filterTitle = filterGroup.querySelector('.filter-title')?.textContent.toLowerCase();
            
            // Obtener valor del filtro
            const filterValue = btn.textContent.trim().toLowerCase();
            
            // Actualizar UI: desactivar otros filtros del mismo grupo
            const otherButtons = filterGroup.querySelectorAll('.filter-btn');
            otherButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Actualizar estado de filtros
            if (filterTitle.includes('categoría')) {
                this.state.filters.category = filterValue === 'todos' ? 'all' : filterValue;
            } else if (filterTitle.includes('nivel')) {
                this.state.filters.level = filterValue === 'todos' ? 'all' : filterValue;
            } else if (filterTitle.includes('habilidad')) {
                this.state.filters.skill = filterValue === 'todas' ? 'all' : filterValue;
            }
            
            console.log('Filtros aplicados:', this.state.filters);
            
            // Simular filtrado
            this.simulateFiltering();
        },
        
        // Manejar búsqueda
        handleSearch: function(event) {
            const searchTerm = event.target.value.trim();
            
            if (searchTerm.length > 0) {
                console.log(`Buscando: "${searchTerm}"`);
                
                // En una implementación real, esto filtraría los recursos
                // Para este ejemplo, solo lo mostramos en consola
                
                // Si el usuario presiona Enter, realizar búsqueda
                if (event.key === 'Enter') {
                    this.simulateSearchResults(searchTerm);
                }
            }
        },
        
        // Simular resultados de búsqueda (para demostración)
        simulateSearchResults: function(searchTerm) {
            // Mostrar carga
            this.showLoadingState();
            
            // Simular tiempo de carga
            setTimeout(() => {
                console.log(`Mostrando resultados para: "${searchTerm}"`);
                
                // En una implementación real, aquí se mostrarían los resultados filtrados
                // Para este ejemplo, simplemente restauramos el contenido original
                this.hideLoadingState();
                
                alert(`Búsqueda realizada: ${searchTerm}`);
            }, 800);
        },
        
        // Simular filtrado (para demostración)
        simulateFiltering: function() {
            // Mostrar carga
            this.showLoadingState();
            
            // Simular tiempo de carga
            setTimeout(() => {
                console.log('Recursos filtrados');
                
                // En una implementación real, aquí se filtrarían los recursos
                // Para este ejemplo, simplemente restauramos el contenido original
                this.hideLoadingState();
            }, 800);
        },
        
        // Mostrar estado de carga
        showLoadingState: function() {
            // Añadir clase de carga a las secciones de recursos
            const resourceSections = document.querySelectorAll('.resources-grid, .collections-grid, .trending-grid');
            
            resourceSections.forEach(section => {
                // Guardar contenido original
                section.dataset.originalContent = section.innerHTML;
                
                // Mostrar spinner
                section.innerHTML = `
                    <div class="loading-state" style="grid-column: 1/-1; text-align: center; padding: 40px;">
                        <div style="font-size: 24px; margin-bottom: 16px;">⏳</div>
                        <p style="color: #718096;">Cargando recursos...</p>
                    </div>
                `;
            });
        },
        
        // Ocultar estado de carga
        hideLoadingState: function() {
            const resourceSections = document.querySelectorAll('.resources-grid, .collections-grid, .trending-grid');
            
            resourceSections.forEach(section => {
                // Restaurar contenido original
                if (section.dataset.originalContent) {
                    section.innerHTML = section.dataset.originalContent;
                    delete section.dataset.originalContent;
                }
            });
            
            // Reiniciar eventos
            this.initEvents();
        },
        
        // Mostrar notificación
        showNotification: function(message) {
            // Crear elemento de notificación
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.right = '20px';
            notification.style.backgroundColor = '#4361ee';
            notification.style.color = 'white';
            notification.style.padding = '16px';
            notification.style.borderRadius = '8px';
            notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            notification.style.zIndex = '1000';
            notification.style.transform = 'translateY(20px)';
            notification.style.opacity = '0';
            notification.style.transition = 'transform 0.3s, opacity 0.3s';
            notification.textContent = message;
            
            // Añadir a la página
            document.body.appendChild(notification);
            
            // Mostrar con animación
            setTimeout(() => {
                notification.style.transform = 'translateY(0)';
                notification.style.opacity = '1';
            }, 10);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                notification.style.transform = 'translateY(20px)';
                notification.style.opacity = '0';
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        }
    };
    
    // Método de inicialización que será llamado por el sistema principal
    app.initResourcesPage = function() {
        app.resourcesPage.init();
    };
    
})(window.TechInterviewPro);