# Todo

A small task manager built with Angular 22. Tasks can be created, edited, completed, and removed. State is held in memory with signals, so the list resets when the page is reloaded.

## Features

- Create tasks through a modal dialog with title, description, and priority (low / medium / high)
- Edit existing tasks in the same dialog
- Mark tasks as complete or incomplete
- Delete tasks
- Filter the grid by text (title or description), priority, and completion status
- Empty states for no tasks and for filters with no matches
- Light and dark themes with a toolbar toggle, system preference detection, and persistence
- Keyboard-accessible native `<dialog>` with focus handling and reduced-motion support

The interface copy is in Spanish.

## Tech stack

| Concern    | Choice                                            |
| ---------- | ------------------------------------------------- |
| Framework  | Angular 22 (standalone components, signals)       |
| Styling    | Tailwind CSS 4 + component-scoped CSS             |
| UI icons   | Angular Material (`MatIconModule`)                |
| Forms      | Reactive Forms                                    |
| Tests      | Vitest with jsdom                                 |
| Tooling    | Angular CLI, Prettier                             |

## Getting started

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm start
```

Then open `http://localhost:4200/`. The app reloads automatically when source files change.

## Scripts

| Command         | Description                                      |
| --------------- | ------------------------------------------------ |
| `npm start`     | Run the development server                       |
| `npm run build` | Production build into `dist/`                    |
| `npm run watch` | Development build in watch mode                  |
| `npm test`      | Run unit tests with Vitest                       |
| `npm run ng`    | Invoke the Angular CLI directly (`npm run ng -- …`) |

## Project structure

```
src/
├── app/
│   ├── app.ts                    # Root component
│   ├── app.config.ts             # Application providers (router, error listeners)
│   ├── app.routes.ts             # Route definitions (currently empty)
│   ├── header/                   # Toolbar with task actions and the theme toggle
│   ├── theme/
│   │   └── theme-store.ts        # Light/dark theme state + persistence
│   └── tasks/
│       ├── task.ts               # Task model and priority type
│       ├── task-store.ts         # Signal-based in-memory task store
│       ├── task-grid/            # Grid of task cards, filter bar + empty states
│       ├── task-card/            # Single task with edit / delete / complete actions
│       └── task-dialog/          # Create and edit dialog (reactive form)
├── material-theme.scss
├── styles.css                    # Design tokens and global styles
└── main.ts                       # Bootstrap entry point
```

## State management

`TaskStore` is a root service holding tasks in a `signal<Map<number, Task>>`. It exposes `addTask`, `updateTask`, `removeTask`, and `toggleTaskCompletion`, all of which replace the map immutably so signal consumers update correctly. Components inject the store and read the `tasks` signal directly.

Because the store lives in memory, tasks are not persisted between reloads.

## Theming

The app ships with light and dark palettes. `ThemeStore` resolves the initial theme from the `todo-theme` localStorage entry or the system `prefers-color-scheme` setting, and writes `data-theme="light|dark"` on `<html>`. The toolbar toggle flips the theme and remembers the choice.

Design tokens live in `src/styles.css` and use CSS `light-dark()` so a single declaration covers both palettes. Angular Material's system tokens follow the same `color-scheme`, so Material components switch automatically.

## Code scaffolding

To generate a new component:

```bash
npm run ng -- generate component component-name
```

For the full list of available schematics:

```bash
npm run ng -- generate --help
```

## Additional resources

- [Angular documentation](https://angular.dev/)
- [Angular CLI command reference](https://angular.dev/tools/cli)
- [Tailwind CSS documentation](https://tailwindcss.com/docs)
- [Vitest documentation](https://vitest.dev/)
