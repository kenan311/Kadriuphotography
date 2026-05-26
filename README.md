# Kadriu Photography

Faqe për foto dhe video të dasmave, me formular rezervimi, bazë lokale të të dhënave dhe panel admin për pronarin.

## Si punon rezervimi

1. Klienti hyn te faqja dhe klikon një ofertë.
2. Hapet `/book` me ofertën e zgjedhur.
3. Klienti plotëson datën, kontaktin, shtesat dhe kërkesën e veçantë.
4. Rezervimi ruhet në database.
5. Pronari hyn në `/admin` dhe e sheh rezervimin te tabela.
6. Statusi mund të ndryshohet në `Në pritje`, `I konfirmuar`, `I përfunduar` ose `I anuluar`.

## Admin access

Paneli i adminit është te:

```txt
/admin
```

Nëse nuk jeni i loguar, faqja ju çon te:

```txt
/admin/login
```

Fjalëkalimi lokal është në `.env.local`:

```txt
ADMIN_PASSWORD="..."
ADMIN_SESSION_SECRET="..."
```

`.env.local` nuk publikohet në git. Kur faqja vendoset online, këto vlera duhet të vendosen te paneli i hosting-ut si environment variables.

## Komandat kryesore

Instalo paketat:

```bash
npm install
```

Krijo ose kontrollo database:

```bash
npm run db:init
```

Nise faqen lokalisht:

```bash
npm run dev
```

Hape:

```txt
http://localhost:3000
```

Testo build-in para publikimit:

```bash
npm run build
```

## Database

Aktualisht përdoret SQLite lokale:

```txt
prisma/dev.db
```

Kjo është në rregull për zhvillim lokal. Për faqe të publikuar online duhet database e hostuar, p.sh. PostgreSQL në Vercel/Supabase/Neon, sepse SQLite lokale nuk është zgjidhja më e mirë për production.

## Çka mungon për production të plotë

- Database online, jo vetëm lokale.
- Email notification kur vjen një rezervim i ri.
- Domain dhe hosting.
- Pagesë online nëse doni që klienti të paguajë depozitë direkt.
- Backup të database.

Paneli admin dhe ruajtja e rezervimeve janë funksionale për testim dhe zhvillim.
