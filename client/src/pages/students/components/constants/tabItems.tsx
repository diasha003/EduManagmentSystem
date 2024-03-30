import StudentsTable from "../StudentsTable";

interface TabItem {
  label: string;
  key: string;
  children: React.ReactElement;
}

export const items: TabItem[] = [
  {
    label: "Students",
    key: "1",
    children: <StudentsTable />,
  },
  {
    label: "Groups",
    key: "2",
    children: <>element 2</>,
  },
];
