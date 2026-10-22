# CasaAlerta

> **Evidencia & Control para Estudiantes Universitarios en Apartamentos Arrendados**

CasaAlerta es una aplicación web y móvil diseñada para estudiantes universitarios (18-25 años) en Sogamoso (Boyacá, Colombia) que viven en apartamentos arrendados y necesitan documentar problemas (humedad, grietas, filtraciones, daños eléctricos y de plomería) de manera ágil, visual y con respaldo cronológico pericial.

---

## 🎯 Problema & Propósito
Los estudiantes a menudo carecen de una vía organizada para registrar cuándo aparecieron los deterioros, cómo evolucionan y cómo comunicarlos formalmente al arrendador para proteger su depósito de garantía. CasaAlerta resuelve esto mediante:

1. **RF-01: Registro de daño con fotografía y metadatos probatorios** (tipología, zona del inmueble, fecha/hora y coordenadas).
2. **RF-02: Adición de fotos de seguimiento** a un daño existente.
3. **RF-03: Línea de tiempo cronológica (Timeline/Time-lapse)** con slider comparativo de evolución (*Antes vs. Después*).
4. **RF-04: Generador de informe probatorio PDF** con radicado y formato formal de notificación.
5. **RF-05: Acciones directas para compartir reporte vía WhatsApp** y exportación de archivos.

---

## 📁 Estructura del Proyecto

```
casa-alerta/
├── docs/
│   ├── prd_casaalerta.txt                       # Documento de Requerimientos de Producto (PRD)
│   ├── DESIGN.md                                # Sistema de Diseño "Custodia Inquilino Moderno"
│   └── prototypes/                              # Pantallas prototipo de referencia
│       ├── dashboard_mis_reportes_de_apartamento/
│       ├── registro_de_nuevo_da_o/
│       ├── seguimiento_y_l_nea_de_tiempo/
│       ├── modal_a_adir_foto_de_seguimiento_rf_02/
│       └── reporte_pdf_y_env_o_a_arrendador/
├── index.html                                   # Aplicación unificada interactiva (SPA)
├── README.md                                    # Documentación del proyecto
└── .gitignore                                   # Reglas de exclusión de Git
```

---

## 🚀 Cómo Ejecutar en Local

No requiere dependencias complejas ni procesos de compilación. Simplemente abre `index.html` en tu navegador web preferido:

- En Windows: doble clic sobre `index.html` o mediante un servidor local estático.

---

## 🎨 Sistema de Diseño: Custodia Inquilino Moderno
- **Paleta Cromática**:
  - Azul Zafiro / Cobalto (`#1E3A8A` / `#00236F`): Confianza pericial y rigor contractual.
  - Ámbar Preventivo (`#F59E0B` / `#855300`): Advertencias y daños en seguimiento.
  - Verde Esmeralda (`#10B981` / `#004A31`): Estados subsanados y acuerdos formalizados.
- **Tipografía**: Plus Jakarta Sans.
- **Iconografía**: Google Material Symbols Outlined.

---

## 👤 Autor
Desarrollado para el usuario **slrodriguezr-ctrl** con asistencia de Antigravity.
