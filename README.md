# ValoCoach — Valorant Player Dashboard

A professional, high-performance analytics dashboard for Valorant players, designed to provide deep insights into match history and performance metrics.

## Description

ValoCoach is a modern web application built to track and visualize player statistics with a focus on tactical clarity and premium aesthetics. It transforms raw match data into actionable insights through a responsive, interactive interface. The project leverages a robust tech stack to deliver a seamless user experience, featuring dynamic charts, match filtering, and a refined dark/light thematic system.

## Live Demo

[View Live Demo on Vercel](https://valocoach-dashboard.vercel.app/)

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript** for type-safe development
- **Tailwind CSS** for utility-first styling
- **Recharts** for performance visualization
- **Framer Motion** for fluid interactions

## Features

- **Player Profile Hero**: Immersive header with rank visualization and key performance indicators.
- **Animated Stat Cards**: Real-time counting animations for K/D, HS%, ACS, and Win Rate.
- **Match Filtering**: Instantly filter match history by result (All/Won/Lost/Draw).
- **Detailed Match History**: Interactive match cards displaying agent, map, KDA, and result context.
- **Performance Analytics**: Visual trend analysis of performance across different maps.
- **Dark/Light Mode**: Seamless theme switching with persistent preference state.
- **Fully Responsive**: Optimized layout for desktop, tablet, and mobile devices.

## Local Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/valocoach-dashboard.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) with your browser.

## Challenges

- **Handling Consistent Theming**: implemented a flicker-free dark/light mode transition using `next-themes` and careful hydration management to ensure visual consistency across server and client rendering.
- **Performance-Friendly Animations**: Balanced the need for a premium feel with performance by optimizing CSS transitions and using hardware-accelerated transforms instead of heavy JavaScript animations for hover states.

## Time Spent

Approx. 10–12 hours
