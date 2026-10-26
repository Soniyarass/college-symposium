/* ==========================================================================
   NEXUS AI 2026 - CORE APPLICATION LOGIC
   ========================================================================== */

// --- 1. Program Events Database ---
const SYMPOSIUM_EVENTS = [
  {
    id: "solo-dance",
    title: "Solo Dance (Step Matrix)",
    category: "cultural",
    categoryLabel: "Cultural & Non-Tech",
    badgeClass: "badge-cultural",
    icon: "💃",
    fee: 150,
    feeText: "₹150",
    feePer: "per participant",
    teamSize: "1 Member",
    venue: "Main Open Auditorium",
    date: "Day 1 - 02:00 PM",
    prize: "₹5,000 + Trophy",
    desc: "Unleash your rhythm on the grand stage! From classical to hip-hop, contemporary, and robotic freestyle—captivate the crowd with your moves.",
    rules: [
      "Time limit: 3 to 5 minutes.",
      "Bring track in USB drive 30 mins before event.",
      "Costumes and props are allowed (no fire/water)."
    ]
  },
  {
    id: "music",
    title: "Music & Vocals (Sonic Resonance)",
    category: "cultural",
    categoryLabel: "Cultural & Non-Tech",
    badgeClass: "badge-cultural",
    icon: "🎤",
    fee: 150,
    feeText: "₹150",
    feePer: "per participant",
    teamSize: "1 Member",
    venue: "Acoustic Hall B",
    date: "Day 2 - 11:00 AM",
    prize: "₹5,000 + Trophy",
    desc: "Echo your musical soul! Open for Eastern & Western solo vocals, acoustic guitar, keyboard, or beatboxing showcase.",
    rules: [
      "Time limit: 4 minutes.",
      "One accompanist or karaoke backing track allowed.",
      "Standard PA audio system and keyboard provided."
    ]
  },
  {
    id: "treasure-hunt",
    title: "Treasure Hunt (Cyber Quest)",
    category: "nontech",
    categoryLabel: "Flagship Non-Tech",
    badgeClass: "badge-nontech",
    icon: "🗺️",
    fee: 200,
    feeText: "₹200",
    feePer: "per team (2-3)",
    teamSize: "2 - 3 Members",
    venue: "Campus Wide Matrix",
    date: "Day 1 - 11:30 AM",
    prize: "₹8,000 + Medals",
    desc: "High-adrenaline physical & logical quest across campus! Crack AI-encoded ciphers, find secret AR checkpoints, and retrieve the Master Core.",
    rules: [
      "Team of 2 to 3 members.",
      "Duration: 90 minutes across 3 elimination stages.",
      "Smartphones allowed for QR scanning clues only."
    ]
  },
  {
    id: "quiz",
    title: "Neuro Quiz (AI & General Trivia)",
    category: "tech",
    categoryLabel: "Tech & General",
    badgeClass: "badge-tech",
    icon: "🧠",
    fee: 100,
    feeText: "₹100",
    feePer: "per team (2)",
    teamSize: "2 Members",
    venue: "Seminar Hall 1",
    date: "Day 1 - 09:30 AM",
    prize: "₹6,000 + Trophy",
    desc: "Mind clash of the sharpest thinkers! Rounds covering Artificial Intelligence, Tech Milestones, Pop Culture, Sci-Fi, and Logical Puzzles.",
    rules: [
      "Round 1: Written Prelims (25 MCQs).",
      "Round 2: Digital Buzzer Round for Top 6 teams.",
      "Round 3: Rapid Fire with negative marking."
    ]
  },
  {
    id: "paper-presentation",
    title: "AI Paper & Project Expo (InnovateX)",
    category: "tech",
    categoryLabel: "Technical Event",
    badgeClass: "badge-tech",
    icon: "🚀",
    fee: 250,
    feeText: "₹250",
    feePer: "per team (up to 3)",
    teamSize: "1 - 3 Members",
    venue: "Tech Central Labs",
    date: "Day 1 - 10:00 AM",
    prize: "₹10,000 + Trophy",
    desc: "Present your cutting-edge research and prototypes. Topics include Generative AI, Robotics, Computer Vision, Cybersecurity, and Smart IoT.",
    rules: [
      "Presentation time: 8 mins + 2 mins Q&A.",
      "Working prototype or simulation carries extra points.",
      "IEEE format preferred for paper submissions."
    ]
  },
  {
    id: "code-blitz",
    title: "Code Blitz & Bug Hunt",
    category: "tech",
    categoryLabel: "Technical Event",
    badgeClass: "badge-tech",
    icon: "⚡",
    fee: 150,
    feeText: "₹150",
    feePer: "per participant",
    teamSize: "1 Member",
    venue: "CSE Computing Center",
    date: "Day 2 - 09:30 AM",
    prize: "₹6,000 + Trophy",
    desc: "High-speed algorithmic coding and elusive bug extermination! Solve real-time competitive programming challenges against ticking clocks.",
    rules: [
      "Languages allowed: C++, Java, Python, JavaScript.",
      "Round 1: 5 Complex Bug Fixes in 20 minutes.",
      "Round 2: Algorithm Sprint on HackerRank/custom platform."
    ]
  },
  {
    id: "ui-ux-design",
    title: "Cyber Canvas (UI/UX Sprint)",
    category: "tech",
    categoryLabel: "Technical Event",
    badgeClass: "badge-tech",
    icon: "🎨",
    fee: 200,
    feeText: "₹200",
    feePer: "per participant / duo",
    teamSize: "1 - 2 Members",
    venue: "Design Innovation Lab",
    date: "Day 2 - 01:30 PM",
    prize: "₹7,000 + Trophy",
    desc: "Craft futuristic, high-conversion digital experiences. Redesign AI interfaces, mobile dashboards, or cybernetic user journeys within 2 hours.",
    rules: [
      "Figma, Adobe XD, or web prototypes permitted.",
      "Theme will be revealed on spot.",
      "Judged on aesthetics, accessibility, and micro-interactions."
    ]
  },
  {
    id: "gaming-clash",
    title: "Gaming Clash (Valorant & BGMI)",
    category: "gaming",
    categoryLabel: "E-Sports / Non-Tech",
    badgeClass: "badge-nontech",
    icon: "🎮",
    fee: 200,
    feeText: "₹200",
    feePer: "per squad",
    teamSize: "4 Members",
    venue: "E-Sports Arena (Lab 4)",
    date: "Day 2 - 10:00 AM",
    prize: "₹8,000 + Trophy",
    desc: "Unleash competitive tactical gaming! LAN Valorant 5v5 knockouts and Battlegrounds Mobile India showdowns on ultra-low ping network.",
    rules: [
      "Tournament bracket will be single knockout.",
      "BYOD (Bring Your Own Device) for mobile games.",
      "High-refresh gaming monitors and rigs provided for Valorant."
    ]
  },
  {
    id: "lens-matrix",
    title: "Lens Matrix (AI Reel & Photography)",
    category: "nontech",
    categoryLabel: "Media / Non-Tech",
    badgeClass: "badge-nontech",
    icon: "📸",
    fee: 100,
    feeText: "₹100",
    feePer: "per participant",
    teamSize: "1 Member",
    venue: "Symposium Premises",
    date: "Both Days",
    prize: "₹4,000 + Certificate",
    desc: "Capture the electrifying moments of NEXUS AI! Submit creative 30-sec reels or DSLR/mobile photography edited with cybernetic aesthetic.",
    rules: [
      "Submissions must be captured within campus during symposium.",
      "Raw files must be submitted along with edited reel/photo.",
      "Deadlines: Day 2 before 03:00 PM."
    ]
  }
];

