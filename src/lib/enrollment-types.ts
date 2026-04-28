export interface EnrollmentData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  selectedCourses: string[];
  learningMode: string;
  cohortStartDate: string;
  skillLevel: string;
  occupation: string;
  priorExperience: string;
  primaryGoal: string;
  achievementGoal: string;
  hasLaptop: boolean;
  internetStrength: string;
  softwareAccess: string[];
  paymentStatus: string;
  paymentMethod: string;
  proofOfPaymentUrl: string;
  communicationChannel: string;
  referralSource: string;
  consentUpdates: boolean;
  consentRequirements: boolean;
}

export const initialEnrollmentData: EnrollmentData = {
  fullName: "",
  email: "",
  phone: "",
  country: "",
  city: "",
  selectedCourses: [],
  learningMode: "",
  cohortStartDate: "",
  skillLevel: "",
  occupation: "",
  priorExperience: "",
  primaryGoal: "",
  achievementGoal: "",
  hasLaptop: false,
  internetStrength: "",
  softwareAccess: [],
  paymentStatus: "Not Paid",
  paymentMethod: "",
  proofOfPaymentUrl: "",
  communicationChannel: "",
  referralSource: "",
  consentUpdates: false,
  consentRequirements: false,
};

export const COURSES = [
  { name: "Slide Design with Microsoft PowerPoint", icon: "presentation" },
  { name: "Data Analytics with Microsoft Excel", icon: "table" },
  { name: "Vector Graphics with Adobe Illustrator", icon: "pen-tool" },
  { name: "Vector Graphics with CorelDRAW", icon: "shapes" },
  { name: "Content Authoring with Microsoft Word", icon: "file-text" },
  { name: "Scratch Programming", icon: "blocks" },
  { name: "Data Analysis with Python", icon: "code" },
  { name: "Excel for Beginners (Foundations)", icon: "table" },
  { name: "Intermediate Excel (Functions and Data Handling)", icon: "table" },
  { name: "Advanced Excel (Automation and Dashboards)", icon: "table" },
  { name: "AI and Future Skills", icon: "code" },
  { name: "Vibe Coding", icon: "code" },
];

export const COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "United States",
  "United Kingdom", "Canada", "India", "Germany", "Other",
];

export const LEARNING_MODES = ["Live Online", "Self-paced", "Hybrid"];

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const PRIMARY_GOALS = [
  "Career advancement", "Freelancing", "Business use",
  "Academic improvement", "Personal development",
];

export const INTERNET_STRENGTHS = ["Strong", "Moderate", "Weak"];

export const SOFTWARE_OPTIONS = [
  "Microsoft PowerPoint", "Microsoft Excel",
  "Adobe Illustrator", "CorelDRAW", "Microsoft Word",
];

export const PAYMENT_METHODS = [
  "Bank Transfer", "Card Payment", "Mobile Money", "Cash", "Other",
];

export const COMMUNICATION_CHANNELS = ["WhatsApp", "Email", "Telegram"];

export const REFERRAL_SOURCES = [
  "Social Media", "Friend/Family", "Google Search",
  "Event/Workshop", "Advertisement", "Other",
];
