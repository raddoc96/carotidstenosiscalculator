
export enum VisualFinding {
  NORMAL = 'NORMAL',
  PLAQUE_VISIBLE = 'PLAQUE_VISIBLE',
  NEAR_OCCLUSION = 'NEAR_OCCLUSION',
  TOTAL_OCCLUSION = 'TOTAL_OCCLUSION',
}

export enum StenosisCategory {
  NORMAL = 'Normal',
  LT_50 = '<50% Stenosis',
  GTE_50_LTE_69 = '50-69% Stenosis',
  GTE_70 = '≥70% Stenosis to Near Occlusion',
  NEAR_OCCLUSION = 'Near Occlusion',
  TOTAL_OCCLUSION = 'Total Occlusion',
  INCOMPLETE_DATA = 'Incomplete Data',
  INDETERMINATE = 'Indeterminate',
}

export interface StenosisInputs {
  visualFinding: VisualFinding | null;
  psv: number | null; // ICA PSV
  edv: number | null; // ICA EDV
  ccaPsv: number | null; // CCA PSV
}

export interface StenosisResult {
  category: StenosisCategory;
  primaryReason: string;
  additionalNotes: string[];
  color: string;
  recommendation: string;
}
