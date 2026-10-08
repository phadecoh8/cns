# CNS — Campus Navigation System

A navigation platform for higher institutions in Nigeria. Students and visitors search for any place on campus, see what it looks like and what is inside, and get guided there on a live 2D map.

> Status: pre-development. Rollout starts with universities in South West Nigeria, then the rest of Nigeria. Long-term scale target: 300,000+ users. The demo expects fewer than 2,000.

## What it does

- **Search any campus location.** Typos still find results (similar matches), otherwise "not found" is shown.
- **Location card.** Building photo, building name, bookmark icon, the offices and classes inside, and a description of what the building is for.
- **Live route guidance.** A 2D map with your current location, a red destination pin, the red route trail and the distance in kilometres. On arrival: "Congratulations, you have reached your final destination."
- **Off-trail help.** If you leave the route, the app says it is readjusting and draws a new one.
- **Works through network drops.** CNS's own data for a searched location is saved on the device, so GPS guidance to it keeps working. Google map tiles are not cached.
- **Inside buildings.** Offices and rooms are mapped by hand, first as a directory (building, floor, rooms), later as floor plans if schools provide them.
- **Class updates and assignments.** Class governors post class time and venue, and where and when to submit assignments. Students see only what matches their department and level.
- **Next class button.** The homepage shows your next class with a button that opens the map to its venue.
- **Class changes.** Governors mark classes cancelled or moved, and students are notified in-app and by email.
- **Announcements and events.** Posted by committees, HODs, Deans and the VC for their own scope.
- **Report a problem and feedback.** Flag a wrong location, photo or office detail, or an app bug. Send feedback to your school.
- **Low data mode.** Small images, no animations and the map loads on tap, for slow connections.
- **CNS AI assistant.** Answers questions, teaches new users how to use the site, and knows what CNS is.
- **Cat messages.** A crying cat for errors, a happy cat for arrival, account created and email verified, and a cat on the 404 and empty screens.
- **Extras:** bookmarks ("most bookmarked" ranking), in-app and email notifications, dark mode.

## Who uses it

| User | Login | Access |
|---|---|---|
| Fresher | JAMB Reg. No | Full campus. Green "not fully verified" badge until a matric number is added |
| Student | Matric number | Full campus. Blue "fully verified" badge |
| Visitor | Continue as guest button (no account) | A demo page with only the locations the school chose; no classroom, bookmarks or notifications |
| Class governor | Personal login | Posts classes and assignments; sees students in own department and level |
| HOD and committee | Personal login | Sees students in own department, one section per level; posts department announcements and events; cannot post classes |
| Dean | Personal login | Sees students of every department in the faculty; posts faculty announcements and events |
| VC | Personal login | Sees the whole school; sets session dates; manages the school's locations and buildings; bulk CSV uploads; posts school-wide announcements and events |
| Founder | Personal login | Sees all schools and user counts per school; creates dashboard accounts; adds faculties and departments during the demo; corrects a student's level when asked |

Every user picks their **school** at login and lands in that school's own space. New users verify their email. Emails (Resend) cover verification, password reset and notices. Dashboard accounts (VC, Dean, HOD, committee, governor) are created by the founder and handed over with a one-time temporary password that must be changed at first login.

**Verification (current plan):** during testing the founder verifies numbers manually. If a school approves CNS, it sends a list of valid numbers to upload. If an official API is found, it is used instead.

## Academic session

- The VC sets the **session end date**. After it, uploads of events, classes and assignments stop.
- The VC sets the **new session date**. On that day every student moves up one level.
- Graduating students: the system recommends deleting their data, with an advisory note from the Gemini API (no personal data is sent to it). Only after the VC approves is it deleted, following a 7-day recovery window. If not approved, accounts stay active for 30 days.
- Users can delete their own account any time from Settings. It is deleted immediately.

## Pages

- **Landing page (built first):** header with logo and Join waitlist button, hero, looping map animation (SVG), how it works (Search, Navigate, Arrive), about section (who it is for, how it is used, benefits), FAQ, newsletter, footer
- **Login:** school selection, JAMB Reg. No or matric number and password, a Continue as guest button, email verification, password reset, admin entry
- **Homepage:** avatar and name (left), notification and help centre buttons (right), recent searches and announcements, footer with Home, Search, Classroom, Settings
- **Search:** category filter chips (most bookmarked, mini mart, and so on), in the style of Spotify's search page
- **Classroom:** classes and assignments for the user's department and level
- **Settings:** Account (photo, editable username, surname and first name, school, department, delete account by typing "delete account"), Feedback to the school, privacy policy, terms of service, low data mode, Log out

