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
        id: 'nhs-waiting-list',
        title: 'NHS Scotland Waiting Lists',
        description: 'Number of patients on at least one outpatient, inpatient or day case waiting list.',
        current:  { value: '572,206', raw: 572206, period: 'April 2026' },
        previous: { value: '571,054', raw: 571054, period: 'March 2026' },
        change: { value: '1152', direction: 'up' },
        status: 'red',
        narrative: 'The number of patients on a waiting list has increased.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-outpatient-standard',
        title: 'Outpatient Appointments Received Within 12 weeks',
        description: 'Under the Outpatient National Standard, 95% of new outpatients should receive an appointment within 12 weeks.',
        target: '95% of new outpatients seen within 12 weeks.',
        current:  { value: '65.5%', raw: 65.5, period: 'April 2026' },
        previous: { value: '59.2%', raw: 59.2, period: 'March 2026' },
        change: { value: '6.3pp', direction: 'up' },
        status: 'amber',
        narrative: 'The target has been missed, but more patients are receiving outpatient appointments within 12 weeks.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-outpatient-over-1yr',
        title: 'Outpatient Appointments - waiting over one year',
        description: 'Number of patients waiting over 52 weeks for an outpatient appointment.',
        target: 'Zero waits over 52 weeks by March 2026',
        current:  { value: '14,986', raw: 14986, period: 'April 2026' },
        previous: { value: '16,090', raw: 16090, period: 'March 2026' },
        change: { value: '1104', direction: 'down' },
        status: 'amber',
        narrative: 'The target has been missed, but the number of patients waiting over 52 weeks has decreased.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-outpatient-over-2yr',
        title: 'Outpatient Appointments - waiting over two years',
        description: 'Number of patients waiting over 104 weeks for an outpatient appointment.',
        target: 'Zero waits over 52 weeks by March 2026',
        current:  { value: '1144', raw: 1144, period: 'April 2026' },
        previous: { value: '1166', raw: 1166, period: 'March 2026' },
        change: { value: '22', direction: 'down' },
        status: 'amber',
        narrative: 'The target has been missed, but the number of patients waiting over 104 weeks has decreased.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-ttg',
        title: 'Treatments Completed within 12 weeks',
        description: 'Under the Treatment Time Guarantee, following the decision to treat, all eligible patients should wait no longer than 12 weeks for treatment.',
        target: '100% of patients treated within 12 weeks.',
        current:  { value: '57.0%', raw: 57.0, period: 'April 2026' },
        previous: { value: '53.9%', raw: 53.9, period: 'March 2026' },
        change: { value: '3.1pp', direction: 'up' },
        status: 'amber',
        narrative: 'The target has been missed, but more patients are being treated within 12 weeks.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-treatment-over-1yr',
        title: 'Treatment - patients waiting over one year',
        description: 'Number of patients waiting over 52 weeks for treatment.',
        target: 'Zero waits over 52 weeks by March 2026',
        current:  { value: '17,293', raw: 17293, period: 'April 2026' },
        previous: { value: '17,882', raw: 17882, period: 'March 2026' },
        change: { value: '589', direction: 'down' },
        status: 'amber',
        narrative: 'The target has been missed, but the number of patients waiting over 52 weeks has decreased.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-treatment-over-2yr',
        title: 'Treatment - patients waiting over two years',
        description: 'Number of patients waiting over 104 weeks for treatment.',
        target: 'Zero waits over 52 weeks by March 2026',
        current:  { value: '2289', raw: 2289, period: 'April 2026' },
        previous: { value: '2500', raw: 2500, period: 'March 2026' },
        change: { value: '211', direction: 'down' },
        status: 'amber',
        narrative: 'The target has been missed, but the number of patients waiting over 104 weeks has decreased.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/publications/stage-of-treatment-waiting-times/stage-of-treatment-waiting-times-new-outpatients-inpatients-and-day-cases-26-may-2026/' }
      },
      {
        id: 'nhs-ae-4hr',
        title: 'A&E patients seen within 4 hours',
        description: 'Under the A&E Access Standard, 95% of A&E attendances should be seen and result in a subsequent admission, transfer or discharge within 4 hours.',
        target: '95%.',
        current:  { value: '68.0%', raw: 68.0, period: 'April 2026' },
        previous: { value: '67.5%', raw: 67.5, period: 'March 2026' },
        change: { value: '0.5pp', direction: 'up' },
        status: 'amber',
        narrative: 'The target has been missed, but more A&E patients are being seen within 4 hours.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/healthcare-system/urgent-and-unscheduled-care/accident-and-emergency/main-points/all-ae-sites/' }
      },
      {
        id: 'nhs-ae-8hr',
        title: 'A&E attendances over 8 hours',
        description: 'Number of patients spending over 8 hours in A&E.',
        target: null,
        current:  { value: '15,389', raw: 15389, period: 'April 2026' },
        previous: { value: '17,543', raw: 17543, period: 'March 2026' },
        change: { value: '2154', direction: 'down' },
        status: 'green',
        narrative: 'The number of patients spending over 8 hours in A&E has fallen.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/healthcare-system/urgent-and-unscheduled-care/accident-and-emergency/main-points/all-ae-sites/' }
      },
      {
        id: 'nhs-ae-12hr',
        title: 'A&E attendances over 12 hours',
        description: 'Number of patients spending over 12 hours in A&E.',
        target: null,
        current:  { value: '6394', raw: 6394, period: 'April 2026' },
        previous: { value: '7745', raw: 7745, period: 'March 2026' },
        change: { value: '1351', direction: 'down' },
        status: 'green',
        narrative: 'The number of patients spending over 12 hours in A&E has fallen.',
        source: { name: 'Public Health Scotland', url: 'https://publichealthscotland.scot/healthcare-system/urgent-and-unscheduled-care/accident-and-emergency/main-points/all-ae-sites/' }
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
        title: 'NEET - Not in Education, Employment or Training',
        description: 'School leavers not in higher education, further education, employment, training, skills development or voluntary work.',
        target: null,
        current:  { value: '4.3%', raw: 4.3, period: '2024-25' },
        previous: { value: '4.3%', raw: 4.3, period: '2023-24' },
        change: { value: '0.0pp', direction: 'none' },
        status: 'amber',
        narrative: 'The proportion of school leavers being NEET is unchanged.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/news/school-leaver-attainment-and-destinations-9/' }
      },
      {
        id: 'edu-asn',
        title: 'Pupils with ASN',
        description: 'Proportion of pupils who had an Additional Support Need (ASN).',
        target: null,
        current:  { value: '43.0%', raw: 43.0, period: '2025' },
        previous: { value: '40.5%', raw: 40.5, period: '2024' },
        change: { value: '2.5pp', direction: 'up' },
        status: 'red',
        narrative: 'The proportion of pupils who have an Additional Support Need has risen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/school-teachers/' }
      },
      {
        id: 'edu-teachers-primary',
        title: 'Number of Teachers - Primary',
        description: 'Number of primary school teachers.',
        target: null,
        current:  { value: '24,415', raw: 24415, period: '2025' },
        previous: { value: '24,468', raw: 24468, period: '2024' },
        change: { value: '53', direction: 'down' },
        status: 'red',
        narrative: 'The number of primary school teachers has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/headline-statistics/' }
      },
      {
        id: 'edu-teachers-secondary',
        title: 'Number of Teachers - Secondary',
        description: 'Number of secondary school teachers.',
        target: null,
        current:  { value: '25,067', raw: 25067, period: '2025' },
        previous: { value: '24988', raw: 24988, period: '2024' },
        change: { value: '79', direction: 'up' },
        status: 'green',
        narrative: 'The number of secondary school teachers has risen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/headline-statistics/' }
      },
      {
        id: 'edu-teachers-special',
        title: 'Number of Teachers - Special',
        description: 'Number of special school teachers.',
        target: null,
        current:  { value: '2195', raw: 2195, period: '2025' },
        previous: { value: '2138', raw: 2138, period: '2024' },
        change: { value: '57', direction: 'up' },
        status: 'green',
        narrative: 'The number of special school teachers has risen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/headline-statistics/' }
      },
      {
        id: 'edu-ptr-primary',
        title: 'Pupil-Teacher Ratio - Primary',
        description: 'The number of pupils per teacher in Primary schools.',
        target: null,
        current:  { value: '15.3', raw: 15.3, period: '2025' },
        previous: { value: '15.5', raw: 15.5, period: '2024' },
        change: { value: '0.2', direction: 'down' },
        status: 'green',
        narrative: 'The pupil-teacher ratio in primary schools has fallen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/headline-statistics/' }
      },
      {
        id: 'edu-ptr-secondary',
        title: 'Pupil-Teacher Ratio - Secondary',
        description: 'The number of pupils per teacher in Secondary schools.',
        target: null,
        current:  { value: '12.6', raw: 12.6, period: '2025' },
        previous: { value: '12.6', raw: 12.6, period: '2024' },
        change: { value: '0.0', direction: 'none' },
        status: 'amber',
        narrative: 'The pupil-teacher ratio in secondary schools has not changed.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/headline-statistics/' }
      },
      {
        id: 'edu-ptr-special',
        title: 'Pupil-Teacher Ratio - Special',
        description: 'Special school pupil-to-teacher ratio.',
        target: null,
        current:  { value: '3.7', raw: 3.7, period: '2025' },
        previous: { value: '3.7', raw: 3.7, period: '2024' },
        change: { value: '0.0', direction: 'none' },
        status: 'amber',
        narrative: 'The pupil-teacher ratio in special schools has not changed.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/headline-statistics/' }
      },
      {
        id: 'edu-teacher-permanent',
        title: 'Teachers in Permanent Posts',
        description: 'Proportion of teachers in permanent posts.',
        target: null,
        current:  { value: '82%', raw: 82, period: '2025' },
        previous: { value: '82%', raw: 82, period: '2024' },
        change: { value: '0.0pp', direction: 'none' },
        status: 'amber',
        narrative: 'The proportion of teachers in permanent posts has not changed.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/pupil-and-teacher-characteristics-2025/pages/school-teachers/' }
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
        description: 'Full-time equivalent (FTE) Number of Police Scotland officers.',
        target: null,
        current:  { value: '16,430', raw: 16430, period: 'Q1 2026' },
        previous: { value: '16,416', raw: 16416, period: 'Q4 2025' },
        change: { value: '14', direction: 'up' },
        status: 'green',
        narrative: 'The number of police officers has risen.',
        source: { name: 'Police Scotland', url: 'https://www.scotland.police.uk/about-us/how-we-do-it/police-scotland-officer-numbers/' }
      },
      {
        id: 'justice-recorded-crime',
        title: 'Number of Recorded Crimes',
        description: 'Crimes are the more serious criminal acts, such as murder, assault, rape and fraud.',
        target: null,
        current:  { value: '299,111', raw: 299111, period: '2024/25' },
        previous: { value: '299,780', raw: 299780, period: '2023/24' },
        change: { value: '669', direction: 'down' },
        status: 'green',
        narrative: 'The number of recorded crimes has decreased.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/recorded-crime-scotland-2024-25/pages/key-points/' }
      },
      {
        id: 'justice-recorded-offences',
        title: 'Number of Recorded Offences',
        description: 'Offences are the less serious criminal acts, such as speeding, littering, anti-social behaviour and traffic violations.',
        target: null,
        current:  { value: '175,979', raw: 175979, period: '2024/25' },
        previous: { value: '174,073', raw: 174073, period: '2023/24' },
        change: { value: '1906', direction: 'up' },
        status: 'red',
        narrative: 'The number of recorded offences has increased.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/recorded-crime-scotland-2024-25/pages/key-points/' }
      },
      {
        id: 'justice-verdicts-1yr',
        title: 'Verdicts Within 1 Year',
        description: 'Percentage of accused that proceed to court with verdicts within 1 year since the police were first aware of the charges.',
        target: null,
        current:  { value: '70%', raw: 70, period: '2024/25' },
        previous: { value: '64%', raw: 64, period: '2023/24' },
        change: { value: '6pp', direction: 'up' },
        status: 'green',
        narrative: 'The criminal justice system is delivering verdicts quicker.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/journey-times-in-the-scottish-criminal-justice-system-2024-25/pages/6-overview-of-times-for-accused-that-proceed-to-court/' }
      },
      {
        id: 'justice-prison-population',
        title: 'Prison Population',
        description: 'Average daily prison population.',
        target: null,
        current:  { value: '8216', raw: 8216, period: '2024/25' },
        previous: { value: '7860', raw: 7860, period: '2023/24' },
        change: { value: '356', direction: 'up' },
        status: 'neutral',
        narrative: 'The prison population has risen.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/scottish-prison-population-statistics-2024-25/' }
      },
      {
        id: 'justice-early-release',
        title: 'Emergency Early Release',
        description: 'Number of prisoners granted emergency early release, in order to prevent overcrowding in the prison estate.',
        target: null,
        current:  { value: '555', raw: 555, period: '2025/26' },
        previous: { value: '477', raw: 477, period: '2024/25' },
        change: { value: '78', direction: 'up' },
        status: 'red',
        narrative: 'The number of prisoners being released early to prevent overcrowding has increased.',
        source: { name: 'Scottish Prison Service', url: 'https://www.sps.gov.uk/about-us/transparency/data-research-and-evidence/emergency-early-release-data' }
      },
      {
        id: 'justice-reoffending',
        title: 'Reoffending Within 1 Year',
        description: 'Proportion of individuals who left custody or had a community sentence who were reconvicted within 1 year.',
        target: null,
        current:  { value: '27.1%', raw: 27.1, period: '2021/22' },
        previous: { value: '26.9%', raw: 26.9, period: '2020/21' },
        change: { value: '0.2pp', direction: 'up' },
        status: 'red',
        narrative: 'The proportion of those leaving the criminal justice system who reoffend has increased. Note, the delay in reporting is so accurate data can be gathered on convictions and verdicts.',
        source: { name: 'Scottish Government', url: 'https://www.gov.scot/publications/reconviction-rates-in-scotland-2021-22-offender-cohort/' }
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
        title: 'ADP - Recipient Numbers',
        description: 'Number of recipients of the Adult Disability Payment (ADP).',
        target: null,
        current:  { value: '504,710', raw: 504710, period: 'Q1 2026' },
        previous: { value: '498,090', raw: 498090, period: 'Q4 2025' },
        change: { value: '6620', direction: 'up' },
        status: 'red',
        narrative: 'The number of people receiving ADP has increased.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/publications/2026/06/adult-disability-payment-statistics-to-30-april-2026' }
      },      
      {
        id: 'ss-adp-processing',
        title: 'ADP - Application Processing Time',
        description: 'Average processing time for Adult Disability Payment (ADP) applications.',
        target: null,
        current:  { value: '62 days', raw: 42, period: 'Q1 2026' },
        previous: { value: '57 days', raw: 49, period: 'Q4 2025' },
        change: { value: '5 days', direction: 'up' },
        status: 'red',
        narrative: 'The processing time for ADP applications has increased.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/publications/2026/06/adult-disability-payment-statistics-to-30-april-2026' }
      },
       {
        id: 'ss-cp-recipients',
        title: 'Scottish Child Payment - Recipient Numbers',
        description: 'Number of recipients of the Scottish Child Payment.',
        target: null,
        current:  { value: '321,885', raw: 321885, period: 'Q1 2026' },
        previous: { value: '321,375', raw: 321375, period: 'Q4 2025' },
        change: { value: '510', direction: 'up' },
        status: 'neutral',
        narrative: 'The number of recipients of the Scottish Child Payment has increased.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/publications/2026/05/scottish-child-payment-statistics-to-31-march-2026' }
      },      
      {
        id: 'ss-cp-processing',
        title: 'Scottish Child Payment - Application Processing Time',
        description: 'Average processing time for Scottish Child Payment applications.',
        target: null,
        current:  { value: '22 days', raw: 22, period: 'Q1 2026' },
        previous: { value: '18 days', raw: 18, period: 'Q4 2025' },
        change: { value: '4 days', direction: 'up' },
        status: 'red',
        narrative: 'The processing time for Scottish Child Payment applications has increased.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/publications/2026/05/scottish-child-payment-statistics-to-31-march-2026' }
      },
      {
        id: 'ss-cdp-recipients',
        title: 'CDP - Recipient Numbers',
        description: 'Number of recipients of the Child Disability Payment (CDP).',
        target: null,
        current:  { value: '101,990', raw: 101990, period: 'Q1 2026' },
        previous: { value: '98,950', raw: 98950, period: 'Q4 2026' },
        change: { value: '3040', direction: 'up' },
        status: 'red',
        narrative: 'The number of recipients of the CDP has increased.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/publications/2026/05/child-disability-payment-statistics-to-31-march-2026' }
      },
      {
        id: 'ss-cdp-processing',
        title: 'CDP - Application Processing Time',
        description: 'Average processing time for Child Disability Payment (CDP) applications.',
        target: null,
        current:  { value: '40 days', raw: 40, period: 'Q1 2026' },
        previous: { value: '72 days', raw: 72, period: 'Q4 2025' },
        change: { value: '32 days', direction: 'down' },
        status: 'green',
        narrative: 'The processing time for CDP applications has decreased.',
        source: { name: 'Social Security Scotland', url: 'https://www.socialsecurity.gov.scot/publications/2026/05/child-disability-payment-statistics-to-31-march-2026' }
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
