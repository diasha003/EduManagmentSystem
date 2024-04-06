import {
  CalendarOutlined,
  CaretDownOutlined,
  CarryOutOutlined,
  CloudUploadOutlined,
  PlusOutlined,
  PrinterOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Space, Calendar } from "antd";
import "./Calendar.style.css";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import QuickAddLessonModalForm from "./components/QuickAddLessonModalForm";

const calendarAddOptions: MenuProps["items"] = [
  {
    icon: <CarryOutOutlined />,
    key: 0,
    label: "Quick-Add Lesson",
  },
  {
    icon: <CalendarOutlined />,
    key: 1,
    label: "Add New Event",
  },
  {
    icon: <CloudUploadOutlined />,
    key: 2,
    label: "Add Non-Teaching Event",
  },
];

const calendarOptions: MenuProps["items"] = [
  {
    icon: <></>,
    key: 0,
    label: "Calendar Preferences",
  },
  {
    icon: <></>,
    key: 1,
    label: "Categories & Locations",
  },
  {
    icon: <></>,
    key: 2,
    label: "Lesson Note Templates",
  },

  {
    icon: <></>,
    key: 3,
    label: "Sync Calendar",
  },
];

const calendarDisplayType: MenuProps["items"] = [
  {
    key: 0,
    label: "Month",
  },
  {
    key: 1,
    label: "Year",
  },
];

const CalendarTest: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    })
  );

  const onSelectDate = (date: Dayjs) => {
    const d = new Date(date.toDate());
    const monthName = d.toLocaleString("en-GB", {
      month: "long",
      year: "numeric",
    });
    setSelectedDate(monthName);
  };

  const dateSelectionOption: MenuProps["items"] = [
    {
      key: 0,
      label: (
        <div
          style={{ width: 290, border: "1px solid #d9d9d9", borderRadius: 4 }}
        >
          <Calendar
            fullscreen={false}
            mode="year"
            onSelect={(date) => onSelectDate(date)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "10px 15px",
        }}
      >
        <Dropdown menu={{ items: dateSelectionOption }} trigger={["click"]}>
          <Space>
            {selectedDate}
            <CaretDownOutlined />
          </Space>
        </Dropdown>

        {/* <a>Today</a> */}
        <QuickAddLessonModalForm></QuickAddLessonModalForm>
      </div>

      <div
        style={{
          margin: "5px 15px",
          padding: "1px 10px",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "16px 0px",
          }}
        >
          <Space>
            <Dropdown menu={{ items: calendarAddOptions }} trigger={["click"]}>
              <Button icon={<PlusOutlined />} type="primary" className="button">
                <Space>
                  Add Event
                  <CaretDownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Dropdown menu={{ items: calendarOptions }} trigger={["click"]}>
              <Button
                icon={<SettingOutlined />}
                type="default"
                className="button"
              >
                <Space>
                  Options
                  <CaretDownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Button
              icon={<PrinterOutlined />}
              type="default"
              className="button"
            >
              Print
            </Button>
          </Space>
          <Space>
            <Dropdown menu={{ items: calendarDisplayType }} trigger={["click"]}>
              <Button type="default" className="button">
                <Space>
                  Display Type
                  <CaretDownOutlined />
                </Space>
              </Button>
            </Dropdown>

            <Button>Search</Button>
          </Space>
        </div>

        <Calendar
          style={{
            borderTopStyle: "groove",
          }}
          onSelect={(date) => onSelectDate(date)}
        ></Calendar>
      </div>
    </>
  );
};

export default CalendarTest;
