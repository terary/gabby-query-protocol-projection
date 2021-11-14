export type TProjectionItemProperties = {
  subjectId: string;
  sortOrder: number; // between [-1,1]
  columnOrder: number; // any number ok. This is not position
  label: string;
};
export type TProjectionItemPropertiesJson = Partial<TProjectionItemProperties>;

export type TProjectionPropertiesUpdatable = {
  sortOrder?: number;
  label?: string;
  columnOrder?: number;
};

export type TProjectionDictionary = {
  [projectionKey: string]: TProjectionItemProperties;
};

export type TProjectionJson = TProjectionItemPropertiesJson[];
export type TProjection = TProjectionItemProperties[];
