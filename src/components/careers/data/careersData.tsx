import React from "react";
import {
  Award,
  Building,
  Search,
  Users,
  Clock,
} from "lucide-react";

// --- Interfaces ---

export interface Job {
  position: string;
  location: string;
  type: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl?: string;
  level: number;
  parentId?: string;
  department: Department; // Use enum/type for consistency
  skills?: string[];
  yearJoined?: number;
  monthlyCost?: number;
  availability?: string;
}

export interface AvailableRole {
  id: string;
  title: string;
  department: Department; // Use enum/type for consistency
  skills: string[];
  monthlyCost: number;
  availability: string;
}

export type Department =
  | "Executive"
  | "Technology"
  | "Marketing"
  | "Creative"
  | "Product";

// --- Data ---

export const jobs: Job[] = [
  {
    position: "Creative Director",
    location: "Bangalore, India",
    type: "Full-time",
    description: `We\\'re on the lookout for a Creative Director – Art who\\'s not just creatively brilliant but also bold enough to disrupt the ordinary.\\n\\nIf you think in big ideas, lead with a sharp design sensibility, and have a strong eye for detail and storytelling — we want to talk to you. This is a leadership role for someone who thrives in a fast-paced, idea-first environment and can bring a clear creative vision to life across platforms.\\n\\nWhat we\\'re looking for:\\n\\n10+ years of experience in advertising or design, with a strong portfolio across ATL, digital, and integrated campaigns`,
  },
  {
    position: "Executive Creative Director",
    location: "Bangalore, India",
    type: "Full-time",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Robertson",
    role: "CEO",
    level: 1,
    department: "Executive",
    skills: ["Leadership", "Strategic Vision", "Business Development"],
    yearJoined: 2018,
    monthlyCost: 20000,
    availability: "Consulting only",
  },
  {
    id: "2",
    name: "Maya Singh",
    role: "CTO",
    level: 2,
    parentId: "1",
    department: "Technology",
    skills: ["Enterprise Architecture", "AI/ML", "Cloud Solutions"],
    yearJoined: 2019,
    monthlyCost: 15000,
    availability: "Consulting only",
  },
  {
    id: "3",
    name: "David Chen",
    role: "CMO",
    level: 2,
    parentId: "1",
    department: "Marketing",
    skills: ["Brand Strategy", "Growth Marketing", "Digital Campaigns"],
    yearJoined: 2018,
    monthlyCost: 14000,
    availability: "Consulting only",
  },
  {
    id: "4",
    name: "Sophia Martinez",
    role: "CCO",
    level: 2,
    parentId: "1",
    department: "Creative",
    skills: ["Creative Direction", "Design Systems", "UX Strategy"],
    yearJoined: 2019,
    monthlyCost: 14000,
    availability: "Consulting only",
  },
   // Added VP Product Management under CEO
   {
    id: "14",
    name: "Samira Khan",
    role: "VP Product", // Renamed role for consistency
    level: 2,
    parentId: "1",
    department: "Product",
    skills: ["Product Vision", "Roadmapping", "Cross-functional Leadership"],
    yearJoined: 2020,
    monthlyCost: 13000,
    availability: "Consulting only",
  },
  {
    id: "5",
    name: "Julian Morris",
    role: "VP Engineering",
    level: 3,
    parentId: "2", // Reports to CTO
    department: "Technology",
    skills: ["Software Architecture", "DevOps", "Team Leadership"],
    yearJoined: 2020,
    monthlyCost: 12000,
    availability: "4 weeks",
  },
  {
    id: "6",
    name: "Riya Patel",
    role: "Director of Product", // Changed role, reporting to VP Product
    level: 3,
    parentId: "14",
    department: "Product",
    skills: ["Product Strategy", "Agile Methodologies", "User Research"],
    yearJoined: 2020,
    monthlyCost: 11000,
    availability: "2 weeks",
  },
  {
    id: "7",
    name: "Thomas Wilson",
    role: "Lead Designer",
    level: 3,
    parentId: "4", // Reports to CCO
    department: "Creative",
    skills: ["Visual Design", "Brand Identity", "Motion Graphics"],
    yearJoined: 2021,
    monthlyCost: 9000,
    availability: "Immediate",
  },
  {
    id: "8",
    name: "Olivia Jackson",
    role: "Creative Director",
    level: 3,
    parentId: "4", // Reports to CCO
    department: "Creative",
    skills: ["Art Direction", "Campaign Development", "Client Relations"],
    yearJoined: 2020,
    monthlyCost: 10000,
    availability: "2 weeks",
  },
  {
    id: "9",
    name: "Emma Davis",
    role: "Marketing Director",
    level: 3,
    parentId: "3", // Reports to CMO
    department: "Marketing",
    skills: ["Performance Marketing", "Content Strategy", "Data Analytics"],
    yearJoined: 2021,
    monthlyCost: 9500,
    availability: "3 weeks",
  },
  {
    id: "10",
    name: "Liam Lee",
    role: "UX Designer",
    level: 4,
    parentId: "7", // Reports to Lead Designer
    department: "Creative",
    skills: ["User Research", "Wireframing", "Prototyping"],
    yearJoined: 2022,
    monthlyCost: 7000,
    availability: "Immediate",
  },
  {
    id: "11",
    name: "Noah Kim",
    role: "UI Designer",
    level: 4,
    parentId: "7", // Reports to Lead Designer
    department: "Creative",
    skills: ["UI Design", "Design Systems", "Accessibility"],
    yearJoined: 2022,
    monthlyCost: 7000,
    availability: "Immediate",
  },
  {
    id: "12",
    name: "Ava Williams",
    role: "Senior Developer",
    level: 4,
    parentId: "5", // Reports to VP Engineering
    department: "Technology",
    skills: ["Full-stack Development", "React", "Cloud Services"],
    yearJoined: 2021,
    monthlyCost: 8000,
    availability: "Immediate",
  },
  {
    id: "13",
    name: "Isabella Rodriguez",
    role: "Data Scientist",
    level: 4,
    parentId: "5", // Reports to VP Engineering
    department: "Technology",
    skills: ["Machine Learning", "Data Visualization", "Python"],
    yearJoined: 2022,
    monthlyCost: 8500,
    availability: "2 weeks",
  },
   {
    id: "15",
    name: "Ben Carter",
    role: "Product Manager",
    level: 4, // Reporting to Director of Product
    parentId: "6",
    department: "Product",
    skills: ["Agile", "Roadmapping", "User Stories"],
    yearJoined: 2021,
    monthlyCost: 9000,
    availability: "2 weeks",
  },
];