## Pilot scope

- **Faculty of Engineering:** Mechanical Engineering, Material Engineering
- **Faculty of CIESA:** Mechatronics Engineering, Computer Engineering

The founder adds faculties and departments during the demo; later deans do it. More departments (Civil, Agriculture and Bio material, Electrical, Systems Engineering) come later.

**Demo and test run:** the founder's own department is the demo, with fake demo accounts for every role. The founder supplies the building names, photos and information. Demo accounts are deleted before launch.

**Future versions:** a Staff role, dean-managed departments, floor-plan indoor maps, offline campus paths, and payments.

## Tech stack

| Layer | Choice |
|---|---|
| Language | TypeScript |
| Frontend | Next.js, Tailwind CSS, shadcn/ui |
| Icons and animation | lucide-react, Motion |
| Backend | Node.js + Express (Python only if necessary) |
| Database | PostgreSQL with Drizzle ORM, plus a separate database for the waitlist |
| Auth | Auth.js (frontend session) with Express as the identity source |
| Email | Resend |
| Images | Cloudinary |
| AI assistant | Gemini API, free tier to start (graduation advice, customer service, onboarding) |
| Maps and routing | Google Maps (2D only) |
| Package manager | pnpm |
| Quality | ESLint with Stylistic rules (formats code), Prettier (non-code files), Vitest, Conventional Commits |
| CI and security | GitHub Actions (secret scanning, dependency checks, CodeQL, ZAP) |
| Hosting | Phase 1: Vercel (frontend and backend) with a managed Postgres; move up later when funded |

## Design

- **Colour split:** white 60%, blue 20%, ash `#333333` 10%, black `#000000` 10%
- **Buttons:** solid blue; the background gets lighter on hover
- **Minor colours:** red for errors and the route trail, emerald for success, light grey borders
- **Typography:** Arial for body and UI, Times New Roman for headings, with self-hosted look-alikes (Arimo and Tinos) for phones that lack them
- **Cards** lift up on hover with a shadow; **icons** are lightly animated (the location icon bobs)
- **Logo:** a blue campus building with a location icon (black and ash)
- **Icons and animation:** icon package and Motion; no emojis anywhere in the project
- **Dark mode:** supported

Exact values live in `frontend/src/styles/tokens.css`. Blue is `#1D4ED8` (lighter `#2563EB` on hover). The owner provides the website designs and the layout is copied exactly. The reference screens are described in `docs/DESIGN.md`.

## Project structure

Every file is listed. Folders end with `/`. Generated files (such as migrations) are shown for completeness.

