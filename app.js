/**
 * CasaAlerta - Lógica Central de Estado y Requerimientos Funcionales (RF-01 a RF-05)
 * Respaldado por el PRD CasaAlerta y Sistema de Diseño Custodia Inquilino Moderno
 */

// Estructura de Datos y Semilla Inicial
const INITIAL_STATE = {
  apartment: {
    name: "Apartamento 302 — Residencias El Sol",
    address: "Cra 11 # 14-25, Sogamoso, Boyacá",
    student: "Mateo Gómez",
    studentId: "C.C. 1.052.741.982",
    university: "UPTC Sogamoso",
    landlord: "Don Hernando Pérez",
    contractRef: "V2024-UPTC-302",
    term: "Agosto 2024 — Diciembre 2024",
    radicado: "UPTC-SOG-302"
  },
  damages: [
    {
      id: "DM-01",
      title: "Humedad e infiltración cielo raso",
      typology: "humedad",
      typologyLabel: "Humedad",
      room: "Baño Principal",
      initialDate: "2024-08-12",
      initialDateFormatted: "12 Ago 2024 - 11:20 AM",
      initialNote: "Mancha amarillenta tras lluvias fuertes. Textura plana sin descascaramiento visible. Reportado formalmente en el inventario de mudanza.",
      initialImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAprjWsnv2JyJT5nUDxLM4Gl-E160aHBXlR_vOGaFomOyNnOCNOexqoXA7wjoH2g2JD-wHbK2zsJr7DQl6ai0EPiatuuMGHG2RJ5jCRJpmG0POG8YuV9m0mFEXe49Y6b_l2zvDduKbpRypOgCT1h_D84jEthAf84FO32NYGYXkZJ3-R-A-zHn8Q2RbLxOyWMGaoub6msILreXw-euCcOL9HTBt1BYUvDXqDuGvrJR3mUsFMDh1Ace0vpQ",
      initialDimensions: "Ø ~10 cm",
      imputabilidad: "Estructural Prev.",
      severity: "Alta",
      status: "Activo",
      updates: [
        {
          id: "UPD-01-1",
          date: "2024-09-18",
          dateFormatted: "18 Sep 2024 - 04:30 PM",
          note: "Aparición de burbujas en pintura y goteo constante durante la noche.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAx5977dDqqrRyBeFybyFLxe5RE7zR4PUDBhy97AZM_ujfGnUhdJTFZA5Pz0PWNwuemHUMXlifdelUIa1KaRnwRb34i0rkV426pMhpJ-71IWdhuL5MrT3w4_Et1roUuaYo_CnBjMEs8wEMLEvgie3CZ411jz4gR5eIyfTjhelHkFXB1nspsHAioyTaSIgdp2cAMQQTSI85wx5C9UGDE40bmpQVJMRtGnXP4C4piPe3fhpI-k0I8gruj6A",
          dimensions: "Ø ~22 cm",
          severity: "Alta"
        },
        {
          id: "UPD-01-2",
          date: "2024-10-15",
          dateFormatted: "15 Oct 2024 - 09:15 AM",
          note: "Pintura descascarada, goteo intermitente. Formación de colonias fúngicas activas e invasión sobre la canaleta perimetral de la bombilla eléctrica.",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBiP87NMFx0UKMEZ69kBLk93LK0np0BDEaxeaiV4zm-H9-eCTOJ-ARElQsDrKWf2UVXlNx87imuf_9E2N4paC8q5_GsgpwYk0ch0aIHtYJLF6I7O1dt0tSq-WtGtKShhZhT8iNbTEtiZzGfu6VVTxPV5dp1RGwOGkQyBpL5pfArw7pOUJxNf7FvJjDF0au_UvreOIrLlxJVbU9-KIT8rTH8pn3OG2V7_bKGeios8V7PzJ5OrD0bxXCofw",
          dimensions: "Ø ~35 cm",
          severity: "Crítica"
        }
      ]
    },
    {
      id: "DM-02",
      title: "Desajuste y fricción cerradura principal",
      typology: "acabados",
      typologyLabel: "Cerrajería / Seguridad",
      room: "Acceso Apartamento",
      initialDate: "2024-08-15",
      initialDateFormatted: "15 Ago 2024 - 02:15 PM",
      initialNote: "Perno inferior roza contra el marco metálico. Requiere fuerza para cerrar con llave.",
      initialImage: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80",
      initialDimensions: "Desviación 3mm",
      imputabilidad: "Deterioro Físico",
      severity: "Media",
      status: "Activo",
      updates: []
    },
    {
      id: "DM-03",
      title: "Fisura vertical superficial en yeso",
      typology: "grietas",
      typologyLabel: "Grietas",
      room: "Habitación 1",
      initialDate: "2024-09-02",
      initialDateFormatted: "02 Sep 2024 - 10:00 AM",
      initialNote: "Fisura de 45 cm de longitud junto a ventana que da hacia la calle. Sin desprendimiento de revoque.",
      initialImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
      initialDimensions: "Largo 45 cm",
      imputabilidad: "Existente Previo",
      severity: "Baja",
      status: "Activo",
      updates: []
    }
  ]
};

