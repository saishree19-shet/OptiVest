import { Request, Response } from 'express';
import { optimizePortfolio, Investment } from '../algorithms/knapsack';
import { db } from '../config/firebase';

export const optimize = async (req: Request, res: Response) => {
  const { budget, riskAppetite, duration, stakeholder } = req.body;
  
  if (!budget || budget <= 0) {
    return res.status(400).json({ error: 'Valid budget is required' });
  }

  try {
    // 1. Fetch investments from Firestore
    let filteredInvestments: Investment[] = [];
    
    if (!db) {
      return res.status(500).json({ error: 'Database connection not initialized.' });
    }

    const investmentsSnapshot = await db.collection('investments').get();
    investmentsSnapshot.forEach((doc) => {
      filteredInvestments.push(doc.data() as Investment);
    });

    // 2. Strict Stakeholder Filter
    if (stakeholder) {
      filteredInvestments = filteredInvestments.filter(i => 
        i.suitableFor.includes(stakeholder as string)
      );
    }

    // 3. Strict Risk Filter
    if (riskAppetite === 'Conservative') {
      filteredInvestments = filteredInvestments.filter(i => i.riskLevel === 'Low');
    } else if (riskAppetite === 'Moderate') {
      filteredInvestments = filteredInvestments.filter(i => i.riskLevel === 'Low' || i.riskLevel === 'Medium');
    }

    // 4. Duration suitability check
    if (duration) {
      filteredInvestments = filteredInvestments.filter(i => i.duration <= duration);
    }

    console.log(`[ENGINE]: Starting DP with ${filteredInvestments.length} candidate assets for ${stakeholder}`);

    const result = optimizePortfolio(filteredInvestments, budget);

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Optimization error:', error);
    res.status(500).json({ error: 'Internal server error during optimization' });
  }
};

export const simulate = (req: Request, res: Response) => {
  const { initialAmount, expectedReturn, years } = req.body;
  
  if (!initialAmount || !expectedReturn || !years) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  const data = [];
  let currentAmount = initialAmount;
  for (let year = 0; year <= years; year++) {
    data.push({
      year: new Date().getFullYear() + year,
      value: currentAmount
    });
    currentAmount += currentAmount * (expectedReturn / 100);
  }

  res.json({
    success: true,
    data
  });
};

export const getPortfolio = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalInvestment: 1248500,
      expectedReturn: 12.8,
      riskScore: 'Medium',
      diversification: 'High',
      allocations: [
        { name: 'Nifty 50 Index Fund', percentage: 40, amount: 200000, category: 'Equity | Index' },
        { name: 'Reliance Industries', percentage: 15, amount: 75000, category: 'Equity | Large Cap' },
        { name: 'Government Bonds', percentage: 25, amount: 125000, category: 'Fixed Income' },
        { name: 'HDFC Flexi Cap Fund', percentage: 20, amount: 100000, category: 'Equity | Flexi' }
      ]
    }
  });
};

export const savePortfolio = async (req: Request, res: Response) => {
  const { userId, portfolio } = req.body;
  
  if (!db) {
    return res.status(500).json({ error: 'Database connection not initialized.' });
  }

  try {
    const docId = userId ? `${userId}_${Date.now()}` : `guest_${Date.now()}`;
    await db.collection('user_portfolios').doc(docId).set({
      userId: userId || 'guest',
      portfolio,
      createdAt: new Date()
    });
    res.json({ success: true, message: 'Portfolio saved successfully to Firestore' });
  } catch (error) {
    console.error('Error saving portfolio:', error);
    res.status(500).json({ error: 'Failed to save portfolio' });
  }
};

export const getAnalytics = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      sectorExposure: [
        { name: 'Technology', value: 35 },
        { name: 'Healthcare', value: 20 },
        { name: 'Energy', value: 15 },
        { name: 'Financials', value: 30 }
      ],
      healthScore: 94
    }
  });
};
