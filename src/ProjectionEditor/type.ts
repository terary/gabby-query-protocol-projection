export type TProjectionProperties = {
  subjectId: string;
  sortOrder: number; // between [-1,1]
  columnOrder: number; // any number ok. This is not position
  label: string;
};
export type TProjectionPropertiesJson = {
  subjectId?: string;
  sortOrder?: number; // between [-1,1]
  columnOrder?: number; // any number ok. This is not position
  label?: string;
};

export type TProjectionPropertiesUpdatable = {
  sortOrder?: number;
  label?: string;
  columnOrder?: number;
};

export type TProjectionDictionary = { [projectionKey: string]: TProjectionProperties };

export type TProjectionJson = TProjectionPropertiesJson[];
export type TProjection = TProjectionProperties[];