// Clase Administradora de Estado Local
class CasaAlertaStore {
  constructor() {
    this.STORAGE_KEY = 'casaalerta_data_v1';
    this.data = this.loadData();
    this.activeDamageId = this.data.damages[0]?.id || null;
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo localStorage, usando datos iniciales", e);
    }
    this.saveData(INITIAL_STATE);
    return JSON.parse(JSON.stringify(INITIAL_STATE));
  }

  saveData(dataToSave) {
    this.data = dataToSave || this.data;
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error("Error guardando en localStorage", e);
    }
  }

  getDamages() {
    return this.data.damages;
  }

  getDamage(id) {
    return this.data.damages.find(d => d.id === id);
  }

  // RF-01: Registrar Nuevo Daño
  addDamage(newDamage) {
    const nextIndex = this.data.damages.length + 1;
    const generatedId = `DM-${String(nextIndex).padStart(2, '0')}`;
    
    const damageRecord = {
      id: generatedId,
      title: newDamage.title || `Incidencia en ${newDamage.room}`,
      typology: newDamage.typology || 'humedad',
      typologyLabel: newDamage.typologyLabel || 'Humedad',
      room: newDamage.room || 'Zona General',
      initialDate: newDamage.date || new Date().toISOString().split('T')[0],
      initialDateFormatted: newDamage.dateFormatted || new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      initialNote: newDamage.description,
      initialImage: newDamage.image,
      initialDimensions: newDamage.dimensions || 'Área estimada',
      imputabilidad: newDamage.imputabilidad || 'Incidencia Reportada',
      severity: newDamage.severity || 'Media',
      status: 'Activo',
      updates: []
    };

    this.data.damages.unshift(damageRecord);
    this.saveData();
    this.activeDamageId = generatedId;
    return damageRecord;
  }

  // RF-02: Añadir Foto / Evidencia Posterior de Seguimiento
  addFollowUp(damageId, updateData) {
    const damage = this.getDamage(damageId);
    if (!damage) return null;

    const nextUpdateId = `UPD-${damageId.replace('DM-', '')}-${(damage.updates?.length || 0) + 1}`;
    const followUp = {
      id: nextUpdateId,
      date: updateData.date || new Date().toISOString().split('T')[0],
      dateFormatted: updateData.dateFormatted || new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
      note: updateData.note,
      image: updateData.image,
      dimensions: updateData.dimensions || 'Revisión técnica',
      severity: updateData.severity || damage.severity
    };

    if (!damage.updates) damage.updates = [];
    damage.updates.push(followUp);
    this.saveData();
    return followUp;
  }

  // Estadísticas del Dashboard
  getStats() {
    const totalDamages = this.data.damages.length;
    let totalEvidences = totalDamages;
    this.data.damages.forEach(d => {
      totalEvidences += (d.updates ? d.updates.length : 0);
    });

    return {
      activeDamages: totalDamages,
      totalEvidences: totalEvidences,
      reportsGenerated: 1,
      pendingWithLandlord: 0
    };
  }
}

