# mayfira

Fiona's personal site — Next.js (App Router, TypeScript) + Tailwind CSS + Motion for animation, content managed through an embedded Sanity Studio.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The Studio is embedded at [http://localhost:3000/studio](http://localhost:3000/studio).

Dev and build both run on webpack (`next dev --webpack` / `next build --webpack`) rather than Turbopack — Turbopack currently hangs indefinitely compiling the Sanity Studio bundle in this Next/Sanity version combo. If a future Next/Sanity upgrade fixes that, the `--webpack` flags in `package.json`'s `dev`/`build` scripts can be dropped.

## Environment variables

Copy `.env.example` to `.env.local` and fill in your real Sanity project details once you've created a project (see below):

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (defaults to `production`)
- `NEXT_PUBLIC_SANITY_API_VERSION`
- `SANITY_API_READ_TOKEN` (only needed if the dataset is private)

Until real values are set, pages render with empty/placeholder states instead of crashing — see `safeFetch` in `lib/sanity/queries.ts`.

## Content model

Schema lives in `sanity/schemaTypes/`: `project`, `hobby`, `contactNote`, `polaroidPhoto`, plus the `aboutPage` and `homePage` singletons (pinned in `sanity/structure.ts`). Projects/Hobbies/Contact Notes are drag-to-reorder lists in the Studio.

## Deployment (Render)

`render.yaml` defines a Node web service (`npm install && npm run build` / `npm start`). After connecting the repo on Render:

1. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `SANITY_API_READ_TOKEN` (if used) in the Render dashboard — they're marked `sync: false` in `render.yaml` so they aren't committed.
2. Add the Render URL (and later the custom domain) to the Sanity project's CORS origins at [manage.sanity.io](https://manage.sanity.io), or Studio API calls will fail cross-origin.
3. Point the Encira domain's DNS at Render per Render's custom domain instructions.