export const availableRoles: AvailableRole[] = [
  {
    id: "role-1",
    title: "Senior Developer",
    department: "Technology",
    skills: ["Full-stack", "JavaScript", "React", "Node.js"],
    monthlyCost: 8000,
    availability: "Immediate",
  },
  {
    id: "role-2",
    title: "Mid-level Developer",
    department: "Technology",
    skills: ["JavaScript", "React", "Frontend"],
    monthlyCost: 6000,
    availability: "Immediate",
  },
  {
    id: "role-3",
    title: "Junior Developer",
    department: "Technology",
    skills: ["HTML/CSS", "JavaScript", "React Basics"],
    monthlyCost: 4000,
    availability: "Immediate",
  },
  {
    id: "role-4",
    title: "UX/UI Designer",
    department: "Creative",
    skills: ["Figma", "User Research", "Wireframing"],
    monthlyCost: 7000,
    availability: "Immediate",
  },
  {
    id: "role-5",
    title: "Product Manager",
    department: "Product",
    skills: ["Agile", "Roadmapping", "User Stories"],
    monthlyCost: 9000,
    availability: "2 weeks",
  },
  {
    id: "role-6",
    title: "DevOps Engineer",
    department: "Technology",
    skills: ["AWS", "CI/CD", "Docker", "Kubernetes"],
    monthlyCost: 9000,
    availability: "3 weeks",
  },
  {
    id: "role-7",
    title: "QA Engineer",
    department: "Technology",
    skills: ["Manual Testing", "Automation Testing", "Selenium"],
    monthlyCost: 5500,
    availability: "Immediate",
  },
  {
    id: "role-8",
    title: "Marketing Specialist",
    department: "Marketing",
    skills: ["Content Marketing", "Social Media", "SEO"],
    monthlyCost: 6000,
    availability: "Immediate",
  },
   {
    id: "role-9",
    title: "Creative Director",
    department: "Creative",
    skills: ["Art Direction", "Campaign Strategy", "Team Leadership"],
    monthlyCost: 10000,
    availability: "4 weeks",
  },
  {
    id: "role-10",
    title: "Data Scientist",
    department: "Technology",
    skills: ["ML", "Python", "Data Analysis", "Visualization"],
    monthlyCost: 8500,
    availability: "3 weeks",
  },
];

// --- Mappings ---

export const departmentIcons: Record<Department, React.ReactNode> = {
  Executive: <Award size={18} />,
  Technology: <Building size={18} />,
  Marketing: <Search size={18} />,
  Creative: <Users size={18} />,
  Product: <Clock size={18} />,
};

export const departmentColors: Record<Department, string> = {
  Executive: "rgba(66, 133, 244, 0.9)",
  Technology: "rgba(15, 157, 88, 0.9)",
  Marketing: "rgba(244, 160, 0, 0.9)",
  Creative: "rgba(219, 68, 55, 0.9)",
  Product: "rgba(138, 43, 226, 0.9)",
};

// --- Utilities ---

export const getChildrenNodes = (parentId: string): TeamMember[] => {
  return teamMembers.filter((member) => member.parentId === parentId);
};

export const getNodesByLevel = (level: number): TeamMember[] => {
  return teamMembers.filter((member) => member.level === level);
};

export const allDepartments = Array.from(
  new Set([
    ...teamMembers.map(m => m.department),
    ...availableRoles.map(r => r.department)
  ])
) as Department[];
