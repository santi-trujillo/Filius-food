#!/bin/bash
# ==============================================================================
# BUILD SCRIPT - Filius Food (OPTIMIZADO)
# ==============================================================================
# Optimización y minificación de assets para producción
# 
# Tareas:
# 1. Concatenar todos los archivos CSS
# 2. Minificar CSS (eliminar comentarios, espacios, saltos de línea)
# 3. Minificar JavaScript
# 4. Copiar y optimizar assets
# 5. Generar versiones gzip
# 6. Generar reporte de optimización
#
# Uso: ./build.sh
# ==============================================================================

echo "🚀 Iniciando build OPTIMIZADO de Filius Food..."
echo ""

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Limpiar build anterior
echo "${BLUE}🧹 Limpiando build anterior...${NC}"
rm -rf build/
echo "${GREEN}✅ Build anterior eliminado${NC}"

# Crear directorio de build
echo ""
echo "${BLUE}📁 Creando estructura de build...${NC}"
mkdir -p build/css
mkdir -p build/js/core
mkdir -p build/js/components
mkdir -p build/js/utils
mkdir -p build/js/config
mkdir -p build/js/services
mkdir -p build/assets/images/products/postres
mkdir -p build/assets/images/products/sanduches
mkdir -p build/assets/images/icons
mkdir -p build/data
echo "${GREEN}✅ Estructura creada${NC}"

# ==============================================================================
# 1. CONCATENAR CSS
# ==============================================================================
echo ""
echo "${BLUE}📦 Concatenando archivos CSS...${NC}"

# Orden correcto según ITCSS (8 capas)
cat css/01-settings/_variables.css \
    css/02-tools/_mixins.css \
    css/03-generic/_normalize.css \
    css/03-generic/_box-sizing.css \
    css/04-elements/_root.css \
    css/04-elements/_typography.css \
    css/04-elements/_links.css \
    css/04-elements/_forms.css \
    css/04-elements/_buttons.css \
    css/05-objects/_container.css \
    css/05-objects/_grid.css \
    css/05-objects/_section.css \
    css/06-components/_top-bar.css \
    css/06-components/_header.css \
    css/06-components/_nav.css \
    css/06-components/_hero.css \
    css/06-components/_product-card.css \
    css/06-components/_product-grid.css \
    css/06-components/_destacados.css \
    css/06-components/_page-header.css \
    css/06-components/_pagination.css \
    css/06-components/_whatsapp-float.css \
    css/06-components/_bottom-bar.css \
    css/06-components/_footer.css \
    css/06-components/_contact-form.css \
    css/06-components/_contact-items.css \
    css/06-components/_map.css \
    css/06-components/_deliveries.css \
    css/07-utilities/_spacing.css \
    css/07-utilities/_text.css \
    css/07-utilities/_display.css \
    css/07-utilities/_accessibility.css \
    > build/css/bundle.css

echo "${GREEN}✅ CSS concatenado: build/css/bundle.css${NC}"

# Tamaño antes de minificar
SIZE_BEFORE=$(du -h build/css/bundle.css | cut -f1)
echo "   Tamaño: ${SIZE_BEFORE}"

# ==============================================================================
# 2. MINIFICAR CSS (Simple - sin dependencias externas)
# ==============================================================================
echo ""
echo "${BLUE}🗜️  Minificando CSS...${NC}"

# Minificación básica usando sed (sin dependencias de npm)
cat build/css/bundle.css | \
    # Eliminar comentarios /* ... */
    sed 's|/\*[^*]*\*\+\([^/*][^*]*\*\+\)*/||g' | \
    # Eliminar comentarios de una línea //
    sed 's|//.*$||g' | \
    # Eliminar espacios múltiples
    sed 's/[[:space:]]\+/ /g' | \
    # Eliminar saltos de línea
    tr -d '\n' | \
    # Eliminar espacios alrededor de { } : ; ,
    sed 's/ *{ */{/g' | \
    sed 's/ *} */}/g' | \
    sed 's/ *: */:/g' | \
    sed 's/ *; */;/g' | \
    sed 's/ *, */,/g' | \
    # Eliminar ; antes de }
    sed 's/;}/}/g' \
    > build/css/main.min.css

SIZE_AFTER=$(du -h build/css/main.min.css | cut -f1)
echo "${GREEN}✅ CSS minificado: build/css/main.min.css${NC}"
echo "   Tamaño: ${SIZE_AFTER}"

