/*
 * Shared script for the How To pages.
 *
 * It only READS the settings the app pages save (theme and fonts), so the help pages match the look
 * the visitor chose. It never writes to storage: changing settings stays the app pages' job.
 */

/* Same key as index.html and acronyms.html. */
const SETTINGS_KEY = 'nm_settings';

/*
 * Theme ids that have a body.theme-<id> block in howto.css. Blue is the :root default, so it needs
 * no class and isn't listed. Keep in sync with THEMES in index.html.
 */
const THEME_IDS = ['slate', 'green', 'sand', 'paper', 'dark', 'midnight', 'valentine', 'easter',
    'july4', 'halloween', 'thanksgiving', 'christmas'];

/*
 * Font id -> CSS font stack, copied from FONTS in index.html. Only the stacks are needed here
 * (no labels), because these pages show no font picker. Unknown ids fall back to the CSS default.
 */
const FONT_STACKS = {
    system: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    georgia: "Georgia, 'Times New Roman', serif",
    quicksand: "'Quicksand', sans-serif",
    bitter: "'Bitter', Georgia, serif",
    playfair: "'Playfair Display', Georgia, serif",
    oswald: "'Oswald', sans-serif",
    dancing: "'Dancing Script', cursive",
    creepster: "'Creepster', cursive",
    christmas: "'Mountains of Christmas', cursive",
    bebas: "'Bebas Neue', Impact, sans-serif",
    marker: "'Permanent Marker', cursive",
    bungee: "'Bungee', Impact, sans-serif",
    cinzel: "'Cinzel', Georgia, serif",
    jetbrains: "'JetBrains Mono', Consolas, monospace",
    fira: "'Fira Code', Consolas, monospace",
    plex: "'IBM Plex Mono', Consolas, monospace",
    noto: "'Noto Sans Mono', 'Droid Sans Mono', Consolas, monospace",
    cascadia: "'Cascadia Code', 'Cascadia Mono', Consolas, monospace",
    consolas: "Consolas, 'Andale Mono', monospace"
};

/**
 * Read the saved settings. try/catch because storage can be blocked (e.g. some private modes)
 * or hold corrupt JSON; in either case the page simply keeps the default Blue look.
 * @returns {{theme?: string, headingFont?: string, bodyFont?: string, showAcronyms?: boolean}} Saved settings, or {}.
 */
function readSettings() {
    try {
        return JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') || {};
    } catch (e) {
        return {};
    }
}

/**
 * Apply the saved theme class and font variables to <body>, mirroring applyTheme()/applyFonts()
 * in index.html, and hide the nav bar when the Acronyms page is turned off (mirrors applyNav()).
 * @returns {void}
 */
function applySavedLook() {
    const settings = readSettings();
    if (THEME_IDS.includes(settings.theme)) document.body.classList.add('theme-' + settings.theme);
    if (FONT_STACKS[settings.headingFont]) document.body.style.setProperty('--heading-font', FONT_STACKS[settings.headingFont]);
    if (FONT_STACKS[settings.bodyFont]) document.body.style.setProperty('--body-font', FONT_STACKS[settings.bodyFont]);
    // Explicit false check: settings saved before this option existed have no field and mean "on".
    const nav = document.querySelector('.nav-header');
    if (nav && settings.showAcronyms === false) nav.hidden = true;
}

applySavedLook();
