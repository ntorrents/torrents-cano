# Atelier

Exposición web tipo museo para colgar fotos de dibujos y cuadros. Elegante, con un toque infantil, **sin datos personales** en la sala pública.

## ¿Hace falta Neon (base de datos)?

**No, de momento.** Las fotos van a **Vercel Blob** y el listado de obras (título, año, técnica, nota) se guarda en un `catalog.json` también en Blob. Neon solo tendría sentido más adelante si quieres búsquedas, muchas obras con filtros complejos, o varios curadores.

## Qué tienes que hacer tú

### 1. Subir el proyecto a GitHub (si aún no está)

```bash
git add .
git commit -m "Primera versión de Atelier"
git remote add origin <tu-repo>
git push -u origin main
```

### 2. Crear el proyecto en Vercel

1. Entra en [vercel.com](https://vercel.com) → **Add New Project** → importa este repo.
2. Despliega (aunque aún no haya Blob).

### 3. Crear Vercel Blob

1. En el proyecto de Vercel → **Storage** → **Create** → **Blob**.
2. Conéctalo al proyecto. Vercel añadirá `BLOB_STORE_ID` (y a veces `BLOB_READ_WRITE_TOKEN`). Con el store vinculado al proyecto basta en producción.
3. Si el store es **privado** (por defecto en muchos casos), la app ya está preparada: sube en privado y sirve las fotos por `/api/media/...`.

### 4. Contraseña de curaduría

En Vercel → **Settings** → **Environment Variables**, añade:

| Variable | Valor |
|---|---|
| `ADMIN_PASSWORD` | una contraseña fuerte (solo tú la usas) |

Redeploy para que coja las variables.

### 5. Desarrollo local (opcional)

```bash
npm install
npx vercel link
npx vercel env pull .env.local
```

Asegúrate de que `.env.local` tenga `BLOB_READ_WRITE_TOKEN` y `ADMIN_PASSWORD`.

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 6. Colgar obras

1. Ve a `/admin` (enlace **Curaduría**).
2. Entra con la contraseña.
3. Sube la foto, pon título / técnica / año (y una nota breve si quieres).
4. La obra aparece en `/galeria`.

## Privacidad

En la web pública no hace falta poner nombre, edad ni fotos de personas. Solo las obras y cartelas neutras (título, técnica, año).

## Estructura útil

- `/` — portada
- `/galeria` — sala de exposición
- `/obra/[id]` — ficha de una obra
- `/admin` — subir / quitar obras (protegido)
