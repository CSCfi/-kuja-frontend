import * as R from "ramda";

export const getChangesByLevel = (level, changes) => {
  if (changes) 
    return changes.filter(change => {
      const categoryDepth = R.filter(v => {
        return v === "categories";
      }, change.path).length;
      return categoryDepth === level;
    });
};
