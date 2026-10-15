/**
 * BLOOD LINK - Core Mock Data & Persistence Layer
 * Provides realistic healthcare coordination data, blood group compatibility rules,
 * pre-seeded emergency requests, verified donors, notification alerts, and FAQ knowledge base.
 */

const INITIAL_DONORS = [
  {
    id: "dn-101",
    displayName: "Vikram R.",
    bloodGroup: "O+",
    city: "Bengaluru",
    area: "Indiranagar",
    distanceKm: 2.4,
    isAvailable: true,
    verified: true,
    donationsCount: 8,
    lastDonated: "4 months ago",
    badges: ["Regular Donor", "Emergency Hero"],
    contactConsent: true
  },
  {
    id: "dn-102",
    displayName: "Sarah Jenkins",
    bloodGroup: "O-",
    city: "Bengaluru",
    area: "Koramangala",
    distanceKm: 4.1,
    isAvailable: true,
    verified: true,
    donationsCount: 14,
    lastDonated: "5 months ago",
    badges: ["Universal Lifesaver", "10+ Donations"],
    contactConsent: true
  },
  {
    id: "dn-103",
    displayName: "Ananya M.",
    bloodGroup: "A+",
    city: "Bengaluru",
    area: "Whitefield",
    distanceKm: 6.8,
    isAvailable: true,
    verified: true,
    donationsCount: 5,
    lastDonated: "3 months ago",
    badges: ["Verified Donor"],
    contactConsent: true
  },
  {
    id: "dn-104",
    displayName: "Kavita S.",
    bloodGroup: "B+",
    city: "Bengaluru",
    area: "Jayanagar",
    distanceKm: 3.2,
    isAvailable: false,
    cooldownUntil: "Nov 2026",
    verified: true,
    donationsCount: 6,
    lastDonated: "1 month ago",
    badges: ["Resting - Cooldown"],
    contactConsent: true
  },
  {
    id: "dn-105",
    displayName: "Farhan K.",
    bloodGroup: "AB+",
    city: "Bengaluru",
    area: "HSR Layout",
    distanceKm: 5.0,
    isAvailable: true,
    verified: false,
    donationsCount: 2,
    lastDonated: "6 months ago",
    badges: ["Plasma Donor"],
    contactConsent: true
  },
  {
    id: "dn-106",
    displayName: "David L.",
    bloodGroup: "A-",
    city: "Bengaluru",
    area: "MG Road",
    distanceKm: 1.8,
    isAvailable: true,
    verified: true,
    donationsCount: 11,
    lastDonated: "4 months ago",
    badges: ["Rare Group Champion"],
    contactConsent: true
  },
  {
    id: "dn-107",
    displayName: "Priya N.",
    bloodGroup: "B-",
    city: "Bengaluru",
    area: "Malleshwaram",
    distanceKm: 5.7,
    isAvailable: true,
    verified: true,
    donationsCount: 9,
    lastDonated: "3 months ago",
    badges: ["Emergency Hero", "Rare Group"],
    contactConsent: true
  },
  {
    id: "dn-108",
    displayName: "Rohit V.",
    bloodGroup: "AB-",
    city: "Bengaluru",
    area: "Electronic City",
    distanceKm: 9.2,
    isAvailable: true,
    verified: true,
    donationsCount: 7,
    lastDonated: "5 months ago",
    badges: ["Ultra-Rare Hero"],
    contactConsent: true
  },
  {
    id: "dn-109",
    displayName: "Meera K.",
    bloodGroup: "O+",
    city: "Mumbai",
    area: "Andheri West",
    distanceKm: 3.5,
    isAvailable: true,
    verified: true,
    donationsCount: 4,
    lastDonated: "4 months ago",
    badges: ["Regular Donor"],
    contactConsent: true
  },
  {
    id: "dn-110",
    displayName: "Arjun S.",
    bloodGroup: "B+",
    city: "Delhi",
    area: "Connaught Place",
    distanceKm: 4.8,
    isAvailable: true,
    verified: true,
    donationsCount: 6,
    lastDonated: "3 months ago",
    badges: ["Verified Donor"],
    contactConsent: true
  }
];

