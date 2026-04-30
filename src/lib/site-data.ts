export type NavLink = {
  href: string;
  label: string;
};

export const mainNavigation: NavLink[] = [
  { href: "/", label: "Dashboard" },
  { href: "/plant-codex", label: "Plant Codex" },
  { href: "/harvesting", label: "Harvesting this week" },
  { href: "/locations", label: "Locations" },
  { href: "/suggestions", label: "Suggestions" },
  { href: "/health-safety", label: "Health & Safety" },
  { href: "/quick-to-do-list", label: "Quick To Do List" },
  { href: "/projects-big-to-dos", label: "Projects & Big To Dos" },
  { href: "/committee", label: "PlantSoc Committee" },
];

export type PlantRecord = {
  slug: string;
  name: string;
  type: string;
  plantingSeason: string;
  plantingDate: string;
  sunlight: string;
  soilType: string;
  companionPlants: string[];
  harvestTrimIntervalDays: number;
  estimatedHarvestTrimDate: string;
  notes: string;
  lifeCycle: string;
  location: string;
};

export const plantCodex: PlantRecord[] = [
  {
    slug: "tomato",
    name: "Tomato",
    type: "Vegetable",
    plantingSeason: "Spring",
    plantingDate: "2026-03-30",
    sunlight: "Full sun",
    soilType: "Loamy",
    companionPlants: ["Basil", "Marigold"],
    harvestTrimIntervalDays: 14,
    estimatedHarvestTrimDate: "2026-05-02",
    notes: "Stake early and keep fruit off wet soil.",
    lifeCycle: "Annual",
    location: "North Bed",
  },
  {
    slug: "carrot",
    name: "Carrot",
    type: "Root vegetable",
    plantingSeason: "Spring",
    plantingDate: "2026-04-02",
    sunlight: "Full sun",
    soilType: "Sandy",
    companionPlants: ["Onion", "Pea"],
    harvestTrimIntervalDays: 21,
    estimatedHarvestTrimDate: "2026-05-05",
    notes: "Thin for straight roots and consistent spacing.",
    lifeCycle: "Biennial",
    location: "South Bed",
  },
  {
    slug: "lavender",
    name: "Lavender",
    type: "Herb",
    plantingSeason: "Spring",
    plantingDate: "2026-04-10",
    sunlight: "Full sun",
    soilType: "Well-draining",
    companionPlants: ["Rosemary", "Sage"],
    harvestTrimIntervalDays: 28,
    estimatedHarvestTrimDate: "2026-05-08",
    notes: "Keep lightly pruned and avoid overwatering.",
    lifeCycle: "Perennial",
    location: "Herb Spiral",
  },
  {
    slug: "strawberry",
    name: "Strawberry",
    type: "Fruit",
    plantingSeason: "Spring",
    plantingDate: "2026-04-12",
    sunlight: "Full sun",
    soilType: "Loamy",
    companionPlants: ["Spinach", "Lettuce"],
    harvestTrimIntervalDays: 10,
    estimatedHarvestTrimDate: "2026-05-01",
    notes: "Mulch well to keep berries clean.",
    lifeCycle: "Perennial",
    location: "Berry Patch",
  },
  {
    slug: "pumpkin",
    name: "Pumpkin",
    type: "Vegetable",
    plantingSeason: "Summer",
    plantingDate: "2026-06-01",
    sunlight: "Full sun",
    soilType: "Rich",
    companionPlants: ["Corn", "Beans"],
    harvestTrimIntervalDays: 35,
    estimatedHarvestTrimDate: "2026-05-20",
    notes: "Leave plenty of room for vines to spread.",
    lifeCycle: "Annual",
    location: "South Edge",
  },
  {
    slug: "cucumber",
    name: "Cucumber",
    type: "Vegetable",
    plantingSeason: "Spring",
    plantingDate: "2026-04-18",
    sunlight: "Full sun",
    soilType: "Well-draining",
    companionPlants: ["Beans", "Sunflowers"],
    harvestTrimIntervalDays: 7,
    estimatedHarvestTrimDate: "2026-05-03",
    notes: "Train vertically to save space and improve airflow.",
    lifeCycle: "Annual",
    location: "North Bed",
  },
  {
    slug: "rocket-potato",
    name: "Rocket Potato",
    type: "Root vegetable",
    plantingSeason: "Spring",
    plantingDate: "2026-04-22",
    sunlight: "Full sun",
    soilType: "Sandy loam",
    companionPlants: ["Beans", "Cabbage"],
    harvestTrimIntervalDays: 21,
    estimatedHarvestTrimDate: "2026-04-30",
    notes: "Earth up regularly to keep tubers covered.",
    lifeCycle: "Annual",
    location: "Potato Trench",
  },
  {
    slug: "king-edward-potato",
    name: "King Edward Potato",
    type: "Root vegetable",
    plantingSeason: "Spring",
    plantingDate: "2026-04-22",
    sunlight: "Full sun",
    soilType: "Sandy loam",
    companionPlants: ["Beans", "Cabbage"],
    harvestTrimIntervalDays: 21,
    estimatedHarvestTrimDate: "2026-05-04",
    notes: "Check foliage for blight after wet weather.",
    lifeCycle: "Annual",
    location: "Potato Trench",
  },
  {
    slug: "onion",
    name: "Onion",
    type: "Vegetable",
    plantingSeason: "Spring",
    plantingDate: "2026-04-19",
    sunlight: "Full sun",
    soilType: "Loamy",
    companionPlants: ["Carrot", "Lettuce"],
    harvestTrimIntervalDays: 14,
    estimatedHarvestTrimDate: "2026-05-06",
    notes: "Keep weed-free for strong bulb development.",
    lifeCycle: "Annual",
    location: "South Bed",
  },
  {
    slug: "basil",
    name: "Basil",
    type: "Herb",
    plantingSeason: "Late spring",
    plantingDate: "2026-04-26",
    sunlight: "Full sun",
    soilType: "Rich",
    companionPlants: ["Tomato", "Pepper"],
    harvestTrimIntervalDays: 7,
    estimatedHarvestTrimDate: "2026-04-29",
    notes: "Pinch tops regularly to encourage bushy growth.",
    lifeCycle: "Annual",
    location: "Herb Spiral",
  },
];

