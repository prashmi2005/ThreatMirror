// ThreatMirror Guardian - Enhanced Analysis Script

const RED_FLAGS = {
  urgency: {
    keywords: ["immediate", "24 hours", "expires", "urgent", "action required", "within", "soon", "hurry"],
    label: "Panic Meter",
    desc: "Uses rushing language to stop you from thinking clearly.",
    weight: 25
  },
  authority: {
    keywords: ["ceo", "manager", "admin", "hr department", "it support", "official", "bank", "security alert", "helpdesk"],
    label: "Trust Level",
    desc: "Pretends to be someone important to gain your trust.",
    weight: 20
  },
  fear: {
    keywords: ["suspended", "deactivated", "unauthorized", "legal action", "compromised", "police", "warning", "locked"],
    label: "Fear Factor",
    desc: "Uses threats to make you panic about your account.",
    weight: 30
  },
  financial: {
    keywords: ["invoice", "payment", "bank", "transaction", "transfer", "salary", "bonus", "billing"],
    label: "Money Bait",
    desc: "Mentions money to get your attention quickly.",
    weight: 15
  }
};

function analyzeEmail(text) {
  const lowerText = text.toLowerCase();
  let totalScore = 0;
  const breakdown = [];

  // 1. Check for Language Patterns (Psychological Triggers)
  for (const [key, flag] of Object.entries(RED_FLAGS)) {
    const foundKeywords = flag.keywords.filter(word => lowerText.includes(word));
    if (foundKeywords.length > 0) {
      const contribution = Math.min(flag.weight * foundKeywords.length, flag.weight * 2);
      totalScore += contribution;
      breakdown.push({
        label: flag.label,
        reason: flag.desc,
        points: contribution,
        severity: contribution > 30 ? 'High' : 'Med'
      });
    }
  }

  // 2. Check for Links (Stranger Danger)
  const links = (text.match(/https?:\/\//g) || []);
  if (links.length > 0) {
    const linkScore = Math.min(links.length * 10, 30);
    totalScore += linkScore;
    breakdown.push({
      label: "Stranger Danger",
      reason: `Found ${links.length} link(s). Scammers use links to steal passwords.`,
      points: linkScore,
      severity: linkScore > 15 ? 'High' : 'Med'
    });
  }

  const finalScore = Math.min(totalScore, 100);
  
  return {
    score: finalScore,
    breakdown: breakdown,
    riskLevel: finalScore > 70 ? 'CRITICAL' : finalScore > 40 ? 'SUSPICIOUS' : 'SAFE',
    riskColor: finalScore > 70 ? '#ef4444' : finalScore > 40 ? '#f59e0b' : '#10b981'
  };
}

function injectGuardianCard(analysis) {
  const existing = document.getElementById('tm-guardian-card');
  if (existing) existing.remove();

  const card = document.createElement('div');
  card.id = 'tm-guardian-card';
  card.className = `tm-card risk-${analysis.riskLevel.toLowerCase()}`;
  
  const breakdownHtml = analysis.breakdown.map(item => `
    <div class="tm-flag-item">
      <div class="tm-flag-header">
        <span class="tm-flag-label">${item.label}</span>
        <span class="tm-flag-points">+${item.points}</span>
      </div>
      <p class="tm-flag-desc">${item.reason}</p>
    </div>
  `).join('');

  card.innerHTML = `
    <div class="tm-header" style="border-top: 4px solid ${analysis.riskColor}">
      <div class="tm-brand">
        <span class="tm-logo">🛡️</span>
        <span class="tm-brand-name">Guardian AI</span>
      </div>
      <div class="tm-risk-badge" style="background: ${analysis.riskColor}20; color: ${analysis.riskColor}">
        ${analysis.riskLevel}
      </div>
    </div>
    
    <div class="tm-body">
      <div class="tm-main-score">
        <div class="tm-score-value">${analysis.score}</div>
        <div class="tm-score-label">THREAT SCORE</div>
      </div>
      
      <div class="tm-breakdown-title">RED FLAG ANALYSIS</div>
      <div class="tm-breakdown-list">
        ${breakdownHtml || '<div class="tm-no-flags">No suspicious patterns detected. Stay vigilant!</div>'}
      </div>
    </div>
    
    <div class="tm-footer">
      <div class="tm-tip">
        <strong>💡 Pro Tip:</strong> If the Panic Meter is high, always verify via a phone call.
      </div>
    </div>
  `;

  document.body.appendChild(card);
}

// Detection Logic
function getEmailBody() {
  const selectors = ['.ii.gt', '.a3s.aiL', '.ads', '[role="main"]'];
  for (const s of selectors) {
    const el = document.querySelector(s);
    if (el && el.innerText.length > 10) return el.innerText;
  }
  return null;
}

let lastEmailId = null;
setInterval(() => {
  const url = window.location.hash;
  if (url.includes('inbox/') || url.includes('search/') || url.includes('label/')) {
    const emailId = url.split('/').pop();
    if (emailId !== lastEmailId) {
      lastEmailId = emailId;
      setTimeout(() => {
        const body = getEmailBody();
        if (body) {
          const analysis = analyzeEmail(body);
          injectGuardianCard(analysis);
        }
      }, 1000);
    }
  } else {
    const card = document.getElementById('tm-guardian-card');
    if (card) card.remove();
    lastEmailId = null;
  }
}, 1000);

console.log("ThreatMirror Guardian: Smart Analysis Active 🛡️");
