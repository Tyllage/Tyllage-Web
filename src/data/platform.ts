import type { LucideIcon } from 'lucide-react';
import {
  BarChart3,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Database,
  Eye,
  Gauge,
  GitBranch,
  GraduationCap,
  Handshake,
  LifeBuoy,
  Megaphone,
  Radar,
  Sparkles,
  Tags,
  Send,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';
import type { SceneVariant } from '../components/Scene';

/**
 * Development stage for each capability. Keep these honest: update a
 * capability's stage only when it has genuinely progressed.
 */
export type CapabilityStage = 'prototype' | 'mvp' | 'concept';

export const stageLabels: Record<CapabilityStage, string> = {
  prototype: 'Prototype',
  mvp: 'In development',
  concept: 'Future concept',
};

export const stageDescriptions: Record<CapabilityStage, string> = {
  prototype: 'Explored in a working prototype with demo data.',
  mvp: 'Being designed and built for our first minimum viable product.',
  concept: 'A research direction on our roadmap. Not yet in development.',
};

export interface Capability {
  id: string;
  name: string;
  icon: LucideIcon;
  stage: CapabilityStage;
  summary: string;
  points: string[];
}

// Verify each `stage` before publishing; update as development progresses.
export const coreCapabilities: Capability[] = [
  {
    id: 'demand-radar',
    name: 'Demand Radar',
    icon: Radar,
    stage: 'mvp',
    summary: 'Brings enquiries, pre-orders and buyer interest into one view, so farm teams can see where demand is forming.',
    points: ['Consolidated demand signals', 'Highlights emerging interest', 'Supports sales planning'],
  },
  {
    id: 'harvest-batch-management',
    name: 'Harvest Batch Management',
    icon: ClipboardList,
    stage: 'mvp',
    summary: 'Records upcoming and available harvest batches, so the sales team knows what can be offered, and when.',
    points: ['Batch availability and timing', 'Simple manual entry', 'No sensors or IoT required'],
  },
  {
    id: 'ai-campaign-advisor',
    name: 'AI Campaign Advisor',
    icon: Megaphone,
    stage: 'mvp',
    summary: 'Suggests outreach ideas and drafts messages matched to upcoming harvests, for staff to review, edit and approve.',
    points: ['Draft campaign suggestions', 'Aligned with harvest availability', 'Nothing sent without approval'],
  },
  {
    id: 'harvest-pre-orders',
    name: 'Harvest Pre-Orders',
    icon: CalendarClock,
    stage: 'prototype',
    summary: 'Lets customers reserve produce ahead of harvest, giving farms earlier visibility of committed demand.',
    points: ['Reserve ahead of harvest', 'Earlier demand visibility', 'Clearer allocation'],
  },
  {
    id: 'customer-buyer-engagement',
    name: 'Customer and Buyer Sales Engagement',
    icon: Handshake,
    stage: 'mvp',
    summary: 'Helps farm teams keep track of customer and buyer conversations and follow-ups across the channels they already use.',
    points: ['Customer and buyer records', 'Follow-up reminders', 'Sales activity overview'],
  },
  {
    id: 'learning-journey-enquiries',
    name: 'Learning Journey Enquiry Management',
    icon: GraduationCap,
    stage: 'prototype',
    summary: 'Organises farm-visit and educational tour enquiries from schools and groups into a clear workflow.',
    points: ['Structured enquiry intake', 'Booking workflow', 'Response tracking'],
  },
];

export const futureCapabilities: Capability[] = [
  {
    id: 'farm-decision-twin',
    name: 'Farm Decision Twin',
    icon: GitBranch,
    stage: 'concept',
    summary: 'Explore “what if” commercial scenarios before acting.',
    points: [],
  },
  {
    id: 'harvest-rescue',
    name: 'Harvest Rescue Intelligence',
    icon: LifeBuoy,
    stage: 'concept',
    summary: 'Spot produce at risk of going unsold, earlier.',
    points: [],
  },
  {
    id: 'price-advisor',
    name: 'Price Advisor',
    icon: Tags,
    stage: 'concept',
    summary: 'Pricing guidance for staff to consider — never set automatically.',
    points: [],
  },
  {
    id: 'advanced-forecasting',
    name: 'Advanced Forecasting',
    icon: TrendingUp,
    stage: 'concept',
    summary: 'Demand outlooks that are honest about uncertainty.',
    points: [],
  },
  {
    id: 'profit-leakage',
    name: 'Profit Leakage Intelligence',
    icon: Gauge,
    stage: 'concept',
    summary: 'Highlight where margin may be lost across sales and fulfilment.',
    points: [],
  },
];

/** Homepage “What we do” — the platform's current development areas. */
export const developmentAreas: { title: string; text: string; icon: LucideIcon; scene: SceneVariant }[] = [
  {
    title: 'Farm Sales Intelligence',
    text: 'A clearer view of sales activity, so farms can see what is working and where opportunities lie.',
    icon: BarChart3,
    scene: 'leaves',
  },
  {
    title: 'Harvest and Demand Visibility',
    text: 'Connecting what will soon be ready with who may want it — before produce is harvested.',
    icon: Eye,
    scene: 'rows',
  },
  {
    title: 'AI-Assisted Marketing',
    text: 'Draft outreach and campaign ideas, matched to upcoming harvests, for the farm team to approve.',
    icon: Sparkles,
    scene: 'greenhouse',
  },
  {
    title: 'Customer and Buyer Engagement',
    text: 'Keeping enquiries, conversations and follow-ups organised in one place.',
    icon: Users,
    scene: 'crates',
  },
  {
    title: 'Farm Operations Support',
    text: 'Simple, structured workflows for pre-orders, learning journeys and day-to-day coordination.',
    icon: Wrench,
    scene: 'seedlings',
  },
];

/** “How Tyllage works” journey. */
export const journey: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: 'Farm Information',
    text: 'Farms share what is growing and when it will be ready, using simple inputs.',
    icon: Database,
  },
  {
    title: 'Demand Visibility',
    text: 'Enquiries, pre-orders and buyer interest are brought together in one view.',
    icon: Eye,
  },
  {
    title: 'AI Recommendations',
    text: 'Practical AI suggests opportunities and drafts outreach — with its reasoning shown.',
    icon: Sparkles,
  },
  {
    title: 'Farm Approval',
    text: 'The farm team reviews, edits or rejects every suggestion. People stay in control.',
    icon: CheckCircle2,
  },
  {
    title: 'Sales Action',
    text: 'Approved actions go out through the channels the farm already uses.',
    icon: Send,
  },
];
