/* =========================================================================
   state.scot — DATA FILE
   =========================================================================

   THIS IS THE ONLY FILE YOU SHOULD NEED TO EDIT TO UPDATE THE SITE.

   Every figure on the site comes from this file. The HTML pages and
   site.js just read from here and build the cards automatically — you
   never need to touch HTML to add a new release of data.

   -------------------------------------------------------------------
   UPDATING AN EXISTING INDICATOR (the normal quarterly/annual job)
   -------------------------------------------------------------------
   1. Find the indicator below (use Ctrl+F / Cmd+F on its "title").
   2. Move the existing "current" block down into "previous".
   3. Put the new release's figures into "current".
   4. Update "change" (the difference between current and previous) and
      "direction" ('up' / 'down' / 'none' — did the headline NUMBER go
      up or down? This drives the arrow, NOT the colour).
   5. Update "status" if the new figure changes whether things are
      getting better or worse (see the colour guide below).
   6. Update "narrative" — one plain sentence describing the change.
   7. Update "source" if there's a new URL for the release.

   -------------------------------------------------------------------
   ADDING A BRAND NEW INDICATOR
   -------------------------------------------------------------------
   Copy INDICATOR_TEMPLATE below, paste it into the relevant section's
   "indicators" array, fill in every field, and give it a unique "id"
   (lowercase, hyphens, no spaces).

   -------------------------------------------------------------------
   STATUS COLOUR GUIDE (matches the Feedback & Disclaimers page)
   -------------------------------------------------------------------
     'red'     -> the indicator is WORSENING
     'green'   -> the indicator is IMPROVING
     'amber'   -> UNCHANGING, or MIXED (target missed but improving,
                   or target met but worsening)
     'neutral' -> informational only — no judgement is being made
                   about whether the change is good or bad

   -------------------------------------------------------------------
   FIELD REFERENCE
   -------------------------------------------------------------------
     id          unique slug, e.g. 'nhs-ae-4hr'
     title       short card heading
     description longer one-line explanation / target definition
     target      (optional) the official target, shown as a small note
     current     { value: display string, raw: number for the chart,
                   period: label e.g. 'Q1 2025' }
     previous    same shape as current, for the prior period
     change      { value: display string e.g. '2.0pp' or '1,083',
                   direction: 'up' | 'down' | 'none' }
     status      'red' | 'amber' | 'green' | 'neutral'
     narrative   one sentence, plain English, present tense
     source      { name: short citation label, url: link to publication }

   ========================================================================= */

const INDICATOR_TEMPLATE = {
  id: 'section-short-name',
  title: 'Indicator title',
  description: 'What this indicator measures, in one sentence.',
  target: null, // e.g. '95% of patients to be seen within 4 hours.' or null
  current:  { value: '00.0%', raw: 0,  period: 'Q1 2026' },
  previous: { value: '00.0%', raw: 0,  period: 'Q4 2025' },
  change:   { value: '0.0pp', direction: 'none' }, // 'up' | 'down' | 'none'
  status: 'neutral', // 'red' | 'amber' | 'green' | 'neutral'
  narrative: 'One plain sentence describing the change.',
  source: { name: 'Publishing body', url: 'https://example.gov.scot/' }
};

const SITE_META = {
  title: 'state.scot',
  tagline: 'Tracking the performance of the Scottish State',
  description: 'An independent dashboard monitoring key performance indicators across Scotland\u2019s public finances and public services, drawn from official sources.',
  // Update this whenever you do a data pass — shown in the footer.
  lastUpdated: '15 June 2026',
  social: { x: 'https://x.com/statescot' },
  feedbackEmail: 'state.scot@outlook.com'
};

