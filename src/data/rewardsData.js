export const rewardsCatalog = [
  { 
    id: 1, 
    brand: 'Swiggy', 
    name: 'Swiggy One Membership', 
    desc: '1-month free delivery and extra discounts.', 
    cost: 500, 
    category: 'Food',
    color: '#fc8019'
  },
  { 
    id: 2, 
    brand: 'Zomato', 
    name: 'Zomato Gold', 
    desc: '2-week trial for dining and delivery perks.', 
    cost: 400, 
    category: 'Food',
    color: '#e23744'
  },
  { 
    id: 3, 
    brand: 'boAt', 
    name: 'Wireless Earbuds Discount', 
    desc: 'Flat 20% off on all Airdopes.', 
    cost: 800, 
    category: 'Shopping',
    color: '#1a1a1a'
  },
  { 
    id: 4, 
    brand: 'Myntra', 
    name: 'Shopping Voucher', 
    desc: '₹200 off on minimum purchase of ₹999.', 
    cost: 300, 
    category: 'Shopping',
    color: '#ff3f6c'
  },
  { 
    id: 5, 
    brand: 'Udemy', 
    name: 'Course Coupon', 
    desc: 'Any course for ₹389 instead of original price.', 
    cost: 600, 
    category: 'Learning',
    color: '#a435f0'
  },
  { 
    id: 6, 
    brand: 'PhonePe', 
    name: 'Cashback Reward', 
    desc: 'Up to ₹50 cashback on next mobile recharge.', 
    cost: 250, 
    category: 'Finance',
    color: '#5f259f'
  },
  { 
    id: 7, 
    brand: 'Cult.fit', 
    name: 'Fitness Pass', 
    desc: '1-week unlimited access to gym and classes.', 
    cost: 450, 
    category: 'Fitness',
    color: '#000000'
  },
  { 
    id: 8, 
    brand: 'Amazon', 
    name: 'Pay Balance', 
    desc: '₹50 added to your Amazon Pay wallet.', 
    cost: 200, 
    category: 'Shopping',
    color: '#ff9900'
  }
];

export const transactionHistory = [
  { id: 1, action: 'Weekly Quiz Completion', points: 50, date: '2024-04-20' },
  { id: 2, action: 'Perfect Score Bonus', points: 100, date: '2024-04-20' },
  { id: 3, action: '3-Week Streak Bonus', points: 75, date: '2024-04-13' },
  { id: 4, action: 'Flagged Real Phishing Email', points: 150, date: '2024-04-10' }
];

export const getTier = (points) => {
  if (points >= 4000) return { name: 'Guardian Elite', color: '#ffd700', next: null };
  if (points >= 1500) return { name: 'Sentinel', color: '#c0c0c0', next: 4000 };
  if (points >= 500) return { name: 'Defender', color: '#cd7f32', next: 1500 };
  return { name: 'Recruit', color: '#8b4513', next: 500 };
};
