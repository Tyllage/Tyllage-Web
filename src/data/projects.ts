import { MEOD_PROTOTYPE_URL } from './company';

export type ProjectStatus = 'Prototype / Development' | 'Concept / Proposed Workstream';

export interface Project {
  id: string;
  name: string;
  shortName: string;
  status: ProjectStatus;
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
    summary:
      'A working prototype exploring how AI-assisted tooling can support a Singapore urban farm across day-to-day operations, customer outreach and enquiry handling.',
    focusAreas: [
      'AI-assisted farm operations',
      'Marketing outreach',
      'Demand intelligence',
      'Harvest pre-orders',
      'Learning-journey workflows',
    ],
    link: MEOD_PROTOTYPE_URL,
    linkLabel: 'View prototype',
    note: 'Prototype for development and demonstration. It uses demo data and is not a production deployment.',
  },
  {
    id: 'comcrop',
    name: 'Tyllage — ComCrop',
    shortName: 'ComCrop',
    status: 'Concept / Proposed Workstream',
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