export type LocationRecord = {
  slug: string;
  name: string;
  zone: string;
  summary: string;
  capacity: string;
  status: string;
  crops: string[];
};

export const locationRecords: LocationRecord[] = [
  {
    slug: "north-bed",
    name: "North Bed",
    zone: "Sunny strip",
    summary: "A high-light bed for compact vegetables that need consistent watering.",
    capacity: "4 of 6 rows",
    status: "Active",
    crops: ["Tomato", "Cucumber", "Basil"],
  },
  {
    slug: "south-bed",
    name: "South Bed",
    zone: "Root crop bed",
    summary: "Loose soil and a rotation plan for root vegetables and alliums.",
    capacity: "3 of 5 rows",
    status: "Active",
    crops: ["Carrot", "Onion", "Pumpkin"],
  },
  {
    slug: "herb-spiral",
    name: "Herb Spiral",
    zone: "Raised spiral",
    summary: "A small structure with excellent drainage and easy hand-picking access.",
    capacity: "5 plants",
    status: "Active",
    crops: ["Lavender", "Basil", "Rosemary"],
  },
  {
    slug: "berry-patch",
    name: "Berry Patch",
    zone: "Mulched corner",
    summary: "Perennial fruit bed that benefits from mulch, irrigation, and bird protection.",
    capacity: "2 of 4 patches",
    status: "Growing",
    crops: ["Strawberry"],
  },
  {
    slug: "potato-trench",
    name: "Potato Trench",
    zone: "Rotation trench",
    summary: "A seasonal trench for potatoes with regular earthing-up and weather checks.",
    capacity: "2 of 4 mounds",
    status: "Growing",
    crops: ["Rocket Potato", "King Edward Potato"],
  },
];

export type TaskRecord = {
  id: string;
  title: string;
  detail: string;
  owner: string;
  status: "Open" | "Doing" | "Waiting" | "Done";
  due: string;
};

export const quickTodos: TaskRecord[] = [
  {
    id: "plant-rocket-potato",
    title: "Plant Rocket Potato",
    detail: "Prepare trench, add compost, and earth up once shoots appear.",
    owner: "Site team",
    status: "Open",
    due: "2026-04-29",
  },
  {
    id: "plant-king-edward-potato",
    title: "Plant King Edward Potato",
    detail: "Keep spacing wide enough for airflow and later hilling.",
    owner: "Site team",
    status: "Open",
    due: "2026-04-30",
  },
  {
    id: "derust-bbq",
    title: "Derust BBQ",
    detail: "Wire brush, oil, and re-season before the next community event.",
    owner: "Maintenance",
    status: "Doing",
    due: "2026-05-02",
  },
  {
    id: "fix-bench",
    title: "Fix bench with crossbeams and back support",
    detail: "Reinforce the frame before the seating area gets busy.",
    owner: "Maintenance",
    status: "Waiting",
    due: "2026-05-08",
  },
  {
    id: "plant-onion",
    title: "Plant Onion",
    detail: "Tidy the row spacing and clear weeds first.",
    owner: "Site team",
    status: "Open",
    due: "2026-04-29",
  },
  {
    id: "plan-herb-garden",
    title: "Plan Herb Garden",
    detail: "Sketch the herb spiral refresh and confirm companion planting.",
    owner: "Committee",
    status: "Open",
    due: "2026-05-03",
  },
];

