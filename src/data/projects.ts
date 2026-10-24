import { MEOD_PROTOTYPE_URL } from './company';

export type ProjectStatus = 'Prototype / Development' | 'Concept / Proposed Workstream';

export interface Project {
  id: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
  /**
   * Whether the project appears anywhere on the public website (pages,
   * footer, metadata). Internal workstreams stay recorded here but hidden.
   */
  public: boolean;
  summary: string;
  focusAreas: string[];
  /** Public link to a working prototype. `null` when nothing is public yet. */
  link: string | null;
  linkLabel?: string;
  note: string;
}

export const projects: Project[] = [
  {
    id: 'meod-farm',
    name: 'Tyllage — MEOD Farm',
    shortName: 'MEOD Farm',
    status: 'Prototype / Development',
    public: true,
    summary:
      'An evolving prototype exploring how AI-assisted tools could support a Singapore urban farm with customer engagement, harvest pre-orders, sales and marketing workflows, and learning-journey enquiries.',
    focusAreas: [
      'AI-assisted farm operations',
      'Customer engagement',
      'Harvest pre-orders',
      'Sales and marketing workflows',
      'Learning journey support',
      'Demand visibility',
    ],
    link: MEOD_PROTOTYPE_URL,
    linkLabel: 'View the prototype',
    note: 'An evolving prototype that uses demo data. It is not a completed commercial deployment, and it does not imply endorsement or verified results.',
  },
  {
    // Internal workstream — not shown on the public website for now.
    id: 'comcrop',
    name: 'Tyllage — ComCrop',
    shortName: 'ComCrop',
    status: 'Concept / Proposed Workstream',
    public: false,
    summary:
      'A proposed workstream investigating how farms and buyers could coordinate demand, allocate harvests and identify viable market routes and commercial opportunities.',
    focusAreas: [
      'Demand coordination',
      'Harvest allocation',
      'Market routes',
      'Commercial opportunities',
      'Buyer intelligence',
    ],
    link: null,
    note: 'Early concept under exploration. No partnership agreements or commercial outcomes are implied.',
  },
];

/** Projects that may appear on the public website. */
export const publicProjects = projects.filter((p) => p.public);
