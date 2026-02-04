# DDT Library Rules

## Structure
- `sections/`: Full-page sections (hero, services, etc.)
- `ui/`: Reusable UI primitives (buttons, cards, etc.)
- `presets/`: Design system tokens and themes.
- `shared/`: Common types and utilities.

## Naming Conventions
- Folders: kebab-case (e.g., `hero-01`).
- Components: PascalCase (e.g., `Hero.tsx`).
- Variants: `<type>-NN` (e.g., `button-01`).

## Adding a New Component
1. Create a folder in the appropriate category.
2. Add the main component file (PascalCase).
3. Create `index.ts` for export.
4. Add `README.md` and `schema.json`.
5. Update `ComponentMap.json`.

## ComponentMap.json
This is the single source of truth for site-builder agents. It contains paths, schemas, and metadata for every component.
