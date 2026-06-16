/* =========================================================================
   state.scot — RENDERING ENGINE
   =========================================================================
   Reads SITE_DATA / SITE_META / SECTION_ORDER from data.js and builds the
   homepage scoreboard and section indicator grids. You should not need to
   edit this file when updating figures — edit data.js instead.
   ========================================================================= */

// Keep these in sync with the CSS custom properties in style.css —
// canvas charts can't read CSS variables directly.
const STATUS_COLORS = {
  red:     '#A6321E',
  amber:   '#B8842B',
  green:   '#2F6F4F',
  neutral: '#756F64',
  rule:    '#DAD5C8'
};

const STATUS_LABELS = {
  red:     'Worsening',
  amber:   'Mixed / unchanged',
  green:   'Improving',
  neutral: 'Informational'
};

const ARROWS = { up: '\u2191', down: '\u2193', none: '\u2192' };

/* -------------------------------------------------------------------
   FOOTER — populates the "last updated" line on every page
   ------------------------------------------------------------------- */
function renderFooter() {
  document.querySelectorAll('[data-last-updated]').forEach(function (el) {
    el.textContent = SITE_META.lastUpdated;
  });
  document.querySelectorAll('[data-feedback-email]').forEach(function (el) {
    el.textContent = SITE_META.feedbackEmail;
    el.href = 'mailto:' + SITE_META.feedbackEmail;
  });
  document.querySelectorAll('[data-x-link]').forEach(function (el) {
    el.href = SITE_META.social.x;
  });
}

/* -------------------------------------------------------------------
   HOMEPAGE — scoreboard tiles with red/amber/green/neutral bars
   ------------------------------------------------------------------- */
function renderHomepage() {
  const container = document.getElementById('scoreboard');
  if (!container) return;

  container.innerHTML = SECTION_ORDER.map(function (slug) {
    const section = SITE_DATA[slug];
    const counts = { red: 0, amber: 0, green: 0, neutral: 0 };
    section.indicators.forEach(function (ind) {
      counts[ind.status] = (counts[ind.status] || 0) + 1;
    });
    const total = section.indicators.length;

    const segments = ['red', 'amber', 'green', 'neutral']
      .filter(function (key) { return counts[key] > 0; })
      .map(function (key) {
        const pct = (counts[key] / total * 100).toFixed(2);
        return '<span style="width:' + pct + '%;background:' + STATUS_COLORS[key] +
               '" title="' + counts[key] + ' ' + STATUS_LABELS[key] + '"></span>';
      }).join('');

    return (
      '<a class="scoreboard__tile" href="' + section.slug + '.html">' +
        '<div class="scoreboard__title">' + section.title + '<span class="scoreboard__arrow">\u2192</span></div>' +
        '<p class="scoreboard__desc">' + section.tileDescription + '</p>' +
        '<div class="scoreboard__bar">' + segments + '</div>' +
        '<div class="scoreboard__count">' + total + (total === 1 ? ' indicator' : ' indicators') + '</div>' +
      '</a>'
    );
  }).join('');
}

/* -------------------------------------------------------------------
   SECTION PAGES — indicator grid
   ------------------------------------------------------------------- */
function renderSection(slug) {
  const section = SITE_DATA[slug];
  if (!section) return;

  const titleEl = document.getElementById('page-title');
  const descEl = document.getElementById('page-desc');
  if (titleEl) titleEl.textContent = section.title;
  if (descEl) descEl.textContent = section.intro;

  const grid = document.getElementById('indicator-grid');
  if (!grid) return;

  grid.innerHTML = section.indicators.map(function (ind) {
    return ind.type === 'progress' ? progressCardHTML(ind) : indicatorCardHTML(ind);
  }).join('');

  // Charts have to be created after the canvases exist in the DOM.
  section.indicators.forEach(function (ind) {
    if (ind.type !== 'progress') initChart(ind);
  });
}

