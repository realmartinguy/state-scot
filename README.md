# state.scot

An independent dashboard tracking the performance of the Scottish State —
fiscal, NHS, education, justice, social security, housing and transport —
against official data.

This is a plain static site: HTML, CSS and vanilla JavaScript. No build
step, no framework, no dependencies beyond two CDN-hosted fonts and
Chart.js.

## File structure

```
state-scot/
├── index.html                 Overview / homepage
├── fiscal.html                Fiscal section
├── nhs.html                   NHS section
├── education.html             Education section
├── justice.html               Justice section
├── social-security.html       Social Security section
├── housing.html                Housing section
├── transport.html             Transport section
├── feedback-disclaimers.html  Feedback & Disclaimers
├── data.js                    ALL indicator data — edit this to update figures
├── site.js                    Rendering engine — builds cards/charts from data.js
├── style.css                  Design system / styling
├── robots.txt
└── sitemap.xml
```

## Updating data (the regular job)

**You only ever need to edit `data.js`.** Every card, chart, headline figure
and the homepage scoreboard are generated automatically from it.

`data.js` opens with a `INDICATOR_TEMPLATE` object and a field reference
that explains what each field means. The short version:

1. Open `data.js` and find the indicator (search for its `title`).
2. Move the existing `current` block down into `previous`.
3. Fill in the new release's figures in `current`.
4. Update `change` (the difference) and `direction` (`'up'`, `'down'`, or
   `'none'` — this controls the arrow shown on the card).
5. Update `status` (`'red'`, `'amber'`, `'green'`, or `'neutral'`) if the
   new figure changes whether things are getting better or worse. The
   colour meanings are explained on the Feedback & Disclaimers page.
6. Rewrite `narrative` as a single plain sentence.
7. Update `source.url` if there's a new publication link.

### Worked example

Say NHS A&E 4-hour performance goes from 69.7% (Jun 2025) to 71.2% (Sep 2025):

```js
// before
current:  { value: '69.7%', raw: 69.7, period: 'Jun 2025' },
previous: { value: '69.0%', raw: 69.0, period: 'Jun 2024' },
change: { value: '0.7pp', direction: 'up' },
status: 'amber',
narrative: 'The target has been missed, but performance is improving.',

// after
current:  { value: '71.2%', raw: 71.2, period: 'Sep 2025' },
previous: { value: '69.7%', raw: 69.7, period: 'Jun 2025' },
change: { value: '1.5pp', direction: 'up' },
status: 'amber',
narrative: 'The target has been missed, but performance continues to improve.',
```

Save the file, and every page that uses this indicator updates automatically.

### Adding a brand new indicator

Copy `INDICATOR_TEMPLATE` from the top of `data.js`, paste it into the
relevant section's `indicators` array, give it a unique `id`, and fill in
every field. It will appear on the section page and be included in the
homepage scoreboard automatically.

### Adding a new section

1. Add a new entry to `SITE_DATA` in `data.js` (copy the shape of an
   existing section: `title`, `slug`, `tileDescription`, `intro`,
   `indicators`).
2. Add the new slug to `SECTION_ORDER`.
3. Duplicate `fiscal.html`, rename it to `<slug>.html`, and update:
   - `<title>`, meta description, canonical URL, OG tags
   - the JSON-LD `Dataset` block
   - the nav (add the link to **every** page's nav, and mark it `active`
     on the new page)
   - the breadcrumb and `renderSection('<slug>')` call at the bottom
4. Add the new page to `sitemap.xml`.

### The "last updated" date

`SITE_META.lastUpdated` in `data.js` drives the date shown in every
page footer. Update this each time you do a data pass.

## Special case: the A9 dualling card

The Transport page includes a progress-bar style card instead of a
current/previous comparison. It uses `type: 'progress'` with a
`progress: { current, total, unit, asOf }` object and a `milestones`
array of short strings. Update the `current` mileage and `asOf` date as
new figures are published, and edit the milestone list if the completion
target changes.

## Deploying to GitHub Pages with your custom domain

1. Create a new GitHub repository (e.g. `state-scot`).
2. Upload all the files in this folder to the root of the repository
   (`index.html`, `data.js`, etc. — not inside a subfolder).
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to "Deploy from a
   branch", choose the `main` branch and the `/ (root)` folder, then save.
5. Under **Custom domain**, enter `www.state.scot` and save. GitHub will
   create a `CNAME` file in your repo automatically — don't delete it.
6. At your domain registrar, set the DNS record for `www.state.scot` to a
   `CNAME` pointing at `<your-github-username>.github.io`. (For the apex
   domain `state.scot` without `www`, use the four GitHub Pages `A`
   records listed in GitHub's custom domain documentation, plus an `ALIAS`
   or `ANAME` record if your registrar doesn't support `A` records on the
   apex.)
7. Tick **Enforce HTTPS** once the certificate has provisioned (this can
   take up to 24 hours after the DNS change).

After that, any time you edit `data.js` and push to `main`, the live site
updates within a minute or two — no build step required.

## Notes

- Fonts (Source Serif 4, IBM Plex Sans, IBM Plex Mono) and Chart.js are
  loaded from CDNs (Google Fonts and cdnjs). If you'd rather self-host
  them for full offline/GDPR-style independence, download the font files
  into an `/assets/fonts/` folder and update the `@font-face` rules and
  `<link>` tags accordingly.
- The Justice "Average Time in Custody" indicator and the Social Security
  recipient-count indicators are marked `status: 'neutral'` (grey) because
  whether a rising or falling figure is "good" depends on editorial
  judgement. Change these to `'red'` or `'green'` in `data.js` if you want
  to take a position.
- The NHS "A&E seen within 4 hours" comparator period was corrected from
  the original site's "May2024" to "Jun 2024" to match the year-on-year
  pattern of the other two A&E indicators — double-check this against the
  Public Health Scotland interactive chart on your next update.
