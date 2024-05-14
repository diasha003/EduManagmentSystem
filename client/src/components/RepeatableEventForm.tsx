import { RedoOutlined } from '@ant-design/icons';
import { Checkbox, Col, DatePicker, Form, Input, Radio, Row } from 'antd';
import { useState } from 'react';
import { dayOfWeek, getNumberOfWeek, nthNumber } from '../helpers/NumberHelper';
import { useForm, useWatch } from 'antd/es/form/Form';
import { FrequencyType } from '../models/enums/frequency.type';
import { RepeatableEventInfo } from '../models/api/repeatableEventInfo';

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export type RepeatableEventFormProps = {
    selectedDate: Date;
    onChange: (value: RepeatableEventInfo) => void;
};

const RepeatableEventForm: React.FC<RepeatableEventFormProps> = (props: RepeatableEventFormProps) => {
    const [form] = useForm<RepeatableEventInfo>();
    const [frequencyType, setFrequencyType] = useState<string>('');

    const repeatIdentity = useWatch('repeatIdentity', form);

    return (
        <Form form={form} layout="vertical" className="blockFrequencyType" onChange={() => props.onChange(form.getFieldsValue())}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: '10px'
                }}
            >
                <RedoOutlined />
                <h3 style={{ marginLeft: '10px' }}>Recurring Event</h3>
            </div>

            <Form.Item name="frequency" label="Frequency" style={{ marginBottom: '10px' }}>
                <Radio.Group
                    onChange={(e) => {
                        setFrequencyType(e.target.value);
                    }}
                >
                    {Object.values(FrequencyType).map((type) => (
                        <Radio value={type}>{type}</Radio>
                    ))}
                </Radio.Group>
            </Form.Item>

            {frequencyType === FrequencyType.Daily && (
                <div>
                    <Form.Item name="repeatOn" label="Repeat On" style={{ marginBottom: '10px' }}>
                        <CheckboxGroup options={plainOptions} />
                    </Form.Item>
                    {!repeatIdentity && (
                        <Form.Item name="repeatUntil" label="RepeatUntil" style={{ marginBottom: '10px' }}>
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                    )}
                    <Form.Item name="repeatIdentity" valuePropName="checked">
                        <Checkbox>Repeat indefinitely</Checkbox>
                    </Form.Item>
                </div>
            )}

            {frequencyType === FrequencyType.Weekly && (
                <>
                    <Row gutter={14}>
                        <Col span={12}>
                            <Form.Item name="everyWeek" label="Every">
                                <Input suffix="Week(s)" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {!repeatIdentity && (
                                <Form.Item label="Repeat Until" name="repeatUntil">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            )}
                        </Col>
                    </Row>
                    <Form.Item name="repeatIdentity" valuePropName="checked">
                        <Checkbox>Repeat indefinitely</Checkbox>
                    </Form.Item>
                </>
            )}

            {frequencyType === FrequencyType.Monthly && (
                <>
                    <Form.Item name="repeatOn" label="Repeat On" style={{ marginBottom: '10px' }}>
                        <Radio.Group>
                            <Radio value="selectedDate">
                                The {props.selectedDate.getDate()}
                                {nthNumber(props.selectedDate.getDate())} of the month
                            </Radio>
                            <Radio value="selectedDay">
                                Every {getNumberOfWeek(props.selectedDate)}
                                {nthNumber(getNumberOfWeek(props.selectedDate))} {dayOfWeek(props.selectedDate.getDay())}
                            </Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Row gutter={14}>
                        <Col span={12}>
                            <Form.Item name="everyMonth" label="Every">
                                <Input defaultValue="1" suffix="Month(s)" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {!repeatIdentity && (
                                <Form.Item label="Repeat Until" name="repeatUntil">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            )}
                        </Col>
                    </Row>
                    <Form.Item name="repeatIdentity" valuePropName="checked">
                        <Checkbox>Repeat indefinitely</Checkbox>
                    </Form.Item>
                </>
            )}

            {frequencyType === FrequencyType.Yearly && (
                <>
                    <Row gutter={14}>
                        <Col span={12}>
                            <Form.Item name="everyYear" label="Every">
                                <Input defaultValue="1" suffix="Year(s)"></Input>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            {!repeatIdentity && (
                                <Form.Item label="Repeat Until" name="repeatUntil">
                                    <DatePicker style={{ width: '100%' }} />
                                </Form.Item>
                            )}
                        </Col>
                    </Row>
                    <Form.Item name="repeatIdentity" valuePropName="checked">
                        <Checkbox>Repeat indefinitely</Checkbox>
                    </Form.Item>
                </>
            )}
        </Form>
    );
};

export default RepeatableEventForm;
