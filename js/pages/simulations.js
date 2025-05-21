/**
 * Funcionalidad para la página de simulaciones - Versión simplificada
 */

// Añadir al objeto principal
(function(app) {
    // Módulo para gestionar simulaciones
    app.simulationsPage = {
        // Inicializar página
        init: function() {
            console.log('Inicializando página de simulaciones...');
            
            // Inicializar eventos
            this.initEvents();
            
            // Mostrar alerta de simulación próxima (solo para demostración)
            this.showNextSimulationAlert();
        },
        
        // Inicializar eventos
        initEvents: function() {
            // Botón de filtro
            const filterButton = document.getElementById('filterButton');
            if (filterButton) {
                filterButton.addEventListener('click', this.toggleFilters.bind(this));
            }
            
            // Botón de nueva simulación
            const newSimulationButton = document.getElementById('newSimulationButton');
            if (newSimulationButton) {
                newSimulationButton.addEventListener('click', this.startNewSimulation.bind(this));
            }
            
            // Clicks en filtros
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Encontrar el grupo de este filtro
                    const filterGroup = e.target.closest('.filter-group');
                    if (!filterGroup) return;
                    
                    // Desactivar otros filtros en este grupo
                    filterGroup.querySelectorAll('.filter-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    
                    // Activar este filtro
                    e.target.classList.add('active');
                    
                    // Implementar filtrado (simplificado para demostración)
                    console.log('Filtro seleccionado:', e.target.textContent);
                    this.applyFilters();
                });
            });
            
            // Botones de acción en tarjetas
            document.querySelectorAll('.simulation-card .btn-primary, .simulation-card .btn-secondary').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const action = e.target.textContent.trim();
                    const card = e.target.closest('.simulation-card');
                    
                    if (!card) return;
                    
                    // Manejar acción basado en el texto del botón
                    this.handleCardAction(action, card);
                });
            });
            
            // Botones de paginación
            document.querySelectorAll('.page-btn').forEach(btn => {
                if (btn.classList.contains('disabled')) return;
                
                btn.addEventListener('click', (e) => {
                    document.querySelector('.page-btn.active')?.classList.remove('active');
                    
                    if (!e.target.classList.contains('disabled') && 
                        !e.target.textContent.includes('←') && 
                        !e.target.textContent.includes('→')) {
                        e.target.classList.add('active');
                    }
                    
                    // Simular cambio de página
                    this.changePage(e.target.textContent);
                });
            });
        },
        
        // Mostrar/ocultar panel de filtros
        toggleFilters: function() {
            const filtersPanel = document.getElementById('filtersPanel');
            if (filtersPanel) {
                if (filtersPanel.style.display === 'none') {
                    filtersPanel.style.display = 'flex';
                } else {
                    filtersPanel.style.display = 'none';
                }
            }
        },
        
        // Aplicar filtros (simplificado)
        applyFilters: function() {
            // Simulación de aplicación de filtros
            // En una implementación real, esto filtrarìa las tarjetas o haría un request al servidor
            
            // Obtener filtros activos
            const typeFilter = document.querySelector('.filter-group:nth-child(1) .filter-btn.active')?.textContent || 'Todas';
            const statusFilter = document.querySelector('.filter-group:nth-child(2) .filter-btn.active')?.textContent || 'Todos';
            const sortBy = document.querySelector('.filter-group:nth-child(3) .filter-btn.active')?.textContent || 'Recientes';
            
            console.log(`Aplicando filtros - Tipo: ${typeFilter}, Estado: ${statusFilter}, Orden: ${sortBy}`);
            
            // Simular carga
            this.simulateLoading();
        },
        
        // Iniciar nueva simulación
        startNewSimulation: function() {
            console.log('Iniciando nueva simulación...');
            // Redirigir a página de configuración de nueva simulación
            app.loadPage('new-simulation');
        },
        
        // Manejar acción en tarjeta
        handleCardAction: function(action, card) {
            console.log(`Acción: ${action} en tarjeta`);
            
            switch(action) {
                case 'Ver detalles':
                    // Redirigir a página de detalles
                    app.loadPage('simulation-detail');
                    break;
                    
                case 'Continuar':
                    // Redirigir a simulación en progreso
                    app.loadPage('simulation-session');
                    break;
                    
                case 'Ver registro':
                    // Ver registro de simulación
                    app.loadPage('simulation-log');
                    break;
                    
                default:
                    console.log('Acción no manejada:', action);
            }
        },
        
        // Cambiar página
        changePage: function(page) {
            console.log(`Cambiando a página ${page}`);
            
            if (page === '←' || page === '→') {
                // Navegar a página anterior o siguiente
                console.log('Navegando a página', page === '←' ? 'anterior' : 'siguiente');
                return;
            }
            
            // Simular carga de páginas
            this.simulateLoading();
        },
        
        // Mostrar alerta de simulación próxima
        showNextSimulationAlert: function() {
            const alertElement = document.querySelector('.next-simulation-alert');
            if (!alertElement) return;
            
            // Verificar si hay simulación próxima
            const hasUpcoming = true; // Simulado para demostración
            
            if (!hasUpcoming) {
                alertElement.style.display = 'none';
            }
        },
        
        // Simular carga (para demostración)
        simulateLoading: function() {
            const simulationList = document.querySelector('.simulation-list');
            if (!simulationList) return;
            
            // Guardar estado original
            const originalContent = simulationList.innerHTML;
            
            // Mostrar indicador de carga
            simulationList.innerHTML = '<div class="loading-state" style="text-align: center; padding: 80px 0;"><div style="font-size: 24px; margin-bottom: 16px;">⏳</div><p style="color: #718096;">Cargando simulaciones...</p></div>';
            
            // Simular carga
            setTimeout(() => {
                // Restaurar contenido original
                simulationList.innerHTML = originalContent;
                
                // Reinicializar eventos de las tarjetas
                document.querySelectorAll('.simulation-card .btn-primary, .simulation-card .btn-secondary').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const action = e.target.textContent.trim();
                        const card = e.target.closest('.simulation-card');
                        if (!card) return;
                        this.handleCardAction(action, card);
                    });
                });
            }, 800);
        }
    };
    
    // Método de inicialización que será llamado por el sistema principal
    app.initSimulationsPage = function() {
        app.simulationsPage.init();
    };
})(window.TechInterviewPro);