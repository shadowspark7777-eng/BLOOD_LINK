/**
 * BLOOD LINK — Main Application Controller
 * Handles SPA navigation, real-time filtering, request creation lifecycle,
 * status tracking timeline simulations, notification center, and AI FAQ assistant.
 */

// Global State
const BloodLinkApp = {
  currentView: 'home',
  activeDonorBloodFilter: 'ALL',
  donorSearchQuery: '',
  availableOnly: false,
  donorSortBy: 'distance',
  activeTrackingId: 'BL-REQ-8492',
  selectedBloodReqGroup: 'O-',
  selectedUrgency: 'Critical',
  activeAlertFilter: 'all',
  // Authentication & 4-Category System State
  activeAuthTab: 'login', // 'login' or 'register'
  activeAuthCategory: 'donor', // 'donor', 'patient', 'hospital', 'bloodbank'
  generatedOtp: null,
  otpTimerInterval: null,
  otpSecondsLeft: 30,
  pendingRegistrationData: null,
  chatMessages: [
    {
      sender: 'bot',
      text: "Hello! I am LinkBot, your Blood Link healthcare coordination assistant. How can I assist you with blood requests, donor eligibility, or safety guidelines today?",
      time: "Just now"
    }
  ],

  // Initialization
  init: function() {
    this.bindEvents();
    this.setupOtpInputListeners();
    this.updateUserUI();
    this.renderHome();
    this.renderDonors();
    this.renderAlerts();
    this.renderTracker();
    this.updateAlertBadges();
    console.log("Blood Link Application initialized successfully.");
  },

  // Event Listeners Binding
  bindEvents: function() {
    // Nav buttons (Desktop)
    document.querySelectorAll('.desktop-nav .nav-item-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        if (view) BloodLinkApp.switchView(view);
      });
    });

    // Mobile Bottom Nav buttons
    document.querySelectorAll('.mobile-bottom-bar .mobile-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const view = btn.dataset.view;
        if (view) BloodLinkApp.switchView(view);
      });
    });

    // Logo click goes to home
    document.querySelector('.brand-link').addEventListener('click', () => {
      BloodLinkApp.switchView('home');
    });

    // Emergency SOS button in header
    document.getElementById('headerSosBtn').addEventListener('click', () => {
      BloodLinkApp.switchView('request');
      BloodLinkApp.setUrgency('Critical');
    });

    // Header User Profile shortcut
    document.getElementById('headerUserBtn').addEventListener('click', () => {
      BloodLinkApp.switchView('profile');
    });

    // Floating AI Assistant Button
    document.getElementById('floatingAiBtn').addEventListener('click', () => {
      BloodLinkApp.toggleChatDrawer();
    });

    // Chat Drawer Close Button
    document.getElementById('chatCloseBtn').addEventListener('click', () => {
      BloodLinkApp.toggleChatDrawer(false);
    });

    // Chat Input Form
    document.getElementById('chatSendBtn').addEventListener('click', () => {
      BloodLinkApp.handleChatSubmit();
    });
    document.getElementById('chatInput').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') BloodLinkApp.handleChatSubmit();
    });

    // Suggested Chat Chips
    document.querySelectorAll('.suggested-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const query = chip.dataset.query;
        if (query) {
          document.getElementById('chatInput').value = query;
          BloodLinkApp.handleChatSubmit();
        }
      });
    });

    // Request Form Blood Group Selection
    document.querySelectorAll('.blood-radio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.blood-radio-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        BloodLinkApp.selectedBloodReqGroup = btn.dataset.bg;
      });
    });

    // Request Form Urgency Selection
    document.querySelectorAll('.urgency-card-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.urgency-card-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        BloodLinkApp.selectedUrgency = btn.dataset.urgency;
      });
    });

    // Donor Filter Blood Chips
    document.querySelectorAll('.blood-chips-row .blood-chip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.blood-chips-row .blood-chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        BloodLinkApp.activeDonorBloodFilter = btn.dataset.bg;
        BloodLinkApp.renderDonors();
      });
    });

    // Donor Search Input
    const searchInput = document.getElementById('donorSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        BloodLinkApp.donorSearchQuery = e.target.value.trim().toLowerCase();
        BloodLinkApp.renderDonors();
      });
    }

    // Donor Availability Toggle Checkbox
    const availCheck = document.getElementById('donorAvailOnlyCheck');
    if (availCheck) {
      availCheck.addEventListener('change', (e) => {
        BloodLinkApp.availableOnly = e.target.checked;
        BloodLinkApp.renderDonors();
      });
    }

    // Donor Sort Selector
    const sortSelect = document.getElementById('donorSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        BloodLinkApp.donorSortBy = e.target.value;
        BloodLinkApp.renderDonors();
      });
    }

    // Profile Availability Toggle
    const profileAvailToggle = document.getElementById('profileAvailToggle');
    if (profileAvailToggle) {
      profileAvailToggle.addEventListener('change', (e) => {
        const user = BloodLinkStore.getUser();
        user.isAvailableDonor = e.target.checked;
        BloodLinkStore.saveUser(user);
        BloodLinkApp.updateUserUI();
        BloodLinkApp.showToast(e.target.checked ? "Your donor status is now ACTIVE for emergency alerts." : "Your donor status is paused (resting cooldown).");
      });
    }
  },

  // Switch SPA View
  switchView: function(viewName) {
    this.currentView = viewName;

    // Toggle active view container
    document.querySelectorAll('.app-view').forEach(view => {
      view.classList.remove('active');
    });
    const targetView = document.getElementById(`view-${viewName}`);
    if (targetView) {
      targetView.classList.add('active');
    }

    // Update Desktop Nav Active State
    document.querySelectorAll('.desktop-nav .nav-item-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Update Mobile Bottom Nav Active State
    document.querySelectorAll('.mobile-bottom-bar .mobile-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === viewName);
    });

    // Refresh contents
    if (viewName === 'home') this.renderHome();
    if (viewName === 'donors') this.renderDonors();
    if (viewName === 'alerts') this.renderAlerts();
    if (viewName === 'profile') this.renderProfile();
    if (viewName === 'tracker') this.renderTracker();
    if (viewName === 'admin') this.renderAdmin();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Update User Details in UI
  updateUserUI: function() {
    const user = BloodLinkStore.getUser();
    const cat = user.category || (user.role === 'admin' ? 'hospital' : (user.role === 'requester' ? 'patient' : 'donor'));
    const catDisplayNames = {
      donor: 'Donor',
      patient: 'Patient',
      hospital: 'Hospital',
      bloodbank: 'Blood Bank'
    };
    const catName = catDisplayNames[cat] || 'Donor';
    
    // Header Avatar & Name
    const avatarMini = document.getElementById('headerUserAvatar');
    if (avatarMini) avatarMini.textContent = (user.name || 'U').charAt(0);
    const nameEl = document.getElementById('headerUserName');
    if (nameEl) nameEl.textContent = user.name;
    const roleEl = document.getElementById('headerUserRole');
    if (roleEl) {
      if (cat === 'hospital' || cat === 'bloodbank') {
        roleEl.innerHTML = `<span class="category-badge-chip ${cat}">${catName}</span>`;
      } else {
        roleEl.innerHTML = `${user.bloodGroup || 'O+'} • <span class="category-badge-chip ${cat}">${catName}</span>`;
      }
    }

    // Profile Screen Avatar & Details
    const profAvatar = document.getElementById('profileAvatarBig');
    if (profAvatar) profAvatar.textContent = (user.name || 'U').charAt(0);
    const profName = document.getElementById('profileFullName');
    if (profName) profName.textContent = user.name;
    const profBgBadge = document.getElementById('profileBloodBadge');
    if (profBgBadge) {
      if (cat === 'hospital' || cat === 'bloodbank') {
        profBgBadge.style.display = 'none';
      } else {
        profBgBadge.style.display = 'inline-flex';
        profBgBadge.textContent = user.bloodGroup;
      }
    }
    const profCity = document.getElementById('profileCity');
    if (profCity) profCity.textContent = `${user.area || 'Central'}, ${user.city || 'Bengaluru'}`;

    // Profile Meta Pills - Dynamic Category Chip
    const profPills = document.querySelector('.profile-meta-pills');
    if (profPills) {
      const existingChip = profPills.querySelector('.category-badge-chip');
      if (existingChip) existingChip.remove();
      const chip = document.createElement('span');
      chip.className = `category-badge-chip ${cat}`;
      chip.style.fontSize = '0.74rem';
      chip.textContent = catName;
      profPills.appendChild(chip);
    }

    // Profile Availability Switch
    const availSwitch = document.getElementById('profileAvailToggle');
    if (availSwitch) availSwitch.checked = !!user.isAvailableDonor;
    const availStatusText = document.getElementById('profileAvailStatusText');
    if (availStatusText) {
      if (cat === 'hospital' || cat === 'bloodbank') {
        availStatusText.textContent = `${catName} desk active for donor requests and critical supply dispatches.`;
      } else if (cat === 'patient') {
        availStatusText.textContent = "Active patient profile. Ready to post requests and coordinate with local donors.";
      } else {
        availStatusText.textContent = user.isAvailableDonor ? "Ready to respond immediately to local emergency blood alerts." : "Temporarily paused / Resting";
      }
    }

    // Digital Donor Pass
    const passBg = document.getElementById('passBloodGroup');
    if (passBg) passBg.textContent = user.bloodGroup || 'ALL';
    const passId = document.getElementById('passDonorId');
    if (passId) passId.textContent = user.donorCardId || 'BL-DN-8491';
    const passDonations = document.getElementById('passDonationsCount');
    if (passDonations) passDonations.textContent = user.totalDonations !== undefined ? user.totalDonations : 3;
    const passLives = document.getElementById('passLivesSaved');
    if (passLives) passLives.textContent = user.livesSaved !== undefined ? user.livesSaved : 9;
  },

  // Update Notification Badges
  updateAlertBadges: function() {
    const alerts = BloodLinkStore.getAlerts();
    const unreadCount = alerts.filter(a => !a.isRead).length;

    const desktopBadge = document.getElementById('navAlertBadge');
    if (desktopBadge) {
      if (unreadCount > 0) {
        desktopBadge.textContent = unreadCount;
        desktopBadge.style.display = 'inline-block';
      } else {
        desktopBadge.style.display = 'none';
      }
    }

    const mobileBadge = document.getElementById('mobileAlertBadge');
    if (mobileBadge) {
      if (unreadCount > 0) {
        mobileBadge.textContent = unreadCount;
        mobileBadge.style.display = 'flex';
      } else {
        mobileBadge.style.display = 'none';
      }
    }
  },

  // Render Home Dashboard
  renderHome: function() {
    const user = BloodLinkStore.getUser();
    const greetingEl = document.getElementById('homeUserGreeting');
    if (greetingEl) greetingEl.textContent = `Welcome, ${user.name.split(' ')[0]}`;

    // Render Urgent Requests Feed
    const reqs = BloodLinkStore.getRequests();
    const urgentFeed = document.getElementById('homeUrgentFeed');
    if (!urgentFeed) return;

    urgentFeed.innerHTML = '';
    const activeReqs = reqs.filter(r => r.status !== 'Fulfilled' && r.status !== 'Cancelled').slice(0, 3);

    activeReqs.forEach(req => {
      const card = document.createElement('div');
      card.className = 'request-feed-card';
      card.innerHTML = `
        <div class="feed-card-header">
          <div class="feed-patient-info">
            <h4>${req.patientName}</h4>
            <div class="feed-hospital-sub">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${req.hospital}, ${req.city}</span>
            </div>
          </div>
          <div class="blood-badge">${req.bloodGroup}</div>
        </div>

        <div class="feed-details-row">
          <div class="detail-item">
            <span class="detail-label">Units Needed</span>
            <span class="detail-value">${req.units} ${req.units === 1 ? 'Unit' : 'Units'}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Urgency</span>
            <span class="status-pill ${req.urgency.toLowerCase()}">${req.urgency}</span>
          </div>
          <div class="detail-item">
            <span class="detail-label">Status</span>
            <span class="status-pill ${req.status.toLowerCase()}">${req.status}</span>
          </div>
        </div>

        <div class="feed-card-actions">
          <span class="time-ago">${req.requiredDate}</span>
          <div class="feed-action-btns">
            <button class="btn-secondary btn-ghost" onclick="BloodLinkApp.trackSpecificRequest('${req.id}')">Track</button>
            <button class="btn-primary" style="padding:8px 14px; font-size:0.84rem;" onclick="BloodLinkApp.openRespondModal('${req.id}')">
              Respond
            </button>
          </div>
        </div>
      `;
      urgentFeed.appendChild(card);
    });
  },

  // Render Donors Directory with Filters
  renderDonors: function() {
    const donors = BloodLinkStore.getDonors();
    const container = document.getElementById('donorsListGrid');
    const counterEl = document.getElementById('donorsCountMsg');
    if (!container) return;

    container.innerHTML = '';

    // Filter Logic
    let filtered = donors.filter(d => {
      // Blood group filter
      if (BloodLinkApp.activeDonorBloodFilter !== 'ALL' && d.bloodGroup !== BloodLinkApp.activeDonorBloodFilter) {
        return false;
      }
      // Availability filter
      if (BloodLinkApp.availableOnly && !d.isAvailable) {
        return false;
      }
      // Search query filter (city, area, name)
      if (BloodLinkApp.donorSearchQuery) {
        const q = BloodLinkApp.donorSearchQuery;
        const matchName = d.displayName.toLowerCase().includes(q);
        const matchCity = d.city.toLowerCase().includes(q);
        const matchArea = d.area.toLowerCase().includes(q);
        const matchBg = d.bloodGroup.toLowerCase().includes(q);
        if (!matchName && !matchCity && !matchArea && !matchBg) return false;
      }
      return true;
    });

    // Sort Logic
    if (BloodLinkApp.donorSortBy === 'distance') {
      filtered.sort((a, b) => a.distanceKm - b.distanceKm);
    } else if (BloodLinkApp.donorSortBy === 'donations') {
      filtered.sort((a, b) => b.donationsCount - a.donationsCount);
    }

    if (counterEl) {
      counterEl.textContent = `Showing ${filtered.length} verified volunteer ${filtered.length === 1 ? 'donor' : 'donors'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding: 48px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--navy-border);">
          <div style="width:54px; height:54px; border-radius:50%; background:rgba(217,4,41,0.1); color:var(--primary-red); display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
          <h4 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:6px;">No Matching Donors Found</h4>
          <p style="color:var(--text-secondary); font-size:0.88rem; max-width:400px; margin:0 auto 16px;">Try expanding your blood group filter or search for a nearby city area.</p>
          <button class="btn-secondary" onclick="BloodLinkApp.resetDonorFilters()">Reset Filters</button>
        </div>
      `;
      return;
    }

    filtered.forEach(d => {
      const card = document.createElement('div');
      card.className = 'donor-card';
      card.innerHTML = `
        <div>
          <div class="donor-card-top">
            <div class="donor-identity-wrap">
              <div class="donor-avatar-circle">${d.displayName.charAt(0)}</div>
              <div class="donor-names">
                <h4>
                  ${d.displayName}
                  ${d.verified ? '<svg class="verified-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' : ''}
                </h4>
                <div class="donor-location-str">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <span>${d.area}, ${d.city} • ~${d.distanceKm} km</span>
                </div>
              </div>
            </div>
            <div class="blood-badge blood-badge-sm">${d.bloodGroup}</div>
          </div>

          <div class="donor-metrics-row" style="margin: 14px 0;">
            <div class="donor-metric-col">
              <span class="metric-lbl">Status</span>
              <span class="status-pill ${d.isAvailable ? 'available' : 'cooldown'}" style="padding:2px 8px; font-size:0.68rem;">
                ${d.isAvailable ? 'Available' : 'Cooldown'}
              </span>
            </div>
            <div class="donor-metric-col">
              <span class="metric-lbl">Donations</span>
              <span class="metric-val">${d.donationsCount} Times</span>
            </div>
            <div class="donor-metric-col">
              <span class="metric-lbl">Last Donated</span>
              <span class="metric-val">${d.lastDonated}</span>
            </div>
          </div>

          <div class="donor-badges-row">
            ${d.badges.map(b => `<span class="badge-tag">${b}</span>`).join('')}
          </div>
        </div>

        <button class="btn-primary" style="width:100%;" onclick="BloodLinkApp.openContactDonorModal('${d.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          Send Coordination Request
        </button>
      `;
      container.appendChild(card);
    });
  },

  resetDonorFilters: function() {
    this.activeDonorBloodFilter = 'ALL';
    this.donorSearchQuery = '';
    this.availableOnly = false;
    const searchInput = document.getElementById('donorSearchInput');
    if (searchInput) searchInput.value = '';
    const availCheck = document.getElementById('donorAvailOnlyCheck');
    if (availCheck) availCheck.checked = false;
    document.querySelectorAll('.blood-chips-row .blood-chip-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.bg === 'ALL');
    });
    this.renderDonors();
  },

  // Request Submission Handler
  handleRequestSubmit: function(event) {
    if (event) event.preventDefault();

    const patientName = document.getElementById('reqPatientName').value.trim();
    const units = parseInt(document.getElementById('reqUnitsInput').value) || 1;
    const hospital = document.getElementById('reqHospitalName').value.trim();
    const city = document.getElementById('reqCityInput').value.trim();
    const contactName = document.getElementById('reqContactName').value.trim();
    const contactPhone = document.getElementById('reqContactPhone').value.trim();
    const notes = document.getElementById('reqNotesInput').value.trim();

    if (!patientName || !hospital || !city || !contactName || !contactPhone) {
      BloodLinkApp.showToast("Please fill in all mandatory fields marked with an asterisk (*)", true);
      return;
    }

    // Generate new Request ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newReqId = `BL-REQ-${randomNum}`;

    const newRequest = {
      id: newReqId,
      patientName: patientName,
      bloodGroup: BloodLinkApp.selectedBloodReqGroup,
      units: units,
      hospital: hospital,
      city: city,
      location: `${hospital}, ${city}`,
      urgency: BloodLinkApp.selectedUrgency,
      requiredDate: "Immediate / Today",
      contactName: contactName,
      contactPhone: contactPhone,
      status: "Open",
      createdAt: new Date().toISOString(),
      hasHospitalDoc: true,
      docName: "Uploaded_Requisition_Slip.pdf",
      notes: notes || "Direct emergency requisition submitted through Blood Link mobile app.",
      timeline: [
        { status: "Open", time: "Just now", note: "Emergency blood request generated." }
      ],
      matchedDonors: []
    };

    // Save to storage
    const reqs = BloodLinkStore.getRequests();
    reqs.unshift(newRequest);
    BloodLinkStore.saveRequests(reqs);

    // Create an in-app alert
    const alerts = BloodLinkStore.getAlerts();
    alerts.unshift({
      id: `alt-${Date.now()}`,
      type: "urgent",
      title: `Emergency ${BloodLinkApp.selectedBloodReqGroup} Request Created`,
      message: `Your request ${newReqId} for ${patientName} at ${hospital} is now active in the matching queue.`,
      targetId: newReqId,
      time: "Just now",
      isRead: false,
      urgencyTag: BloodLinkApp.selectedUrgency
    });
    BloodLinkStore.saveAlerts(alerts);
    BloodLinkApp.updateAlertBadges();

    // Reset Form
    document.getElementById('bloodRequestForm').reset();

    // Show Success Modal
    BloodLinkApp.activeTrackingId = newReqId;
    document.getElementById('successReqRefId').textContent = newReqId;
    document.getElementById('successReqBloodGroup').textContent = BloodLinkApp.selectedBloodReqGroup;
    document.getElementById('successReqHospital').textContent = `${hospital}, ${city}`;
    BloodLinkApp.openModal('modalRequestSuccess');
  },

  // Render Alerts Screen
  renderAlerts: function() {
    const alerts = BloodLinkStore.getAlerts();
    const container = document.getElementById('alertsListContainer');
    if (!container) return;

    container.innerHTML = '';

    let filtered = alerts;
    if (this.activeAlertFilter !== 'all') {
      filtered = alerts.filter(a => a.type === this.activeAlertFilter);
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding: 48px 20px; background:var(--bg-card); border-radius:var(--radius-lg); border:1px solid var(--navy-border);">
          <div style="width:52px; height:52px; border-radius:50%; background:rgba(16,185,129,0.1); color:var(--text-success); display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          </div>
          <h4 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:4px;">You're All Caught Up</h4>
          <p style="color:var(--text-secondary); font-size:0.86rem;">No unread alerts in this category.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(alt => {
      const card = document.createElement('div');
      card.className = `alert-card-item ${alt.isRead ? '' : 'unread'}`;
      card.onclick = () => BloodLinkApp.handleAlertClick(alt.id);

      let iconSvg = '';
      if (alt.type === 'urgent') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;
      } else if (alt.type === 'match') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
      } else if (alt.type === 'update') {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
      } else {
        iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;
      }

      card.innerHTML = `
        <div class="alert-icon-box ${alt.type}">
          ${iconSvg}
        </div>
        <div class="alert-info-col">
          <div class="alert-title-row">
            <h4>${alt.title}</h4>
            <span class="alert-time-stamp">${alt.time}</span>
          </div>
          <p class="alert-msg-body">${alt.message}</p>
        </div>
      `;
      container.appendChild(card);
    });
  },

  handleAlertClick: function(alertId) {
    const alerts = BloodLinkStore.getAlerts();
    const target = alerts.find(a => a.id === alertId);
    if (target) {
      target.isRead = true;
      BloodLinkStore.saveAlerts(alerts);
      BloodLinkApp.updateAlertBadges();
      BloodLinkApp.renderAlerts();

      if (target.targetId) {
        BloodLinkApp.trackSpecificRequest(target.targetId);
      }
    }
  },

  markAllAlertsRead: function() {
    const alerts = BloodLinkStore.getAlerts();
    alerts.forEach(a => a.isRead = true);
    BloodLinkStore.saveAlerts(alerts);
    BloodLinkApp.updateAlertBadges();
    BloodLinkApp.renderAlerts();
    BloodLinkApp.showToast("All notifications marked as read.");
  },

  filterAlerts: function(tabName, btnEl) {
    this.activeAlertFilter = tabName;
    document.querySelectorAll('.alert-tab-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    this.renderAlerts();
  },

  // Request Status Tracker
  renderTracker: function() {
    const reqs = BloodLinkStore.getRequests();
    const activeReq = reqs.find(r => r.id === this.activeTrackingId) || reqs[0];
    if (!activeReq) return;

    // Populate Selector Dropdown
    const selector = document.getElementById('trackerRequestSelect');
    if (selector) {
      selector.innerHTML = reqs.map(r => `
        <option value="${r.id}" ${r.id === activeReq.id ? 'selected' : ''}>
          ${r.id} — ${r.patientName} (${r.bloodGroup})
        </option>
      `).join('');
    }

    // Populate Request Summary Header
    const refCode = document.getElementById('trackerRefCode');
    if (refCode) refCode.textContent = activeReq.id;
    const patName = document.getElementById('trackerPatientName');
    if (patName) patName.textContent = activeReq.patientName;
    const bgBadge = document.getElementById('trackerBloodBadge');
    if (bgBadge) bgBadge.textContent = activeReq.bloodGroup;
    const hospEl = document.getElementById('trackerHospital');
    if (hospEl) hospEl.textContent = `${activeReq.hospital}, ${activeReq.city}`;
    const statusPill = document.getElementById('trackerStatusPill');
    if (statusPill) {
      statusPill.className = `status-pill ${activeReq.status.toLowerCase()}`;
      statusPill.textContent = activeReq.status;
    }

    // 6 Lifecycle Stages: Open -> Under Review -> Matched -> Accepted -> Fulfilled (or Cancelled)
    const stages = ["Open", "Under Review", "Matched", "Accepted", "Fulfilled"];
    const currentIndex = stages.indexOf(activeReq.status);

    const timelineContainer = document.getElementById('trackerTimelineNodes');
    if (timelineContainer) {
      timelineContainer.innerHTML = '';
      stages.forEach((stage, idx) => {
        const isCompleted = currentIndex > idx || activeReq.status === 'Fulfilled';
        const isActive = activeReq.status === stage;

        let note = "Pending verification";
        if (stage === 'Open') note = "Request submitted and registered in coordinator registry.";
        if (stage === 'Under Review') note = "Hospital desk & ICU authorization slip reviewed.";
        if (stage === 'Matched') note = activeReq.matchedDonors.length ? `Notified: ${activeReq.matchedDonors.join(', ')}` : "Scanning matching donors within 10 km.";
        if (stage === 'Accepted') note = "Confirmed donor is in transit to the blood bank.";
        if (stage === 'Fulfilled') note = "Clinical screening passed & transfusion completed.";

        const node = document.createElement('div');
        node.className = `timeline-step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`;
        node.innerHTML = `
          <div class="timeline-step-node"></div>
          <div class="timeline-step-content">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <h4>${stage}</h4>
              <span class="timeline-time">${isActive ? 'Active Stage' : (isCompleted ? 'Completed' : 'Upcoming')}</span>
            </div>
            <p>${note}</p>
          </div>
        `;
        timelineContainer.appendChild(node);
      });
    }
  },

  changeTrackedRequest: function(reqId) {
    this.activeTrackingId = reqId;
    this.renderTracker();
  },

  trackSpecificRequest: function(reqId) {
    this.activeTrackingId = reqId;
    this.switchView('tracker');
  },

  // Interactive Tracker Stage Simulation (For user testing)
  simulateTrackerStage: function(nextStage) {
    const reqs = BloodLinkStore.getRequests();
    const req = reqs.find(r => r.id === this.activeTrackingId);
    if (!req) return;

    req.status = nextStage;
    if (nextStage === 'Matched' && req.matchedDonors.length === 0) {
      req.matchedDonors = ["Sarah Jenkins (O-)", "David L. (A-)"];
    }
    if (nextStage === 'Accepted' && req.matchedDonors.length === 0) {
      req.matchedDonors = ["Vikram R. (O+)"];
    }

    BloodLinkStore.saveRequests(reqs);

    // Create notification alert
    const alerts = BloodLinkStore.getAlerts();
    alerts.unshift({
      id: `alt-${Date.now()}`,
      type: nextStage === 'Fulfilled' ? 'update' : 'match',
      title: `Status Update: ${req.id} is now ${nextStage}`,
      message: `The blood coordination request for ${req.patientName} has progressed to ${nextStage}.`,
      targetId: req.id,
      time: "Just now",
      isRead: false,
      urgencyTag: nextStage
    });
    BloodLinkStore.saveAlerts(alerts);
    BloodLinkApp.updateAlertBadges();

    this.renderTracker();
    this.renderHome();
    BloodLinkApp.showToast(`Request ${req.id} status updated to: ${nextStage}`);
  },

  // AI FAQ Assistant Chat Logic
  toggleChatDrawer: function(open = true) {
    const drawer = document.getElementById('chatDrawer');
    if (!drawer) return;
    if (open) {
      drawer.classList.add('open');
      this.renderChatMessages();
      document.getElementById('chatInput').focus();
    } else {
      drawer.classList.remove('open');
    }
  },

  renderChatMessages: function() {
    const container = document.getElementById('chatMessages');
    if (!container) return;
    container.innerHTML = '';

    this.chatMessages.forEach(msg => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${msg.sender}`;
      bubble.innerHTML = `
        <div>${msg.text}</div>
        <div style="font-size:0.65rem; color:var(--text-muted); text-align:${msg.sender === 'user' ? 'right' : 'left'}; margin-top:4px;">${msg.time}</div>
      `;
      container.appendChild(bubble);
    });

    container.scrollTop = container.scrollHeight;
  },

  handleChatSubmit: function() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    // Add user message
    this.chatMessages.push({
      sender: 'user',
      text: text,
      time: "Just now"
    });
    input.value = '';
    this.renderChatMessages();

    // Show simulated typing indicator
    const container = document.getElementById('chatMessages');
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'chat-bubble bot';
    typingIndicator.id = 'typingBubble';
    typingIndicator.innerHTML = `
      <div style="display:flex; align-items:center; gap:6px;">
        <span style="font-size:0.8rem; color:var(--text-secondary);">LinkBot is looking up verified guidelines...</span>
      </div>
    `;
    container.appendChild(typingIndicator);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      if (document.getElementById('typingBubble')) {
        document.getElementById('typingBubble').remove();
      }

      // Keyword match from FAQ Knowledge Base
      const q = text.toLowerCase();
      let matchedFaq = null;

      for (let item of FAQ_KNOWLEDGE_BASE) {
        for (let kw of item.keywords) {
          if (q.includes(kw)) {
            matchedFaq = item;
            break;
          }
        }
        if (matchedFaq) break;
      }

      let reply = "";
      if (matchedFaq) {
        reply = matchedFaq.answer;
      } else {
        reply = "I understand your inquiry. For specific coordination, you can tap 'Request Blood' to place an emergency requisition or use 'Find Donors' to browse local donors. Note: In urgent medical crises, always contact emergency medical services (112 / 108) directly.";
      }

      BloodLinkApp.chatMessages.push({
        sender: 'bot',
        text: reply,
        time: "Just now"
      });
      BloodLinkApp.renderChatMessages();
    }, 700);
  },

  clearChat: function() {
    this.chatMessages = [
      {
        sender: 'bot',
        text: "Conversation cleared. Feel free to ask any question regarding blood donation, requests, or compatibility.",
        time: "Just now"
      }
    ];
    this.renderChatMessages();
  },

  // Modal Handling
  openModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('open');
  },

  closeModal: function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('open');
    if (modalId === 'modalAuth' && this.otpTimerInterval) {
      clearInterval(this.otpTimerInterval);
    }
  },

  openContactDonorModal: function(donorId) {
    const donors = BloodLinkStore.getDonors();
    const donor = donors.find(d => d.id === donorId);
    if (!donor) return;

    document.getElementById('contactDonorName').textContent = donor.displayName;
    document.getElementById('contactDonorBlood').textContent = donor.bloodGroup;
    document.getElementById('contactDonorArea').textContent = `${donor.area}, ${donor.city}`;
    this.openModal('modalContactDonor');
  },

  submitContactDonor: function() {
    this.closeModal('modalContactDonor');
    this.showToast("Coordination alert dispatched to donor. They will receive an in-app ping to accept!");
  },

  openRespondModal: function(reqId) {
    const reqs = BloodLinkStore.getRequests();
    const req = reqs.find(r => r.id === reqId);
    if (!req) return;

    this.activeTrackingId = reqId;
    this.openModal('modalRespondRequest');
    document.getElementById('respondReqTitle').textContent = `Offer Donation for ${req.patientName}`;
    document.getElementById('respondReqDetails').textContent = `${req.bloodGroup} • ${req.hospital}, ${req.city}`;
  },

  confirmDonationResponse: function() {
    this.closeModal('modalRespondRequest');
    this.simulateTrackerStage('Accepted');
    this.showToast("Thank you! You have confirmed your willingness to donate. The hospital coordination desk has been notified.");
  },

  // Admin Portal Rendering
  renderAdmin: function() {
    const reqs = BloodLinkStore.getRequests();
    const donors = BloodLinkStore.getDonors();

    const pendingCount = reqs.filter(r => r.status === 'Open' || r.status === 'Under Review').length;
    const activeDonorsCount = donors.filter(d => d.isAvailable).length;
    const fulfilledCount = reqs.filter(r => r.status === 'Fulfilled').length;

    document.getElementById('adminTotalReqs').textContent = reqs.length;
    document.getElementById('adminPendingReqs').textContent = pendingCount;
    document.getElementById('adminActiveDonors').textContent = activeDonorsCount;
    document.getElementById('adminFulfilledReqs').textContent = fulfilledCount;

    // Populate Admin Table
    const tbody = document.getElementById('adminRequestsTbody');
    if (!tbody) return;
    tbody.innerHTML = '';

    reqs.forEach(r => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight:700;">${r.id}</td>
        <td>${r.patientName}</td>
        <td><span class="blood-badge blood-badge-sm">${r.bloodGroup}</span></td>
        <td>${r.hospital}</td>
        <td><span class="status-pill ${r.urgency.toLowerCase()}">${r.urgency}</span></td>
        <td><span class="status-pill ${r.status.toLowerCase()}">${r.status}</span></td>
        <td>
          <button class="btn-ghost" style="color:var(--text-primary); padding:4px 8px;" onclick="BloodLinkApp.trackSpecificRequest('${r.id}')">Manage</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  // Account Switcher (For testing roles)
  switchDemoAccount: function(accountKey) {
    let newUser = null;
    if (accountKey === 'sarah') {
      newUser = {
        id: "usr-002",
        name: "Sarah Jenkins",
        category: "donor",
        role: "donor",
        bloodGroup: "O-",
        city: "Bengaluru",
        area: "Koramangala",
        phone: "+91 98888 12345",
        email: "sarah.j@example.com",
        isAvailableDonor: true,
        isRegisteredDonor: true,
        donorCardId: "BL-DN-1022",
        totalDonations: 14,
        livesSaved: 42,
        lastDonationDate: "2026-05-12"
      };
    } else if (accountKey === 'arjun') {
      newUser = {
        id: "usr-003",
        name: "Arjun Pillai",
        category: "patient",
        role: "requester",
        bloodGroup: "A+",
        city: "Bengaluru",
        area: "Sarjapur Road",
        phone: "+91 97412 99999",
        email: "arjun.p@example.com",
        isAvailableDonor: false,
        isRegisteredDonor: false,
        donorCardId: "BL-RQ-003",
        totalDonations: 0,
        livesSaved: 0
      };
    } else if (accountKey === 'admin') {
      newUser = {
        id: "usr-admin",
        name: "Dr. A. Mehta (Hospital Coordinator)",
        category: "hospital",
        role: "admin",
        bloodGroup: "All Components",
        city: "Bengaluru",
        area: "Central",
        phone: "+91 80 2222 3333",
        email: "coordinator@stjohns.org",
        licenseNo: "KA-MED-HOSP-4921",
        isAvailableDonor: false,
        isRegisteredDonor: true,
        donorCardId: "BL-HSP-01",
        totalDonations: 6,
        livesSaved: 18
      };
    } else if (accountKey === 'bloodbank') {
      newUser = {
        id: "usr-bb-01",
        name: "Dr. Sunita Rao (Blood Bank Director)",
        category: "bloodbank",
        role: "admin",
        bloodGroup: "All Components",
        city: "Bengaluru",
        area: "MG Road",
        phone: "+91 80 4455 6677",
        email: "coordinator@redcrossblood.org",
        licenseNo: "FDA-BB-KA-2026-88",
        isAvailableDonor: false,
        isRegisteredDonor: false,
        donorCardId: "BL-BNK-9904",
        totalDonations: 0,
        livesSaved: 1200
      };
    } else {
      newUser = CURRENT_USER_DEFAULT;
    }

    BloodLinkStore.saveUser(newUser);
    this.updateUserUI();
    this.closeModal('modalAccountSwitcher');
    const catLabel = (newUser.category || 'User').toUpperCase();
    this.showToast(`Switched account to: ${newUser.name} (${catLabel})`);
    if (newUser.role === 'admin') {
      this.switchView('admin');
    } else {
      this.switchView('home');
    }
  },

  // =========================================================================
  // AUTHENTICATION & 4-CATEGORY REGISTRATION / LOGIN SYSTEM
  // Categories: Donor, Patient, Hospital, Blood Bank
  // =========================================================================

  openAuthModal: function(initialTab = 'login', initialCategory = 'donor') {
    this.openModal('modalAuth');
    this.switchAuthTab(initialTab);
    this.selectAuthCategory(initialCategory);

    // Reset forms
    const regForm = document.getElementById('authRegisterForm');
    if (regForm) regForm.reset();
    const loginForm = document.getElementById('authLoginForm');
    if (loginForm) loginForm.reset();

    // Clear OTP inputs
    for (let i = 1; i <= 4; i++) {
      const box = document.getElementById(`otpD${i}`);
      if (box) box.value = '';
    }
  },

  switchAuthTab: function(tab) {
    this.activeAuthTab = tab;

    const loginBtn = document.getElementById('authTabLoginBtn');
    const regBtn = document.getElementById('authTabRegisterBtn');
    const loginSec = document.getElementById('authLoginSection');
    const regSec = document.getElementById('authRegisterSection');
    const otpSec = document.getElementById('authOtpSection');
    const catLabel = document.getElementById('authCatLabel');

    if (tab === 'login') {
      if (loginBtn) loginBtn.classList.add('active');
      if (regBtn) regBtn.classList.remove('active');
      if (loginSec) loginSec.style.display = 'block';
      if (regSec) regSec.style.display = 'none';
      if (otpSec) otpSec.style.display = 'none';
      if (catLabel) catLabel.textContent = "Select Category / Persona:";
    } else {
      if (regBtn) regBtn.classList.add('active');
      if (loginBtn) loginBtn.classList.remove('active');
      if (loginSec) loginSec.style.display = 'none';
      if (regSec) regSec.style.display = 'block';
      if (otpSec) otpSec.style.display = 'none';
      if (catLabel) catLabel.textContent = "Select Registration Category:";
      // Ensure fields update for the current category
      this.selectAuthCategory(this.activeAuthCategory || 'donor');
    }
  },

  selectAuthCategory: function(category) {
    this.activeAuthCategory = category;

    // Highlight active pill
    document.querySelectorAll('.auth-category-pill').forEach(pill => {
      pill.classList.toggle('selected', pill.dataset.cat === category);
    });

    // Elements to adapt
    const nameLabel = document.getElementById('regNameLabel');
    const nameInput = document.getElementById('regNameInput');
    const cpGroup = document.getElementById('regContactPersonGroup');
    const cpInput = document.getElementById('regContactPersonInput');
    const addressLabel = document.getElementById('regAddressLabel');
    const addressInput = document.getElementById('regAddressInput');
    const bgGroup = document.getElementById('regBloodGroupGroup');
    const bgLabel = document.getElementById('regBloodGroupLabel');
    const licGroup = document.getElementById('regLicenseGroup');
    const licLabel = document.getElementById('regLicenseLabel');
    const licInput = document.getElementById('regLicenseInput');

    if (category === 'donor') {
      if (nameLabel) nameLabel.innerHTML = 'Full Name <span class="req-star">*</span>';
      if (nameInput) nameInput.placeholder = 'e.g. Rahul Sharma';
      if (cpGroup) cpGroup.style.display = 'none';
      if (cpInput) cpInput.removeAttribute('required');
      if (bgGroup) bgGroup.style.display = 'block';
      if (bgLabel) bgLabel.innerHTML = 'Blood Group (Donor) <span class="req-star">*</span>';
      if (addressLabel) addressLabel.innerHTML = 'Residential Address / City & Area <span class="req-star">*</span>';
      if (addressInput) addressInput.placeholder = 'e.g. 14th Main, Indiranagar, Bengaluru';
      if (licGroup) licGroup.style.display = 'none';
      if (licInput) licInput.removeAttribute('required');
    } else if (category === 'patient') {
      if (nameLabel) nameLabel.innerHTML = 'Patient Full Name <span class="req-star">*</span>';
      if (nameInput) nameInput.placeholder = 'e.g. Arjun Pillai';
      if (cpGroup) cpGroup.style.display = 'none';
      if (cpInput) cpInput.removeAttribute('required');
      if (bgGroup) bgGroup.style.display = 'block';
      if (bgLabel) bgLabel.innerHTML = 'Required Blood / Component Group <span class="req-star">*</span>';
      if (addressLabel) addressLabel.innerHTML = 'Hospital / Ward Location or Residence <span class="req-star">*</span>';
      if (addressInput) addressInput.placeholder = 'e.g. Apollo Hospital Ward 4, Bengaluru';
      if (licGroup) licGroup.style.display = 'none';
      if (licInput) licInput.removeAttribute('required');
    } else if (category === 'hospital') {
      if (nameLabel) nameLabel.innerHTML = 'Hospital / Healthcare Facility Name <span class="req-star">*</span>';
      if (nameInput) nameInput.placeholder = "e.g. St. John's Medical College Hospital";
      if (cpGroup) cpGroup.style.display = 'block';
      if (cpInput) cpInput.setAttribute('required', 'required');
      if (bgGroup) bgGroup.style.display = 'none';
      if (addressLabel) addressLabel.innerHTML = 'Hospital Campus Address & City <span class="req-star">*</span>';
      if (addressInput) addressInput.placeholder = 'e.g. 100 Ft Rd, Koramangala, Bengaluru';
      if (licGroup) licGroup.style.display = 'block';
      if (licLabel) licLabel.innerHTML = 'Hospital Registration / NABH License ID <span class="req-star">*</span>';
      if (licInput) {
        licInput.placeholder = 'e.g. KA-MED-HOSP-4921';
        licInput.setAttribute('required', 'required');
      }
    } else if (category === 'bloodbank') {
      if (nameLabel) nameLabel.innerHTML = 'Blood Bank / Center Name <span class="req-star">*</span>';
      if (nameInput) nameInput.placeholder = 'e.g. Red Cross Central Blood Bank';
      if (cpGroup) cpGroup.style.display = 'block';
      if (cpInput) cpInput.setAttribute('required', 'required');
      if (bgGroup) bgGroup.style.display = 'none';
      if (addressLabel) addressLabel.innerHTML = 'Blood Center Full Address & City <span class="req-star">*</span>';
      if (addressInput) addressInput.placeholder = 'e.g. MG Road, Central Zone, Bengaluru';
      if (licGroup) licGroup.style.display = 'block';
      if (licLabel) licLabel.innerHTML = 'Drug Controller / State Blood Transfusion License ID <span class="req-star">*</span>';
      if (licInput) {
        licInput.placeholder = 'e.g. FDA-BB-KA-2026-88';
        licInput.setAttribute('required', 'required');
      }
    }
  },

  togglePasswordVisibility: function(inputId, btnEl) {
    const input = document.getElementById(inputId);
    if (!input) return;

    if (input.type === 'password') {
      input.type = 'text';
      if (btnEl) {
        btnEl.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`;
      }
    } else {
      input.type = 'password';
      if (btnEl) {
        btnEl.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
      }
    }
  },

  handleRegistrationSubmit: function(e) {
    e.preventDefault();

    const category = this.activeAuthCategory || 'donor';
    const name = (document.getElementById('regNameInput').value || '').trim();
    const phone = (document.getElementById('regPhoneInput').value || '').trim();
    const email = (document.getElementById('regEmailInput').value || '').trim();
    const address = (document.getElementById('regAddressInput').value || '').trim();
    const password = document.getElementById('regPasswordInput').value;

    let contactPerson = '';
    if (category === 'hospital' || category === 'bloodbank') {
      const cpEl = document.getElementById('regContactPersonInput');
      contactPerson = cpEl ? cpEl.value.trim() : '';
    }

    let bloodGroup = 'O+';
    if (category === 'donor' || category === 'patient') {
      const bgEl = document.getElementById('regBloodGroupSelect');
      bloodGroup = bgEl ? bgEl.value : 'O+';
    } else {
      bloodGroup = 'All Components';
    }

    let licenseId = '';
    if (category === 'hospital' || category === 'bloodbank') {
      const licEl = document.getElementById('regLicenseInput');
      licenseId = licEl ? licEl.value.trim() : '';
    }

    // Validation
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      this.showToast("Please enter a valid 10-digit mobile number.", true);
      return;
    }

    if (password.length < 6) {
      this.showToast("Password must be at least 6 characters.", true);
      return;
    }

    // Check duplicate account
    const accounts = BloodLinkStore.getAccounts();
    const exists = accounts.find(acc => {
      const accPhoneClean = (acc.phone || '').replace(/\D/g, '');
      return (acc.email && acc.email.toLowerCase() === email.toLowerCase()) ||
             (accPhoneClean && accPhoneClean.endsWith(cleanPhone.slice(-10)));
    });

    if (exists) {
      this.showToast(`An account with this phone or email already exists (${exists.name}). Please Log In.`, true);
      this.switchAuthTab('login');
      const idInput = document.getElementById('loginIdentifierInput');
      if (idInput) idInput.value = email || cleanPhone;
      return;
    }

    // Save pending registration payload
    this.pendingRegistrationData = {
      category,
      name,
      contactPerson,
      phone: cleanPhone,
      email,
      address,
      bloodGroup,
      licenseId,
      password
    };

    // Generate 4-digit OTP
    this.generatedOtp = String(Math.floor(1000 + Math.random() * 9000));

    // Update simulated SMS display
    const simOtpEl = document.getElementById('simulatedOtpDisplay');
    if (simOtpEl) simOtpEl.textContent = this.generatedOtp;

    const targetPhoneEl = document.getElementById('otpTargetPhone');
    if (targetPhoneEl) targetPhoneEl.textContent = `+91 ${cleanPhone.slice(-10)}`;

    // Auto-fill OTP boxes for effortless user testing
    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`otpD${i + 1}`);
      if (box) box.value = this.generatedOtp[i];
    }

    // Switch view to OTP verification
    document.getElementById('authRegisterSection').style.display = 'none';
    document.getElementById('authOtpSection').style.display = 'block';

    // Start 30s timer
    this.startOtpTimer();
    this.showToast(`Verification code sent via SMS to +91 ${cleanPhone.slice(-10)}`);
  },

  startOtpTimer: function() {
    if (this.otpTimerInterval) clearInterval(this.otpTimerInterval);
    this.otpSecondsLeft = 30;

    const timerSpan = document.getElementById('otpTimerSpan');
    const resendBtn = document.getElementById('otpResendBtn');
    if (resendBtn) {
      resendBtn.style.opacity = '0.5';
      resendBtn.style.pointerEvents = 'none';
    }

    if (timerSpan) timerSpan.textContent = `(0:30)`;

    this.otpTimerInterval = setInterval(() => {
      this.otpSecondsLeft--;
      if (timerSpan) {
        timerSpan.textContent = `(0:${this.otpSecondsLeft.toString().padStart(2, '0')})`;
      }

      if (this.otpSecondsLeft <= 0) {
        clearInterval(this.otpTimerInterval);
        if (resendBtn) {
          resendBtn.style.opacity = '1';
          resendBtn.style.pointerEvents = 'auto';
        }
        if (timerSpan) timerSpan.textContent = `(Code expired - Resend available)`;
      }
    }, 1000);
  },

  resendOtp: function() {
    if (!this.pendingRegistrationData) {
      this.showToast("Please complete the registration fields first.", true);
      this.backToRegisterFields();
      return;
    }

    this.generatedOtp = String(Math.floor(1000 + Math.random() * 9000));
    const simOtpEl = document.getElementById('simulatedOtpDisplay');
    if (simOtpEl) simOtpEl.textContent = this.generatedOtp;

    for (let i = 0; i < 4; i++) {
      const box = document.getElementById(`otpD${i + 1}`);
      if (box) box.value = this.generatedOtp[i];
    }

    this.startOtpTimer();
    this.showToast(`Fresh OTP dispatched: ${this.generatedOtp}`);
  },

  backToRegisterFields: function() {
    if (this.otpTimerInterval) clearInterval(this.otpTimerInterval);
    document.getElementById('authOtpSection').style.display = 'none';
    document.getElementById('authRegisterSection').style.display = 'block';
  },

  setupOtpInputListeners: function() {
    const digitIds = ['otpD1', 'otpD2', 'otpD3', 'otpD4'];
    digitIds.forEach((id, idx) => {
      const el = document.getElementById(id);
      if (!el) return;

      el.addEventListener('input', (e) => {
        const val = e.target.value.replace(/\D/g, '');
        e.target.value = val ? val.charAt(0) : '';
        if (val && idx < digitIds.length - 1) {
          const next = document.getElementById(digitIds[idx + 1]);
          if (next) next.focus();
        }
      });

      el.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !el.value && idx > 0) {
          const prev = document.getElementById(digitIds[idx - 1]);
          if (prev) {
            prev.focus();
            prev.value = '';
          }
        } else if (e.key === 'Enter') {
          BloodLinkApp.verifyOtpAndRegister();
        }
      });

      el.addEventListener('paste', (e) => {
        e.preventDefault();
        const paste = (e.clipboardData || window.clipboardData).getData('text').replace(/\D/g, '');
        if (paste) {
          for (let i = 0; i < 4; i++) {
            const target = document.getElementById(digitIds[i]);
            if (target && paste[i]) {
              target.value = paste[i];
            }
          }
          const last = document.getElementById('otpD4');
          if (last) last.focus();
        }
      });
    });
  },

  verifyOtpAndRegister: function() {
    if (!this.pendingRegistrationData) {
      this.showToast("Registration session expired. Please re-enter your details.", true);
      this.backToRegisterFields();
      return;
    }

    const d1 = (document.getElementById('otpD1').value || '').trim();
    const d2 = (document.getElementById('otpD2').value || '').trim();
    const d3 = (document.getElementById('otpD3').value || '').trim();
    const d4 = (document.getElementById('otpD4').value || '').trim();
    const enteredOtp = `${d1}${d2}${d3}${d4}`;

    if (enteredOtp.length !== 4) {
      this.showToast("Please enter the complete 4-digit verification code.", true);
      return;
    }

    if (enteredOtp !== this.generatedOtp) {
      this.showToast("Incorrect OTP. Please enter the code shown in the SMS banner.", true);
      return;
    }

    // Stop timer
    if (this.otpTimerInterval) clearInterval(this.otpTimerInterval);

    const p = this.pendingRegistrationData;
    const catPrefixes = { donor: 'DN', patient: 'PT', hospital: 'HSP', bloodbank: 'BB' };
    const prefix = catPrefixes[p.category] || 'USR';

    const newAccount = {
      id: `usr-${Date.now().toString().slice(-6)}`,
      name: p.name,
      category: p.category,
      role: p.category === 'hospital' || p.category === 'bloodbank' ? 'admin' : (p.category === 'patient' ? 'requester' : 'donor'),
      contactPerson: p.contactPerson || '',
      phone: `+91 ${p.phone.slice(-10)}`,
      email: p.email,
      address: p.address,
      area: p.address.split(',')[0].trim(),
      city: p.address.split(',')[1] ? p.address.split(',')[1].trim() : 'Bengaluru',
      bloodGroup: p.bloodGroup,
      licenseNo: p.licenseId || '',
      password: p.password,
      isAvailableDonor: p.category === 'donor',
      isRegisteredDonor: p.category === 'donor',
      donorCardId: `BL-${prefix}-${Math.floor(1000 + Math.random() * 9000)}`,
      totalDonations: 0,
      livesSaved: 0,
      registeredAt: new Date().toISOString()
    };

    // Save account to store
    const accounts = BloodLinkStore.getAccounts();
    accounts.push(newAccount);
    BloodLinkStore.saveAccounts(accounts);

    // If Donor, add to live searchable directory
    if (p.category === 'donor') {
      const donors = BloodLinkStore.getDonors();
      donors.unshift({
        id: `dn-reg-${Date.now().toString().slice(-4)}`,
        displayName: newAccount.name,
        bloodGroup: newAccount.bloodGroup,
        area: newAccount.area,
        city: newAccount.city,
        distanceKm: 0.8,
        lastActive: "Just now",
        donationsCount: 0,
        isAvailable: true,
        verificationBadge: true,
        phone: newAccount.phone
      });
      BloodLinkStore.saveDonors(donors);
    }

    // Log the user in
    BloodLinkStore.saveUser(newAccount);
    this.updateUserUI();
    this.renderDonors();
    this.renderAlerts();
    this.closeModal('modalAuth');

    const catDisplayNames = {
      donor: 'Donor',
      patient: 'Patient',
      hospital: 'Hospital Desk',
      bloodbank: 'Blood Bank'
    };
    const catLabel = catDisplayNames[p.category] || p.category;
    this.showToast(`Account registered and verified! Welcome, ${newAccount.name} (${catLabel}).`);

    // Route to appropriate view
    if (p.category === 'hospital' || p.category === 'bloodbank') {
      this.switchView('admin');
    } else if (p.category === 'patient') {
      this.switchView('request');
    } else {
      this.switchView('profile');
    }

    this.pendingRegistrationData = null;
    this.generatedOtp = null;
  },

  handleLoginSubmit: function(e) {
    e.preventDefault();

    const identifier = (document.getElementById('loginIdentifierInput').value || '').trim();
    const password = document.getElementById('loginPasswordInput').value;

    if (!identifier || !password) {
      this.showToast("Please enter both your mobile/email and password.", true);
      return;
    }

    const cleanId = identifier.toLowerCase();
    const cleanPhoneId = identifier.replace(/\D/g, '');
    const accounts = BloodLinkStore.getAccounts();

    const matched = accounts.find(acc => {
      const accEmail = (acc.email || '').toLowerCase();
      const accPhoneClean = (acc.phone || '').replace(/\D/g, '');
      const idMatches = (accEmail === cleanId) ||
                        (cleanPhoneId.length >= 6 && accPhoneClean.endsWith(cleanPhoneId.slice(-10)));
      return idMatches && acc.password === password;
    });

    if (matched) {
      BloodLinkStore.saveUser(matched);
      this.updateUserUI();
      this.closeModal('modalAuth');

      const catDisplayNames = {
        donor: 'Donor',
        patient: 'Patient',
        hospital: 'Hospital Desk',
        bloodbank: 'Blood Bank'
      };
      const catLabel = catDisplayNames[matched.category] || matched.category || 'User';
      this.showToast(`Welcome back, ${matched.name}! Signed in as ${catLabel}.`);

      if (matched.category === 'hospital' || matched.category === 'bloodbank' || matched.role === 'admin') {
        this.switchView('admin');
      } else if (matched.category === 'patient') {
        this.switchView('request');
      } else {
        this.switchView('home');
      }
    } else {
      this.showToast("Invalid credentials. Try instant demo buttons below or check mobile/password.", true);
    }
  },

  quickDemoLogin: function(category) {
    const accounts = BloodLinkStore.getAccounts();
    let account = accounts.find(a => a.category === category);

    if (!account && typeof INITIAL_ACCOUNTS !== 'undefined') {
      account = INITIAL_ACCOUNTS.find(a => a.category === category);
    }

    if (account) {
      BloodLinkStore.saveUser(account);
      this.updateUserUI();
      this.closeModal('modalAuth');

      const catDisplayNames = {
        donor: 'Donor',
        patient: 'Patient',
        hospital: 'Hospital',
        bloodbank: 'Blood Bank'
      };
      const catName = catDisplayNames[category] || category;
      this.showToast(`Switched account to: ${account.name} (${catName})`);

      if (category === 'hospital' || category === 'bloodbank') {
        this.switchView('admin');
      } else if (category === 'patient') {
        this.switchView('request');
      } else {
        this.switchView('home');
      }
    } else {
      this.showToast(`Demo profile for ${category} not found.`, true);
    }
  },

  handleForgotPassword: function() {
    const id = (document.getElementById('loginIdentifierInput').value || '').trim() || 'your contact';
    this.showToast(`Password reset link and temporary login OTP sent to ${id}.`);
  },

  handleLogout: function() {
    BloodLinkStore.saveUser(CURRENT_USER_DEFAULT);
    this.updateUserUI();
    this.showToast("Signed out. Switched to guest default demo.");
    this.switchView('home');
  },

  // Toast notification
  showToast: function(message, isError = false) {
    const existing = document.getElementById('appToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'appToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 84px;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: ${isError ? '#DC2626' : '#121212'};
      color: #FFFFFF;
      padding: 12px 20px;
      border-radius: var(--radius-full);
      border: 1px solid ${isError ? '#EF4444' : 'rgba(229, 9, 20, 0.5)'};
      box-shadow: 0 8px 28px rgba(0,0,0,0.9), 0 0 16px rgba(229, 9, 20, 0.25);
      font-size: 0.88rem;
      font-weight: 600;
      z-index: 300;
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      align-items: center;
      gap: 10px;
    `;
    toast.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        ${isError ? '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>' : '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'}
      </svg>
      <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

// Auto start when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  BloodLinkApp.init();
});