// --- 2. Render Events Grid ---
function renderEventCards(eventsToRender) {
  const container = document.getElementById('events-container');
  if (!container) return;

  if (eventsToRender.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: rgba(16, 20, 43, 0.4); border-radius: 20px; border: 1px dashed rgba(168, 85, 247, 0.3);">
        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
        <h3 style="font-family: var(--font-display); color: #fff; margin-bottom: 8px;">No Events Found</h3>
        <p style="color: var(--text-muted); font-size: 0.95rem;">Try adjusting your search terms or filter selection.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = eventsToRender.map(event => `
    <article class="event-card" data-id="${event.id}">
      <div>
        <div class="card-top">
          <span class="card-category-badge ${event.badgeClass}">${event.categoryLabel}</span>
          <div class="card-icon-avatar" title="${event.title}">${event.icon}</div>
        </div>
        
        <h3 class="event-title">${event.title}</h3>
        <p class="event-desc">${event.desc}</p>
        
        <ul class="event-specs-list">
          <li class="event-spec-item">
            <span class="spec-key">👥 Team Size:</span>
            <span class="spec-val">${event.teamSize}</span>
          </li>
          <li class="event-spec-item">
            <span class="spec-key">📍 Venue:</span>
            <span class="spec-val">${event.venue}</span>
          </li>
          <li class="event-spec-item">
            <span class="spec-key">🕒 Timing:</span>
            <span class="spec-val">${event.date}</span>
          </li>
          <li class="event-spec-item">
            <span class="spec-key">🏆 Cash Prize:</span>
            <span class="spec-val prize">${event.prize}</span>
          </li>
        </ul>
      </div>

      <div class="card-footer">
        <div class="fee-block">
          <span class="fee-label">Registration Fee</span>
          <div class="fee-amount">${event.feeText} <span class="fee-unit">/${event.feePer}</span></div>
        </div>

        <button class="btn-card-register" onclick="openRegistrationModal('${event.id}')">
          <span>Register Now</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </article>
  `).join('');
}

// --- 3. Filter & Search Controls ---
let currentCategory = 'all';
let searchQuery = '';

function applyFilters() {
  const filtered = SYMPOSIUM_EVENTS.filter(event => {
    // Category match
    const matchesCategory = 
      currentCategory === 'all' || 
      (currentCategory === 'tech' && event.category === 'tech') ||
      (currentCategory === 'nontech' && (event.category === 'nontech' || event.category === 'cultural' || event.category === 'gaming')) ||
      (currentCategory === 'cultural' && event.category === 'cultural') ||
      (currentCategory === 'gaming' && event.category === 'gaming');

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      !q || 
      event.title.toLowerCase().includes(q) ||
      event.desc.toLowerCase().includes(q) ||
      event.categoryLabel.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  renderEventCards(filtered);
}

function initEventControls() {
  // Category tabs
  const tabs = document.querySelectorAll('.filter-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentCategory = tab.dataset.filter;
      window.cyberSound.playBeep(520, 0.05);
      applyFilters();
    });
  });

  // Search input
  const searchInput = document.getElementById('event-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }
}

// --- 4. Live Symposium Countdown Timer ---
function initCountdown() {
  // Target date: November 14, 2026 09:00:00 IST
  const targetDate = new Date("2026-11-14T09:00:00+05:30").getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      document.getElementById('count-days').innerText = "00";
      document.getElementById('count-hours').innerText = "00";
      document.getElementById('count-mins').innerText = "00";
      document.getElementById('count-secs').innerText = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('count-days').innerText = String(days).padStart(2, '0');
    document.getElementById('count-hours').innerText = String(hours).padStart(2, '0');
    document.getElementById('count-mins').innerText = String(minutes).padStart(2, '0');
    document.getElementById('count-secs').innerText = String(seconds).padStart(2, '0');
  }

  update();
  setInterval(update, 1000);
}

