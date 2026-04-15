# Supabase Migration Guide

This project has been migrated from custom OAuth + MySQL to **Supabase** for simplified authentication and database management.

## 🎯 What Changed

### Removed ❌
- Custom OAuth system
- MySQL database
- JWT token management
- Drizzle ORM for MySQL
- Complex authentication flow

### Added ✅
- **Supabase Auth** (Google login, email/password)
- **Supabase PostgreSQL** database
- Auto-generated REST API
- Row Level Security (RLS)
- Real-time subscriptions support

## 🚀 Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for database to provision (~2 minutes)

### 2. Get Your Credentials

From your Supabase project dashboard:
1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` → `VITE_SUPABASE_URL`
   - `anon public` key → `VITE_SUPABASE_ANON_KEY`

### 3. Configure Environment Variables

Update `.env` file:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Migration

1. Go to **SQL Editor** in Supabase dashboard
2. Click "New Query"
3. Copy contents from `supabase-migration.sql`
4. Click "Run"

This creates all tables with proper Row Level Security policies.

### 5. Enable Authentication Providers

#### Google OAuth (Recommended)
1. Go to **Authentication** → **Providers**
2. Enable **Google**
3. Add your Google OAuth credentials:
   - Get credentials from [Google Cloud Console](https://console.cloud.google.com)
   - Create OAuth 2.0 Client ID
   - Add authorized redirect URI: `https://your-project.supabase.co/auth/v1/callback`

#### Email/Password
Already enabled by default!

### 6. Install Dependencies & Run

```bash
pnpm install
pnpm dev
```

The app will run on `http://localhost:3000`

## 📁 Key Files Changed

### Client Side
- `client/src/lib/supabase.ts` - Supabase client setup
- `client/src/_core/hooks/useAuth.ts` - Auth hook using Supabase
- `client/src/pages/Login.tsx` - New login page
- `client/src/const.ts` - Removed OAuth URL generation

### Server Side
- `server/supabase.ts` - Server-side Supabase client
- `server/_core/context.ts` - tRPC context with Supabase auth
- `server/_core/index.ts` - Removed OAuth routes
- `.env` - Updated environment variables

## 🔐 Authentication Flow

### Before (Custom OAuth)
```
User → OAuth Portal → Callback → JWT → Cookie → Database
```

### After (Supabase)
```
User → Supabase Auth → Done ✅
```

## 📊 Database Access

### Direct Queries (Client)
```typescript
import { supabase } from '@/lib/supabase';

// Query data
const { data, error } = await supabase
  .from('enrollments')
  .select('*')
  .eq('status', 'pending');
```

### Through tRPC (Recommended)
```typescript
const enrollments = trpc.enrollments.list.useQuery();
```

## 🛡️ Security Features

- **Row Level Security (RLS)** - Users can only access their own data
- **Admin policies** - Admins can manage all data
- **Public policies** - Some tables allow public inserts (enrollments, leads)
- **JWT tokens** - Handled automatically by Supabase

## 🎨 Login Options

Users can sign in with:
- ✅ Google OAuth
- ✅ Email/Password
- ✅ Magic Links (email)
- ✅ Phone/SMS (optional)

## 📝 Admin Setup

To make a user admin:

1. Go to **Authentication** → **Users** in Supabase
2. Find the user
3. Copy their UUID
4. Go to **SQL Editor**
5. Run:
```sql
UPDATE public.users 
SET role = 'admin' 
WHERE id = 'user-uuid-here';
```

## 🔄 Migration from Old System

If you have existing data in MySQL:

1. Export data from MySQL
2. Transform to match new schema (snake_case columns)
3. Import via Supabase SQL Editor or CSV import

## 🆘 Troubleshooting

### "Invalid URL" Error
- Check `VITE_SUPABASE_URL` is set correctly
- Restart dev server after changing `.env`

### Authentication Not Working
- Verify Google OAuth is enabled in Supabase
- Check redirect URLs match
- Clear browser cookies and try again

### Database Queries Failing
- Run the migration SQL script
- Check RLS policies are created
- Verify user is authenticated

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## 🎉 Benefits

- ✅ **No backend auth code** - Supabase handles it
- ✅ **No database setup** - Cloud PostgreSQL ready
- ✅ **Built-in admin panel** - Manage data via Supabase dashboard
- ✅ **Real-time updates** - Subscribe to database changes
- ✅ **Automatic backups** - Daily backups included
- ✅ **Free tier** - 500MB database, 50MB file storage