// Instancia global
window.appStore = new CasaAlertaStore();

// Utilidades de Interfaz y Enrutamiento SPA
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
  initDashboardView();
  initNewDamageForm();
  initTimelineView();
  initPdfReportView();
  initModalFollowUp();
});

// Enrutador Simple Basado en Hash
function initRouter() {
  const views = {
    'dashboard': document.getElementById('view-dashboard'),
    'nuevo-registro': document.getElementById('view-nuevo-registro'),
    'linea-de-tiempo': document.getElementById('view-linea-de-tiempo'),
    'reportes-pdf': document.getElementById('view-reportes-pdf')
  };

  const navLinks = document.querySelectorAll('[data-path]');

  function navigateTo(path) {
    // Si no existe, default a dashboard
    const targetPath = views[path] ? path : 'dashboard';

    Object.keys(views).forEach(key => {
      if (views[key]) {
        if (key === targetPath) {
          views[key].classList.remove('hidden');
        } else {
          views[key].classList.add('hidden');
        }
      }
    });

    // Actualizar clases activas en navegación
    navLinks.forEach(link => {
      const linkPath = link.getAttribute('data-path');
      if (linkPath === targetPath) {
        link.classList.add('bg-primary-container', 'text-on-primary', 'font-semibold');
        link.classList.remove('text-on-surface-variant', 'hover:bg-surface-container-high', 'hover:text-on-surface');
      } else {
        link.classList.remove('bg-primary-container', 'text-on-primary', 'font-semibold');
        link.classList.add('text-on-surface-variant', 'hover:bg-surface-container-high', 'hover:text-on-surface');
      }
    });

    // Refrescar la vista actual
    if (targetPath === 'dashboard') renderDashboardCards();
    if (targetPath === 'linea-de-tiempo') renderTimelineView(window.appStore.activeDamageId);
    if (targetPath === 'reportes-pdf') renderPdfReport();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Interceptar clicks en enlaces data-path
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-path]');
    if (trigger) {
      e.preventDefault();
      const path = trigger.getAttribute('data-path');
      window.location.hash = path;
      navigateTo(path);
    }
  });

  // Reaccionar a cambios de hash
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.replace('#', '') || 'dashboard';
    navigateTo(path);
  });

  // Carga inicial
  const initialPath = window.location.hash.replace('#', '') || 'dashboard';
  navigateTo(initialPath);
}

// 1. VISTA DASHBOARD (Mis Daños)
function initDashboardView() {
  const filterButtons = document.querySelectorAll('.filter-type-btn');
  const zoneSelect = document.getElementById('zone-filter-select');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container-lowest', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface-container-lowest', 'text-on-surface-variant');
      
      const filter = btn.getAttribute('data-filter');
      renderDashboardCards(filter, zoneSelect ? zoneSelect.value : 'all');
    });
  });

  if (zoneSelect) {
    zoneSelect.addEventListener('change', () => {
      const activeTypeBtn = document.querySelector('.filter-type-btn.bg-primary');
      const activeType = activeTypeBtn ? activeTypeBtn.getAttribute('data-filter') : 'all';
      renderDashboardCards(activeType, zoneSelect.value);
    });
  }

  renderDashboardCards();
}

