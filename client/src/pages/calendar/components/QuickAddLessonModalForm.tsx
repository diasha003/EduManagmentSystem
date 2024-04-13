import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Form,
  GetProp,
  Input,
  Modal,
  Radio,
  Row,
  Select,
  TimePicker,
} from "antd";
import { Option } from "antd/es/mentions";
import { useState } from "react";

import { RedoOutlined } from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const QuickAddLessonModalForm: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [frequencyType, setFrequencyType] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        modal
      </Button>
      <Modal
        title="Quick-Add Lesson"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width="720px"
      >
        <Form layout="vertical">
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item name="teacher" label="Teacher">
                <Select placeholder="select">
                  <Option value="teacher_1">Teacher_1</Option>
                  <Option value="teacher_2">Teacher_2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Student"
                name="student"
              //rules={[{ required: true, message: "Please input " }]}
              >
                <Select placeholder="select">
                  <Option value="student_1">Student_1</Option>
                  <Option value="student_2">Student_2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item name="" label="Date">
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="" label="Time">
                <TimePicker
                  defaultValue={dayjs("12:08", "HH:mm")}
                  style={{ width: "100%" }}
                  format="HH:mm"
                />
              </Form.Item>
            </Col>
          </Row>

          <Checkbox /*checked={checked} d onChange={onChange}*/>
            This event repeats
          </Checkbox>

          <div className="blockFrequencyType">

            <div style={{ display: "flex", flexDirection: "row", marginBottom: "10px" }}>
              <RedoOutlined />
              <h3 style={{ margin: "0 0 0 10px" }}>Recurring Event</h3>
            </div>

            <div style={{ marginBottom: "10px" }}>
              <p>Frequency</p>
              <Radio.Group
                name="frequency"
                onChange={(e) => {
                  setFrequencyType(e.target.value);
                }}
              >
                <Radio value="1">Daily</Radio>
                <Radio value="2">Weekly</Radio>
                <Radio value="3">Monthly</Radio>
                <Radio value="4">Yearly</Radio>
              </Radio.Group>
            </div>

            {frequencyType === "1" && (
              <div>
                <div style={{ marginBottom: "10px" }}>
                  <p>Repeat On</p>
                  <CheckboxGroup options={plainOptions} onChange={onChange} />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <p>Repeat Until</p>
                  <DatePicker style={{ width: "100%" }} />
                </div>
                <div>
                  <Checkbox onChange={() => { }}>Repeat indefinitely</Checkbox>
                </div>
              </div>
            )}

            {frequencyType === "2" && (
              <>
                <Row gutter={14}>
                  <Col span={12}>
                    <Form.Item name="every_week" label="Every">
                      <Input defaultValue="1" suffix="Week(s)"></Input>
                    </Form.Item>

                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Repeat Until"
                      name=""
                    >

                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <Checkbox onChange={() => { }}>Repeat indefinitely</Checkbox>
                </div>
              </>
            )}


            {frequencyType === "3" && (
              <>
                <div style={{ marginBottom: "10px" }}>
                  <p>Repeat On</p>
                  <Radio.Group onChange={() => {}}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>

                  </Radio.Group>
                </div>
                <Row gutter={14}>
                  <Col span={12}>
                    <Form.Item name="every_month" label="Every">
                      <Input defaultValue="1" suffix="Month(s)"></Input>
                    </Form.Item>

                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Repeat Until"
                      name=""
                    >

                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <div>
                  <Checkbox onChange={() => { }}>Repeat indefinitely</Checkbox>
                </div>
              </>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default QuickAddLessonModalForm;
