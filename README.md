# ValoCoach — Valorant Player Dashboard

A clean and modern analytics dashboard for Valorant players that helps you track your performance and improve your game.

## What is this?

ValoCoach is a web app that turns your Valorant match data into easy-to-understand visualizations. Instead of digging through raw stats, you get a beautiful dashboard that shows your strengths, weaknesses, and performance trends at a glance.

## Check it out

[Live Demo](https://valo-coach-player-dashboard-wlbr.vercel.app/)

## Built with

- **Next.js 15** — The latest React framework
- **TypeScript** — Keeps the code clean and bug-free
- **Tailwind CSS** — For styling everything
- **Recharts** — Creates all the graphs and charts
- **Framer Motion** — Adds smooth animations

## Setup Instructions

Want to run this locally? Here's how:

1. Clone the repository:

```bash
   git clone https://github.com/your-username/valocoach-dashboard.git
```

2. Navigate to the project folder:

```bash
   cd valocoach-dashboard
```

3. Install dependencies:

```bash
   npm install
```

4. Start the development server:

```bash
   npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features Implemented

- **Player Profile Header** — Shows player rank, avatar, and key performance stats
- **Animated Stat Cards** — K/D ratio, headshot percentage, average combat score, and win rate with counting animations
- **Match Filtering** — Filter your match history by All, Won, Lost, or Draw
- **Match History Cards** — Detailed view of each match including agent, map, KDA, and result
- **Performance Charts** — Visual analytics showing performance trends across different maps
- **Dark/Light Mode** — Theme switcher with saved preferences
- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices

## Challenges & Solutions

**Dark/Light Mode Flash**

- **Problem:** When refreshing the page, there was a brief flash where the wrong theme would show before switching to the saved preference
- **Solution:** Implemented `next-themes` with proper hydration handling to ensure the theme loads correctly from the start without any visual flicker

**Responsive Layout**

- **Problem:** Making the dashboard look good across all screen sizes while keeping the code maintainable
- **Solution:** Used Tailwind's responsive utilities consistently and tested on multiple device sizes to ensure everything adapts properly

**Data Visualization**

- **Problem:** Displaying complex match data in a way that's both informative and easy to understand
- **Solution:** Combined Recharts for graphs with custom-designed match cards that highlight the most important information at a glance

## Time Spent

Approximately 10-12 hours total

---

Made for Valorant players who want to level up their game 🎮
