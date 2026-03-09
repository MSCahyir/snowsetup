# Google Search Console Runbook (P0-7)

## 1) Prepare Environment

Set the verification token in frontend env (deployment environment):

- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=<token-from-search-console>`
- `NEXT_PUBLIC_SITE_URL=https://snowsetup.com`

Then redeploy frontend.

## 2) Verify Property

1. Open `https://search.google.com/search-console`.
2. Add property: `https://snowsetup.com`.
3. Choose **HTML tag** method.
4. Copy the `content` token value.
5. Put token into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and redeploy.
6. Click **Verify** in Search Console.

## 3) Submit Sitemap

In Search Console -> Sitemaps, submit:

- `https://snowsetup.com/sitemap.xml`

Current robots reference already points to sitemap:

- `https://snowsetup.com/robots.txt`

## 4) Request Indexing (Priority URLs)

Use URL Inspection -> Request Indexing for:

- `https://snowsetup.com/tr/snowboard-boyu-hesaplama`
- `https://snowsetup.com/en/snowboard-boyu-hesaplama`
- `https://snowsetup.com/tr/boot-size-converter`
- `https://snowsetup.com/en/boot-size-converter`
- `https://snowsetup.com/tr/products`
- `https://snowsetup.com/en/products`

## 5) Acceptance Checks

- Property status: Verified
- Sitemap status: Success
- URL Inspection: "URL is on Google" or queued after request
- Coverage and Page indexing report starts showing new utility pages within 24-72 hours
