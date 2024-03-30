import React, { useState } from "react";
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { DeleteOutlined, PlusOutlined, RightOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

import "./AddStudentForm.css";

const AddStudentForm: React.FC = () => {
  const { Option } = Select;

  const { Text } = Typography;

  //let teachers = new Array<string>;

  const [status, setStatus] = useState();
  const [studentType, setStudentType] = useState<Number>();
  const [hasFamily, setHasFamily] = useState<Boolean | null>(null);
  const [isAssignTeacherClicked, setIsAssignTeacherClicked] =
    useState<boolean>(false);
  const [billingType, setBillingType] = useState<string>("auto");

  const onChangeRadioGroupStatus = (e: RadioChangeEvent) => {
    setStatus(e.target.value);
  };

  const onChangeRadioGroupType = (e: RadioChangeEvent) => {
    setStudentType(e.target.value);
  };

  const onChangeRadioGroupHasFamily = (e: RadioChangeEvent) => {
    setHasFamily(e.target.value);
  };

  const onChangeRadioGroupBillingType = (e: RadioChangeEvent) => {
    setBillingType(e.target.value);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form layout="vertical" className="formStyle" onFinish={onFinish}>
      <Row gutter={10}>
        <Col span={11}>
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: "Please input  ",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: "Please input " }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={11}>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item label="Phone Number" name="phone_number">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Collapse
        expandIcon={({ isActive }) => (
          <PlusOutlined rotate={isActive ? 90 : 0} />
        )}
        ghost
        items={[
          {
            key: "1",
            label: "Show",
            children: (
              <>
                <Row gutter={10}>
                  <Col span={11}>
                    <Form.Item name="gender" label="Gender  ">
                      <Select placeholder="select your gender">
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={11}>
                    <Form.Item name="birthday" label="Birthday">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={11}>
                    <Form.Item
                      name="school_university"
                      label="School/University"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={11}></Col>
                </Row>
                <Row gutter={10}>
                  <Col span={11}>
                    <Form.Item name="student_since" label="Student Since">
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={11}></Col>
                </Row>
                <Row gutter={10}>
                  <Col span={22}>
                    <Form.Item
                      name="skills_hobbys"
                      label="Skills/Hobbys"
                      extra="Use press the Enter key to separate entries"
                    >
                      <Select
                        mode="tags"
                        style={{
                          width: "100%",
                          padding: 0,
                        }}
                        placeholder="Tags Mode"
                        options={[{}]}
                        dropdownStyle={{ display: "none" }}
                        showSearch={false}
                        suffixIcon={<></>}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </>
            ),
          },
        ]}
      />

      <Row>
        <Col span={22}>
          <Form.Item
            name="status"
            label="Student Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group onChange={onChangeRadioGroupStatus} value={status}>
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Trial</Radio>
              <Radio value={3}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Divider />
      </Row>

      <Row>
        <Col span={22}>
          <Form.Item
            name="type"
            label="Sdutent Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Radio.Group onChange={onChangeRadioGroupType} value={studentType}>
              <Radio value={1}>Adult</Radio>
              <Radio value={2}>Child</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={22}>
          <Form.Item
            name="hasFamily"
            label="This student's family is a/an"
            rules={[
              {
                required: true,
              },
            ]}
            extra="Creates a new account in Families & Invoices"
          >
            <Radio.Group onChange={onChangeRadioGroupHasFamily}>
              <Radio value={false} style={{ marginRight: "190px" }}>
                New Family
              </Radio>
              <Radio value={true}>Existing Family</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      {typeof hasFamily === "boolean" &&
        (!hasFamily ? (
          <>
            <Row gutter={10}>
              <Col span={11}>
                <Form.Item
                  name="parent_first_name"
                  label="Parent First Name"
                  rules={[
                    {
                      required: !hasFamily,
                      message: "Please input  ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item
                  label="Parent Last Name"
                  name="parent_last_name"
                  rules={[{ required: !hasFamily, message: "Please input " }]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={11}>
                <Form.Item name="parent_email" label="Email">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={11}>
                <Form.Item label="Phone Number" name="parent_phone_number">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={22}>
                <Form.Item
                  name="parent_address"
                  label="Address"
                  style={{ padding: 0 }}
                >
                  <TextArea rows={3} />
                </Form.Item>
              </Col>
            </Row>
          </>
        ) : (
          <Row gutter={10}>
            <Col span={11}>
              <Form.Item
                name="family_list"
                label="Family"
                rules={[
                  {
                    required: hasFamily,
                  },
                ]}
              >
                <Select placeholder="Please select a family">
                  <Option value="1">test-1</Option>
                  <Option value="2">test-2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}></Col>
          </Row>
        ))}

      <Divider />

      <Row style={{ alignItems: "center" }} gutter={10}>
        <Col span={11}>
          <Text>Assign Teachers</Text>
        </Col>
        <Col span={11} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            size="middle"
            icon={<PlusOutlined />}
            style={{ marginRight: 0 }}
            onClick={() => {
              //получить teachers
              // teachers.push("test-1", "test_2");
              // console.log(teachers.length !== 0);

              setIsAssignTeacherClicked(true);
            }}
          >
            Assign Teachers
          </Button>
        </Col>
      </Row>

      {/* нужно будет получать список учителей и проходится по им */}
      {isAssignTeacherClicked && (
        <>
          <Row style={{ alignItems: "center" }} gutter={10}>
            <Col span={11}>
              <Form.Item name="teacher_list" label="Teacher">
                <Select placeholder="Please select a teacher">
                  <Option value="1">test-teacher-1</Option>
                  <Option value="2">test-teqcher-2</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              span={11}
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                size="middle"
                icon={<DeleteOutlined />}
                style={{ marginRight: 0 }}
              />
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={11}>
              <Form.Item name="lesson_category" label="Default Lesson Category">
                <Select
                  placeholder="Please select a lesson category"
                  defaultValue={"lesson"}
                >
                  <Option value="group_lesson">Group Lesson</Option>
                  <Option value="lesson">Lesson</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={11}>
              <Form.Item name="lesson_length" label="Default Lesson Length">
                <Input suffix="minutes" defaultValue={30} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={11}>
              <Form.Item
                name="type_billing"
                label="Default Billing"
                extra="Charges will automatically adjust to lesson length"
              >
                <Radio.Group
                  onChange={onChangeRadioGroupBillingType}
                  value={billingType}
                  defaultValue={"auto"}
                >
                  <Space direction="vertical">
                    <Radio value="auto">
                      Don't automatically create any calendar-generated charges
                    </Radio>
                    <Radio value="Per Lesson">
                      Student pays based on the number of lessons taken
                    </Radio>
                    <Radio value="Per Month">
                      Student pays the same amount each month regardless of
                      number of lessons
                    </Radio>
                    <Radio value="Per Hour">Student pays an hourly rate</Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={11}></Col>
          </Row>

          {billingType !== "auto" ? (
            <Row gutter={10}>
              <Col span={11}>
                <Form.Item
                  name="price"
                  label="Price"
                  rules={[{ required: billingType !== "auto" }]}
                >
                  <Input prefix="$" suffix={billingType} defaultValue={30} />
                </Form.Item>
              </Col>
              <Col span={11}></Col>
            </Row>
          ) : (
            <></>
          )}
        </>
      )}

      <Divider />

      <Row>
        <Col span={22}>
          <Form.Item name="note" label="Note" style={{ padding: 0 }}>
            <span style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: "14px" }}>
              Use this area for any private notes you wish to keep.
            </span>
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={11}></Col>
        <Col span={11} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Form.Item>
            <Space>
              <Button htmlType="submit">Cancel</Button>
              <Button
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginRight: 0,
                }}
                type="primary"
              >
                Next
                <RightOutlined style={{ marginLeft: 8 }} />
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default AddStudentForm;
