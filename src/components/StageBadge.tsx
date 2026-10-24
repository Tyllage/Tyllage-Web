import { stageLabels, type CapabilityStage } from '../data/platform';

export function StageBadge({ stage }: { stage: CapabilityStage }) {
  return (
    <span className={`status-badge status-badge--${stage}`}>
      <span className="sr-only">Stage: </span>
      {stageLabels[stage]}
    </span>
  );
}