function indicatorCardHTML(ind) {
  const arrow = ARROWS[ind.change.direction] || ARROWS.none;
  const target = ind.target
    ? '<p class="indicator-card__target">Target: ' + ind.target + '</p>'
    : '';

  return (
    '<article class="indicator-card status-' + ind.status + '">' +
      '<div class="indicator-card__eyebrow">' +
        '<span>' + ind.current.period + ' vs ' + ind.previous.period + '</span>' +
        '<span>' + STATUS_LABELS[ind.status] + '</span>' +
      '</div>' +
      '<h3 class="indicator-card__title">' + ind.title + '</h3>' +
      '<p class="indicator-card__desc">' + ind.description + '</p>' +
      target +
      '<div class="indicator-card__figures">' +
        '<div class="indicator-card__current">' +
          '<span class="indicator-card__value">' + ind.current.value + '</span>' +
          '<span class="indicator-card__period">' + ind.current.period + '</span>' +
        '</div>' +
        '<div class="indicator-card__previous">' +
          'Previous' +
          '<span class="value">' + ind.previous.value + '</span>' +
          ind.previous.period +
        '</div>' +
      '</div>' +
      '<span class="change-badge">' + arrow + ' ' + ind.change.value + '</span>' +
      '<div class="indicator-card__chart"><canvas id="chart-' + ind.id + '" role="img" aria-label="Chart comparing ' +
        ind.previous.period + ' (' + ind.previous.value + ') to ' + ind.current.period + ' (' + ind.current.value + ')"></canvas></div>' +
      '<p class="indicator-card__narrative">' + ind.narrative + '</p>' +
      '<p class="indicator-card__source">Source: <a href="' + ind.source.url + '" target="_blank" rel="noopener">' + ind.source.name + ' \u2197</a></p>' +
    '</article>'
  );
}

function progressCardHTML(ind) {
  const pct = (ind.progress.current / ind.progress.total * 100);
  const milestones = ind.milestones.map(function (m) { return '<li>' + m + '</li>'; }).join('');

  return (
    '<article class="indicator-card progress-card status-' + ind.status + '">' +
      '<div class="indicator-card__eyebrow">' +
        '<span>As of ' + ind.progress.asOf + '</span>' +
        '<span>' + STATUS_LABELS[ind.status] + '</span>' +
      '</div>' +
      '<h3 class="indicator-card__title">' + ind.title + '</h3>' +
      '<p class="indicator-card__desc">' + ind.description + '</p>' +
      '<div class="progress-bar-track"><div class="progress-bar-fill" style="width:' + pct.toFixed(1) + '%"></div></div>' +
      '<p class="progress-card__label">' + ind.progress.current + ' of ' + ind.progress.total + ' ' + ind.progress.unit +
        ' complete (' + pct.toFixed(1) + '%)</p>' +
      '<ol class="progress-card__milestones">' + milestones + '</ol>' +
      '<p class="indicator-card__source">Source: <a href="' + ind.source.url + '" target="_blank" rel="noopener">' + ind.source.name + ' \u2197</a></p>' +
    '</article>'
  );
}

/* -------------------------------------------------------------------
   CHARTS — small previous-vs-current comparison bar
   ------------------------------------------------------------------- */
function initChart(ind) {
  const canvas = document.getElementById('chart-' + ind.id);
  if (!canvas || typeof Chart === 'undefined') return;

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: [ind.previous.period, ind.current.period],
      datasets: [{
        data: [ind.previous.raw, ind.current.raw],
        backgroundColor: [STATUS_COLORS.rule, STATUS_COLORS[ind.status]],
        borderWidth: 0,
        borderRadius: 2,
        maxBarThickness: 56
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return context.dataIndex === 0
                ? ind.previous.value + ' (' + ind.previous.period + ')'
                : ind.current.value + ' (' + ind.current.period + ')';
            }
          }
        }
      },
      scales: {
        x: { display: false },
        y: {
          grid: { display: false },
          ticks: {
            font: { family: 'IBM Plex Mono', size: 10 },
            color: STATUS_COLORS.neutral
          }
        }
      }
    }
  });
}

document.addEventListener('DOMContentLoaded', renderFooter);
