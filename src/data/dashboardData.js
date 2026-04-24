export const overviewData = {
  orgScore: 74,
  metrics: [
    { label: 'Total Employees Trained', value: 842, change: '+12%', icon: 'Users', color: '#06b6d4' },
    { label: 'Phishing Simulations Run', value: 24, change: '+4', icon: 'Shield', color: '#10b981' },
    { label: 'Avg Quiz Score', value: '82%', change: '+3%', icon: 'BookOpen', color: '#8b5cf6' },
    { label: 'Emails Flagged', value: 156, change: '+28', icon: 'AlertTriangle', color: '#ef4444' }
  ],
  departmentBreakdown: [
    { dept: 'Finance', employees: 42, completion: 95, score: 88, weakness: 'Urgency' },
    { dept: 'HR', employees: 18, completion: 88, score: 72, weakness: 'Authority' },
    { dept: 'Engineering', employees: 124, completion: 92, score: 84, weakness: 'Curiosity' },
    { dept: 'Logistics', employees: 86, completion: 74, score: 56, weakness: 'Urgency' },
    { dept: 'Sales', employees: 55, completion: 81, score: 68, weakness: 'Curiosity' }
  ],
  trends: [
    { month: 'Jan', Finance: 78, HR: 65, Engineering: 82, Logistics: 50 },
    { month: 'Feb', Finance: 82, HR: 68, Engineering: 85, Logistics: 55 },
    { month: 'Mar', Finance: 88, HR: 72, Engineering: 84, Logistics: 56 }
  ]
};

export const teamData = [
  { id: 1, name: 'Rahul S.', role: 'Finance Associate', risk: 'Low', streak: 4, points: 1240, lastActive: '2h ago', dept: 'Finance', trigger: 'Urgency' },
  { id: 2, name: 'Priya K.', role: 'HR Manager', risk: 'Medium', streak: 2, points: 850, lastActive: '1d ago', dept: 'HR', trigger: 'Authority' },
  { id: 3, name: 'Amit V.', role: 'Senior Dev', risk: 'Low', streak: 12, points: 3420, lastActive: '15m ago', dept: 'Engineering', trigger: 'Curiosity' },
  { id: 4, name: 'Suresh M.', role: 'Logistics Lead', risk: 'High', streak: 0, points: 120, lastActive: '3d ago', dept: 'Logistics', trigger: 'Urgency' },
  { id: 5, name: 'Ananya R.', role: 'Sales Exec', risk: 'Medium', streak: 1, points: 540, lastActive: '5h ago', dept: 'Sales', trigger: 'Curiosity' }
];

export const threatFeed = [
  { id: 1, type: 'Spear Phishing', dept: 'Finance', severity: 'Critical', time: '10:42 AM', summary: 'Targeted email mimicking CFO regarding urgent wire transfer.' },
  { id: 2, type: 'Malware Link', dept: 'Logistics', severity: 'High', time: 'Yesterday', summary: 'SMS phishing with fake tracking link detected on 3 mobile devices.' },
  { id: 3, type: 'Credential Harvest', dept: 'Engineering', severity: 'Medium', time: '2 days ago', summary: 'Fake Jira login page reported by 2 developers.' },
  { id: 4, type: 'Business Email Compromise', dept: 'Sales', severity: 'Critical', time: '3 days ago', summary: 'Invoice redirect attempt via spoofed vendor account.' }
];

export const outboundLogs = [
  { id: 1, sender: 'Karan J. (Intern)', recipient: 'vendor@acme.com', time: '11:05 AM', riskScore: 82, tone: 'Urgent', status: 'Pending' },
  { id: 2, sender: 'Sneha L. (Temp)', recipient: 'client@global.com', time: '09:15 AM', riskScore: 14, tone: 'Professional', status: 'Approved' },
  { id: 3, sender: 'Vikram P. (Intern)', recipient: 'it-support@internal.com', time: 'Yesterday', riskScore: 65, tone: 'Anxious', status: 'Rejected' }
];
