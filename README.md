# dogearpage

A personal start page you can make your own, right in the browser. Keep your favorite links and handy copy-paste snippets in tidy categories, track the acronyms you run into, and dress it all up with themes and fonts. No account, no install, no server: everything you save stays in your own browser.

**Live site:** https://dogearpage.github.io

## What's here

| Page | What it does |
|------|--------------|
| **Bookmarks** | Links grouped into collapsible categories, plus "Quick Copy" categories with one-click copy buttons. Search, in-page editing, drag-and-drop reordering, themes, fonts, a customizable greeting and clock, and JSON backup/restore. |
| **Acronyms** | A searchable, sortable list of acronyms with definitions and categories. Add, edit, delete, and import/export as JSON. Shares the theme and fonts chosen on the Bookmarks page. |
| **How To** | Help pages: [How to use](https://dogearpage.github.io/how-to/use), [Personalize](https://dogearpage.github.io/how-to/personalize) and [Make pull requests](https://dogearpage.github.io/how-to/contribute). They pick up the visitor's saved theme and fonts. |

### Features

- **Two kinds of categories:** *Links* (bookmarks with optional descriptions, which can contain `[label](https://url)` links) and *Quick Copy* (label/value rows with a copy button).
- **13 themes:** Blue, Cool Slate, Green, Sand, Warm Paper, Dark, Midnight, and seasonal Valentine's Day, Easter, Fourth of July, Halloween, Thanksgiving and Christmas.
- **19 fonts**, chosen separately for headings and body text.
- **Icon styles:** colorful duotone [Phosphor](https://phosphoricons.com) icons, simple icons, emoji, or none.
- **Header options:** your own greeting (also used as the tab title) and a date/time line with a customizable format.
- **Backup:** export and import everything as JSON to keep a backup or move to another browser.
- **Private by design:** data lives in `localStorage`. Site favicons, which would send each bookmark's domain to Google, are off unless you turn them on.

## Using it

Open https://dogearpage.github.io, click **Edit** at the bottom of the page, and replace the starter links with your own. Open **Settings** to choose a theme, fonts and display options.

Step-by-step guides live on the site:

- [How to use](https://dogearpage.github.io/how-to/use): add categories, links and Quick Copy rows, back up your data, and make your own copy with your own default links.
- [Personalize](https://dogearpage.github.io/how-to/personalize): themes, icon styles, fonts, descriptions, header text and the date format codes.
- [Make pull requests](https://dogearpage.github.io/how-to/contribute): how to suggest changes to this repository.

> **Your data is per browser.** Links and settings are saved in the browser's local storage for this site. A different browser or device, a private window, or clearing site data starts from the starter set. Export a backup from **Settings → Backup**.

## Project structure

```
.
├── index.html          # Bookmarks page (self-contained: HTML, CSS and JS in one file)
├── acronyms.html       # Acronyms page (self-contained)
├── how-to/
│   ├── use.html        # How to use
│   ├── personalize.html # Personalize
│   ├── contribute.html # Make pull requests
│   ├── howto.css       # Shared styles for the help pages (theme palettes copied from index.html)
│   └── howto.js        # Reads the saved theme/fonts so the help pages match (read-only)
└── README.md
```

There's no build step, framework or package manager. The pages load two things from CDNs: [Phosphor Icons](https://phosphoricons.com) (pinned to v2.1.1 via unpkg) and the web fonts from Google Fonts. Without a connection, text falls back to system fonts.

### Storage keys

| Key | Used by | Holds |
|-----|---------|-------|
| `nm_data` | Bookmarks | Categories, links and Quick Copy rows |
| `nm_settings` | Bookmarks, Acronyms, How To (read-only) | Theme, fonts, icon style, header and display options |
| `acronyms` | Acronyms | The acronym list |

Pages merge their settings into `nm_settings` rather than overwriting it, so changing the theme on the Acronyms page never wipes options only the Bookmarks page uses.

## Running it locally

```bash
git clone https://github.com/dogearpage/dogearpage.github.io.git
cd dogearpage.github.io
open index.html        # macOS; or just double-click the file
```

Note that browsers keep separate local storage for `file://` pages and for the live site, so links saved in one don't show up in the other. Use Export/Import to move them. If you prefer a local server: `python3 -m http.server` and visit http://localhost:8000.

## Changing the starter links

The links a browser sees on its first visit (and after **Reset to defaults**) come from `DEFAULT_DATA` near the top of the script in `index.html`. Each category looks like this:

```js
{
    name: 'Email', icon: 'envelope', emoji: '✉️', color: '#C2255C', type: 'links', open: true, items: [
        { name: 'Gmail', url: 'https://mail.google.com/', desc: 'Google email.', newTab: true }
    ]
}
```

Quick Copy categories use `type: 'copy'` and items shaped like `{ label: 'Home address', value: '123 Main St' }`.

## Deploying (GitHub Pages)

This repository is named `dogearpage.github.io`, so GitHub Pages serves it at the root of https://dogearpage.github.io. To publish (or to publish a fork):

1. Go to **Settings → Pages** in the repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. Every push to `main` republishes the site within a few minutes.

A fork is served at `https://YOUR-USERNAME.github.io/dogearpage.github.io/` unless you rename it to `YOUR-USERNAME.github.io`. All links between pages are relative, so either address works.

## Contributing

Issues and pull requests are welcome. See [Make pull requests](https://dogearpage.github.io/how-to/contribute) for the step-by-step and the ground rules. In short:

- One change per pull request, with screenshots for anything visual.
- Keep `index.html` and `acronyms.html` self-contained, with no build tools or frameworks.
- Keep everything in the browser: no tracking, accounts or servers.
- Themes and fonts are duplicated in `index.html`, `acronyms.html`, `how-to/howto.css` and `how-to/howto.js`; update them together.
- Don't break data people have already saved under the storage keys above.