const INITIAL_REQUESTS = [
  {
    id: "BL-REQ-8492",
    patientName: "Deepak Verma",
    bloodGroup: "O-",
    units: 2,
    hospital: "Manipal Hospital",
    city: "Bengaluru",
    location: "HAL Airport Road, Bengaluru",
    urgency: "Critical", // Critical (<2h), Urgent (<12h), Standard (24-48h)
    requiredDate: "Today, ASAP",
    contactName: "Sunita Verma (Spouse)",
    contactPhone: "+91 98450 XXXXX",
    status: "Matched", // Open, Under Review, Matched, Accepted, Fulfilled, Cancelled
    createdAt: "2026-10-14T21:30:00Z",
    hasHospitalDoc: true,
    docName: "Admit_Card_Manipal_ICU.pdf",
    notes: "Emergency cardiac bypass procedure. Verified by ICU Coordinator.",
    timeline: [
      { status: "Open", time: "2026-10-14 21:30", note: "Emergency request submitted by family." },
      { status: "Under Review", time: "2026-10-14 21:38", note: "Hospital desk verified patient admission." },
      { status: "Matched", time: "2026-10-14 21:45", note: "2 compatible O- donors in 5km radius notified." }
    ],
    matchedDonors: ["Sarah Jenkins (O-)", "David L. (A-)"]
  },
  {
    id: "BL-REQ-7104",
    patientName: "Aarav Pillai (Child - 6y)",
    bloodGroup: "A+",
    units: 1,
    hospital: "St. John's Medical College",
    city: "Bengaluru",
    location: "Sarjapur Road, Bengaluru",
    urgency: "Urgent",
    requiredDate: "Today by 6:00 PM",
    contactName: "Karthik Pillai (Father)",
    contactPhone: "+91 97412 XXXXX",
    status: "Accepted",
    createdAt: "2026-10-14T18:15:00Z",
    hasHospitalDoc: true,
    docName: "Pediatric_Emergency_Slip.pdf",
    notes: "Platelet support for dengue recovery.",
    timeline: [
      { status: "Open", time: "2026-10-14 18:15", note: "Request submitted." },
      { status: "Under Review", time: "2026-10-14 18:22", note: "Verified with Pediatric Ward." },
      { status: "Matched", time: "2026-10-14 18:30", note: "Matched with donor Ananya M." },
      { status: "Accepted", time: "2026-10-14 18:42", note: "Donor Ananya M. confirmed transit to blood bank." }
    ],
    matchedDonors: ["Ananya M. (A+)"]
  },
  {
    id: "BL-REQ-6310",
    patientName: "Meenakshi Sundaram",
    bloodGroup: "B+",
    units: 3,
    hospital: "Apollo Hospital",
    city: "Bengaluru",
    location: "Bannerghatta Road, Bengaluru",
    urgency: "Standard",
    requiredDate: "Tomorrow, 10:00 AM",
    contactName: "Girish S. (Son)",
    contactPhone: "+91 99001 XXXXX",
    status: "Open",
    createdAt: "2026-10-14T22:00:00Z",
    hasHospitalDoc: true,
    docName: "Elective_Surgery_Schedule.pdf",
    notes: "Scheduled hip replacement surgery reserves.",
    timeline: [
      { status: "Open", time: "2026-10-14 22:00", note: "Advance request placed for tomorrow." }
    ],
    matchedDonors: []
  },
  {
    id: "BL-REQ-5190",
    patientName: "Rajesh Khanna",
    bloodGroup: "AB-",
    units: 1,
    hospital: "Fortis Hospital",
    city: "Bengaluru",
    location: "Cunningham Road, Bengaluru",
    urgency: "Critical",
    requiredDate: "Immediate",
    contactName: "Anita Khanna",
    contactPhone: "+91 96113 XXXXX",
    status: "Fulfilled",
    createdAt: "2026-10-13T14:00:00Z",
    hasHospitalDoc: true,
    docName: "Trauma_Discharge_Auth.pdf",
    notes: "Trauma ward transfusion completed successfully.",
    timeline: [
      { status: "Open", time: "2026-10-13 14:00", note: "Trauma case logged." },
      { status: "Under Review", time: "2026-10-13 14:05", note: "ER staff prioritized request." },
      { status: "Matched", time: "2026-10-13 14:15", note: "Matched with Rohit V." },
      { status: "Accepted", time: "2026-10-13 14:25", note: "Donor checked into Fortis Blood Center." },
      { status: "Fulfilled", time: "2026-10-13 15:40", note: "Transfusion completed. Blood bank closed case." }
    ],
    matchedDonors: ["Rohit V. (AB-)"]
  }
];

