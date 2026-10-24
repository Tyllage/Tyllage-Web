import type { LucideIcon } from 'lucide-react';
import {
  CalendarClock,
  ClipboardList,
  Gauge,
  GitBranch,
  GraduationCap,
  Handshake,
  LifeBuoy,
  Megaphone,
  Radar,
  Route,
  ShieldAlert,
  Tags,
} from 'lucide-react';

/**
 * Development stage for each capability. Keep these honest: update a
 * capability's stage only when it has genuinely progressed.
 */
export type CapabilityStage = 'prototype' | 'mvp' | 'concept';

export const stageLabels: Record<CapabilityStage, string> = {
  prototype: 'Prototype',
  mvp: 'MVP in development',
  concept: 'Future concept',
};

export const stageDescriptions: Record<CapabilityStage, string> = {
  prototype: 'Explored in a working prototype with demo data.',
  mvp: 'Being designed and built for the first minimum viable product.',
  concept: 'Research direction on our roadmap. Not yet in development.',
};

export interface Capability {
  id: string;
  name: string;
  icon: LucideIcon;
  stage: CapabilityStage;
  summary: string;
  points: string[];
}

export const coreCapabilities: Capability[] = [
  {
    id: 'demand-radar',
    name: 'Demand Radar',
    icon: Radar,
    stage: 'mvp',
    summary:
      'Brings customer interest, enquiries and order signals into one view so farms can see where demand is forming.',
    points: ['Consolidates demand signals', 'Highlights emerging interest', 'Supports sales planning'],
  },
  {
    id: 'harvest-batch-management',
    name: 'Harvest Batch Management',
    icon: ClipboardList,
    stage: 'mvp',
    summary:
      'Records upcoming and available harvest batches so sales teams know what can be offered, and when.',
    points: ['Batch availability and timing', 'Simple manual entry', 'No IoT sensors required'],
  },
  {
    id: 'ai-campaign-advisor',
    name: 'AI Campaign Advisor',
    icon: Megaphone,
    stage: 'mvp',
    summary:
      'Suggests outreach ideas and draft messaging matched to available harvest, for a person to review and approve.',
    points: ['Draft campaign suggestions', 'Aligned to harvest availability', 'Human review before sending'],
  },
  {
    id: 'harvest-pre-orders',
    name: 'Harvest Pre-Orders',
    icon: CalendarClock,
    stage: 'prototype',
    summary:
      'Lets customers reserve produce ahead of harvest, giving farms earlier visibility of committed demand.',
    points: ['Reserve ahead of harvest', 'Earlier demand visibility', 'Clearer allocation'],
  },
  {
    id: 'buyer-sales-engagement',
    name: 'Buyer and Sales Engagement',
    icon: Handshake,
    stage: 'mvp',
    summary:
      'Helps farms keep track of buyer conversations and follow-ups across the channels they already use.',
    points: ['Buyer records and follow-ups', 'Channel-aware messaging', 'Sales activity overview'],
  },
  {
    id: 'learning-journey-enquiries',
    name: 'Learning Journey Enquiry Management',
    icon: GraduationCap,
    stage: 'prototype',
    summary:
      'Organises farm visit and educational tour enquiries from schools and groups into a clear workflow.',
    points: ['Structured enquiry intake', 'Booking workflow', 'Response tracking'],
  },
];

export const futureCapabilities: Capability[] = [
  {
    id: 'farm-decision-twin',
    name: 'Farm Decision Twin',
    icon: GitBranch,
    stage: 'concept',
    summary: 'A lightweight model of farm commercial decisions for exploring “what if” scenarios before acting.',
    points: [],
  },
  {
    id: 'harvest-rescue',
    name: 'Harvest Rescue Intelligence',
    icon: LifeBuoy,
    stage: 'concept',
    summary: 'Early identification of produce at risk of going unsold, with suggested routes to reduce waste.',
    points: [],
  },
  {
    id: 'price-advisor',
    name: 'Price Advisor',
    icon: Tags,
    stage: 'concept',
    summary: 'Pricing guidance that weighs availability, demand and channel to support confident decisions.',
    points: [],
  },
  {
    id: 'risk-aware-forecasting',
    name: 'Risk-Aware Forecasting',
    icon: ShieldAlert,
    stage: 'concept',
    summary: 'Forecasts that communicate uncertainty clearly, designed to work with limited historical data.',
    points: [],
  },
  {
    id: 'profit-leakage',
    name: 'Profit Leakage Intelligence',
    icon: Gauge,
    stage: 'concept',
    summary: 'Surfaces where margin may be lost across pricing, wastage and fulfilment.',
    points: [],
  },
  {
    id: 'commercial-routes',
    name: 'Commercial Route Intelligence',
    icon: Route,
    stage: 'concept',
    summary: 'Compares sales channels and market routes to help farms choose where produce goes.',
    points: [],
  },
];

export const howItWorks = [
  {
    step: '01',
    title: 'Capture harvest availability',
    text: 'Farms record what is growing and when it will be ready, using simple inputs rather than costly sensors.',
  },
  {
    step: '02',
    title: 'Understand customer demand',
    text: 'Enquiries, pre-orders and buyer conversations are organised into a clear picture of demand.',
  },
  {
    step: '03',
    title: 'Match and recommend',
    text: 'Practical AI suggests where supply and demand meet, and drafts outreach for the team to review.',
  },
  {
    step: '04',
    title: 'Decide and act',
    text: 'People stay in control. Recommendations are explained, editable and only acted on with approval.',
  },
];

