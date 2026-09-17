/**
 * FixMyArea - Shared Mock Dataset & Helpers
 * Pure in-memory mock dataset inspired by civic issue reporting.
 * NO localStorage, NO backend, NO external APIs.
 */

export const categories = [
  {
    id: "road-potholes",
    name: "Road & Potholes",
    description: "Damaged roads, potholes, surface cracking, and road cave-ins.",
    count: 4,
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`
  },
  {
    id: "streetlights",
    name: "Streetlights",
    description: "Non-functional lights, broken poles, flickering, or hazardous exposed wiring.",
    count: 3,
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>`
  },
  {
    id: "waste-management",
    name: "Waste Management",
    description: "Overflowing dumpsters, uncollected garbage, illegal dumping, and littering.",
    count: 3,
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`
  },
  {
    id: "water-drainage",
    name: "Water & Drainage",
    description: "Clogged stormwater drains, water pipe leakages, sewage overflow, and waterlogging.",
    count: 3,
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>`
  },
  {
    id: "public-spaces",
    name: "Public Spaces",
    description: "Vandalism in public parks, damaged sidewalks, broken benches, and fallen branches.",
    count: 2,
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`
  },
  {
    id: "other-issues",
    name: "Other Issues",
    description: "General civic concerns, noise issues, stray animal management, and signboards.",
    count: 1,
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
  }
];

export const issues = [
  {
    id: "ISSUE-001",
    title: "Large pothole near the central junction",
    category: "Road & Potholes",
    area: "Sample Nagar",
    landmark: "Opposite Community Bus Stop",
    description: "A large, deep pothole has formed near the junction after heavy rains, forcing two-wheelers into oncoming traffic lane.",
    status: "Reported",
    urgency: "High",
    dateReported: "2026-09-10",
    lastUpdated: "2026-09-10",
    progress: [
      { label: "Report submitted", date: "2026-09-10", completed: true },
      { label: "Under review", date: null, completed: false },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-002",
    title: "Twin streetlights not working on 4th Main",
    category: "Streetlights",
    area: "Greenwood Valley",
    landmark: "Near Block B Children's Park",
    description: "Both pole streetlights have been completely dark for four consecutive days, causing severe visibility concerns for evening pedestrians.",
    status: "In Progress",
    urgency: "Medium",
    dateReported: "2026-09-08",
    lastUpdated: "2026-09-12",
    progress: [
      { label: "Report submitted", date: "2026-09-08", completed: true },
      { label: "Under review", date: "2026-09-09", completed: true },
      { label: "Action in progress", date: "2026-09-12", completed: true },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-003",
    title: "Overflowing garbage dump near vegetable market",
    category: "Waste Management",
    area: "Market Square",
    landmark: "Behind Fruit Merchants Lane",
    description: "Commercial bin has overflowed onto the sidewalk and road, attracting stray animals and blocking safe foot traffic.",
    status: "Under Review",
    urgency: "High",
    dateReported: "2026-09-12",
    lastUpdated: "2026-09-13",
    progress: [
      { label: "Report submitted", date: "2026-09-12", completed: true },
      { label: "Under review", date: "2026-09-13", completed: true },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-004",
    title: "Clean drinking water pipe leakage",
    category: "Water & Drainage",
    area: "Sunrise Layout",
    landmark: "Adjacent to Water Supply Tank 3",
    description: "A clean municipal supply line has cracked under the pavement, leaking gallons of potable water across the roadway continuously.",
    status: "Resolved",
    urgency: "High",
    dateReported: "2026-09-02",
    lastUpdated: "2026-09-07",
    progress: [
      { label: "Report submitted", date: "2026-09-02", completed: true },
      { label: "Under review", date: "2026-09-03", completed: true },
      { label: "Action in progress", date: "2026-09-05", completed: true },
      { label: "Resolved", date: "2026-09-07", completed: true }
    ]
  },
  {
    id: "ISSUE-005",
    title: "Broken bench and damaged paving stones in public park",
    category: "Public Spaces",
    area: "Oakridge Estate",
    landmark: "Near North Gate Jogging Track",
    description: "Concrete park bench collapsed on one side and multiple stone pavers are loose, posing tripping hazards to seniors.",
    status: "Reported",
    urgency: "Low",
    dateReported: "2026-09-13",
    lastUpdated: "2026-09-13",
    progress: [
      { label: "Report submitted", date: "2026-09-13", completed: true },
      { label: "Under review", date: null, completed: false },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-006",
    title: "Stormwater drain blocked with plastic and debris",
    category: "Water & Drainage",
    area: "Sample Nagar",
    landmark: "Crossroad 7 culvert",
    description: "Clogged stormwater inlet causes standing dirty water to accumulate across the intersection whenever it rains.",
    status: "Under Review",
    urgency: "Medium",
    dateReported: "2026-09-11",
    lastUpdated: "2026-09-12",
    progress: [
      { label: "Report submitted", date: "2026-09-11", completed: true },
      { label: "Under review", date: "2026-09-12", completed: true },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-007",
    title: "Exposed electrical wire hanging from utility pole",
    category: "Streetlights",
    area: "Railway Colony",
    landmark: "Opposite Gate #2",
    description: "Live service cable insulation worn out and hanging down within reach of pedestrians walking on the pavement.",
    status: "In Progress",
    urgency: "High",
    dateReported: "2026-09-14",
    lastUpdated: "2026-09-15",
    progress: [
      { label: "Report submitted", date: "2026-09-14", completed: true },
      { label: "Under review", date: "2026-09-14", completed: true },
      { label: "Action in progress", date: "2026-09-15", completed: true },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-008",
    title: "Construction debris dumped along service lane",
    category: "Waste Management",
    area: "Airport Bypass Road",
    landmark: "100m past petrol station",
    description: "Substantial pile of concrete rubble and plaster bags unloaded by unknown truck, blocking one full traffic lane.",
    status: "Reported",
    urgency: "Medium",
    dateReported: "2026-09-14",
    lastUpdated: "2026-09-14",
    progress: [
      { label: "Report submitted", date: "2026-09-14", completed: true },
      { label: "Under review", date: null, completed: false },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-009",
    title: "Sunken asphalt patch around manhole",
    category: "Road & Potholes",
    area: "Riverside Garden",
    landmark: "In front of Post Office",
    description: "Road surface around the sewage manhole has sunk approximately 5 inches, causing severe bumps for cars.",
    status: "Resolved",
    urgency: "Medium",
    dateReported: "2026-08-28",
    lastUpdated: "2026-09-04",
    progress: [
      { label: "Report submitted", date: "2026-08-28", completed: true },
      { label: "Under review", date: "2026-08-29", completed: true },
      { label: "Action in progress", date: "2026-09-01", completed: true },
      { label: "Resolved", date: "2026-09-04", completed: true }
    ]
  },
  {
    id: "ISSUE-010",
    title: "Fallen tree branch obstructing pedestrian path",
    category: "Public Spaces",
    area: "Heritage Enclave",
    landmark: "Near Community Library",
    description: "Heavy rain brought down a thick banyan branch across the walking path and sidewalk.",
    status: "Resolved",
    urgency: "High",
    dateReported: "2026-09-05",
    lastUpdated: "2026-09-06",
    progress: [
      { label: "Report submitted", date: "2026-09-05", completed: true },
      { label: "Under review", date: "2026-09-05", completed: true },
      { label: "Action in progress", date: "2026-09-06", completed: true },
      { label: "Resolved", date: "2026-09-06", completed: true }
    ]
  },
  {
    id: "ISSUE-011",
    title: "Obscured speed limit sign by wild shrubbery",
    category: "Other Issues",
    area: "School Zone South",
    landmark: "50m ahead of City Model School",
    description: "School zone warning and 20km/h speed limit boards are completely concealed by overgrown roadside brush.",
    status: "Reported",
    urgency: "Low",
    dateReported: "2026-09-15",
    lastUpdated: "2026-09-15",
    progress: [
      { label: "Report submitted", date: "2026-09-15", completed: true },
      { label: "Under review", date: null, completed: false },
      { label: "Action in progress", date: null, completed: false },
      { label: "Resolved", date: null, completed: false }
    ]
  },
  {
    id: "ISSUE-012",
    title: "Potholes along bus transit corridor",
    category: "Road & Potholes",
    area: "Old Town Market",
    landmark: "Opposite Central Bank Branch",
    description: "Cluster of multiple sharp potholes along the main bus route damaging vehicles and causing traffic slowdowns.",
    status: "In Progress",
    urgency: "High",
    dateReported: "2026-09-09",
    lastUpdated: "2026-09-14",
    progress: [
      { label: "Report submitted", date: "2026-09-09", completed: true },
      { label: "Under review", date: "2026-09-10", completed: true },
      { label: "Action in progress", date: "2026-09-14", completed: true },
      { label: "Resolved", date: null, completed: false }
    ]
  }
];

export function getIssueById(id) {
  return issues.find(item => item.id.toLowerCase() === (id || "").toLowerCase()) || null;
}

export function filterIssues({ category, status, search, sort }) {
  let list = [...issues];

  if (category && category !== "all") {
    list = list.filter(item => 
      item.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === category.toLowerCase().replace(/[^a-z0-9]/g, '-') ||
      item.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (status && status !== "all") {
    list = list.filter(item => item.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.trim().toLowerCase();
    list = list.filter(item => 
      item.title.toLowerCase().includes(q) ||
      item.id.toLowerCase().includes(q) ||
      item.area.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  }

  if (sort === "oldest") {
    list.sort((a, b) => new Date(a.dateReported) - new Date(b.dateReported));
  } else if (sort === "alpha") {
    list.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    // Default newest first
    list.sort((a, b) => new Date(b.dateReported) - new Date(a.dateReported));
  }

  return list;
}
