import { NextResponse } from 'next/server';

export interface Investment {
  id: string;
  name: string;
  category: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  expectedReturn: number;
  investmentAmount: number; // Cost (Weight in knapsack)
  duration: number; // Duration in years
  suitableFor: string[]; // ['Student', 'Beginner', 'Salaried', 'Aggressive', 'Advisor']
}

export interface DecisionStep {
  itemName: string;
  cost: number;
  potentialReturn: number;
  excludeValue: number;
  includeValue: number;
  decision: 'include' | 'exclude';
  reason: string;
}

export interface OptimizationResult {
  selectedInvestments: Investment[];
  rejectedInvestments: Investment[];
  totalExpectedReturn: number;
  totalCost: number;
  remainingBudget: number;
  matrix?: number[][]; // DP Matrix for visualization
  decisionSteps: DecisionStep[];
  insights: string[];
}

/**
 * 0/1 Knapsack Algorithm for Portfolio Optimization
 * Maximizes expectedReturn relative to investmentAmount (cost) within budget constraint
 */
export function optimizePortfolio(investments: Investment[], budget: number): OptimizationResult {
  // Scaling factor to keep DP matrix size manageable
  const scalingFactor = budget > 5000 ? Math.ceil(budget / 500) : 1;
  const W = Math.floor(budget / scalingFactor);
  const n = investments.length;
  
  // dp[i][w] will store the maximum return that can be attained with weight <= w using the first i items
  const dp: number[][] = Array(n + 1).fill(0).map(() => Array(W + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const item = investments[i - 1];
    const cost = Math.max(1, Math.floor(item.investmentAmount / scalingFactor));
    const itemValue = (item.expectedReturn / 100) * item.investmentAmount;

    for (let w = 0; w <= W; w++) {
      if (cost <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - cost] + itemValue);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  // Backtrack to find selected items
  let wCurrent = W;
  const selectedInvestments: Investment[] = [];
  const rejectedInvestments: Investment[] = [];
  let totalCost = 0;

  for (let i = n; i > 0; i--) {
    if (dp[i][wCurrent] !== dp[i - 1][wCurrent]) {
      const item = investments[i - 1];
      selectedInvestments.push(item);
      const cost = Math.max(1, Math.floor(item.investmentAmount / scalingFactor));
      wCurrent -= cost;
      totalCost += item.investmentAmount;
    } else {
      rejectedInvestments.push(investments[i - 1]);
    }
  }

  // Generate Decision Steps for visualization (at full budget level)
  const decisionSteps: DecisionStep[] = [];
  for (let i = 1; i <= n; i++) {
    const item = investments[i - 1];
    const scaledCost = Math.max(1, Math.floor(item.investmentAmount / scalingFactor));
    const itemValue = (item.expectedReturn / 100) * item.investmentAmount;
    
    const excludeVal = dp[i - 1][W];
    const includeVal = scaledCost <= W ? dp[i - 1][W - scaledCost] + itemValue : 0;
    
    // Check if it's actually in the final selected array
    const isSelected = selectedInvestments.some(s => s.id === item.id);
    const decision = isSelected ? 'include' : 'exclude';
    
    decisionSteps.push({
      itemName: item.name,
      cost: item.investmentAmount,
      potentialReturn: item.expectedReturn,
      excludeValue: Number(excludeVal.toFixed(2)),
      includeValue: Number(includeVal.toFixed(2)),
      decision: decision,
      reason: decision === 'include' 
        ? `${item.name} adds ₹${itemValue.toLocaleString()} in value and fits efficiently within the global optimal portfolio.`
        : `${item.name} was outcompeted by other assets during the final knapsack backtracking phase.`
    });
  }

  // Generate insights
  const insights: string[] = [];
  if (selectedInvestments.length > 0) {
    const mainAsset = selectedInvestments[0];
    insights.push(`Portfolio successfully optimized with a focus on ${mainAsset.name}. Maximum CAGR targeted within ${selectedInvestments.length} localized asset nodes.`);
  } else {
    insights.push("No suitable assets found within the given constraints. Try increasing your budget or risk appetite.");
  }
  
  selectedInvestments.forEach(asset => {
    if (asset.category.includes('Index') || asset.category.includes('Commodity') || asset.category.includes('Debt')) {
      insights.push(`${asset.name} was selected to provide stable baseline growth and diversify against equity volatility.`);
    } else if (asset.expectedReturn > 15) {
      insights.push(`${asset.name} was prioritized for its high-alpha growth potential (₹${((asset.expectedReturn/100)*asset.investmentAmount).toLocaleString()} return).`);
    }
  });

  // Scale down matrix for frontend visualization (6x6)
  const matrixCols = 6;
  const step = Math.max(1, Math.floor(W / (matrixCols - 1)));
  const visualMatrix: number[][] = [];
  for (let i = 0; i <= n; i++) {
    const row = [];
    for (let col = 0; col < matrixCols; col++) {
      const wVal = Math.min(col * step, W);
      row.push(Number((dp[i][wVal] || 0).toFixed(0)));
    }
    visualMatrix.push(row);
  }

  return {
    selectedInvestments,
    rejectedInvestments,
    totalExpectedReturn: dp[n][W],
    totalCost,
    remainingBudget: budget - totalCost,
    matrix: visualMatrix,
    decisionSteps,
    insights
  };
}

// Dummy investment catalog for testing
const investmentCatalog: Investment[] = [
  // --- Student Investor Friendly (Low Cost, Safe) ---
  { id: '1', name: 'SBI Fixed Deposit', category: 'Debt | Fixed', riskLevel: 'Low', expectedReturn: 7.1, investmentAmount: 10000, duration: 5, suitableFor: ['Student', 'Beginner'] },
  { id: '2', name: 'Gold BeES ETF', category: 'Commodity', riskLevel: 'Low', expectedReturn: 9.5, investmentAmount: 10000, duration: 3, suitableFor: ['Student', 'Beginner', 'Salaried', 'Aggressive'] },
  { id: '3', name: 'Nifty 50 Index Fund', category: 'Equity | Index', riskLevel: 'Medium', expectedReturn: 12.5, investmentAmount: 20000, duration: 5, suitableFor: ['Student', 'Beginner', 'Salaried'] },
  { id: '4', name: 'UTI Nifty Index Fund', category: 'Equity | Index', riskLevel: 'Medium', expectedReturn: 12.8, investmentAmount: 10000, duration: 5, suitableFor: ['Student', 'Beginner', 'Salaried'] },
  { id: '5', name: 'SBI Nifty ETF', category: 'Equity | Index', riskLevel: 'Medium', expectedReturn: 12.2, investmentAmount: 10000, duration: 5, suitableFor: ['Student', 'Beginner', 'Salaried'] },
  { id: '6', name: 'HDFC SIP Growth Fund', category: 'Equity | SIP', riskLevel: 'Medium', expectedReturn: 13.2, investmentAmount: 10000, duration: 3, suitableFor: ['Student', 'Beginner'] },
  { id: '7', name: 'Government Savings Bond', category: 'Debt | Govt', riskLevel: 'Low', expectedReturn: 7.4, investmentAmount: 15000, duration: 7, suitableFor: ['Student', 'Beginner', 'Salaried'] },
  { id: '8', name: 'ICICI Bluechip Fund', category: 'Equity | Large', riskLevel: 'Low', expectedReturn: 11.2, investmentAmount: 10000, duration: 5, suitableFor: ['Student', 'Beginner', 'Salaried'] },

  // --- Beginner Investor Friendly (Balanced) ---
  { id: '9', name: 'HDFC Flexi Cap Fund', category: 'Equity | Flexi', riskLevel: 'Medium', expectedReturn: 15.4, investmentAmount: 25000, duration: 5, suitableFor: ['Beginner', 'Salaried', 'Advisor'] },
  { id: '10', name: 'Nifty 50 ETF', category: 'Equity | Index', riskLevel: 'Medium', expectedReturn: 12.1, investmentAmount: 15000, duration: 5, suitableFor: ['Beginner', 'Salaried', 'Advisor'] },

  // --- Salaried Professional (Tax Saving, Growth) ---
  { id: '11', name: 'Reliance Industries', category: 'Equity | Large Cap', riskLevel: 'Medium', expectedReturn: 16.5, investmentAmount: 50000, duration: 5, suitableFor: ['Salaried', 'Aggressive', 'Advisor'] },
  { id: '12', name: 'Infosys Ltd.', category: 'Equity | IT', riskLevel: 'Medium', expectedReturn: 14.2, investmentAmount: 40000, duration: 3, suitableFor: ['Salaried', 'Advisor'] },
  { id: '13', name: 'TCS', category: 'Equity | IT', riskLevel: 'Low', expectedReturn: 12.1, investmentAmount: 45000, duration: 5, suitableFor: ['Salaried', 'Advisor'] },
  { id: '14', name: 'ELSS Tax Saver Fund', category: 'Equity | Tax', riskLevel: 'Medium', expectedReturn: 14.8, investmentAmount: 50000, duration: 3, suitableFor: ['Salaried'] },
  { id: '15', name: 'NPS (Tier 1)', category: 'Debt/Equity | Retirement', riskLevel: 'Low', expectedReturn: 10.2, investmentAmount: 150000, duration: 20, suitableFor: ['Salaried'] },
  { id: '16', name: 'PPF (Public Prov. Fund)', category: 'Debt | Govt', riskLevel: 'Low', expectedReturn: 7.1, investmentAmount: 50000, duration: 15, suitableFor: ['Salaried', 'Advisor'] },

  // --- Aggressive Investor (High Growth, Volatile) ---
  { id: '17', name: 'Nippon India Midcap Fund', category: 'Equity | Midcap', riskLevel: 'High', expectedReturn: 26.5, investmentAmount: 20000, duration: 5, suitableFor: ['Aggressive', 'Advisor'] },
  { id: '18', name: 'Small Cap Growth Fund', category: 'Equity | Small', riskLevel: 'High', expectedReturn: 34.2, investmentAmount: 25000, duration: 5, suitableFor: ['Aggressive', 'Advisor'] },
  { id: '19', name: 'Nifty Bank ETF', category: 'Equity | Sector', riskLevel: 'High', expectedReturn: 19.4, investmentAmount: 30000, duration: 3, suitableFor: ['Aggressive', 'Advisor'] },
  { id: '20', name: 'Adani Enterprises', category: 'Equity | Growth', riskLevel: 'High', expectedReturn: 29.8, investmentAmount: 75000, duration: 5, suitableFor: ['Aggressive', 'Advisor'] },
  { id: '21', name: 'Tech Sector Advantage Fund', category: 'Equity | Sector', riskLevel: 'High', expectedReturn: 23.5, investmentAmount: 20000, duration: 5, suitableFor: ['Aggressive', 'Advisor'] },
  { id: '22', name: 'Motilal Oswal Midcap Fund', category: 'Equity | Midcap', riskLevel: 'High', expectedReturn: 27.2, investmentAmount: 35000, duration: 5, suitableFor: ['Aggressive', 'Advisor'] },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { budget, riskAppetite, duration, stakeholder } = body;
    
    if (!budget || budget <= 0) {
      return NextResponse.json({ error: 'Valid budget is required' }, { status: 400 });
    }

    // 1. Strict Stakeholder Filter
    let filteredInvestments = investmentCatalog;
    if (stakeholder) {
      filteredInvestments = filteredInvestments.filter(i => 
        i.suitableFor.includes(stakeholder as string)
      );
    }

    // 2. Strict Risk Filter
    if (riskAppetite === 'Conservative') {
      filteredInvestments = filteredInvestments.filter(i => i.riskLevel === 'Low');
    } else if (riskAppetite === 'Moderate') {
      filteredInvestments = filteredInvestments.filter(i => i.riskLevel === 'Low' || i.riskLevel === 'Medium');
    }
    // For Aggressive, we keep everything that is suitable

    // 3. Duration suitability check
    if (duration) {
      filteredInvestments = filteredInvestments.filter(i => i.duration <= duration);
    }

    // Use knapsack algorithm
    const result = optimizePortfolio(filteredInvestments, budget);

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error("Optimization error:", error);
    return NextResponse.json({ error: 'Failed to process optimization request' }, { status: 500 });
  }
}