```
cns/
├── README.md
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── CODEX.md
├── LICENSE
├── SECURITY.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── .gitignore
├── .prettierrc
├── .prettierignore
├── package.json
├── pnpm-workspace.yaml
├── docs/
│   ├── PRODUCT.md
│   ├── DESIGN.md
│   ├── DESIGN-PROMPTS.md
│   ├── LANDING-PAGE-PLAN.md
│   ├── DATA-MODEL.md
│   ├── FILE-STRUCTURE.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   ├── DEVSECOPS.md
│   └── GLOSSARY.md
├── .github/
│   ├── workflows/
│   │   ├── ci.yml
│   │   ├── security.yml
│   │   └── dast.yml
│   ├── dependabot.yml
│   ├── CODEOWNERS
│   └── pull_request_template.md
├── frontend/
│   ├── .env.example
│   ├── package.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   ├── postcss.config.mjs
│   ├── components.json
│   ├── eslint.config.mjs
│   ├── vitest.config.ts
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── logo.svg
│   │   ├── og-image.png
│   │   ├── fonts/
│   │   │   ├── Arimo-Regular.woff2
│   │   │   ├── Arimo-Bold.woff2
│   │   │   ├── Tinos-Regular.woff2
│   │   │   ├── Tinos-Bold.woff2
│   │   │   └── fonts-licence.txt
│   │   └── images/
│   │       └── hero-background.jpg
│   ├── tests/
│   │   ├── landing-page.test.tsx
│   │   ├── login-form.test.tsx
│   │   ├── waitlist-dialog.test.tsx
│   │   ├── newsletter-form.test.tsx
│   │   ├── offline-cache.test.ts
│   │   └── geo.test.ts
│   └── src/
│       ├── middleware.ts
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── globals.css
│       │   ├── not-found.tsx
│       │   ├── error.tsx
│       │   ├── loading.tsx
│       │   ├── robots.ts
│       │   ├── sitemap.ts
│       │   ├── api/
│       │   │   └── auth/
│       │   │       └── [...nextauth]/
│       │   │           └── route.ts
│       │   ├── (marketing)/
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx
│       │   │   ├── privacy-policy/
│       │   │   │   └── page.tsx
│       │   │   ├── terms-of-service/
│       │   │   │   └── page.tsx
│       │   │   ├── feedback/
│       │   │   │   └── page.tsx
│       │   │   └── newsletter/
│       │   │       ├── confirm/
│       │   │       │   └── page.tsx
│       │   │       └── unsubscribe/
│       │   │           └── page.tsx
│       │   ├── guest/
│       │   │   └── page.tsx
│       │   ├── (auth)/
│       │   │   ├── layout.tsx
│       │   │   ├── login/
│       │   │   │   └── page.tsx
│       │   │   ├── signup/
│       │   │   │   └── page.tsx
│       │   │   ├── verify-email/
│       │   │   │   └── page.tsx
│       │   │   ├── forgot-password/
│       │   │   │   └── page.tsx
│       │   │   ├── reset-password/
│       │   │   │   └── page.tsx
│       │   │   ├── change-password/
│       │   │   │   └── page.tsx
│       │   │   ├── two-factor/
│       │   │   │   └── page.tsx
│       │   │   └── two-factor-setup/
│       │   │       └── page.tsx
│       │   ├── (app)/
│       │   │   ├── layout.tsx
│       │   │   ├── home/
│       │   │   │   └── page.tsx
│       │   │   ├── search/
│       │   │   │   └── page.tsx
│       │   │   ├── location/
│       │   │   │   └── [id]/
│       │   │   │       └── page.tsx
│       │   │   ├── navigate/
│       │   │   │   └── [id]/
│       │   │   │       └── page.tsx
│       │   │   ├── classroom/
│       │   │   │   └── page.tsx
│       │   │   ├── assignments/
│       │   │   │   └── page.tsx
│       │   │   ├── bookmarks/
│       │   │   │   └── page.tsx
│       │   │   ├── announcements/
│       │   │   │   └── page.tsx
│       │   │   ├── events/
│       │   │   │   └── page.tsx
│       │   │   ├── notifications/
│       │   │   │   └── page.tsx
│       │   │   ├── help/
│       │   │   │   └── page.tsx
│       │   │   └── settings/
│       │   │       ├── page.tsx
│       │   │       ├── account/
│       │   │       │   └── page.tsx
│       │   │       ├── feedback/
│       │   │       │   └── page.tsx
│       │   │       ├── privacy-policy/
│       │   │       │   └── page.tsx
│       │   │       └── terms-of-service/
│       │   │           └── page.tsx
│       │   └── admin/
│       │       ├── layout.tsx
│       │       ├── login/
│       │       │   └── page.tsx
│       │       ├── founder/
│       │       │   ├── page.tsx
│       │       │   ├── schools/
│       │       │   │   └── page.tsx
│       │       │   ├── faculties/
│       │       │   │   └── page.tsx
│       │       │   ├── accounts/
│       │       │   │   └── page.tsx
│       │       │   ├── reports/
│       │       │   │   └── page.tsx
│       │       │   ├── feedback/
│       │       │   │   └── page.tsx
│       │       │   └── waitlist/
│       │       │       └── page.tsx
│       │       ├── vc/
│       │       │   ├── page.tsx
│       │       │   ├── students/
│       │       │   │   └── page.tsx
│       │       │   ├── locations/
│       │       │   │   └── page.tsx
│       │       │   ├── buildings/
│       │       │   │   └── page.tsx
│       │       │   ├── bulk-upload/
│       │       │   │   └── page.tsx
│       │       │   ├── verification/
│       │       │   │   └── page.tsx
│       │       │   ├── session/
│       │       │   │   └── page.tsx
│       │       │   ├── graduation/
│       │       │   │   └── page.tsx
│       │       │   ├── reports/
│       │       │   │   └── page.tsx
│       │       │   ├── feedback/
│       │       │   │   └── page.tsx
│       │       │   └── announcements/
│       │       │       └── page.tsx
│       │       ├── dean/
│       │       │   ├── page.tsx
│       │       │   ├── students/
│       │       │   │   └── page.tsx
│       │       │   ├── feedback/
│       │       │   │   └── page.tsx
│       │       │   └── announcements/
│       │       │       └── page.tsx
│       │       ├── department/
│       │       │   ├── page.tsx
│       │       │   ├── students/
│       │       │   │   └── page.tsx
│       │       │   ├── feedback/
│       │       │   │   └── page.tsx
│       │       │   └── announcements/
│       │       │       └── page.tsx
│       │       └── governor/
│       │           ├── page.tsx
│       │           ├── classes/
│       │           │   └── page.tsx
│       │           ├── assignments/
│       │           │   └── page.tsx
│       │           └── students/
│       │               └── page.tsx
│       ├── components/
│       │   ├── ui/
│       │   │   ├── accordion.tsx
│       │   │   ├── alert.tsx
│       │   │   ├── avatar.tsx
│       │   │   ├── badge.tsx
│       │   │   ├── button.tsx
│       │   │   ├── card.tsx
│       │   │   ├── checkbox.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── dropdown-menu.tsx
│       │   │   ├── form.tsx
│       │   │   ├── input.tsx
│       │   │   ├── label.tsx
│       │   │   ├── select.tsx
│       │   │   ├── skeleton.tsx
│       │   │   ├── switch.tsx
│       │   │   ├── table.tsx
│       │   │   ├── tabs.tsx
│       │   │   ├── textarea.tsx
│       │   │   └── toast.tsx
│       │   ├── layout/
│       │   │   ├── app-shell.tsx
│       │   │   ├── header.tsx
│       │   │   ├── bottom-nav.tsx
│       │   │   ├── logo.tsx
│       │   │   ├── theme-toggle.tsx
│       │   │   └── splash-screen.tsx
│       │   ├── landing/
│       │   │   ├── landing-header.tsx
│       │   │   ├── hero.tsx
│       │   │   ├── map-animation.tsx
│       │   │   ├── how-it-works.tsx
│       │   │   ├── about.tsx
│       │   │   ├── faq.tsx
│       │   │   ├── newsletter-form.tsx
│       │   │   ├── waitlist-dialog.tsx
│       │   │   ├── honeypot-field.tsx
│       │   │   └── landing-footer.tsx
│       │   ├── cats/
│       │   │   ├── crying-cat.tsx
│       │   │   ├── happy-cat.tsx
│       │   │   ├── calm-cat.tsx
│       │   │   └── message-with-cat.tsx
│       │   ├── auth/
│       │   │   ├── login-form.tsx
│       │   │   ├── signup-form.tsx
│       │   │   ├── school-picker.tsx
│       │   │   ├── guest-button.tsx
│       │   │   ├── password-fields.tsx
│       │   │   ├── two-factor-form.tsx
│       │   │   └── two-factor-setup.tsx
│       │   ├── map/
│       │   │   ├── map-view.tsx
│       │   │   ├── route-trail.tsx
│       │   │   ├── destination-pin.tsx
│       │   │   ├── distance-badge.tsx
│       │   │   ├── off-trail-banner.tsx
│       │   │   └── arrival-message.tsx
│       │   ├── search/
│       │   │   ├── search-box.tsx
│       │   │   ├── filter-chips.tsx
│       │   │   ├── search-results.tsx
│       │   │   ├── recent-searches.tsx
│       │   │   └── did-you-mean.tsx
│       │   ├── location/
│       │   │   ├── location-card.tsx
│       │   │   ├── bookmark-button.tsx
│       │   │   ├── indoor-list.tsx
│       │   │   └── report-problem-dialog.tsx
│       │   ├── classroom/
│       │   │   ├── class-card.tsx
│       │   │   ├── class-change-badge.tsx
│       │   │   ├── next-class-button.tsx
│       │   │   └── assignment-card.tsx
│       │   ├── assistant/
│       │   │   ├── assistant-chat.tsx
│       │   │   └── onboarding-guide.tsx
│       │   ├── settings/
│       │   │   ├── account-form.tsx
│       │   │   ├── avatar-upload.tsx
│       │   │   ├── delete-account-dialog.tsx
│       │   │   └── low-data-toggle.tsx
│       │   ├── feedback/
│       │   │   └── feedback-form.tsx
│       │   ├── notifications/
│       │   │   └── notification-list.tsx
│       │   └── admin/
│       │       ├── dashboard-shell.tsx
│       │       ├── student-table.tsx
│       │       ├── level-section.tsx
│       │       ├── location-editor.tsx
│       │       ├── building-editor.tsx
│       │       ├── bulk-upload-form.tsx
│       │       ├── csv-preview-table.tsx
│       │       ├── session-dates-form.tsx
│       │       ├── graduation-review.tsx
│       │       ├── announcement-form.tsx
│       │       ├── class-form.tsx
│       │       ├── assignment-form.tsx
│       │       ├── account-create-form.tsx
│       │       ├── faculty-editor.tsx
│       │       ├── department-editor.tsx
│       │       ├── level-correction-form.tsx
│       │       ├── reports-table.tsx
│       │       └── feedback-list.tsx
│       ├── content/
│       │   ├── landing-copy.ts
│       │   ├── faq.ts
│       │   └── categories.ts
│       ├── lib/
│       │   ├── auth.ts
│       │   ├── api-client.ts
│       │   ├── constants.ts
│       │   ├── utils.ts
│       │   ├── validation.ts
│       │   ├── offline-cache.ts
│       │   ├── geo.ts
│       │   ├── google-maps.ts
│       │   ├── low-data.ts
│       │   └── format-date.ts
│       ├── hooks/
│       │   ├── use-debounce.ts
│       │   ├── use-low-data.ts
│       │   ├── use-off-trail.ts
│       │   ├── use-offline-location.ts
│       │   ├── use-reduced-motion.ts
│       │   └── use-theme.ts
│       ├── types/
│       │   ├── api.ts
│       │   ├── domain.ts
│       │   └── next-auth.d.ts
│       └── styles/
│           ├── tokens.css
│           └── fonts.css
└── backend/
    ├── .env.example
    ├── package.json
    ├── tsconfig.json
    ├── drizzle.config.ts
    ├── drizzle.waitlist.config.ts
    ├── eslint.config.mjs
    ├── vitest.config.ts
    ├── vercel.json
    └── src/
        ├── index.ts
        ├── app.ts
        ├── config/
        │   ├── env.ts
        │   ├── cors.ts
        │   ├── rate-limits.ts
        │   └── constants.ts
        ├── db/
        │   ├── index.ts
        │   ├── schema/
        │   │   ├── index.ts
        │   │   ├── schools.ts
        │   │   ├── users.ts
        │   │   ├── verification.ts
        │   │   ├── refresh-tokens.ts
        │   │   ├── academic-sessions.ts
        │   │   ├── graduation.ts
        │   │   ├── locations.ts
        │   │   ├── classes.ts
        │   │   ├── bookmarks.ts
        │   │   ├── searches.ts
        │   │   ├── announcements.ts
        │   │   ├── notifications.ts
        │   │   ├── reports.ts
        │   │   ├── feedback.ts
        │   │   ├── imports.ts
        │   │   └── audit-log.ts
        │   ├── migrations/
        │   │   └── 0000_init.sql
        │   ├── waitlist/
        │   │   ├── client.ts
        │   │   ├── schema.ts
        │   │   └── migrations/
        │   │       └── 0000_init.sql
        │   ├── seed-data/
        │   │   ├── pilot-faculties.ts
        │   │   └── demo-school.ts
        │   └── seed.ts
        ├── middleware/
        │   ├── request-id.ts
        │   ├── security-headers.ts
        │   ├── authenticate.ts
        │   ├── force-password-change.ts
        │   ├── require-role.ts
        │   ├── scope-guard.ts
        │   ├── session-lock.ts
        │   ├── rate-limit.ts
        │   ├── validate.ts
        │   ├── cron-auth.ts
        │   ├── audit.ts
        │   └── error-handler.ts
        ├── modules/
        │   ├── auth/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   ├── schema.ts
        │   │   └── two-factor.ts
        │   ├── guest/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── schools/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── faculties/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── departments/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── users/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── accounts/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── verification/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── academic-sessions/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── graduation/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── buildings/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── locations/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── indoor-places/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── search/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── bookmarks/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── classes/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── assignments/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── announcements/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── events/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── notifications/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── reports/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── feedback/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── imports/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   ├── schema.ts
        │   │   └── templates/
        │   │       ├── verification-list.csv
        │   │       ├── locations.csv
        │   │       ├── buildings.csv
        │   │       └── indoor-places.csv
        │   ├── uploads/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── waitlist/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── newsletter/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── assistant/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   ├── schema.ts
        │   │   ├── prompts.ts
        │   │   └── knowledge/
        │   │       ├── about-cns.md
        │   │       ├── how-to-use.md
        │   │       └── faq.md
        │   ├── admin/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   ├── audit/
        │   │   ├── routes.ts
        │   │   ├── controller.ts
        │   │   ├── service.ts
        │   │   └── schema.ts
        │   └── jobs/
        │       ├── routes.ts
        │       ├── controller.ts
        │       ├── service.ts
        │       └── schema.ts
        ├── jobs/
        │   ├── level-rollover.ts
        │   ├── session-lock.ts
        │   ├── graduation-recommendation.ts
        │   ├── reminders.ts
        │   └── retention-cleanup.ts
        ├── services/
        │   ├── email.ts
        │   ├── maps.ts
        │   ├── cloudinary.ts
        │   ├── ai.ts
        │   └── email-templates/
        │       ├── verify-email.ts
        │       ├── reset-password.ts
        │       ├── notice.ts
        │       ├── class-change.ts
        │       └── newsletter-confirm.ts
        ├── utils/
        │   ├── password.ts
        │   ├── tokens.ts
        │   ├── csv.ts
        │   ├── pagination.ts
        │   ├── dates.ts
        │   ├── logger.ts
        │   └── errors.ts
        ├── types/
        │   └── express.d.ts
        └── tests/
            ├── helpers/
            │   ├── factories.ts
            │   └── test-app.ts
            ├── auth-flow.test.ts
            ├── scoping.test.ts
            ├── role-access.test.ts
            ├── session-lock.test.ts
            ├── level-rollover.test.ts
            ├── graduation.test.ts
            ├── account-deletion.test.ts
            ├── bulk-import.test.ts
            ├── search.test.ts
            ├── waitlist.test.ts
            ├── newsletter.test.ts
            ├── retention.test.ts
            └── assistant-privacy.test.ts
```