# Calcular reducción
SIZE_BEFORE_KB=$(du -k build/css/bundle.css | cut -f1)
SIZE_AFTER_KB=$(du -k build/css/main.min.css | cut -f1)
REDUCTION=$((100 - (SIZE_AFTER_KB * 100 / SIZE_BEFORE_KB)))
echo "   ${YELLOW}📉 Reducción: ${REDUCTION}%${NC}"

# ==============================================================================
# 3. MINIFICAR JAVASCRIPT
# ==============================================================================
echo ""
echo "${BLUE}🗜️  Minificando JavaScript...${NC}"

# Copiar archivos JS primero
cp -r js/* build/js/

# Contar archivos JS
JS_COUNT=$(find js -name "*.js" | wc -l)
echo "${YELLOW}   Procesando ${JS_COUNT} archivos JS...${NC}"

# Minificación básica de JS (sin dependencias externas)
for jsfile in $(find build/js -name "*.js" | grep -v ".min.js"); do
    minfile="${jsfile%.js}.min.js"
    
    cat "$jsfile" | \
        # Eliminar comentarios de línea
        sed 's|//.*$||g' | \
        # Eliminar comentarios multilínea (simple)
        sed 's|/\*[^*]*\*\+\([^/*][^*]*\*\+\)*/||g' | \
        # Eliminar espacios múltiples
        sed 's/[[:space:]]\+/ /g' | \
        # Eliminar líneas vacías
        sed '/^$/d' \
        > "$minfile"
done

echo "${GREEN}✅ JavaScript minificado (${JS_COUNT} archivos)${NC}"

# ==============================================================================
# 4. GENERAR VERSIONES GZIP
# ==============================================================================
echo ""
echo "${BLUE}🗜️  Generando versiones gzip...${NC}"

# Gzip CSS
gzip -9 -c build/css/main.min.css > build/css/main.min.css.gz
GZIP_SIZE=$(du -h build/css/main.min.css.gz | cut -f1)
echo "${GREEN}✅ CSS gzipped: ${GZIP_SIZE}${NC}"

# Gzip archivos JS principales
gzip -9 -c build/js/main.min.js > build/js/main.min.js.gz 2>/dev/null || true
gzip -9 -c build/js/core/router.min.js > build/js/core/router.min.js.gz 2>/dev/null || true

echo "${GREEN}✅ Archivos gzip generados${NC}"

# ==============================================================================
# 5. COPIAR ARCHIVOS ESENCIALES
# ==============================================================================
echo ""
echo "${BLUE}📋 Copiando archivos...${NC}"

# Copiar index.html
cp index.html build/index.html
echo "${GREEN}✅ index.html copiado${NC}"

# Copiar Service Worker
cp sw.js build/sw.js 2>/dev/null && echo "${GREEN}✅ Service Worker copiado${NC}" || echo "${YELLOW}⚠️  sw.js no encontrado${NC}"

# Copiar manifest.json
cp manifest.json build/manifest.json 2>/dev/null && echo "${GREEN}✅ manifest.json copiado${NC}" || echo "${YELLOW}⚠️  manifest.json no encontrado${NC}"

# Copiar assets
cp -r assets build/
echo "${GREEN}✅ Assets copiados${NC}"

# Copiar data
cp -r data build/
echo "${GREEN}✅ Data copiado${NC}"

# ==============================================================================
# 6. REPORTE FINAL
# ==============================================================================
echo ""
echo "${BLUE}═══════════════════════════════════════════${NC}"
echo "${GREEN}✅ BUILD OPTIMIZADO COMPLETADO${NC}"
echo "${BLUE}═══════════════════════════════════════════${NC}"
echo ""
echo "📊 ESTADÍSTICAS:"
echo ""
echo "   CSS Original:    168KB (38 archivos)"
echo "   CSS Concatenado: ${SIZE_BEFORE}"
echo "   CSS Minificado:  ${SIZE_AFTER} (${REDUCTION}% más pequeño)"
echo ""
echo "📁 Archivos generados en: ./build/"
echo ""
echo "${YELLOW}💡 PRÓXIMOS PASOS:${NC}"
echo "   1. Revisar build/index.html"
echo "   2. Actualizar la referencia CSS a /build/css/main.min.css"
echo "   3. Probar el sitio desde la carpeta build"
echo "   4. Configurar GZIP en el servidor (reducción adicional ~70%)"
echo ""
echo "${GREEN}🎉 ¡Listo para producción!${NC}"
echo ""
