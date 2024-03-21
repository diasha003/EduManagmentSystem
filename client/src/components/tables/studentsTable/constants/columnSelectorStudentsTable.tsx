import columns from "./columnsStudentsTable";

export const checkBoxes = new Map<string, { displayName: string }>([
  ["all", { displayName: "Show All" }],
  ["default", { displayName: "Show Default" }],
  ["divider", { displayName: "<Divider/>" }],
  ...columns.map(
    ({ key, title }) =>
      [key as string, { displayName: title as string }] as [
        string,
        { displayName: string }
      ]
  ),
]);