export type ProjectSection = {
  title: string;
  items: {
    title: string;
    note: string;
  }[];
};

export const projectSections: ProjectSection[] = [
  {
    title: "Next actions (this week)",
    items: [
      {
        title: "Map bed rotation",
        note: "Confirm where potatoes, roots, and soft fruit should move next season.",
      },
      {
        title: "Seed ordering",
        note: "Collect missing seed varieties and keep a shared order list updated.",
      },
    ],
  },
  {
    title: "Waiting on / blocked",
    items: [
      {
        title: "Compost delivery",
        note: "Hold the soil refresh until the next delivery window is confirmed.",
      },
      {
        title: "Timber check",
        note: "Bench repair moves once the replacement timbers are measured and cut.",
      },
    ],
  },
  {
    title: "Someday / maybe",
    items: [
      {
        title: "Add greenhouse shelving",
        note: "A future storage and propagation improvement for trays and cuttings.",
      },
      {
        title: "Create a seed swap board",
        note: "A simple community notice point for exchanging spare packets.",
      },
    ],
  },
  {
    title: "Notes",
    items: [
      {
        title: "Keep the board readable",
        note: "Split large work into its own subpage when it starts to sprawl.",
      },
      {
        title: "Use the dashboard first",
        note: "Quick jobs should be visible here before they get promoted elsewhere.",
      },
    ],
  },
];

export type CommitteeRole = {
  title: string;
  lead: string;
  cadence: string;
  note: string;
};

export const committeeRoles: CommitteeRole[] = [
  {
    title: "Chair",
    lead: "Site coordination",
    cadence: "Weekly review",
    note: "Keeps the plan moving and resolves decisions that affect the whole plot.",
  },
  {
    title: "Secretary",
    lead: "Records and action notes",
    cadence: "After each meeting",
    note: "Captures actions, links, and follow-up items for the next session.",
  },
  {
    title: "Volunteer coordinator",
    lead: "Rota and signups",
    cadence: "As needed",
    note: "Matches people with jobs, events, and seasonal work sessions.",
  },
  {
    title: "Maintenance lead",
    lead: "Tools and repairs",
    cadence: "Fortnightly check-in",
    note: "Tracks equipment, repairs benches, and keeps shared tools ready to use.",
  },
];

export type SafetySection = {
  title: string;
  bullets: string[];
};

export const safetySections: SafetySection[] = [
  {
    title: "Arrival and sign-in",
    bullets: [
      "Sign in before starting work and note any visitors or new volunteers.",
      "Check weather and ground conditions before moving tools or carrying loads.",
    ],
  },
  {
    title: "Tools and PPE",
    bullets: [
      "Use gloves, sturdy footwear, and eye protection where needed.",
      "Return sharp tools, hoses, and batteries to the right storage point after use.",
    ],
  },
  {
    title: "Weather and soil hygiene",
    bullets: [
      "Pause heavy work in heat, high winds, or icy conditions.",
      "Wash hands after soil, compost, and food handling tasks.",
    ],
  },
  {
    title: "First aid and incidents",
    bullets: [
      "Report trips, cuts, or unsafe equipment immediately.",
      "Keep the first aid point visible and easy to reach for all volunteers.",
    ],
  },
  {
    title: "Children and visitors",
    bullets: [
      "Keep supervised groups in safe routes around tools and raised beds.",
      "Make sure everyone knows where to wait if the site needs a quick stop.",
    ],
  },
];

const dayInMs = 24 * 60 * 60 * 1000;

export function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function daysUntil(isoDate: string, referenceDate = new Date()) {
  const target = new Date(isoDate);
  const startOfDay = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate(),
  );
  return Math.round((target.getTime() - startOfDay.getTime()) / dayInMs);
}

export function getHarvestQueue(referenceDate = new Date()) {
  return [...plantCodex]
    .map((plant) => ({
      ...plant,
      daysUntilHarvest: daysUntil(plant.estimatedHarvestTrimDate, referenceDate),
    }))
    .filter((plant) => plant.daysUntilHarvest >= -2 && plant.daysUntilHarvest <= 7)
    .sort((left, right) => left.daysUntilHarvest - right.daysUntilHarvest);
}

export function getPlantBySlug(slug: string) {
  return plantCodex.find((plant) => plant.slug === slug);
}