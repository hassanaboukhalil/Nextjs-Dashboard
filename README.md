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

## Images

This project uses the Next.js Image component (`next/image`) for optimized image loading. The Image component automatically handles:

- Lazy loading
- Image optimization
- Responsive sizing
- Preventing layout shift

**Example from page.tsx:**

```tsx
import Image from "next/image";

// ...inside component
<Image
  src="/hero-desktop.png"
  width={1000}
  height={760}
  className="hidden md:block"
  alt="Screenshots of the dashboard project showing desktop version"
/>

<Image
  src="/hero-mobile.png"
  width={560}
  height={620}
  className="md:hidden"
  alt="Screenshots of the dashboard project showing desktop version"
/>
```

**Important Note:** The `width` and `height` props are not the rendered size of the image, but rather the original dimensions of the image file. Next.js uses these values to calculate the correct aspect ratio and prevent layout shift during loading.

## Routing and Navigation

Using `Link` from Next.js is preferred over a plain `<a>` tag because it enables client-side navigation, prefetching, and preserves application state without full page reloads.

**Example using Link (from `app/ui/dashboard/nav-links.tsx`):**

```tsx
import Link from "next/link";

<Link href="/dashboard" className="...">
  Dashboard
</Link>;
```

The `usePathname` hook from `next/navigation` is used to get the current URL path, which can be used to highlight the active link in the sidebar.

```tsx
import { usePathname } from "next/navigation";
import clsx from "clsx";

const pathname = usePathname();

<Link
  href={link.href}
  className={clsx("...", {
    "bg-sky-100 text-blue-600": pathname === link.href,
  })}
>
  {link.name}
</Link>;
```

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
