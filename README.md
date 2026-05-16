# 🏛️ OptiVest — AI-Powered Investment Portfolio Optimizer

> **Optimal portfolio allocation using 0/1 Knapsack Dynamic Programming**

OptiVest is a full-stack fintech web application that recommends the best investment portfolio for a user based on their budget, risk appetite, time horizon, and investor persona — powered by a classic Dynamic Programming algorithm.

---

## 🚀 Features

- **Persona-Based Onboarding** — Choose from Student, Beginner, Salaried, Aggressive, or Financial Advisor profiles
- **0/1 Knapsack DP Engine** — Budget-constrained portfolio optimization using dynamic programming
- **Decision Insight Logs** — Real-time transparency into every inclusion/exclusion decision made by the algorithm
- **Risk Filtering** — High-volatility assets automatically filtered based on investor profile
- **Portfolio Visualization** — Pie chart, area chart, and efficient frontier scatter plot
- **DP Visualization Page** — Step-by-step walkthrough of the Knapsack table for educational purposes
- **Firebase Authentication** — Google Sign-In and Email/Password auth
- **Dark Glassmorphism UI** — Premium fintech aesthetic with Framer Motion animations

---

## 🧠 How the Algorithm Works

OptiVest uses the **0/1 Knapsack Dynamic Programming** algorithm to solve the portfolio optimization problem:

| Knapsack Concept | Investment Equivalent |
|---|---|
| Items | Investment instruments (Nifty 50, Gold ETF, SBI FD, etc.) |
| Weights | Cost of each instrument |
| Values | Expected return (CAGR × duration) |
| Capacity | User's total budget |

### Step-by-step:
1. **Filter** instruments based on the investor's persona and risk level
2. **Build** a DP table of size `(n+1) × (budget+1)`
3. **Fill** each cell: `dp[i][w] = max(exclude, include)` where include = `value_i + dp[i-1][w - cost_i]`
4. **Backtrack** through the table to identify which instruments were selected
5. **Return** selected investments with allocation amounts and decision explanations

```
dp[i][w] = max(
  dp[i-1][w],                        // exclude item i
  value[i] + dp[i-1][w - cost[i]]    // include item i
)
```

---

## 🗂️ Project Structure

```
OptiVest/
├── backend/                    # Express + TypeScript API server
│   ├── src/
│   │   ├── algorithms/
│   │   │   └── knapsack.ts     # Core 0/1 Knapsack DP implementation
│   │   ├── controllers/
│   │   │   └── apiController.ts
│   │   ├── routes/
│   │   │   └── api.ts
│   │   └── index.ts            # Express server entry point
│   ├── test-api.js
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # Next.js 14 App Router
    ├── src/app/
    │   ├── page.tsx            # Landing page
    │   ├── dashboard/          # Main optimizer dashboard
    │   ├── dp-visualization/   # Educational DP table walkthrough
    │   ├── analytics/
    │   ├── portfolio/
    │   ├── market/
    │   ├── risk/
    │   ├── login/
    │   ├── signup/
    │   └── profile/
    ├── src/lib/
    │   └── firebase.ts         # Firebase config
    ├── next.config.mjs
    └── tailwind.config.ts
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router), TypeScript, Tailwind CSS |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Auth | Firebase Authentication |
| Backend | Node.js, Express, TypeScript |
| Algorithm | 0/1 Knapsack Dynamic Programming |

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js 18+
- A Firebase project with Authentication enabled

### 1. Clone the repository
```bash
git clone https://github.com/saishree19-shet/OptiVest.git
cd OptiVest
```

### 2. Backend Setup
```bash
cd backend
npm install
npm run dev        # Starts on http://localhost:5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_API_URL=http://localhost:5000
```

```bash
npm run dev        # Starts on http://localhost:3000
```

---

## 📡 API Reference

### `POST /api/optimize`

Runs the Knapsack optimizer and returns portfolio recommendations.

**Request Body:**
```json
{
  "budget": 1000000,
  "riskAppetite": "Aggressive",
  "duration": 5,
  "stakeholder": "Salaried"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "selectedInvestments": [...],
    "rejectedInvestments": [...],
    "decisionSteps": [...],
    "insights": ["..."],
    "totalExpectedReturn": 145000
  }
}
```

---

## 👩‍💻 Investor Personas

| Persona | Risk Level | Strategy |
|---|---|---|
| 🎓 Student | Low | Conservative — SIP, Index Funds, FDs |
| 🌱 Beginner | Medium | Balanced — Flexi Cap, ETFs |
| 💼 Salaried | Medium | Long-term — ELSS, NPS, Large Cap |
| 🚀 Aggressive | High | Growth — Midcap, Small Cap |
| 📊 Financial Advisor | Variable | Advanced — full allocation control |

---

## 📄 License

This project was built as an academic project demonstrating the application of Dynamic Programming (0/1 Knapsack) to real-world portfolio optimization.

---

<div align="center">
  Built with ❤️ using Next.js, TypeScript, and Dynamic Programming
</div>
