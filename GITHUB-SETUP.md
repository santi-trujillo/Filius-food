# 📦 Guía de GitHub - Filius Food

## 🎯 Estado Actual del Repositorio

✅ **Repositorio Git inicializado**  
✅ **Commit inicial completado** (115 archivos)  
✅ **Rama principal:** `main`  
✅ **Rama de desarrollo:** `development` (activa)

---

## 🚀 Paso 1: Crear Repositorio en GitHub

1. Ve a [GitHub](https://github.com)
2. Click en **"New repository"** (botón verde)
3. Configura el repositorio:
   - **Repository name:** `filius-food` (o el nombre que prefieras)
   - **Description:** "Chocolatería artesanal - SPA con PWA, optimizada para performance"
   - **Visibilidad:** Public o Private (tú decides)
   - ⚠️ **NO marques:** "Initialize with README" (ya lo tenemos)
   - ⚠️ **NO agregues:** .gitignore ni license (ya los tenemos)
4. Click en **"Create repository"**

---

## 🔗 Paso 2: Conectar con GitHub

Copia y ejecuta estos comandos **en este orden**:

### A. Agregar el remote (reemplaza USERNAME con tu usuario de GitHub):

```bash
cd "/home/santiagotrujllo/Documentos/Proyectos web/Filius-Foods"
git remote add origin https://github.com/USERNAME/filius-food.git
```

**Ejemplo:**

```bash
git remote add origin https://github.com/santiagotrujllo/filius-food.git
```

### B. Verificar que se agregó correctamente:

```bash
git remote -v
```

Deberías ver:

```
origin  https://github.com/USERNAME/filius-food.git (fetch)
origin  https://github.com/USERNAME/filius-food.git (push)
```

### C. Subir la rama principal (main):

```bash
git push -u origin main
```

### D. Subir la rama de desarrollo:

```bash
git push -u origin development
```

### E. Verificar las ramas en GitHub:

```bash
git branch -r
```

Deberías ver:

```
origin/development
origin/main
```

---

## 🌿 Paso 3: Workflow de Ramas

### Estructura de Ramas:

```
main (producción)
  ↓
development (desarrollo colaborativo)
  ↓
feature/nueva-funcionalidad (ramas individuales)
```

### Flujo de Trabajo Recomendado:

#### 1. **Trabajar en `development`:**

```bash
# Asegurarte de estar en development
git checkout development

# Actualizar con los últimos cambios
git pull origin development

# Hacer tus cambios...
# (editar archivos)

# Ver qué cambió
git status

# Añadir cambios
git add .

# Hacer commit
git commit -m "✨ Descripción del cambio"

# Subir a GitHub
git push origin development
```

#### 2. **Crear rama para feature específico:**

```bash
# Crear rama desde development
git checkout development
git checkout -b feature/nueva-galeria-productos

# Trabajar en la rama...
# (editar archivos)

# Hacer commit
git add .
git commit -m "✨ feat: Agregar galería de productos con lightbox"

# Subir la rama a GitHub
git push -u origin feature/nueva-galeria-productos
```

#### 3. **Fusionar cambios (Merge):**

**Opción A: Desde línea de comandos**

```bash
# Volver a development
git checkout development

# Fusionar la feature
git merge feature/nueva-galeria-productos

# Subir cambios
git push origin development

# Opcional: Eliminar rama feature
git branch -d feature/nueva-galeria-productos
git push origin --delete feature/nueva-galeria-productos
```

**Opción B: Pull Request en GitHub (Recomendado)**

1. Ve a GitHub → Tu repositorio
2. Click en "Pull requests" → "New pull request"
3. **Base:** `development` ← **Compare:** `feature/nueva-galeria-productos`
4. Click "Create pull request"
5. Pide a tu colaborador que revise
6. Click "Merge pull request" cuando esté aprobado

#### 4. **Subir a producción (main):**

```bash
# Solo cuando development esté 100% probado y listo
git checkout main
git merge development
git push origin main
```

---

## 👥 Paso 4: Agregar Colaborador

1. Ve a tu repositorio en GitHub
2. Settings → Collaborators → "Add people"
3. Escribe el username o email del colaborador
4. Click "Add USERNAME to this repository"
5. El colaborador recibirá una invitación por email

**Tu colaborador debe:**

```bash
# Clonar el repositorio
git clone https://github.com/USERNAME/filius-food.git
cd filius-food

# Cambiar a development
git checkout development

# Crear su propia rama
git checkout -b feature/su-funcionalidad

# Trabajar normalmente...
```

---

## 🛡️ Proteger la Rama Main

Para evitar pushes directos a `main`:

1. GitHub → Settings → Branches
2. Click "Add branch protection rule"
3. Branch name pattern: `main`
4. Marcar:
   - ✅ "Require a pull request before merging"
   - ✅ "Require approvals" (al menos 1)
   - ✅ "Require status checks to pass before merging"
5. Click "Create"

Ahora NADIE (ni tú) podrá hacer push directo a `main`.  
Todo debe pasar por Pull Request desde `development`.

---

## 📝 Convenciones de Commits

Usa commits descriptivos siguiendo este formato:

```
tipo: Descripción corta

[Opcional] Descripción larga si es necesario
```

**Tipos:**

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato (no afecta código)
- `refactor:` Refactorización
- `perf:` Mejora de performance
- `test:` Añadir/modificar tests
- `chore:` Tareas de mantenimiento

**Ejemplos:**

```bash
git commit -m "feat: Agregar sistema de búsqueda de productos"
git commit -m "fix: Corregir error en lazy loading de imágenes"
git commit -m "perf: Optimizar Service Worker cache strategy"
git commit -m "docs: Actualizar README con instrucciones de deploy"
```

---

## 🔄 Comandos Útiles

### Ver estado del repositorio:

```bash
git status
```

### Ver historial de commits:

```bash
git log --oneline --graph --all
```

### Ver diferencias antes de commit:

```bash
git diff
```

### Deshacer cambios (NO COMMITTED):

```bash
git restore archivo.js
```

### Actualizar tu rama con cambios remotos:

```bash
git pull origin development
```

### Ver todas las ramas:

```bash
git branch -a
```

### Cambiar de rama:

```bash
git checkout nombre-rama
```

### Eliminar rama local:

```bash
git branch -d nombre-rama
```

### Eliminar rama remota:

```bash
git push origin --delete nombre-rama
```

---

## ⚠️ Resolución de Conflictos

Si hay conflictos al hacer merge:

```bash
# 1. Git te dirá qué archivos tienen conflictos
git status

# 2. Abrir los archivos y buscar:
<<<<<<< HEAD
Tu código
=======
Código del otro
>>>>>>> rama-a-fusionar

# 3. Resolver manualmente (eliminar marcadores y quedarte con el código correcto)

# 4. Marcar como resuelto
git add archivo-resuelto.js

# 5. Completar el merge
git commit -m "merge: Resolver conflictos de feature/X"
```

---

## 📊 Estado Actual del Proyecto

### Archivos en el Repositorio (115 total):

```
✅ index.html (SPA principal)
✅ 38 archivos CSS (ITCSS)
✅ 15 archivos JavaScript (modular ES6+)
✅ 23 imágenes (productos + assets)
✅ 7 documentos Markdown
✅ sw.js (Service Worker)
✅ manifest.json (PWA)
✅ build.sh (script de build)
✅ package.json
✅ .gitignore (configurado)
✅ .editorconfig
✅ robots.txt
✅ sitemap.xml
```

### Ramas Disponibles:

- **`main`** - Rama de producción (protegida)
- **`development`** - Rama de desarrollo colaborativo (activa)

---

## 🚀 Siguiente Paso

**Ahora ejecuta estos comandos para subir a GitHub:**

```bash
# 1. Agregar remote (reemplaza USERNAME)
git remote add origin https://github.com/USERNAME/filius-food.git

# 2. Subir main
git push -u origin main

# 3. Subir development
git push -u origin development

# 4. Verificar en GitHub
# Ve a: https://github.com/USERNAME/filius-food
```

---

## 📞 Recursos

- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Learn Git Branching](https://learngitbranching.js.org/)
- [Pro Git Book](https://git-scm.com/book/en/v2)

---

**✅ ¡Tu repositorio está listo para ser subido a GitHub!**

Sigue los pasos de arriba y estarás colaborando en minutos. 🚀
