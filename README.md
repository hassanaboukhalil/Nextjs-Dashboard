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

This project uses several approaches for styling:

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

### clsx Library

For conditional class names, this project uses the `clsx` library. Example from `invoices/status.tsx`:

```tsx
import clsx from "clsx";

// ...inside component
<span
  className={clsx("inline-flex items-center rounded-full px-2 py-1 text-xs", {
    "bg-gray-100 text-gray-500": status === "pending",
    "bg-green-500 text-white": status === "paid",
  })}
>
  {/* ... */}
</span>;
```

This allows for dynamic class application based on component props or state.

## Fonts

This project uses Next.js built-in font optimization with Google Fonts. The fonts are defined in a centralized file `app/ui/fonts.ts`:

```tsx
import { Inter } from "next/font/google";
import { Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  subsets: ["latin"],
  weight: ["400", "700"],
});
```

**Usage in layout.tsx (primary font)**

```tsx
import { inter } from "@/app/ui/fonts";

// ...inside component
<html lang="en">
  <body className={`${inter.className} antialiased`}>{children}</body>
</html>;
```

**Usage in page.tsx (secondary font)**

```tsx
import { lusitana } from "./ui/fonts";

// ...inside component
<p
  className={`text-xl text-gray-800 md:text-3xl md:leading-normal ${lusitana.className}`}
>
  <strong>Welcome to Acme.</strong> This is the example for the {/* ... */}
</p>;
```

This approach ensures fonts are properly optimized for performance with:

- Zero layout shift
- Automatic self-hosting
- No additional network requests

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
