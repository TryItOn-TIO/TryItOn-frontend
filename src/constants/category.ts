// BE 서버에서는 category_id로 전달
export enum CATEGORY {
  ALL = 0,
  TOP = 1,
  OUTER = 2,
  PANTS = 3,
  DRESS = 4,
  SHOES = 5,
  PROPS = 6,
}

// UI 매핑
export const CATEGORY_LABELS: Record<CATEGORY, string> = {
  [CATEGORY.ALL]: "전체",
  [CATEGORY.TOP]: "상의",
  [CATEGORY.OUTER]: "아우터",
  [CATEGORY.PANTS]: "하의",
  [CATEGORY.DRESS]: "원피스/스커트",
  [CATEGORY.SHOES]: "신발",
  [CATEGORY.PROPS]: "소품/악세사리",
};