## Getting started

These steps work once the project is scaffolded. The landing page is built first: see `docs/LANDING-PAGE-PLAN.md`.

Requires Node.js (LTS) and pnpm.

```bash
pnpm install
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
# fill in the values in both .env files
pnpm --filter backend db:migrate
pnpm dev
```

## Environment variables

All secrets live in `.env` files, which are never committed. Each app has a `.env.example` with empty values.

**backend/.env.example**
```
PORT=
DATABASE_URL=
WAITLIST_DATABASE_URL=
JWT_ACCESS_SECRET=
CRON_SECRET=
RESEND_API_KEY=
GOOGLE_MAPS_SERVER_API_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GEMINI_API_KEY=
FOUNDER_EMAIL=
FOUNDER_INITIAL_PASSWORD=
FRONTEND_URL=
```

**frontend/.env.example**
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
AUTH_SECRET=
AUTH_URL=
```

Restrict the browser Google Maps key to the CNS domains in the Google Cloud console.

## Security

Every pull request runs lint, type-check, tests and build, plus secret scanning, dependency checks and code scanning. A weekly scan attacks a staging copy of the app. Details are in `docs/DEVSECOPS.md`. To report a vulnerability, see `SECURITY.md`.

## Roadmap

1. Build the landing page first, then the app with demo logins and test run
2. At launch, turn waitlist entries into accounts
3. Data protection work (Nigeria Data Protection Act), scheduled backups with a restore test, a staging deployment, error monitoring and uptime alerts
4. Marketing
5. Payments and billing once buyers are found

## Conventions

- Conventional Commits (`feat:`, `fix:`, `chore:`)
- Readable code: one item per line, enforced by ESLint Stylistic rules
- Tests with Vitest
- No emojis in code, UI, commits or docs

## Docs

- `AGENTS.md`: the main instructions for AI coding agents (`CLAUDE.md`, `GEMINI.md` and `CODEX.md` point to it)
- `docs/PRODUCT.md`: what CNS does, roles, login, pages, dashboards, demo data, future versions
- `docs/DESIGN.md`: colours, fonts, cats, logo, design references
- `docs/DESIGN-PROMPTS.md`: prompts for generating the app designs, landing page and images
- `docs/LANDING-PAGE-PLAN.md`: the landing page build plan, owner inputs and draft copy
- `docs/DATA-MODEL.md`: tables, fields, data retention
- `docs/FILE-STRUCTURE.md`: every file and folder
- `docs/ARCHITECTURE.md`: how the system fits together
- `docs/API.md`: API conventions and endpoint plan
- `docs/DEVSECOPS.md`: CI, security checks and hardening
- `docs/GLOSSARY.md`: terms used in the project
- `SECURITY.md`: how to report a vulnerability
- `CONTRIBUTING.md`: how to contribute
- `CHANGELOG.md`: what changed and when

## License

Proprietary. All rights reserved. See `LICENSE`. The repository is public for now, but the licence still forbids using the code.
