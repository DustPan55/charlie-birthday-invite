# Charlie's 1st Picnic — Birthday Invite & RSVP

A single-page birthday invitation for Charlie's first birthday, with live RSVP
tracking. Share one link with guests; they reply Yes/No, tell you how many are
coming, leave a note, and (optionally) a contact. You watch responses roll in on
a private, passcode-protected admin page.

- **Party:** Sunday, August 23rd, 2–4pm · Spoetzl Brewery, 100 Brewery Road, Shiner, TX 77984
- **RSVP by:** August 16

## Files

| File          | Purpose                                                        |
|---------------|---------------------------------------------------------------|
| `index.html`  | The public invitation + RSVP form (share this link)           |
| `photos.html` | Open photo gallery — guests upload pics, everyone sees them    |
| `admin.html`  | Private RSVP dashboard (passcode-gated)                        |
| `config.js`   | Supabase URL + anon key                                        |
| `styles.css`  | Shared vintage-gingham styling                                 |
| `charlie-picnic.ics` | Calendar file for the "Add to calendar" button         |
| `assets/`     | The invitation artwork                                         |

## Photo gallery

`photos.html` is an open gallery: guests pick photos, they're compressed in the
browser (max ~1600px, JPEG) and uploaded to a **public Supabase Storage bucket**
(`charlie-photos`), with a row in `party_photos` (path + optional name/caption).
Everyone sees uploads instantly. Reachable from the invite ("Share your photos")
and the RSVP thank-you screen.

Anon can **upload and view** but **not delete**. To remove an unwanted photo,
use the Supabase dashboard → Storage (`charlie-photos`) and Table editor
(`party_photos`).

## How it works

- Static site — no build step, no server. Pure HTML/CSS/JS.
- **Supabase** (Postgres) stores RSVPs in the `birthday_rsvps` table.
- Row-level security lets the public **insert** an RSVP but **never read** the
  guest list. The anon key in `config.js` is safe to publish for exactly that
  reason.
- The admin page reads responses through a Postgres function
  (`get_charlie_rsvps`) that only returns data when the correct **passcode** is
  supplied. The passcode is not stored in this repo.

## Admin

Open `admin.html`, enter the passcode. You'll see totals (Yes / No / guests
coming) and every response, with a **Download CSV** button.

**Default passcode:** `charlie-picnic-2026`

To change it, run this in the Supabase SQL editor (replace the value):

```sql
create or replace function public.get_charlie_rsvps(p_passcode text)
returns setof public.birthday_rsvps
language plpgsql security definer set search_path = public as $$
begin
  if p_passcode is distinct from 'YOUR-NEW-PASSCODE' then
    raise exception 'invalid passcode';
  end if;
  return query select * from public.birthday_rsvps order by created_at desc;
end; $$;
```

You can also view/export responses directly in the Supabase dashboard →
Table editor → `birthday_rsvps`.

## Running locally

Because the pages load `config.js` and call an API, open them through a tiny
local server (not `file://`):

```sh
python3 -m http.server 8000
# then visit http://localhost:8000/
```

## Deploying

Any static host works. Easiest free options that support **private** repos:

- **Netlify** or **Vercel** — connect the repo, no settings needed, it just
  serves the files. You get a shareable URL to send to guests.
- **Cloudflare Pages** — same idea.

Share the deployed `/` URL with invitees. Keep the `/admin.html` URL (and
passcode) to yourself.
