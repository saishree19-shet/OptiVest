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
    
    // Determine decision based on actual final selection
    const isSelected = selectedInvestments.some(sel => sel.id === item.id);
    const decision = isSelected ? 'include' : 'exclude';
    
    decisionSteps.push({
      itemName: item.name,
      cost: item.investmentAmount,
      potentialReturn: item.expectedReturn,
      excludeValue: Number(excludeVal.toFixed(2)),
      includeValue: Number(includeVal.toFixed(2)),
      decision: decision as 'include' | 'exclude',
      reason: isSelected 
        ? `${item.name} is included in the final optimal portfolio to maximize overall return.`
        : `${item.name} was evaluated but excluded from the final portfolio to make room for better combinations.`
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

