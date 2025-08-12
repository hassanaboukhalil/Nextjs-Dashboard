## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

This project was initialized using pnpm with the following command:

```
npx create-next-app@latest . --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

## Development

Install pnpm globally (if not already installed):

```
npm install -g pnpm
```

Install dependencies:

```
pnpm i
```

Run the development server:

```
pnpm dev
```

## Styling

This project uses two approaches for styling:

### Tailwind CSS

Utility-first CSS framework used for most of the styling needs. Example from `page.tsx`:

```tsx
<main className="flex min-h-screen flex-col p-6">
  <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
    {/* ... */}
  </div>
</main>
```

### CSS Modules

For component-specific styling that's scoped locally. Used in `home.module.css` and imported in `page.tsx`.

**File: home.module.css**

```css
.shape {
  height: 0;
  width: 0;
  border-bottom: 30px solid black;
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
}
```

**Usage in page.tsx**

```tsx
import styles from "@/app/ui/home.module.css";

// ...inside component
<div className={styles.shape} />;
```

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
