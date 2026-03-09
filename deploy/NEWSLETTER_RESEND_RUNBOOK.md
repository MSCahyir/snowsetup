# Newsletter Integration Runbook (P0-6)

## 1) Prerequisites

- Resend account
- At least one audience created in Resend
- Production deployment target ready (Vercel/Render/etc.)

## 2) Required Environment Variables

Set these in the frontend deployment environment:

- `RESEND_API_KEY=<your_resend_api_key>`
- `RESEND_AUDIENCE_ID=<your_resend_audience_id>`

Optional but recommended:

- `NEXT_PUBLIC_SITE_URL=https://snowsetup.com`

## 3) Where to Get Values

- `RESEND_API_KEY`:
  - Resend dashboard -> API Keys -> Create key
- `RESEND_AUDIENCE_ID`:
  - Resend dashboard -> Audiences -> open your audience -> copy ID

## 4) Deploy

Redeploy the frontend after setting env vars.

## 5) Functional Test

### Browser test

1. Open homepage
2. Submit newsletter form with a real email
3. Expect success message

### API test

Run (replace domain/email):

```bash
curl -i -X POST https://snowsetup.com/api/newsletter \
  -H 'Content-Type: application/json' \
  -d '{"email":"test@example.com"}'
```

Expected:

- HTTP `200` with `{ "ok": true }` on success
- HTTP `400` for invalid email
- HTTP `500` if env vars are missing

## 6) Verification in Resend

- Resend -> Audiences -> Contacts
- Confirm submitted email appears in the selected audience

## 7) Rollback Plan

If errors occur after deploy:

1. Check deployment env var values
2. Check provider status in Resend dashboard
3. Re-test API endpoint with curl
4. If needed, temporarily hide newsletter section CTA until fixed

## 8) Done Criteria (P0-6)

- Successful form submit in production
- Contact persisted in Resend audience
- No server errors in logs for normal submissions
