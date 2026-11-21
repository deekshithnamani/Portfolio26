# Portfolio specification v6 with v7 addendum

## General

- All copy goes in the data files (work.json, about.json, practice.json,
  site.json, photos.json). Remove copy hardcoded in components.
- Do not change any font sizes or spacing; use the existing tokens.
- A section with an empty body, and any empty optional field, does not
  render and does not appear in the section nav.
- Use ’ for apostrophes and – for ranges in all copy.
- Mark placeholder records placeholder: true. Never render the flag.

## Header and footer

- Header nav: Work, Creative, About. Remove Product.
- Footer left: LinkedIn ↗  GitHub ↗. Footer right: © 2026. Remove NextLeap
  and the handle.
- /product redirects to /work#product-thinking. /practice and
  /beyond-work redirect to /creative. List unused pages; don't delete files
  without asking me.

## Page titles and descriptions (`site.json`)

- Home: "Deekshith Namani · Product designer" / "Deekshith Namani is a
  product designer in Hyderabad working on AI and enterprise products."
- Work: "Deekshith Namani · Work" / "Selected work by Deekshith Namani,
  with the decisions behind it."
- Property-document checker: "Deekshith Namani · Property-document
  checker" / "A case study on a tool that surfaces issues in land
  documents."
- Univ.AI platform: "Deekshith Namani · Univ.AI platform" / "A design
  system, a job portal and a staff tool for an edtech startup."
- Creative: "Deekshith Namani · Creative" / "Photographs and studies by
  Deekshith Namani."
- About: "Deekshith Namani · About" / "About Deekshith Namani, a product
  designer in Hyderabad."
- 404: "Deekshith Namani · Not found"

## Home

- P1: "I’m Deekshith, a product designer in Hyderabad. I started as a
  chemical engineer, moved into design, and for the last three years have
  worked on AI and enterprise products, mostly as the only designer on the
  project."
- P2: "When I’m not working I photograph things, and some of those
  photographs are the background of this page." "photograph" links to
  /creative.
- Label "Selected work", then the Work entries marked `featured`, newest
  first using the same sort as Work. Show titles in a flat list. Personal
  projects can omit the company field.

## Work page

- Intro: "Selected work, with the decisions behind it."
- Group projects by company. Sort companies by their latest end year, putting
  ongoing roles first. The current order is DAOSoft, Stealth AI startup, Univ.AI.
- Sort projects within each company and the Product thinking section newest
  first from the years in `work.json`.
- Put company, role and duration beside the project list on wider screens, and
  above it on narrow screens. Use “UX/UI Designer” for every company role.
  Role, duration and project details use secondary
  type. Use dividers at group and section boundaries, with none on individual rows.
- Keep the following rows and omit status tags:
  Property-document checker | 2023–24 | Stealth AI startup · Flags issues
    in land documents that take lawyers weeks.
  Decision workflows | 2024– | DAOSoft · How a high-stakes engineering
    decision moves through one connected system. | no link
  Univ.AI platform | 2022–23 | Univ.AI · A design system, a job portal and
    a staff tool for an edtech startup.
- Section "Product thinking" (id product-thinking):
  Zomato eco-features PRD | 2025 | Graduation project on driving
    eco-feature adoption in Zomato: KPI tree, PRD and experimentation
    roadmap. | gray, no link
  NextLeap portfolio ↗ | 2025 | The rest of my fellowship projects. |
    link https://nextleap.app/portfolio/n-deekshith
  Line below: "NextLeap PM Fellowship, Feb–May 2025. Top ~12% of 200+
  fellows, 87%." Optional certificateUrl appends "Certificate ↗".

## Project pages

- Give every populated section a 16:9 image slot using the existing tokens.
  An image can fill the slot when supplied. Captions are optional.

- End the page with "← Work".
- Replace Role/Context/Period with one meta line (small token).
- Section nav labels match the section headings below.

## Property-document checker

- Title: Property-document checker
- Summary: "A legal workspace that helps surface issues in land documents
  before they become expensive problems."
- Meta: "Product design · Stealth AI startup, legal-tech · Aug 2023 –
  Feb 2024"
