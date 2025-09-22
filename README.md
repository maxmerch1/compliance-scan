# All-In Price Compliance Scanner Landing Page

A high-conversion B2B SaaS landing page for the "All-In Price Compliance Scanner" built with Next.js 15 and Tailwind CSS.

## Features

- **Hero Section**: Compelling headline with live demo scan functionality
- **Urgency Banner**: Red banner highlighting SB-478 and FTC enforcement dates
- **How It Works**: 3-column layout explaining the scanning process
- **Why It Matters**: Statistics and risk calculator
- **Pricing**: Free and Pro tiers with clear value propositions
- **Testimonials**: Trust signals and customer quotes
- **FAQ**: Accordion-style frequently asked questions
- **Demo Scan**: Interactive URL scanner with fake results (ready for backend integration)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Fonts**: Inter (Google Fonts)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design System

### Colors
- **Primary**: #0047AB (compliance trust blue)
- **Secondary**: #F44336 (warning red accents)
- **Background**: #F5F7FA (subtle gray sections)
- **Success**: #2ECC71 (green checkmarks)

### Typography
- **Headings**: Inter, weight 700
- **Body**: Inter, weight 400-500

## Demo Scan Integration

The demo scan functionality is currently implemented with fake results. To connect to a real backend:

1. Replace the `runScan` function in `app/page.tsx`
2. Add your API endpoint
3. Update the result handling logic

## Deployment

This project is ready to deploy to Vercel, Netlify, or any other Next.js hosting platform.

```bash
npm run build
npm start
```

## License

Private - All rights reserved.
