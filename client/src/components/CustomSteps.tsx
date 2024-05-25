import { Button, Steps } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface StepItem {
    key: number;
    content: JSX.Element;
}

interface StepProps {
    steps: StepItem[];
    description: string;
}

const CustomSteps = (props: StepProps) => {
    const items = props.steps.map((item) => ({ key: item.key, title: '' }));

    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <Steps current={current} items={items} size="small" />
            <Link to={`/${props.description.toLowerCase()}`} style={{ margin: '10px 0 19px 320px', alignSelf: 'flex-start' }}>
                Back to {props.description}
            </Link>

            {props.steps[current].content}

            <div style={{ marginTop: 24, marginRight: '320px', alignSelf: 'flex-end' }}>
                {current < props.steps.length - 1 && (
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => {
                            next();
                            //onNextFinish();
                        }}
                    >
                        Next
                    </Button>
                )}
                {current === props.steps.length - 1 && (
                    <Button
                        type="primary"
                        onClick={() => {
                            alert('finish');
                            //onDoneFinish();
                        }}
                    >
                        Done
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    );
};

export default CustomSteps;