- Sections (heading: body):
  Context: "The startup was building an AI product for the legal market in
  India. Designs from an earlier freelancer had been set aside, so I
  redesigned web and mobile from scratch. The founders had long feature
  lists, and I was the designer on this project."
  Problem: "Checking a land document for problems can take a lawyer weeks.
  The idea was a checker that flags issues early, so a lawyer’s time goes
  to judgment instead of searching."
  Options: "The first big choice was one product or two. Leadership decided
  on two, a consumer legal marketplace and an AI workspace for lawyers,
  after talking with the founders’ network and with lawyer focus groups. I
  contributed to those discussions as the designer."
  What I cut: "The founders’ feature lists were long. I questioned them and
  cut scope down to the core jobs a lawyer needed done, so the first
  version could be built and tested."
  Tradeoffs: (empty)
  Outcome: "The two apps launched on web and mobile with 1K+ downloads,
  mostly through the founders’ network. I don’t have usage numbers for the
  property-document checker itself. If I were measuring it, I’d look at how
  long a first review takes and how often a flagged issue turns out to be
  real."
  In hindsight: (empty)

## Univ.AI platform

- Meta: "Product design · Univ.AI · Oct 2022 – Apr 2023"
- Sections (no section nav):
  Background: "Univ.AI was an edtech company where Ivy League professors
  taught live to Indian learners, with a curriculum like a college’s. It
  needed its own platform to cut costs on third-party tools."
  My part: "As the UX/UI intern I audited the existing screens and built
  the platform’s first design system. I designed the learner flows
  (discovery, course pages, video, notes and community), a job portal with
  profiles, a recruiter side, applications and tracking, and a staff tool
  for teaching assistants inside the platform. I ran the interviews with
  the teaching assistants, with my mentor shadowing and stepping in when
  needed."
  Outcome: "I handed the designs to engineering, and what shipped differed
  from what I had designed. I don’t have metrics for this work. The company
  later shut down after failing to raise funding."

## Creative

- Title "Creative". Intro: "Photographs and studies I make to unwind."
- Series (slug | title | line): each is a small dithered image with a
  caption linking to its series page.
  city-typefaces | City typefaces | Lettering on shopfronts, signs and
    walls around the city.
  evening-skies | Evening skies | A daily photograph of the evening sky.
  colors-on-walks | Colors on walks | Colors that catch my eye, collected
    as photographs.
  live-sketches | Live sketches | Sketches made on location.
- Series page: title, the one line, then the image grid. Captions optional
  and empty. Use the existing neutral placeholder images.

## About

- Title "About". Three paragraphs, no heading:
  P1: "I’m a product designer in Hyderabad. I studied chemical engineering
  at NIT Nagpur and started at Tata Consulting Engineers, designing plants
  for mining and metallurgy projects, and began exploring design on the
  side. A mentor helped me prepare for a design masters, I took a short UX
  workshop, and then I left to find a way in. After a few interviews with
  no offers, the same mentor offered me an internship at Univ.AI."
  P2: "Since then I’ve worked on AI and enterprise products at early-stage
  teams, often as the only designer on the project: a legal workspace for
  lawyers, and now a platform for high-stakes engineering decisions. I’ve
  built design systems from scratch and ship small UI fixes to production
  with AI coding tools."
  P3: "In 2025 I did the NextLeap PM Fellowship to learn how product
  managers frame problems, set metrics and prioritise."
- Headings and text:
  How I work: "I start with the problem and the person who has it. I
  question long feature lists, because most of them are guesses. I like
  seeing how a decision moves through a whole system, not just one screen,
  and I want to know afterwards whether it worked."
  What I’m looking for: "A product built for the long term and improved
  with real users, where I’m close to the decisions and can see whether
  they worked. The title matters less to me than that."
  Outside work: "I read a lot about human behaviour and visual design, and
  I photograph and sketch to unwind. Some of that lives on Creative. I
  speak Telugu, Hindi and English." "Creative" links to /creative.
- Closing line: "Find me on LinkedIn ↗".

## 404

- "That page doesn’t exist." with a "← Home" link.