const INITIAL_ALERTS = [
  {
    id: "alt-01",
    type: "urgent", // urgent, match, update, system
    title: "Critical O- Blood Alert Nearby",
    message: "Manipal Hospital, HAL Airport Rd urgently requires 2 units of O- blood for emergency surgery.",
    targetId: "BL-REQ-8492",
    time: "15 mins ago",
    isRead: false,
    urgencyTag: "Critical"
  },
  {
    id: "alt-02",
    type: "match",
    title: "Donor Accepted Your Request",
    message: "Ananya M. has confirmed transit to St. John's Hospital for Request BL-REQ-7104 (A+).",
    targetId: "BL-REQ-7104",
    time: "1 hour ago",
    isRead: false,
    urgencyTag: "Active Match"
  },
  {
    id: "alt-03",
    type: "update",
    title: "Status Update: BL-REQ-5190 Fulfilled",
    message: "The blood transfusion for Rajesh Khanna was successfully completed. Thank you to our donors!",
    targetId: "BL-REQ-5190",
    time: "Yesterday",
    isRead: true,
    urgencyTag: "Resolved"
  },
  {
    id: "alt-04",
    type: "system",
    title: "Blood Link Privacy & Safety Notice",
    message: "Remember: Blood Link coordinates willing donors. All clinical testing & safety screening occurs directly at authorized hospital blood banks.",
    targetId: null,
    time: "2 days ago",
    isRead: true,
    urgencyTag: "Notice"
  }
];

const CURRENT_USER_DEFAULT = {
  id: "usr-001",
  name: "Rahul Sharma",
  category: "donor",
  role: "donor", // requester, donor, admin
  bloodGroup: "O+",
  city: "Bengaluru",
  area: "Indiranagar",
  phone: "+91 98765 43210",
  email: "rahul.sharma@example.com",
  isAvailableDonor: true,
  isRegisteredDonor: true,
  donorCardId: "BL-DN-8491",
  totalDonations: 3,
  livesSaved: 9,
  lastDonationDate: "2026-06-18",
  notifications: {
    urgentPushes: true,
    smsAlerts: true,
    weeklyUpdates: false
  },
  privacy: {
    maskPhoneNumber: true,
    allowRadiusSearch: true,
    anonymizeUntilAccepted: true
  }
};

const FAQ_KNOWLEDGE_BASE = [
  {
    keywords: ["request", "how to request", "need blood", "emergency", "patient", "form"],
    question: "How do I request blood through Blood Link?",
    answer: "Tap the 'Request' tab in the navigation bar or the 'Request Blood' button on your Home dashboard. Fill in the patient details, required blood group, units, hospital name, and urgency level. If possible, attach an admission slip to speed up hospital desk verification. Once submitted, matching donors in your area will receive instant alerts."
  },
  {
    keywords: ["donor", "register", "become donor", "sign up", "eligibility", "who can donate"],
    question: "Who can register as a donor?",
    answer: "Healthy individuals aged 18 to 65, weighing over 45 kg, with no recent tattoos/piercings (last 6 months) or active infections can register. Note that Blood Link facilitates coordination; clinical blood eligibility and testing are conducted strictly by authorized medical staff at the donation center."
  },
  {
    keywords: ["compatibility", "group", "match", "universal", "o-", "ab+"],
    question: "Which blood groups can donate to each other?",
    answer: "O- is the Universal Red Blood Cell Donor (can give to all groups). AB+ is the Universal Recipient (can receive from all groups). For example: O+ can give to O+, A+, B+, AB+; A+ can give to A+ and AB+; B+ can give to B+ and AB+."
  },
  {
    keywords: ["track", "status", "timeline", "reference", "bl-req"],
    question: "How do I track my blood request?",
    answer: "Every request is assigned a unique Reference Code (e.g., BL-REQ-8492). Tap 'Track Requests' on the Home screen or go to Profile > My Requests. You will see a real-time 6-stage lifecycle: Open → Under Review → Matched → Accepted → Fulfilled (or Cancelled)."
  },
  {
    keywords: ["privacy", "phone", "contact", "number", "safe", "security"],
    question: "Is my personal phone number displayed publicly?",
    answer: "No. Blood Link uses a Privacy-First model. Donor and requester phone numbers are masked. Initial coordination happens through in-app alerts and secure response tokens. Contact details are only unlocked after explicit mutual consent and hospital check-in."
  },
  {
    keywords: ["emergency", "critical", "ambulance", "call", "urgent"],
    question: "Is Blood Link a replacement for emergency hospital services?",
    answer: "NO. In acute medical crises or extreme hemorrhaging, immediately call national emergency services (112 / 108) and coordinate directly with your hospital's emergency blood bank. Blood Link acts as a voluntary donor mobilization network, not an emergency blood store."
  },
  {
    keywords: ["admin", "hospital", "verification", "document"],
    question: "How does hospital document verification work?",
    answer: "Hospital coordinators and authorized staff access our Admin Verification Queue. They verify requisition forms, admission cards, and blood units required before matching notifications are dispatched, ensuring zero fraudulent or duplicate requests."
  }
];

