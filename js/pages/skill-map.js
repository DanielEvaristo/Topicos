/**
 * Funcionalidad para la página de Skill Map
 */

// Añadir al objeto principal
(function(app) {
    // Módulo para gestionar skill map
    app.skillMapPage = {
        // Estado del módulo
        state: {
            currentRole: {
                id: 'backend-senior',
                title: 'Desarrollador Backend Senior',
                category: 'Backend',
                level: 'Senior'
            },
            selectedRoleId: null,
            skills: {
                // Datos se cargarán dinámicamente
            }
        },
        
        // Inicializar página
        init: function() {
            console.log('Inicializando página de Skill Map...');
            
            // Cargar datos (simulado)
            this.loadSkillMapData();
            
            // Inicializar eventos
            this.initEvents();
            
            // Actualizar UI basada en el estado
            this.updateUIState();
        },
        
        // Cargar datos del mapa de habilidades
        loadSkillMapData: function() {
            // En una versión real, esto sería una llamada a una API
            // Aquí estamos simulando datos
            
            // Los datos ya están en el HTML para la demostración
            // En una aplicación real, renderizaríamos el contenido dinámicamente
            console.log('Datos de Skill Map cargados (simulado)');
        },
        
        // Inicializar eventos
        initEvents: function() {
            // Botón para abrir modal de cambio de rol
            const changeRoleBtn = document.getElementById('changeRoleBtn');
            if (changeRoleBtn) {
                changeRoleBtn.addEventListener('click', this.openRoleModal.bind(this));
            }
            
            // Botón para cerrar modal
            const closeRoleModal = document.getElementById('closeRoleModal');
            if (closeRoleModal) {
                closeRoleModal.addEventListener('click', this.closeRoleModal.bind(this));
            }
            
            // Botón para cancelar cambio de rol
            const cancelRoleChange = document.getElementById('cancelRoleChange');
            if (cancelRoleChange) {
                cancelRoleChange.addEventListener('click', this.closeRoleModal.bind(this));
            }
            
            // Botón para confirmar cambio de rol
            const confirmRoleChange = document.getElementById('confirmRoleChange');
            if (confirmRoleChange) {
                confirmRoleChange.addEventListener('click', this.confirmRoleChange.bind(this));
            }
            
            // Opciones de roles en el modal
            const roleOptions = document.querySelectorAll('.role-option');
            roleOptions.forEach(option => {
                option.addEventListener('click', (e) => {
                    // Quitar clase seleccionada de todas las opciones
                    roleOptions.forEach(opt => opt.classList.remove('selected'));
                    
                    // Añadir clase seleccionada a la opción clickeada
                    option.classList.add('selected');
                    
                    // Guardar ID del rol seleccionado
                    this.state.selectedRoleId = option.dataset.role;
                });
            });
            
            // Eventos para botones de acción en tarjetas de habilidades
            document.querySelectorAll('.skill-actions .btn-text').forEach(btn => {
                btn.addEventListener('click', this.handleSkillAction.bind(this));
            });
            
            // Búsqueda en el modal de roles
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.addEventListener('input', this.filterRoles.bind(this));
            }
        },
        
        // Abrir modal de cambio de rol
        openRoleModal: function() {
            const modal = document.getElementById('changeRoleModal');
            if (modal) {
                modal.style.display = 'flex';
                
                // Resetear rol seleccionado
                this.state.selectedRoleId = null;
                
                // Quitar selección previa
                document.querySelectorAll('.role-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Limpiar input de búsqueda
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.value = '';
                }
                
                // Mostrar todas las opciones de rol
                document.querySelectorAll('.role-option').forEach(opt => {
                    opt.style.display = 'flex';
                });
            }
        },
        
        // Cerrar modal de cambio de rol
        closeRoleModal: function() {
            const modal = document.getElementById('changeRoleModal');
            if (modal) {
                modal.style.display = 'none';
            }
        },
        
        // Confirmar cambio de rol
        confirmRoleChange: function() {
            if (!this.state.selectedRoleId) {
                alert('Por favor, selecciona un rol');
                return;
            }
            
            // Obtener datos del rol seleccionado
            const selectedRole = document.querySelector(`.role-option[data-role="${this.state.selectedRoleId}"]`);
            if (!selectedRole) return;
            
            // Actualizar datos del rol actual
            this.state.currentRole = {
                id: this.state.selectedRoleId,
                title: selectedRole.querySelector('h4').textContent,
                category: this.state.selectedRoleId.split('-')[0],
                level: this.state.selectedRoleId.split('-')[1] || 'Senior'
            };
            
            // Actualizar UI
            this.updateCurrentRoleUI();
            
            // Cerrar modal
            this.closeRoleModal();
            
            // Simular carga de nuevos datos
            this.simulateLoadingNewRoleData();
        },
        
        // Actualizar UI con el rol actual
        updateCurrentRoleUI: function() {
            // Actualizar título
            const roleTitle = document.querySelector('.role-title');
            if (roleTitle) {
                roleTitle.textContent = this.state.currentRole.title;
            }
            
            // Actualizar metadatos
            const roleCategory = document.querySelector('.role-category');
            if (roleCategory) {
                roleCategory.textContent = this.capitalizeFirstLetter(this.state.currentRole.category);
            }
            
            const roleLevel = document.querySelector('.role-level');
            if (roleLevel) {
                roleLevel.textContent = this.capitalizeFirstLetter(this.state.currentRole.level);
            }
            
            // Actualizar icono (simulado)
            const roleIcon = document.querySelector('.role-icon i');
            if (roleIcon) {
                // Cambiar icono basado en categoría
                switch(this.state.currentRole.category.toLowerCase()) {
                    case 'frontend':
                        roleIcon.className = 'icon-browser';
                        break;
                    case 'fullstack':
                        roleIcon.className = 'icon-code';
                        break;
                    case 'data':
                        roleIcon.className = 'icon-chart';
                        break;
                    case 'devops':
                        roleIcon.className = 'icon-cloud';
                        break;
                    default:
                        roleIcon.className = 'icon-server';
                }
            }
        },
        
        // Simular carga de datos para el nuevo rol
        simulateLoadingNewRoleData: function() {
            // Mostrar indicador de carga
            const categorySections = document.querySelectorAll('.category-section');
            if (categorySections.length) {
                categorySections.forEach(section => {
                    section.innerHTML = '<div style="padding: 40px; text-align: center;"><div style="font-size: 24px; margin-bottom: 16px;">⏳</div><p style="color: #718096;">Cargando datos del rol...</p></div>';
                });
            }
            
            // Simular carga (en una aplicación real, se haría una llamada a API)
            setTimeout(() => {
                console.log('Nuevos datos cargados para el rol:', this.state.currentRole.title);
                
                // Recargar la página (para simplificar la demostración)
                window.location.reload();
                
                // En una aplicación real, actualizaríamos el DOM con los nuevos datos
                // sin necesidad de recargar la página
            }, 1500);
        },
        
        // Manejar acción en tarjeta de habilidad
        handleSkillAction: function(event) {
            const action = event.target.textContent.trim();
            const skillCard = event.target.closest('.skill-card');
            if (!skillCard) return;
            
            // Obtener nombre de habilidad
            const skillName = skillCard.querySelector('.skill-name').textContent;
            
            // Diferentes acciones posibles
            switch(action) {
                case 'Ver recursos':
                    console.log(`Ver recursos para: ${skillName}`);
                    // Redirigir a página de recursos filtrada
                    app.loadPage('resources');
                    break;
                    
                case 'Practicar':
                    console.log(`Practicar: ${skillName}`);
                    // Redirigir a simulación relacionada
                    app.loadPage('new-simulation');
                    break;
                    
                case 'Iniciar':
                    console.log(`Iniciar: ${skillName}`);
                    // Cambiar a estado "en progreso"
                    this.updateSkillStatus(skillCard, 'in-progress');
                    break;
                    
                default:
                    console.log(`Acción desconocida: ${action}`);
            }
        },
        
        // Actualizar estado de una habilidad (simulado)
        updateSkillStatus: function(skillCard, newStatus) {
            // En una aplicación real, esto enviaría una actualización al servidor
            
            // Quitar clases de estado actuales
            skillCard.classList.remove('mastered', 'in-progress', 'not-started');
            
            // Añadir nueva clase de estado
            skillCard.classList.add(newStatus);
            
            // Actualizar texto de nivel
            const levelText = skillCard.querySelector('.level-text');
            if (levelText) {
                switch(newStatus) {
                    case 'mastered':
                        levelText.textContent = 'Dominado';
                        levelText.style.color = '#10b981';
                        break;
                    case 'in-progress':
                        levelText.textContent = 'Principiante';
                        levelText.style.color = '#3b82f6';
                        break;
                    case 'not-started':
                        levelText.textContent = 'No iniciado';
                        levelText.style.color = '';
                        break;
                }
            }
            
            // Actualizar puntos de nivel (simulado)
            const dots = skillCard.querySelectorAll('.dot');
            if (dots.length) {
                dots.forEach(dot => dot.classList.remove('filled'));
                
                if (newStatus === 'in-progress') {
                    // Marcar los dos primeros puntos
                    dots[0].classList.add('filled');
                    dots[1].classList.add('filled');
                } else if (newStatus === 'mastered') {
                    // Marcar todos los puntos
                    dots.forEach(dot => dot.classList.add('filled'));
                }
            }
            
            // Actualizar badge
            const badge = skillCard.querySelector('.skill-badge');
            if (badge) {
                if (newStatus === 'in-progress') {
                    badge.textContent = 'Recomendado';
                } else if (newStatus === 'mastered') {
                    badge.textContent = 'Dominado';
                }
            }
            
            // Actualizar opciones de acción
            const actions = skillCard.querySelector('.skill-actions');
            if (actions && newStatus === 'in-progress') {
                actions.innerHTML = `
                    <button class="btn-text">Ver recursos</button>
                    <button class="btn-text">Practicar</button>
                `;
                
                // Reinicializar eventos
                actions.querySelectorAll('.btn-text').forEach(btn => {
                    btn.addEventListener('click', this.handleSkillAction.bind(this));
                });
            }
            
            // Mostrar notificación de éxito (simulado)
            this.showNotification('Estado actualizado correctamente');
            
            // Actualizar estadísticas globales (simulado)
            this.updateSkillStatistics();
        },
        
        // Filtrar roles en el modal
        filterRoles: function(event) {
            const searchTerm = event.target.value.toLowerCase();
            const roleOptions = document.querySelectorAll('.role-option');
            
            roleOptions.forEach(option => {
                const roleTitle = option.querySelector('h4').textContent.toLowerCase();
                const roleDescription = option.querySelector('p').textContent.toLowerCase();
                
                if (roleTitle.includes(searchTerm) || roleDescription.includes(searchTerm)) {
                    option.style.display = 'flex';
                } else {
                    option.style.display = 'none';
                }
            });
        },
        
        // Actualizar estadísticas de habilidades (simulado)
        updateSkillStatistics: function() {
            // En una aplicación real, recalcularíamos basándonos en datos reales
            
            // Actualizar números en tarjetas de resumen
            const summaryCards = document.querySelectorAll('.summary-card');
            if (summaryCards.length >= 3) {
                // Actualizar número de habilidades dominadas (incrementar en 1)
                const masteredNumber = summaryCards[1].querySelector('.summary-number');
                if (masteredNumber) {
                    let currentValue = parseInt(masteredNumber.textContent);
                    masteredNumber.textContent = (currentValue + 1).toString();
                }
                
                // Actualizar número de habilidades en progreso (decrementar en 1)
                const inProgressNumber = summaryCards[2].querySelector('.summary-number');
                if (inProgressNumber) {
                    let currentValue = parseInt(inProgressNumber.textContent);
                    inProgressNumber.textContent = (currentValue - 1).toString();
                }
            }
            
            // Actualizar porcentaje de progreso general
            const progressPercent = document.querySelector('.progress-percent');
            if (progressPercent) {
                let currentValue = parseInt(progressPercent.textContent);
                progressPercent.textContent = `${currentValue + 2}%`;
            }
            
            // Actualizar barra de progreso general
            const progressBar = document.querySelector('.progress-bar');
            if (progressBar) {
                let currentValue = parseInt(progressBar.style.width);
                progressBar.style.width = `${currentValue + 2}%`;
            }
        },
        
        // Mostrar notificación (simulado)
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
            notification.textContent = message;
            
            // Añadir a la página
            document.body.appendChild(notification);
            
            // Eliminar después de 3 segundos
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
        },
        
        // Actualizar estado de la UI basado en el estado
        updateUIState: function() {
            // Actualizar UI del rol actual
            this.updateCurrentRoleUI();
        },
        
        // Utilidad: Capitalizar primera letra
        capitalizeFirstLetter: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    };
    
    // Método de inicialización que será llamado por el sistema principal
    app.initSkillMapPage = function() {
        app.skillMapPage.init();
    };
    
})(window.TechInterviewPro);