const SITE_DATA = {

  // ===================================================================
  // FISCAL
  // ===================================================================
  fiscal: {
    title: 'Fiscal',
    slug: 'fiscal',
    tileDescription: 'Public finances, net fiscal balance, revenue and expenditure.',
    intro: 'Scotland\u2019s public finances, drawn from the Scottish Government\u2019s annual Government Expenditure and Revenue Scotland (GERS) publication.',
    indicators: [
      {
        id: 'fiscal-net-balance',
        title: 'Net Fiscal Balance',
        description: 'Net Fiscal Balance = Public Sector Revenue - Public Sector Expenditure.',
        target: null,
        current:  { value: '-£26.50bn', raw: -26.497, period: '2024/25' },
        previous: { value: '-£21.41bn', raw: -21.407, period: '2023/24' },
        // Note: \u00a326.497bn - \u00a321.407bn = \u00a35.09bn (corrected from an
        // earlier \u00a35.90bn figure on the old site).
        change: { value: '-£5.09bn', direction: 'down' },
        status: 'red',
        narrative: 'The Scottish Government is running a fiscal deficit, and the deficit is worsening.',
        source: { name: 'Scottish Government \u2014 GERS 2024/25', url: 'https://www.gov.scot/publications/government-expenditure-revenue-scotland-2024-25' }
      }
    ]
  },

  // ===================================================================
  // NHS
  // ===================================================================
  nhs: {
    title: 'NHS',
    slug: 'nhs',
    tileDescription: 'Waiting times, A&E performance, treatment guarantees.',
    intro: 'NHS Scotland waiting times for outpatient appointments, inpatient and day case treatment, and Accident & Emergency performance.',
    indicators: [
      {
        id: 'nhs-outpatient-standard',
        title: 'Outpatient National Standard',
        description: '95% of new outpatients should receive an appointment within 12 weeks.',
        target: '95% of new outpatients seen within 12 weeks.',
        current:  { value: '61.2%', raw: 61.2, period: 'Q1 2025' },
        previous: { value: '63.2%', raw: 63.2, period: 'Q4 2024' },
        change: { value: '2.0pp', direction: 'down' },
        status: 'red',
        narrative: 'The target has been missed, and performance is worsening.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/nhs-waiting-times-stage-of-treatment/stage-of-treatment-waiting-times-inpatients-day-cases-and-new-outpatients-quarter-ending-31-march-2025/' }
      },
      {
        id: 'nhs-outpatient-over-1yr',
        title: 'Outpatient appointments \u2014 waiting over 1 year',
        description: 'Number of patients waiting over 1 year for an outpatient appointment.',
        target: null,
        current:  { value: '63,406', raw: 63406, period: 'Q1 2025' },
        previous: { value: '47,289', raw: 47289, period: 'Q1 2024' },
        change: { value: '16,117 (34.1%)', direction: 'up' },
        status: 'red',
        narrative: 'The number of patients waiting over 1 year is increasing.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/nhs-waiting-times-stage-of-treatment/stage-of-treatment-waiting-times-inpatients-day-cases-and-new-outpatients-quarter-ending-31-march-2025/' }
      },
      {
        id: 'nhs-outpatient-over-2yr',
        title: 'Outpatient appointments \u2014 waiting over 2 years',
        description: 'Number of patients waiting over 2 years for an outpatient appointment.',
        target: null,
        current:  { value: '5,262', raw: 5262, period: 'Q1 2025' },
        previous: { value: '1,332', raw: 1332, period: 'Q1 2024' },
        change: { value: '3,930 (295%)', direction: 'up' },
        status: 'red',
        narrative: 'The number of patients waiting over 2 years is increasing.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/nhs-waiting-times-stage-of-treatment/stage-of-treatment-waiting-times-inpatients-day-cases-and-new-outpatients-quarter-ending-31-march-2025/' }
      },
      {
        id: 'nhs-ttg',
        title: 'Treatment Time Guarantee',
        description: '100% of patients should receive their treatment within 12 weeks.',
        target: '100% of patients treated within 12 weeks.',
        current:  { value: '56.7%', raw: 56.7, period: 'Q1 2025' },
        previous: { value: '56.9%', raw: 56.9, period: 'Q4 2024' },
        change: { value: '0.2pp', direction: 'down' },
        status: 'red',
        narrative: 'The target has been missed, and performance is worsening.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/nhs-waiting-times-stage-of-treatment/stage-of-treatment-waiting-times-inpatients-day-cases-and-new-outpatients-quarter-ending-31-march-2025/' }
      },
      {
        id: 'nhs-treatment-over-1yr',
        title: 'Treatment \u2014 patients waiting over 1 year',
        description: 'Number of patients waiting over 1 year for treatment.',
        target: null,
        current:  { value: '38,702', raw: 38702, period: 'Q1 2025' },
        previous: { value: '37,620', raw: 37620, period: 'Q1 2024' },
        change: { value: '1,072 (2.9%)', direction: 'up' },
        status: 'red',
        narrative: 'The number of patients waiting over 1 year is increasing.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/nhs-waiting-times-stage-of-treatment/stage-of-treatment-waiting-times-inpatients-day-cases-and-new-outpatients-quarter-ending-31-march-2025/' }
      },
      {
        id: 'nhs-treatment-over-2yr',
        title: 'Treatment \u2014 patients waiting over 2 years',
        description: 'Number of patients waiting over 2 years for treatment.',
        target: null,
        current:  { value: '7,969', raw: 7969, period: 'Q1 2025' },
        previous: { value: '7,140', raw: 7140, period: 'Q1 2024' },
        change: { value: '829 (11.6%)', direction: 'up' },
        status: 'red',
        narrative: 'The number of patients waiting over 2 years is increasing.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/nhs-waiting-times-stage-of-treatment/stage-of-treatment-waiting-times-inpatients-day-cases-and-new-outpatients-quarter-ending-31-march-2025/' }
      },
      {
        id: 'nhs-ae-4hr',
        title: 'A&E \u2014 patients seen within 4 hours',
        description: '95% of A&E patients should be seen within 4 hours.',
        target: '95% of A&E patients seen within 4 hours.',
        current:  { value: '69.7%', raw: 69.7, period: 'Jun 2025' },
        // Original source text read "May2024" for the comparator, which
        // breaks the year-on-year pattern used by the two A&E waits
        // indicators below (both compare Jun 2025 to Jun 2024). Treated
        // here as Jun 2024 \u2014 check against the PHS interactive chart
        // when you next update this card.
        previous: { value: '69.0%', raw: 69.0, period: 'Jun 2024' },
        change: { value: '0.7pp', direction: 'up' },
        status: 'amber',
        narrative: 'The target has been missed, but performance is improving.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/healthcare-system/urgent-and-unscheduled-care/accident-and-emergency/interactive-charts/how-long-people-spend-in-ae/' }
      },
      {
        id: 'nhs-ae-8hr',
        title: 'A&E \u2014 patients spending over 8 hours',
        description: 'Patients spending over 8 hours in A&E.',
        target: null,
        current:  { value: '13,337', raw: 13337, period: 'Jun 2025' },
        previous: { value: '14,420', raw: 14420, period: 'Jun 2024' },
        change: { value: '1,083', direction: 'down' },
        status: 'green',
        narrative: 'The number of patients spending over 8 hours in A&E is falling.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/healthcare-system/urgent-and-unscheduled-care/accident-and-emergency/interactive-charts/how-long-people-spend-in-ae/' }
      },
      {
        id: 'nhs-ae-12hr',
        title: 'A&E \u2014 patients spending over 12 hours',
        description: 'Patients spending over 12 hours in A&E.',
        target: null,
        current:  { value: '5,354', raw: 5354, period: 'Jun 2025' },
        previous: { value: '6,136', raw: 6136, period: 'Jun 2024' },
        change: { value: '782', direction: 'down' },
        status: 'green',
        narrative: 'The number of patients spending over 12 hours in A&E is falling.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/healthcare-system/urgent-and-unscheduled-care/accident-and-emergency/interactive-charts/how-long-people-spend-in-ae/' }
      }
    ]
  },

  // ===================================================================
  // EDUCATION
  // ===================================================================
  education: {
    title: 'Education',
    slug: 'education',
    tileDescription: 'Attainment, school leaver destinations, teacher numbers and class sizes.',
    intro: 'School leaver attainment and destinations, teacher numbers, pupil-teacher ratios and class sizes across Scotland.',
    indicators: [
      {
        id: 'edu-neet',
        title: 'NEET \u2014 Not in Education, Employment or Training',
        description: 'School leavers not in higher education, further education, employment, training, skills development or voluntary work.',
        target: null,
        current:  { value: '4.3%', raw: 4.3, period: '2023-24' },
        previous: { value: '4.1%', raw: 4.1, period: '2022-23' },
        change: { value: '0.2pp', direction: 'up' },
        status: 'red',
        narrative: 'The proportion of school leavers being NEET is rising.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/news/school-leaver-attainment-and-destinations-8/' }
      },
      {
        id: 'edu-attainment-l5',
        title: 'Attainment \u2014 pass at SCQF Level 5',
        description: 'School leavers with 1 or more passes at SCQF Level 5 or better in National Qualifications.',
        target: null,
        current:  { value: '83.5%', raw: 83.5, period: '2023-24' },
        previous: { value: '84.8%', raw: 84.8, period: '2022-23' },
        change: { value: '1.3pp', direction: 'down' },
        status: 'red',
        narrative: 'The proportion of school leavers with a pass at Level 5 is falling.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/news/school-leaver-attainment-and-destinations-8/' }
      },
      {
        id: 'edu-teachers-primary',
        title: 'Number of Teachers \u2014 Primary',
        description: 'Number of primary school teachers.',
        target: null,
        current:  { value: '24,468', raw: 24468, period: '2024' },
        previous: { value: '25,097', raw: 25097, period: '2023' },
        change: { value: '629 (3%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of primary school teachers is falling.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      },
      {
        id: 'edu-teachers-secondary',
        title: 'Number of Teachers \u2014 Secondary',
        description: 'Number of secondary school teachers.',
        target: null,
        current:  { value: '24,988', raw: 24988, period: '2024' },
        previous: { value: '25,049', raw: 25049, period: '2023' },
        change: { value: '61 (0.2%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of secondary school teachers is falling.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      },
      {
        id: 'edu-teachers-special',
        title: 'Number of Teachers \u2014 Special',
        description: 'Number of special school teachers.',
        target: null,
        current:  { value: '2,138', raw: 2138, period: '2024' },
        previous: { value: '2,076', raw: 2076, period: '2023' },
        change: { value: '62 (3%)', direction: 'up' },
        status: 'green',
        narrative: 'The number of special school teachers is rising.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      },
      {
        id: 'edu-ptr-primary',
        title: 'Pupil-Teacher Ratio \u2014 Primary',
        description: 'Primary school pupil-to-teacher ratio.',
        target: null,
        current:  { value: '15.5', raw: 15.5, period: '2024' },
        previous: { value: '15.3', raw: 15.3, period: '2023' },
        change: { value: '0.2 (1.3%)', direction: 'up' },
        status: 'red',
        narrative: 'The pupil-teacher ratio in primary schools is rising.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      },
      {
        id: 'edu-ptr-secondary',
        title: 'Pupil-Teacher Ratio \u2014 Secondary',
        description: 'Secondary school pupil-to-teacher ratio.',
        target: null,
        current:  { value: '12.6', raw: 12.6, period: '2024' },
        previous: { value: '12.5', raw: 12.5, period: '2023' },
        change: { value: '0.1 (1%)', direction: 'up' },
        status: 'red',
        narrative: 'The pupil-teacher ratio in secondary schools is rising.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      },
      {
        id: 'edu-ptr-special',
        title: 'Pupil-Teacher Ratio \u2014 Special',
        description: 'Special school pupil-to-teacher ratio.',
        target: null,
        current:  { value: '3.7', raw: 3.7, period: '2024' },
        previous: { value: '3.7', raw: 3.7, period: '2023' },
        change: { value: 'No change', direction: 'none' },
        status: 'amber',
        narrative: 'The pupil-teacher ratio in special schools is unchanged.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      },
      {
        id: 'edu-class-size-primary',
        title: 'Average Class Size \u2014 Primary',
        description: 'Average primary school class size.',
        target: null,
        current:  { value: '23.3', raw: 23.3, period: '2024' },
        previous: { value: '23.2', raw: 23.2, period: '2023' },
        change: { value: '0.1 (0.4%)', direction: 'up' },
        status: 'red',
        narrative: 'The average class size in primary schools is rising.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/summary-statistics-for-schools-in-scotland-2024/' }
      }
    ]
  },

  // ===================================================================
  // JUSTICE
  // ===================================================================
  justice: {
    title: 'Justice',
    slug: 'justice',
    tileDescription: 'Police numbers, recorded crime, court outcomes and prison population.',
    intro: 'Police officer numbers, recorded crime levels, court journey times and the prison population in Scotland.',
    indicators: [
      {
        id: 'justice-police-officers',
        title: 'Number of Police Officers',
        description: 'Number of police officers (FTE).',
        target: null,
        current:  { value: '16,553', raw: 16553, period: 'Q1 2025' },
        previous: { value: '16,508', raw: 16508, period: 'Q4 2024' },
        change: { value: '45 (0.3%)', direction: 'up' },
        status: 'green',
        narrative: 'The number of police officers is rising.',
        source: { name: 'Police Scotland', url: 'https://www.scotland.police.uk/about-us/how-we-do-it/police-scotland-officer-numbers/' }
      },
      {
        id: 'justice-recorded-crime',
        title: 'Number of Recorded Crimes',
        description: 'Total number of recorded crimes.',
        target: null,
        current:  { value: '299,111', raw: 299111, period: '2024/25' },
        previous: { value: '299,780', raw: 299780, period: '2023/24' },
        change: { value: '669 (0.2%)', direction: 'down' },
        status: 'green',
        narrative: 'The number of recorded crimes is falling.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/recorded-crime-scotland-2023-24/pages/2/' }
      },
      {
        id: 'justice-verdicts-1yr',
        title: 'Verdicts within 1 year of offence date',
        description: 'Percentage of accused that proceed to court with verdicts within 1 year of the offence date.',
        target: null,
        current:  { value: '61%', raw: 61, period: '2023/24' },
        previous: { value: '57%', raw: 57, period: '2022/23' },
        change: { value: '4pp', direction: 'up' },
        status: 'green',
        narrative: 'Court verdicts within 1 year of the offence have increased.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/journey-times-in-the-scottish-criminal-justice-system-2023-24/pages/6-accused-that-proceed-to-court/' }
      },
      {
        id: 'justice-custody-time',
        title: 'Average Time in Custody',
        description: 'Average amount of time a prisoner spends in custody.',
        target: null,
        current:  { value: '222 days', raw: 222, period: '2023/24' },
        previous: { value: '235 days', raw: 235, period: '2022/23' },
        change: { value: '13 days (6%)', direction: 'down' },
        // Marked neutral rather than green/red \u2014 whether a falling
        // average time in custody is "good" depends on the cause (e.g.
        // throughput vs early release policy). Set this to red or green
        // if you want to take an editorial position.
        status: 'neutral',
        narrative: 'The average time in custody is falling.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/scottish-prison-population-statistics-2023-24/pages/population-transitions-and-out-flows' }
      }
    ]
  },

  // ===================================================================
  // SOCIAL SECURITY
  // ===================================================================
  'social-security': {
    title: 'Social Security',
    slug: 'social-security',
    tileDescription: 'Recipient numbers and processing times for devolved benefits.',
    intro: 'Recipient numbers and application processing times for Adult Disability Payment (ADP) and Child Disability Payment (CDP).',
    indicators: [
      {
        id: 'ss-adp-recipients',
        title: 'Recipient Numbers \u2014 ADP',
        description: 'Number of recipients of Adult Disability Payment (ADP).',
        target: null,
        current:  { value: '433,050', raw: 433050, period: 'Jan 2025' },
        previous: { value: '374,655', raw: 374655, period: 'Oct 2024' },
        change: { value: '58,395 (16%)', direction: 'up' },
        status: 'neutral',
        narrative: 'The number of people on ADP is increasing.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/asset-storage/production/downloads/Adult-Disability-Payment-to-31-January-2025-Publication.pdf' }
      },
      {
        id: 'ss-cdp-recipients',
        title: 'Recipient Numbers \u2014 CDP',
        description: 'Number of recipients of Child Disability Payment (CDP).',
        target: null,
        current:  { value: '89,400', raw: 89400, period: 'Mar 2025' },
        previous: { value: '87,475', raw: 87475, period: 'Dec 2024' },
        change: { value: '1,925 (2%)', direction: 'up' },
        status: 'neutral',
        narrative: 'The number of people on CDP is increasing.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/asset-storage/production/downloads/Child-Disability-Payment-statistics-to-31-March-2025-publication.pdf' }
      },
      {
        id: 'ss-adp-processing',
        title: 'Application Processing Time \u2014 ADP',
        description: 'Average processing time for Adult Disability Payment (ADP).',
        target: null,
        current:  { value: '42 days', raw: 42, period: 'Jan 2025' },
        previous: { value: '49 days', raw: 49, period: 'Oct 2024' },
        change: { value: '7 days (14%)', direction: 'down' },
        status: 'green',
        narrative: 'The processing time for ADP is decreasing.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/asset-storage/production/downloads/Adult-Disability-Payment-to-31-January-2025-Publication.pdf' }
      },
      {
        id: 'ss-cdp-processing',
        title: 'Application Processing Time \u2014 CDP',
        description: 'Average processing time for Child Disability Payment (CDP).',
        target: null,
        current:  { value: '79 days', raw: 79, period: 'Mar 2025' },
        previous: { value: '73 days', raw: 73, period: 'Dec 2024' },
        change: { value: '6 days (8%)', direction: 'up' },
        status: 'red',
        narrative: 'The processing time for CDP is increasing.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/asset-storage/production/downloads/Child-Disability-Payment-statistics-to-31-March-2025-publication.pdf' }
      }
    ]
  },

  // ===================================================================
  // HOUSING
  // ===================================================================
  housing: {
    title: 'Housing',
    slug: 'housing',
    tileDescription: 'Housebuilding completions and starts, by sector.',
    intro: 'Housebuilding completions and new starts in Scotland, broken down by private and social sector.',
    indicators: [
      {
        id: 'housing-completed-total',
        title: 'Houses Built (Completed) \u2014 Total',
        description: 'Number of houses built (completed).',
        target: null,
        current:  { value: '19,797', raw: 19797, period: '2024' },
        previous: { value: '21,238', raw: 21238, period: '2023' },
        change: { value: '1,441 (7%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of houses completed has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/quarterly-housing-statistics-march-2025/' }
      },
      {
        id: 'housing-completed-private',
        title: 'Houses Built (Completed) \u2014 Private Sector',
        description: 'Number of houses built (completed) by the private sector.',
        target: null,
        current:  { value: '15,066', raw: 15066, period: '2024' },
        previous: { value: '15,185', raw: 15185, period: '2023' },
        change: { value: '119 (1%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of houses completed by the private sector has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/quarterly-housing-statistics-march-2025/' }
      },
      {
        id: 'housing-completed-social',
        title: 'Houses Built (Completed) \u2014 Social Sector',
        description: 'Number of houses built (completed) by the social sector.',
        target: null,
        current:  { value: '4,731', raw: 4731, period: '2024' },
        previous: { value: '6,053', raw: 6053, period: '2023' },
        change: { value: '1,322 (22%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of houses completed by the social sector has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/quarterly-housing-statistics-march-2025/' }
      },
      {
        id: 'housing-starts-total',
        title: 'New Housebuilding Starts \u2014 Total',
        description: 'Number of new housebuilding starts.',
        target: null,
        current:  { value: '15,050', raw: 15050, period: '2024' },
        previous: { value: '16,588', raw: 16588, period: '2023' },
        change: { value: '1,538 (9%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of housebuilding starts has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/quarterly-housing-statistics-march-2025/' }
      },
      {
        id: 'housing-starts-private',
        title: 'New Housebuilding Starts \u2014 Private Sector',
        description: 'Number of new housebuilding starts by the private sector.',
        target: null,
        current:  { value: '11,617', raw: 11617, period: '2024' },
        previous: { value: '13,222', raw: 13222, period: '2023' },
        change: { value: '1,605 (12%)', direction: 'down' },
        status: 'red',
        narrative: 'The number of housebuilding starts by the private sector has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/quarterly-housing-statistics-march-2025/' }
      },
      {
        id: 'housing-starts-social',
        title: 'New Housebuilding Starts \u2014 Social Sector',
        description: 'Number of new housebuilding starts by the social sector.',
        target: null,
        current:  { value: '3,433', raw: 3433, period: '2024' },
        previous: { value: '3,366', raw: 3366, period: '2023' },
        change: { value: '67 (2%)', direction: 'up' },
        status: 'green',
        narrative: 'The number of housebuilding starts by the social sector has risen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/quarterly-housing-statistics-march-2025/' }
      }
    ]
  },

  // ===================================================================
  // TRANSPORT
  // ===================================================================
  transport: {
    title: 'Transport',
    slug: 'transport',
    tileDescription: 'Major infrastructure projects, rail performance and road safety.',
    intro: 'Progress on major infrastructure projects, ScotRail performance and road safety in Scotland.',
    indicators: [
      {
        // This indicator uses a different card layout (a progress bar
        // and a milestone list) instead of the current/previous pair.
        // See PROGRESS_TEMPLATE further down if you want to add another
        // one like it.
        id: 'transport-a9-dualling',
        type: 'progress',
        title: 'A9 Dualling Project',
        description: 'Of the 83 miles of the A9 needing to be dualled, this many have been completed.',
        progress: { current: 10.5, total: 83, unit: 'miles', asOf: 'June 2025' },
        milestones: [
          'Construction started in 2015.',
          'The original completion date was 2025.',
          'The current completion target is 2035.',
          'At the current pace of construction, the project will be completed in 2092.'
        ],
        status: 'red',
        source: { name: 'Transport Scotland', url: 'https://www.transport.gov.scot/projects/a9-dualling-perth-to-inverness/' }
      },
      {
        id: 'transport-scotrail-punctuality',
        title: 'ScotRail \u2014 Punctuality',
        description: 'Percentage of services which arrive within 5 minutes of their scheduled arrival time.',
        target: null,
        current:  { value: '91.7%', raw: 91.7, period: 'May\u2013Jun 2025' },
        previous: { value: '91.4%', raw: 91.4, period: 'Apr\u2013May 2025' },
        change: { value: '0.3pp', direction: 'up' },
        status: 'green',
        narrative: 'ScotRail punctuality has improved.',
        source: { name: 'ScotRail', url: 'https://www.scotrail.co.uk/performance-and-reliability' }
      },
      {
        id: 'transport-scotrail-cancellations',
        title: 'ScotRail \u2014 Cancellations',
        description: 'Percentage of services which are cancelled.',
        target: null,
        current:  { value: '2.3%', raw: 2.3, period: '2023-24' },
        previous: { value: '2.9%', raw: 2.9, period: '2022-23' },
        change: { value: '0.6pp', direction: 'down' },
        status: 'green',
        narrative: 'The proportion of ScotRail services cancelled has fallen.',
        source: { name: 'Office of Rail and Road', url: 'https://dataportal.orr.gov.uk/media/ymzlhtk4/scotrail-2023-24.pdf' }
      },
      {
        id: 'transport-road-casualties',
        title: 'Road Safety \u2014 Casualties',
        description: 'Number of road casualties.',
        target: null,
        current:  { value: '5,829', raw: 5829, period: '2023' },
        previous: { value: '5,643', raw: 5643, period: '2022' },
        change: { value: '186 (3%)', direction: 'up' },
        status: 'red',
        narrative: 'The number of road casualties has risen.',
        source: { name: 'Transport Scotland', url: 'https://www.transport.gov.scot/news/finalised-road-casualty-statistics-for-2023/' }
      },
      {
        id: 'transport-road-fatalities',
        title: 'Road Safety \u2014 Fatalities',
        description: 'Number of road fatalities.',
        target: null,
        current:  { value: '155', raw: 155, period: '2023' },
        previous: { value: '171', raw: 171, period: '2022' },
        change: { value: '16 (9%)', direction: 'down' },
        status: 'green',
        narrative: 'The number of road fatalities has fallen.',
        source: { name: 'Transport Scotland', url: 'https://www.transport.gov.scot/news/finalised-road-casualty-statistics-for-2023/' }
      }
    ]
  }

};

// Order in which sections appear in the nav and on the homepage.
const SECTION_ORDER = ['fiscal', 'nhs', 'education', 'justice', 'social-security', 'housing', 'transport'];