// --- 5. Registration Modal & Pass Generator ---
function openRegistrationModal(eventId = null) {
  window.cyberSound.playBeep(750, 0.08);
  const modal = document.getElementById('registration-modal');
  const eventSelect = document.getElementById('reg-event-select');
  const formArea = document.getElementById('registration-form');
  const ticketArea = document.getElementById('ticket-result-area');

  // Reset to form view
  formArea.style.display = 'block';
  ticketArea.classList.remove('active');

  // Populate events dropdown
  if (eventSelect) {
    eventSelect.innerHTML = SYMPOSIUM_EVENTS.map(e => `
      <option value="${e.id}" ${eventId === e.id ? 'selected' : ''}>
        ${e.title} (Fee: ${e.feeText})
      </option>
    `).join('');
  }

  updateFeeCalculation();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRegistrationModal() {
  window.cyberSound.playBeep(400, 0.06);
  const modal = document.getElementById('registration-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function updateFeeCalculation() {
  const eventSelect = document.getElementById('reg-event-select');
  const modalFeeDisplay = document.getElementById('modal-fee-display');
  const modalEventName = document.getElementById('modal-selected-event');

  if (!eventSelect) return;
  const selectedEvent = SYMPOSIUM_EVENTS.find(e => e.id === eventSelect.value) || SYMPOSIUM_EVENTS[0];

  if (modalFeeDisplay) modalFeeDisplay.innerText = selectedEvent.feeText;
  if (modalEventName) modalEventName.innerText = selectedEvent.title;

  // Toggle team fields if team event
  const teamContainer = document.getElementById('team-members-container');
  if (teamContainer) {
    const isTeam = selectedEvent.teamSize.includes('Members') || selectedEvent.teamSize.includes('2') || selectedEvent.teamSize.includes('4');
    teamContainer.style.display = isTeam ? 'block' : 'none';
  }
}

function handleRegistrationSubmit(e) {
  e.preventDefault();
  window.cyberSound.playSuccessChime();

  const name = document.getElementById('reg-name').value || "Innovator";
  const college = document.getElementById('reg-college').value || "Engineering College";
  const eventId = document.getElementById('reg-event-select').value;
  const eventObj = SYMPOSIUM_EVENTS.find(ev => ev.id === eventId) || SYMPOSIUM_EVENTS[0];
  const passId = "NX26-" + Math.floor(100000 + Math.random() * 900000);

  // Populate Pass
  document.getElementById('pass-attendee-name').innerText = name;
  document.getElementById('pass-college-name').innerText = college;
  document.getElementById('pass-event-name').innerText = eventObj.title;
  document.getElementById('pass-fee-paid').innerText = eventObj.feeText + " (CONFIRMED)";
  document.getElementById('pass-id-display').innerText = passId;
  document.getElementById('pass-code-text').innerText = passId;

  // Switch view
  document.getElementById('registration-form').style.display = 'none';
  document.getElementById('ticket-result-area').classList.add('active');
}

// --- 6. AI Robot Assistant Engine ("NEO-BOT") ---
const AI_KNOWLEDGE_BASE = [
  {
    keywords: ["dance", "solo dance", "step", "dancing"],
    answer: "💃 <strong>Solo Dance (Step Matrix):</strong><br>Registration Fee: <strong>₹150</strong>.<br>Duration: 3 to 5 minutes.<br>Prize: <strong>₹5,000 + Trophy</strong>.<br>All styles (Classical, Western, Hip-Hop, Robotics) are welcome! Bring track on a USB."
  },
  {
    keywords: ["music", "vocal", "singing", "song", "instrumental"],
    answer: "🎤 <strong>Music (Sonic Resonance):</strong><br>Registration Fee: <strong>₹150</strong>.<br>Time limit: 4 minutes.<br>Prize: <strong>₹5,000 + Trophy</strong>.<br>Eastern or Western solo vocals, keyboard, guitar, or beatboxing. One accompanist or karaoke track allowed."
  },
  {
    keywords: ["treasure", "hunt", "cyber quest", "mystery"],
    answer: "🗺️ <strong>Treasure Hunt (Cyber Quest):</strong><br>Registration Fee: <strong>₹200 per team</strong> (2-3 members).<br>Grand Prize: <strong>₹8,000 Cash + Medals</strong>.<br>3 elimination stages across campus with AI-encoded cipher clues & AR checkpoints!"
  },
  {
    keywords: ["quiz", "trivia", "neuro"],
    answer: "🧠 <strong>Neuro Quiz:</strong><br>Registration Fee: <strong>₹100 per team</strong> (2 members).<br>Prize: <strong>₹6,000 + Trophy</strong>.<br>Topics: AI, Tech Breakthroughs, Pop Culture, Sci-Fi & Logical Reasoning. Live buzzer round for finalists!"
  },
  {
    keywords: ["technical", "tech events", "coding", "paper"],
    answer: "⚡ <strong>Technical Events List:</strong><br>1. <strong>AI Paper & Project Expo (InnovateX)</strong> - Fee: ₹250 (Prize ₹10k)<br>2. <strong>Code Blitz & Bug Hunt</strong> - Fee: ₹150 (Prize ₹6k)<br>3. <strong>Cyber Canvas UI/UX Sprint</strong> - Fee: ₹200 (Prize ₹7k)<br>4. <strong>Neuro Quiz</strong> - Fee: ₹100."
  },
  {
    keywords: ["non-technical", "non tech", "gaming", "cultural"],
    answer: "🎉 <strong>Non-Technical & Cultural Events:</strong><br>1. <strong>Solo Dance</strong> - Fee: ₹150 (Prize ₹5k)<br>2. <strong>Music Solo</strong> - Fee: ₹150 (Prize ₹5k)<br>3. <strong>Treasure Hunt</strong> - Fee: ₹200/team (Prize ₹8k)<br>4. <strong>Gaming Clash (Valorant/BGMI)</strong> - Fee: ₹200/squad<br>5. <strong>Lens Matrix AI Reels/Photo</strong> - Fee: ₹100."
  },
  {
    keywords: ["fee", "fees", "cost", "price", "registration fee"],
    answer: "💳 <strong>Registration Fee Structure:</strong><br>• Solo Dance: ₹150<br>• Music Solo: ₹150<br>• Treasure Hunt: ₹200 (per team)<br>• Neuro Quiz: ₹100 (per team)<br>• Code Blitz: ₹150<br>• Paper Presentation: ₹250 (per team)<br>• UI/UX Sprint: ₹200<br>• Gaming Clash: ₹200<br>• Reels/Photo: ₹100.<br>All fees include delegate kit & lunch!"
  },
  {
    keywords: ["register", "how to register", "signup", "apply"],
    answer: "🚀 <strong>How to Register:</strong><br>Simply click the glowing <strong>'Register Now'</strong> button on any event card, or the 'Register Now' button in the navigation bar. Fill in your name, college, WhatsApp number, and submit to receive your instant digital hologram pass!"
  },
  {
    keywords: ["date", "venue", "location", "when", "time"],
    answer: "📍 <strong>Dates & Venue:</strong><br>📅 <strong>November 14 & 15, 2026</strong><br>🏛️ <strong>Tech Central Auditorium & AI Labs</strong><br>Reporting time: 08:30 AM IST. Inaugural ceremony kicks off at 09:15 AM."
  },
  {
    keywords: ["food", "lunch", "certificate", "refreshment", "kit"],
    answer: "🍱 <strong>Delegate Perks:</strong><br>• Delicious breakfast, welcome drinks & grand buffet lunch provided.<br>• Official ISO-verified Participation Certificate for all.<br>• Hologram Symposium Badge & AI delegate goodie kit!"
  }
];

class AIAssistantChat {
  constructor() {
    this.panel = document.getElementById('ai-chat-panel');
    this.triggerBtn = document.getElementById('assistant-trigger-btn');
    this.closeBtn = document.getElementById('chat-close-btn');
    this.input = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('chat-send-btn');
    this.messagesContainer = document.getElementById('chat-messages');
    this.chips = document.querySelectorAll('.prompt-chip');

    this.init();
  }

  init() {
    if (!this.panel || !this.triggerBtn) return;

    this.triggerBtn.addEventListener('click', () => this.toggleChat());
    if (this.closeBtn) this.closeBtn.addEventListener('click', () => this.toggleChat(false));

    if (this.sendBtn && this.input) {
      this.sendBtn.addEventListener('click', () => this.sendMessage());
      this.input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.sendMessage();
      });
    }

    this.chips.forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query || chip.innerText;
        this.input.value = query;
        this.sendMessage();
      });
    });
  }

  toggleChat(forceState = null) {
    window.cyberSound.playBeep(640, 0.06);
    const isOpen = forceState !== null ? forceState : !this.panel.classList.contains('active');
    if (isOpen) {
      this.panel.classList.add('active');
      this.input.focus();
    } else {
      this.panel.classList.remove('active');
    }
  }

  sendMessage() {
    const text = this.input.value.trim();
    if (!text) return;

    window.cyberSound.playBeep(800, 0.05);

    // Append User Bubble
    this.appendBubble(text, 'user');
    this.input.value = '';

    // Simulate AI thinking and reply
    setTimeout(() => {
      const response = this.findAnswer(text);
      this.appendBubble(response, 'bot');
      window.cyberSound.playRobotChirp();
    }, 380);
  }

  appendBubble(htmlContent, type) {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.innerHTML = htmlContent;
    this.messagesContainer.appendChild(bubble);
    this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
  }

  findAnswer(userText) {
    const lower = userText.toLowerCase();

    for (const item of AI_KNOWLEDGE_BASE) {
      if (item.keywords.some(kw => lower.includes(kw))) {
        return item.answer;
      }
    }

    return "🤖 <strong>NEO:</strong> I'm tuned to answer all questions about <strong>Solo Dance</strong>, <strong>Music</strong>, <strong>Treasure Hunt</strong>, <strong>Quiz</strong>, <strong>Technical</strong> & <strong>Non-Technical</strong> events, fees, and registration! Try clicking one of the suggestion chips below!";
  }
}

// --- 7. Sound Toggle & Mobile Nav Controls ---
function initGeneralControls() {
  // Sound Mute Toggle
  const soundBtn = document.getElementById('sound-toggle-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      window.cyberSound.enabled = !window.cyberSound.enabled;
      soundBtn.innerHTML = window.cyberSound.enabled ? '🔊' : '🔇';
      soundBtn.setAttribute('title', window.cyberSound.enabled ? 'Mute Sound FX' : 'Enable Sound FX');
      if (window.cyberSound.enabled) {
        window.cyberSound.playBeep(880, 0.08);
      }
    });
  }

  // Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const nav = document.getElementById('cyber-nav');
  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('mobile-expanded');
    });
  }

  // Event select change in modal
  const eventSelect = document.getElementById('reg-event-select');
  if (eventSelect) {
    eventSelect.addEventListener('change', updateFeeCalculation);
  }

  // Registration form submission
  const regForm = document.getElementById('registration-form');
  if (regForm) {
    regForm.addEventListener('submit', handleRegistrationSubmit);
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  renderEventCards(SYMPOSIUM_EVENTS);
  initEventControls();
  initCountdown();
  initGeneralControls();
  window.aiChat = new AIAssistantChat();
});
