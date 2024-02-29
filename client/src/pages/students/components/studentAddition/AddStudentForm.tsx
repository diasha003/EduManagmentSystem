import { Button, Col, Collapse, DatePicker, Form, Input, Radio, RadioChangeEvent, Row, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddStudentForm.css";
import { PlusOutlined } from "@ant-design/icons";

const AddStudentForm: React.FC = () => {

  const [status, setStatus] = useState(1);
  const { Option } = Select;

  const onChangeRadioGroupStatus = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setStatus(e.target.value);
  };

  return (
    <Form layout="vertical" className="formStyle">
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
        expandIcon={({ isActive }) =>
          < PlusOutlined rotate={isActive ? 90 : 0} />}
        ghost

        items={[{
          key: '1',
          label: 'Show',
          children:
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
                  <Form.Item name="school_university" label="School/University">
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
                  <Form.Item name="skills_hobbys" label="Skills/Hobbys" extra="Use press the Enter key to separate entries">
                    <Select
                      mode="tags"
                      style={{
                        width: '100%',
                        padding: 0
                      }}
                      placeholder="Tags Mode"
                      options={[{}]}
                      dropdownStyle={{ display: 'none' }}
                      showSearch={false}
                      suffixIcon={<></>}
                    />

                  </Form.Item>
                </Col>
              </Row>
            </>
        }]}
      />

      <Row gutter={10}>
        <Col span={22}>
          <Form.Item name="" label="Status">
            <Radio.Group onChange={onChangeRadioGroupStatus} value={status}>
              <Radio value={1}>Active</Radio>
              <Radio value={2}>Trial</Radio>
              <Radio value={3}>Inactive</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>

      </Row>

    </Form >

  );
};

export default AddStudentForm;