// Blood Compatibility Matrix
const BLOOD_COMPATIBILITY = {
  "O-": ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"], // Can donate to all
  "O+": ["O+", "A+", "B+", "AB+"],
  "A-": ["A-", "A+", "AB-", "AB+"],
  "A+": ["A+", "AB+"],
  "B-": ["B-", "B+", "AB-", "AB+"],
  "B+": ["B+", "AB+"],
  "AB-": ["AB-", "AB+"],
  "AB+": ["AB+"] // Recipient only gives to AB+
};

const INITIAL_ACCOUNTS = [
  {
    id: "usr-donor-01",
    category: "donor",
    name: "Sarah Jenkins",
    phone: "9888812345",
    email: "sarah.j@example.com",
    address: "8th Block, Koramangala, Bengaluru, Karnataka",
    city: "Bengaluru",
    bloodGroup: "O-",
    password: "password123",
    isAvailableDonor: true,
    isRegisteredDonor: true,
    donorCardId: "BL-DN-1022",
    totalDonations: 14,
    livesSaved: 42,
    roleTitle: "Universal Lifesaver (O-)"
  },
  {
    id: "usr-patient-01",
    category: "patient",
    name: "Arjun Pillai",
    phone: "9741299999",
    email: "arjun.p@example.com",
    address: "Sarjapur Road, Bengaluru, Karnataka",
    city: "Bengaluru",
    bloodGroup: "A+",
    hospitalAffiliation: "St. John's Medical College",
    password: "password123",
    isAvailableDonor: false,
    isRegisteredDonor: false,
    donorCardId: "BL-PT-3012",
    totalDonations: 0,
    livesSaved: 0,
    roleTitle: "Patient Attendant (Needs A+)"
  },
  {
    id: "usr-hospital-01",
    category: "hospital",
    name: "St. John's Medical College Hospital",
    contactPerson: "Dr. A. Mehta (ICU In-Charge)",
    phone: "8022223333",
    email: "emergency@stjohns.org",
    address: "100 Ft Rd, John Nagar, Koramangala, Bengaluru",
    city: "Bengaluru",
    licenseNo: "KA-MED-HOSP-4921",
    bloodGroup: "All",
    password: "password123",
    isAvailableDonor: false,
    isRegisteredDonor: false,
    donorCardId: "BL-HSP-7701",
    totalDonations: 0,
    livesSaved: 120,
    roleTitle: "Certified Healthcare Facility"
  },
  {
    id: "usr-bloodbank-01",
    category: "bloodbank",
    name: "Red Cross Central Blood Bank",
    contactPerson: "Dr. Sunita Rao (Director)",
    phone: "8044556677",
    email: "coordinator@redcrossblood.org",
    address: "MG Road, Central Zone, Bengaluru",
    city: "Bengaluru",
    licenseNo: "FDA-BB-KA-2026-88",
    bloodGroup: "All",
    password: "password123",
    isAvailableDonor: false,
    isRegisteredDonor: false,
    donorCardId: "BL-BNK-9904",
    totalDonations: 0,
    livesSaved: 350,
    roleTitle: "Authorized Blood & Component Center"
  }
];

// Storage helper
const BloodLinkStore = {
  getDonors: function() {
    const data = localStorage.getItem("bl_donors");
    return data ? JSON.parse(data) : INITIAL_DONORS;
  },
  saveDonors: function(donors) {
    localStorage.setItem("bl_donors", JSON.stringify(donors));
  },
  getRequests: function() {
    const data = localStorage.getItem("bl_requests");
    return data ? JSON.parse(data) : INITIAL_REQUESTS;
  },
  saveRequests: function(reqs) {
    localStorage.setItem("bl_requests", JSON.stringify(reqs));
  },
  getAlerts: function() {
    const data = localStorage.getItem("bl_alerts");
    return data ? JSON.parse(data) : INITIAL_ALERTS;
  },
  saveAlerts: function(alerts) {
    localStorage.setItem("bl_alerts", JSON.stringify(alerts));
  },
  getAccounts: function() {
    const data = localStorage.getItem("bl_registered_accounts");
    return data ? JSON.parse(data) : INITIAL_ACCOUNTS;
  },
  saveAccounts: function(accounts) {
    localStorage.setItem("bl_registered_accounts", JSON.stringify(accounts));
  },
  getUser: function() {
    const data = localStorage.getItem("bl_user");
    return data ? JSON.parse(data) : CURRENT_USER_DEFAULT;
  },
  saveUser: function(user) {
    localStorage.setItem("bl_user", JSON.stringify(user));
  },
  resetData: function() {
    localStorage.removeItem("bl_donors");
    localStorage.removeItem("bl_requests");
    localStorage.removeItem("bl_alerts");
    localStorage.removeItem("bl_user");
    localStorage.removeItem("bl_chat_history");
    localStorage.removeItem("bl_registered_accounts");
  }
};