function renderDashboardCards(filterType = 'all', filterZone = 'all') {
  const container = document.getElementById('dashboard-cards-container');
  if (!container) return;

  const damages = window.appStore.getDamages();
  const stats = window.appStore.getStats();

  // Actualizar métricas del ribbon
  const statActivos = document.getElementById('stat-active-damages');
  const statEvidencias = document.getElementById('stat-total-evidences');
  if (statActivos) statActivos.textContent = stats.activeDamages;
  if (statEvidencias) statEvidencias.textContent = stats.totalEvidences;

  // Filtrado
  const filtered = damages.filter(d => {
    const matchesType = filterType === 'all' || d.typology === filterType;
    const matchesZone = filterZone === 'all' || d.room.toLowerCase().includes(filterZone.toLowerCase());
    return matchesType && matchesZone;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-12 text-center py-12 bg-surface-container-low rounded-xl">
        <span class="material-symbols-outlined text-4xl text-outline mb-2">find_in_page</span>
        <p class="font-headline-sm text-on-surface">No se encontraron daños con los filtros seleccionados.</p>
        <p class="font-body-sm text-on-surface-variant mt-1">Prueba seleccionando "Todos" o registra una nueva incidencia.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(d => {
    const followUpsCount = d.updates ? d.updates.length : 0;
    const totalPhotos = 1 + followUpsCount;
    const latestDate = followUpsCount > 0 ? d.updates[followUpsCount - 1].dateFormatted : d.initialDateFormatted;
    
    const severityColors = {
      'Alta': 'bg-error-container text-error',
      'Media': 'bg-secondary-fixed text-secondary',
      'Baja': 'bg-surface-container-highest text-on-surface',
      'Crítica': 'bg-error text-on-error'
    };

    const severityClass = severityColors[d.severity] || 'bg-surface-container text-primary';

    return `
      <div class="bg-surface-container-lowest border border-outline-variant/40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
        <div>
          <!-- Thumbnail & Overlay Badges -->
          <div class="relative w-full h-48 bg-surface-container-high overflow-hidden">
            <img src="${d.initialImage}" alt="${d.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div class="absolute top-space-sm left-space-sm bg-primary/90 backdrop-blur-md text-on-primary px-2.5 py-1 rounded text-label-sm font-semibold flex items-center gap-1 shadow">
              <span class="material-symbols-outlined text-xs">verified</span>
              <span>${d.id}</span>
            </div>
            <div class="absolute top-space-sm right-space-sm ${severityClass} px-2.5 py-1 rounded text-label-sm font-bold shadow">
              ${d.severity}
            </div>
            <div class="absolute bottom-space-sm left-space-sm bg-inverse-surface/80 text-inverse-on-surface px-2 py-0.5 rounded text-label-sm flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">location_on</span>
              <span>${d.room}</span>
            </div>
            <div class="absolute bottom-space-sm right-space-sm bg-inverse-surface/80 text-inverse-on-surface px-2 py-0.5 rounded text-label-sm flex items-center gap-1">
              <span class="material-symbols-outlined text-xs">photo_camera</span>
              <span>${totalPhotos} fotos</span>
            </div>
          </div>

          <!-- Card Content -->
          <div class="p-space-md flex flex-col gap-space-xs">
            <div class="flex items-center justify-between">
              <span class="text-label-sm font-semibold uppercase text-secondary tracking-wide">${d.typologyLabel}</span>
              <span class="text-label-sm text-on-surface-variant">${latestDate}</span>
            </div>
            <h3 class="font-headline-sm text-base font-bold text-primary group-hover:text-primary-container transition-colors line-clamp-1">
              ${d.title}
            </h3>
            <p class="font-body-sm text-on-surface-variant line-clamp-2 mt-1">
              ${d.initialNote}
            </p>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="p-space-md pt-0 border-t border-outline-variant/20 mt-space-sm flex items-center justify-between gap-space-xs">
          <button onclick="openTimelineFor('${d.id}')" class="flex-1 inline-flex items-center justify-center gap-1 bg-surface-container-low hover:bg-surface-container text-primary py-2 px-3 rounded-lg text-label-sm font-semibold transition-colors">
            <span class="material-symbols-outlined text-sm">history_edu</span>
            <span>Ver Evolución</span>
          </button>
          <button onclick="openFollowUpModal('${d.id}')" class="inline-flex items-center justify-center gap-1 bg-primary hover:bg-primary-container text-on-primary py-2 px-3 rounded-lg text-label-sm font-semibold transition-colors" title="Añadir foto de seguimiento (RF-02)">
            <span class="material-symbols-outlined text-sm">add_a_photo</span>
            <span>+ Foto</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// 2. VISTA REGISTRAR NUEVO DAÑO (RF-01)
function initNewDamageForm() {
  const form = document.getElementById('damage-form');
  const fileInput = document.getElementById('photo-upload-input');
  const previewImg = document.getElementById('main-preview-img');
  const sampleSelector = document.getElementById('sample-photos-selector');

  let currentImageData = previewImg ? previewImg.src : '';

  // Manejo de carga de imagen local (Base64)
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          currentImageData = event.target.result;
          if (previewImg) previewImg.src = currentImageData;
          showToast('Fotografía cargada y metadatos EXIF generados');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Selección de fotos muestra
  if (sampleSelector) {
    sampleSelector.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const url = btn.getAttribute('data-img-url');
        if (url && previewImg) {
          currentImageData = url;
          previewImg.src = url;
          showToast('Imagen de referencia seleccionada');
        }
      });
    });
  }

  // Chips de tipología
  const typologyChips = document.querySelectorAll('.typology-chip');
  let selectedTypology = 'humedad';
  let selectedTypologyLabel = 'Humedad';

  typologyChips.forEach(chip => {
    chip.addEventListener('click', () => {
      typologyChips.forEach(c => {
        c.classList.remove('bg-primary', 'text-on-primary', 'font-bold');
        c.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      });
      chip.classList.add('bg-primary', 'text-on-primary', 'font-bold');
      chip.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
      selectedTypology = chip.getAttribute('data-type');
      selectedTypologyLabel = chip.querySelector('span:last-child')?.textContent || selectedTypology;
    });
  });

  // Envío del formulario
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const titleInput = document.getElementById('damage-title');
      const roomSelect = document.getElementById('damage-room');
      const dateInput = document.getElementById('damage-date');
      const descInput = document.getElementById('damage-description');
      const severitySelect = document.getElementById('damage-severity');
      const priorRadio = document.querySelector('input[name="prior-existence"]:checked');

      if (!descInput || !descInput.value.trim()) {
        showToast('Por favor describe la incidencia o anomalía detectada.');
        if (descInput) descInput.focus();
        return;
      }

      const newRecord = window.appStore.addDamage({
        title: titleInput?.value.trim() || `Daño de ${selectedTypologyLabel} en ${roomSelect?.value || 'Habitación'}`,
        typology: selectedTypology,
        typologyLabel: selectedTypologyLabel,
        room: roomSelect?.value || 'Zona General',
        date: dateInput?.value || new Date().toISOString().split('T')[0],
        dateFormatted: dateInput?.value ? formatDateStr(dateInput.value) : new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }),
        description: descInput.value.trim(),
        image: currentImageData || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        severity: severitySelect?.value || 'Media',
        imputabilidad: priorRadio ? priorRadio.value : 'Incidencia Reportada'
      });

      showToast(`¡Daño registrado exitosamente como ${newRecord.id}!`);
      
      // Reset form
      if (titleInput) titleInput.value = '';
      if (descInput) descInput.value = '';

      // Redirigir al dashboard para ver el nuevo registro
      window.location.hash = 'dashboard';
    });
  }
}

// 3. VISTA LÍNEA DE TIEMPO & COMPARADOR CRONOLÓGICO (RF-02 y RF-03)
function initTimelineView() {
  const selectDamage = document.getElementById('timeline-damage-select');
  if (selectDamage) {
    selectDamage.addEventListener('change', (e) => {
      renderTimelineView(e.target.value);
    });
  }
}

function openTimelineFor(damageId) {
  window.appStore.activeDamageId = damageId;
  window.location.hash = 'linea-de-tiempo';
  renderTimelineView(damageId);
}

function renderTimelineView(damageId) {
  const idToRender = damageId || window.appStore.activeDamageId || window.appStore.getDamages()[0]?.id;
  const damage = window.appStore.getDamage(idToRender);
  if (!damage) return;

  window.appStore.activeDamageId = idToRender;

  // Actualizar el selector de daño
  const selectDamage = document.getElementById('timeline-damage-select');
  if (selectDamage) {
    selectDamage.innerHTML = window.appStore.getDamages().map(d => `
      <option value="${d.id}" ${d.id === idToRender ? 'selected' : ''}>${d.id} — ${d.title} (${d.room})</option>
    `).join('');
  }

  // Header info
  const titleElem = document.getElementById('timeline-title');
  const subtitleElem = document.getElementById('timeline-subtitle');
  if (titleElem) titleElem.textContent = `${damage.id} — ${damage.title}`;
  if (subtitleElem) subtitleElem.textContent = `${damage.room} • Tipología: ${damage.typologyLabel} • Imputabilidad: ${damage.imputabilidad}`;

  // Comparador de Antes vs Después
  const beforeImg = document.getElementById('comparison-before-img');
  const afterImg = document.getElementById('comparison-after-img');
  const beforeDate = document.getElementById('comparison-before-date');
  const afterDate = document.getElementById('comparison-after-date');
  const beforeDesc = document.getElementById('comparison-before-desc');
  const afterDesc = document.getElementById('comparison-after-desc');

  if (beforeImg) beforeImg.src = damage.initialImage;
  if (beforeDate) beforeDate.textContent = `PRIMERA EVIDENCIA • ${damage.initialDateFormatted}`;
  if (beforeDesc) beforeDesc.textContent = damage.initialNote;

  const hasUpdates = damage.updates && damage.updates.length > 0;
  const latest = hasUpdates ? damage.updates[damage.updates.length - 1] : damage;

  if (afterImg) afterImg.src = hasUpdates ? latest.image : damage.initialImage;
  if (afterDate) afterDate.textContent = hasUpdates ? `ÚLTIMA EVIDENCIA • ${latest.dateFormatted}` : `EVIDENCIA INICIAL • ${damage.initialDateFormatted}`;
  if (afterDesc) afterDesc.textContent = hasUpdates ? latest.note : 'Aún no se han añadido evidencias posteriores. Puedes añadir una fotografía para comparar la evolución.';

  // Timeline Vertical de Hitos
  const timelineNodesContainer = document.getElementById('timeline-vertical-nodes');
  if (timelineNodesContainer) {
    const allEvents = [
      {
        tag: 'Registro Inicial (RF-01)',
        date: damage.initialDateFormatted,
        note: damage.initialNote,
        image: damage.initialImage,
        severity: damage.severity,
        dimensions: damage.initialDimensions
      },
      ...(damage.updates || []).map((u, i) => ({
        tag: `Inspección de Seguimiento #${i + 1} (RF-02)`,
        date: u.dateFormatted,
        note: u.note,
        image: u.image,
        severity: u.severity,
        dimensions: u.dimensions
      }))
    ];

    timelineNodesContainer.innerHTML = allEvents.map((evt, idx) => `
      <div class="relative pl-8 pb-8 border-l-2 ${idx === allEvents.length - 1 ? 'border-transparent' : 'border-primary-fixed'}">
        <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-primary-fixed/40"></div>
        <div class="bg-surface-container-low p-space-md rounded-xl shadow-sm flex flex-col md:flex-row gap-space-md items-start">
          <img src="${evt.image}" alt="${evt.tag}" class="w-full md:w-44 h-32 object-cover rounded-lg shadow-sm flex-shrink-0" />
          <div class="flex-1 flex flex-col gap-1">
            <div class="flex flex-wrap items-center justify-between gap-1">
              <span class="font-label-sm font-semibold text-secondary uppercase tracking-wider">${evt.tag}</span>
              <span class="font-label-sm text-on-surface-variant">${evt.date}</span>
            </div>
            <p class="font-body-md text-on-surface font-medium mt-1">${evt.note}</p>
            <div class="flex items-center gap-space-xs mt-2">
              <span class="px-2 py-0.5 rounded bg-surface-container-highest text-on-surface text-label-sm font-semibold">${evt.dimensions}</span>
              <span class="px-2 py-0.5 rounded bg-primary-fixed text-primary text-label-sm font-bold">Severidad: ${evt.severity}</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }
}

// 4. MODAL AÑADIR FOTO DE SEGUIMIENTO (RF-02)
let currentFollowUpDamageId = null;

function initModalFollowUp() {
  const modal = document.getElementById('modal-followup');
  const closeBtn = document.getElementById('modal-close-btn');
  const cancelBtn = document.getElementById('modal-cancel-btn');
  const fileInput = document.getElementById('followup-file-input');
  const previewImg = document.getElementById('followup-preview-img');
  const form = document.getElementById('followup-form');

  let uploadedFollowUpImage = '';

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          uploadedFollowUpImage = event.target.result;
          if (previewImg) previewImg.src = uploadedFollowUpImage;
          showToast('Fotografía de evolución cargada correctamente');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!currentFollowUpDamageId) return;

      const noteInput = document.getElementById('followup-note');
      const dimensionsInput = document.getElementById('followup-dimensions');
      const severitySelect = document.getElementById('followup-severity');

      if (!noteInput || !noteInput.value.trim()) {
        showToast('Escribe una nota sobre la evolución o cambio en el daño.');
        return;
      }

      window.appStore.addFollowUp(currentFollowUpDamageId, {
        note: noteInput.value.trim(),
        image: uploadedFollowUpImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiP87NMFx0UKMEZ69kBLk93LK0np0BDEaxeaiV4zm-H9-eCTOJ-ARElQsDrKWf2UVXlNx87imuf_9E2N4paC8q5_GsgpwYk0ch0aIHtYJLF6I7O1dt0tSq-WtGtKShhZhT8iNbTEtiZzGfu6VVTxPV5dp1RGwOGkQyBpL5pfArw7pOUJxNf7FvJjDF0au_UvreOIrLlxJVbU9-KIT8rTH8pn3OG2V7_bKGeios8V7PzJ5OrD0bxXCofw',
        dimensions: dimensionsInput?.value || 'Área ampliada',
        severity: severitySelect?.value || 'Alta'
      });

      showToast('Evidencia de seguimiento guardada exitosamente (RF-02)');
      closeModal();
      renderDashboardCards();
      renderTimelineView(currentFollowUpDamageId);
    });
  }
}

function openFollowUpModal(damageId) {
  currentFollowUpDamageId = damageId;
  const damage = window.appStore.getDamage(damageId);
  const modal = document.getElementById('modal-followup');
  const modalSubtitle = document.getElementById('modal-followup-damage-title');

  if (modalSubtitle && damage) {
    modalSubtitle.textContent = `${damage.id}: ${damage.title} (${damage.room})`;
  }

  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

function closeModal() {
  const modal = document.getElementById('modal-followup');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

// 5. VISTA GENERADOR Y VISOR DE REPORTE PDF (RF-04 y RF-05)
function initPdfReportView() {
  const printBtn = document.getElementById('print-pdf-btn');
  const copyMsgBtn = document.getElementById('copy-wa-msg-btn');
  const waSendLink = document.getElementById('whatsapp-send-link');
  const waTextarea = document.getElementById('whatsapp-message-text');

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (waTextarea && waSendLink) {
    waTextarea.addEventListener('input', (e) => {
      const text = e.target.value;
      waSendLink.href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    });
  }

  if (copyMsgBtn && waTextarea) {
    copyMsgBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(waTextarea.value).then(() => {
        showToast('Mensaje de notificación copiado para WhatsApp');
      }).catch(() => {
        showToast('Texto listo para compartir');
      });
    });
  }
}

function renderPdfReport() {
  const apt = window.appStore.data.apartment;
  const damages = window.appStore.getDamages();

  const reportDateElem = document.getElementById('pdf-report-date');
  if (reportDateElem) {
    reportDateElem.textContent = new Date().toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  // Tabla resumen de daños en PDF
  const tbody = document.getElementById('pdf-damages-tbody');
  if (tbody) {
    tbody.innerHTML = damages.map(d => `
      <tr class="bg-surface-container-lowest border-b border-surface-container">
        <td class="p-2 font-mono font-bold text-primary">${d.id}</td>
        <td class="p-2 font-semibold text-on-surface">${d.title}</td>
        <td class="p-2 text-on-surface-variant">${d.room}</td>
        <td class="p-2 text-on-surface-variant">${d.initialDateFormatted}</td>
        <td class="p-2">
          <span class="px-2 py-0.5 rounded text-xs font-bold ${d.severity === 'Alta' ? 'bg-error-container text-error' : 'bg-secondary-fixed text-secondary'}">
            ${d.severity}
          </span>
        </td>
        <td class="p-2">
          <span class="px-2 py-0.5 rounded bg-surface-container text-primary text-xs font-medium">${d.imputabilidad}</span>
        </td>
      </tr>
    `).join('');
  }

  // Fichas fotográficas detalladas para el folio PDF
  const photoSheetsContainer = document.getElementById('pdf-photo-sheets');
  if (photoSheetsContainer) {
    photoSheetsContainer.innerHTML = damages.map((d, index) => {
      const hasFollowUp = d.updates && d.updates.length > 0;
      const latest = hasFollowUp ? d.updates[d.updates.length - 1] : null;

      return `
        <div class="border border-outline-variant/50 rounded-xl p-space-md bg-surface-container-lowest flex flex-col gap-space-sm mb-6 break-inside-avoid">
          <div class="flex items-center justify-between border-b border-outline-variant/30 pb-2">
            <div class="flex items-center gap-2">
              <span class="font-bold text-primary font-mono text-sm">[ANEXO FOTOGRÁFICO #${index + 1}]</span>
              <span class="font-bold text-on-surface">${d.id}: ${d.title}</span>
            </div>
            <span class="text-xs bg-surface-container px-2 py-0.5 rounded text-primary font-medium">Ubicación: ${d.room}</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Imagen 1 -->
            <div class="flex flex-col gap-1">
              <span class="text-xs font-semibold text-secondary uppercase">Registro Inicial — ${d.initialDateFormatted}</span>
              <img src="${d.initialImage}" alt="Registro inicial ${d.id}" class="w-full h-44 object-cover rounded border border-outline-variant/30" />
              <p class="text-xs text-on-surface-variant italic mt-1">"${d.initialNote}"</p>
            </div>

            <!-- Imagen 2 (Si existe evolución) -->
            ${hasFollowUp ? `
              <div class="flex flex-col gap-1">
                <span class="text-xs font-semibold text-error uppercase">Evolución Posterior — ${latest.dateFormatted}</span>
                <img src="${latest.image}" alt="Evolución posterior ${d.id}" class="w-full h-44 object-cover rounded border border-outline-variant/30" />
                <p class="text-xs text-on-surface-variant italic mt-1">"${latest.note}"</p>
              </div>
            ` : `
              <div class="flex flex-col items-center justify-center bg-surface-container-low rounded border border-dashed border-outline-variant p-4 text-center">
                <span class="material-symbols-outlined text-outline text-3xl">photo_library</span>
                <span class="text-xs text-on-surface-variant mt-1">Sin evoluciones críticas registradas a la fecha.</span>
              </div>
            `}
          </div>
        </div>
      `;
    }).join('');
  }

  // Prellenar mensaje de WhatsApp
  const waTextarea = document.getElementById('whatsapp-message-text');
  const waSendLink = document.getElementById('whatsapp-send-link');
  if (waTextarea) {
    const defaultText = `Estimado(a) ${apt.landlord},\n\nLe saluda ${apt.student}, arrendatario del ${apt.name} (${apt.address}).\n\nPor medio del presente adjunto formalmente el Expediente Probatorio de Daños (Radicado: ${apt.radicado}) con el registro fotográfico y cronológico de las incidencias activas en el apartamento para su correspondiente revisión e intervención oportuna.\n\nTotal de incidencias documentadas: ${damages.length}.\nPuede consultar el certificado formal y metadatos probatorios.\n\nQuedo atento a su pronta respuesta.\nAtentamente,\n${apt.student}\n${apt.university}`;
    waTextarea.value = defaultText;
    if (waSendLink) {
      waSendLink.href = `https://wa.me/?text=${encodeURIComponent(defaultText)}`;
    }
  }
}

// Toast Notificación
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMessage');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('flex');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
    toast.classList.remove('flex');
  }, 3500);
}

function formatDateStr(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    return d.toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
  }
  return dateStr;
}

// Exportar funciones necesarias a nivel global
window.openTimelineFor = openTimelineFor;
window.openFollowUpModal = openFollowUpModal;
window.closeModal = closeModal;
