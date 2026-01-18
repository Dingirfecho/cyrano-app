# Cyrano V4.0 - Dating Communication Coach

App de coaching de comunicación en dating que usa psicometría (MBTI + DISC) para diagnosticar fallos conversacionales.

## Setup Rápido

### 1. Cloná e instalá

```bash
git clone <tu-repo>
cd cyrano-app
npm install
```

### 2. Configurá las variables de entorno

Copiá `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Editá `.env.local` con tus credenciales:

```env
# Generá un secret random (podés usar: openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-de-32-caracteres

# Google OAuth (de Google Cloud Console)
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=xxx

# Supabase (de Settings > API en tu proyecto)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Anthropic
ANTHROPIC_API_KEY=sk-ant-xxx
```

### 3. Configurá la base de datos

```bash
# Genera el cliente de Prisma
npx prisma generate

# Crea las tablas en Supabase
npx prisma db push
```

### 4. Corré en desarrollo

```bash
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000)

## Deploy a Vercel

1. Subí el código a GitHub
2. Conectá el repo en Vercel
3. Agregá las variables de entorno en Vercel (Settings > Environment Variables)
4. Actualizá el redirect URI en Google Cloud Console:
   - Agregá: `https://tu-app.vercel.app/api/auth/callback/google`
5. Deploy!

## Estructura del Proyecto

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # Auth endpoints
│   │   └── analyze/             # Cyrano analysis endpoint
│   ├── globals.css              # Estilos globales
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página principal
├── components/
│   └── providers.tsx            # Session provider
├── lib/
│   ├── auth.ts                  # NextAuth config
│   ├── cyrano-prompt.ts         # System prompt de Cyrano
│   ├── prisma.ts                # Prisma client
│   └── utils.ts                 # Utilidades
└── types/
    └── next-auth.d.ts           # Type extensions
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth.js con Google OAuth
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **AI**: Claude API (Sonnet)
- **Styling**: Tailwind CSS
- **Deploy**: Vercel
