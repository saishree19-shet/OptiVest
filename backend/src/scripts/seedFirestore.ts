import { db } from '../config/firebase';
import { Investment } from '../algorithms/knapsack';

// Dummy investment catalog for seeding
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

async function seedFirestore() {
  if (!db) {
    console.error('Firestore is not initialized. Please ensure serviceAccountKey.json is present.');
    process.exit(1);
  }

  console.log('Seeding investments collection...');
  const batch = db.batch();
  
  investmentCatalog.forEach((item) => {
    const docRef = db!.collection('investments').doc(item.id);
    batch.set(docRef, item);
  });

  try {
    await batch.commit();
    console.log(`✅ Successfully seeded ${investmentCatalog.length} investments to Firestore!`);
  } catch (error) {
    console.error('❌ Error seeding Firestore:', error);
  }
}

seedFirestore();
