// ThreatMirror Guardian - Content Script

const THREAT_PATTERNS = {
  urgency: ["immediate", "24 hours", "expires", "urgent", "action required", "within", "soon", "hurry"],
  authority: ["ceo", "manager", "admin", "hr department", "it support", "official", "bank", "security alert"],
  fear: ["suspended", "deactivated", "unauthorized", "legal action", "compromised", "police", "warning"],
  curiosity: ["invoice", "delivery", "parcel", "bonus", "winner", "confidential", "attached", "shared a file"]
};

function analyzeEmail(text) {
  let score = 0;
  const detectedTriggers = [];
  const reasons = [];

  const lowerText = text.toLowerCase();

  // 1. Analyze Triggers
  for (const [trigger, keywords] of Object.entries(THREAT_PATTERNS)) {
    const matches = keywords.filter(word => lowerText.includes(word));
    if (matches.length > 0) {
      score += matches.length * 15;
      detectedTriggers.push(trigger.charAt(0).toUpperCase() + trigger.slice(1));
      
      if (trigger === 'urgency') reasons.push("Uses strict deadlines to create panic.");
      if (trigger === 'authority') reasons.push("Impersonates a high-ranking official or department.");
      if (trigger === 'fear') reasons.push("Threatens account closure or legal consequences.");
      if (trigger === 'curiosity') reasons.push("Lures you into clicking attachments or links.");
    }
  }

  // 2. Check for Links
  const linkCount = (text.match(/https?:\/\//g) || []).length;
  if (linkCount > 0) {
    score += 10;
    if (linkCount > 2) score += 20;
  }

  // Cap score at 98 (for psychological realism)
  const finalScore = Math.min(score, 98);
  
  return {
    score: finalScore,
    triggers: [...new Set(detectedTriggers)].join(" + ") || "None Detected",
    reason: reasons[0] || "This email appears to have low-risk characteristics.",
    risk: finalScore > 70 ? "High" : finalScore > 30 ? "Medium" : "Low"
  };
}

function injectGuardianCard(analysis) {
  // Remove existing card
  const existing = document.getElementById('tm-guardian-card');
  if (existing) existing.remove();

  const card = document.createElement('div');
  card.id = 'tm-guardian-card';
  card.className = `tm-card tm-risk-${analysis.risk.toLowerCase()}`;
  
  card.innerHTML = `
    <div class="tm-header">
      <div class="tm-logo">🛡️</div>
      <div class="tm-title">ThreatMirror Guardian</div>
    </div>
    <div class="tm-body">
      <div class="tm-score-row">
        <span class="tm-label">Threat Score</span>
        <span class="tm-value">${analysis.score}</span>
      </div>
      <div class="tm-divider"></div>
      <div class="tm-meta">
        <div class="tm-meta-item">
          <span class="tm-label">Triggers</span>
          <div class="tm-trigger-pills">${analysis.triggers}</div>
        </div>
        <div class="tm-meta-item">
          <span class="tm-label">Why this score?</span>
          <p class="tm-reason">${analysis.reason}</p>
        </div>
      </div>
      <div class="tm-footer">
        <span class="tm-status">AI Analysis Active</span>
      </div>
    </div>
  `;

  document.body.appendChild(card);
}

// Gmail specific selector for email body
function getEmailBody() {
  const selectors = ['.ii.gt', '.a3s.aiL', '.ads'];
  for (const selector of selectors) {
    const el = document.querySelector(selector);
    if (el) return el.innerText;
  }
  return null;
}

// Watch for URL changes or DOM mutations (Gmail is a complex SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    if (url.includes('#inbox/')) {
      setTimeout(() => {
        const body = getEmailBody();
        if (body) {
          const analysis = analyzeEmail(body);
          injectGuardianCard(analysis);
        }
      }, 1500); // Wait for Gmail to render email content
    } else {
      // Hide card if not in an email
      const existing = document.getElementById('tm-guardian-card');
      if (existing) existing.remove();
    }
  }
}).observe(document, {subtree: true, childList: true});

console.log("ThreatMirror Guardian Initialized 🛡️");
