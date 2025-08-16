# Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

## Table of Contents

- [Development](#development)
- [Styling](#styling)
  - [Tailwind CSS](#tailwind-css)
  - [CSS Modules](#css-modules)
  - [clsx Library](#clsx-library)
- [Fonts](#fonts)
- [Images](#images)
- [Routing and Navigation](#routing-and-navigation)
- [Database](#database)
  - [Seeding](#seeding)
- [Static vs. Dynamic Rendering](#static-vs-dynamic-rendering)
  - [Static Rendering](#static-rendering)
  - [Dynamic Rendering](#dynamic-rendering)
- [Streaming with React Suspense](#streaming-with-react-suspense)
  - [Benefits of Streaming](#benefits-of-streaming)
- [Special Files in Next.js App Router](#special-files-in-nextjs-app-router)
  - [page.tsx](#pagetsx)
  - [layout.tsx](#layouttsx)
  - [loading.tsx](#loadingtsx)
  - [error.tsx](#errortsx)
  - [not-found.tsx](#not-foundtsx)
  - [route.ts (API Routes)](#routets-api-routes)
  - [Route Groups](#route-groups)

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

## Database

- Used Vercel Postgres (via Vercel Storage) with Prisma Postgres. In Vercel, open the project → Storage → Create a new database (Prisma + Postgres) → Connect to copy the connection string.
- Add the connection string to your local environment as `POSTGRES_URL` (e.g., in `.env.local`). The app reads it in the seed route.

Connection usage in the seed route (`app/seed/route.ts`):

```tsx
const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });
```

### Seeding

- Start the dev server and hit the seed endpoint to populate tables (`users`, `customers`, `invoices`, `revenue`). The route also enables the `uuid-ossp` extension and hashes user passwords with `bcrypt`.

```bash
pnpm dev
curl http://localhost:3000/seed
```

Note: If you choose to manage schema via Prisma migrations, run your usual Prisma commands (e.g., `prisma generate`, `prisma migrate`) before seeding. (Mentioned for completeness.)

Additional resource:

- How to use Prisma ORM with Next.js: [Prisma Next.js guide](https://www.prisma.io/docs/guides/nextjs)
- Postgres.js used in seeding: [porsager/postgres](https://github.com/porsager/postgres) — if you want to interact with the database using raw SQL in Node, this lightweight client is a great choice.

## Static vs. Dynamic Rendering

Next.js supports both static and dynamic rendering approaches, which are used in this dashboard application:

### Static Rendering

Static rendering generates HTML at build time and reuses it for each request. This improves performance as pages can be cached and served from a CDN.

Benefits:

- Faster page loads - content is cached and globally distributed
- Reduced server load - pages don't need to be rendered for each request
- Better SEO - content is immediately available for search engine crawlers

Use for:

- Marketing pages, blog posts, or product pages that don't require personalization

### Dynamic Rendering

Dynamic rendering generates HTML on the server for each request. This is useful for personalized or frequently updated content.

In this project, dynamic rendering is used in dashboard components that fetch real-time data:

```tsx
// Example from app/ui/dashboard/cards.tsx
export default async function CardWrapper() {
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData();

  // Component renders with fresh data for each request
  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      {/* ... */}
    </>
  );
}
```

Benefits:

- Real-time data - always shows the latest information
- User-specific content - can display personalized information
- Request-time information - access to request-specific data like cookies or URL params

## Streaming with React Suspense

Next.js supports streaming with React Suspense, which allows you to progressively render UI components as data becomes available, rather than waiting for all data to load before showing anything to the user.

The dashboard uses Suspense boundaries to break down the page into smaller chunks that can be streamed as they become ready:

```tsx
// Example from app/dashboard/(overview)/page.tsx
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
```

### Benefits of Streaming

- **Improved perceived performance**: Users see parts of the UI sooner, making the application feel faster
- **Reduced blocking time**: The page doesn't wait for all data fetches to complete
- **Automatic loading states**: Each Suspense boundary can show a fallback while content loads
- **Prioritized content**: Critical UI can be shown first while less important parts load in the background

Streaming is particularly useful for data-heavy dashboard pages where different components may have varying data fetch times.

## Special Files in Next.js App Router

Next.js uses a file-based routing system with special files that have reserved names and specific functions:

### `page.tsx`

The primary file for creating UI for a route. Any directory inside the `app` folder that includes a `page.tsx` file becomes a publicly accessible route.

```tsx
// app/dashboard/page.tsx
export default function DashboardPage() {
  return <div>Dashboard Content</div>;
}
```

### `layout.tsx`

Defines a shared UI for a segment and its children. Layouts are preserved during navigation and maintain state.

```tsx
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
```

### `loading.tsx`

Automatically creates a loading UI that's shown while page content is loading. Works seamlessly with React Suspense.

```tsx
// app/dashboard/(overview)/loading.tsx
import DashboardSkeleton from "@/app/ui/skeletons";

export default function Loading() {
  return <DashboardSkeleton />;
}
```

### `error.tsx`

Creates an error UI boundary for a route segment. If an error occurs in the segment, this component is shown while preserving the rest of the application.

```tsx
"use client"; // Error components must be client components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

### `not-found.tsx`

Displayed when the `notFound()` function is thrown or when a route can't be matched.

### `route.ts` (API Routes)

Creates server-side API endpoints. In this project, `app/seed/route.ts` is used to seed the database.

```tsx
// app/seed/route.ts (simplified example)
export async function GET() {
  try {
    // Seed database logic here
    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
```

### Route Groups

Folders wrapped in parentheses like `(overview)` in `app/dashboard/(overview)/page.tsx` are route groups. They're used for organizational purposes and don't affect the URL structure.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
