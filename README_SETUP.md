# Amazon Clone Backend Setup

## 1. Environment Configuration
1.  Open `.env` file.
2.  Set `DATABASE_URL` with your Supabase DB password.
3.  Set `SUPABASE_JWT_SECRET` (Found in Supabase Dashboard > Settings > API).

## 2. Database Setup
Run the following commands to initialize your database:

```bash
# Generate Prisma Client
npm run prisma:generate

# Push schema to Supabase
npx prisma db push

# Seed data
npm run prisma:seed
```

## 3. Start Server
```bash
# Development mode
npm run dev
```

## 4. Testing
Use the following `curl` to check if the server is alive:
```bash
curl http://localhost:5000/api/products
```
