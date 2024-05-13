import { Select, SelectProps } from 'antd';
import './SelectCenterName.style.css';

export type SelectCenterNameProps = {
    allCenterName?: string[];
};

export function SelectCenterName({ allCenterName }: SelectCenterNameProps) {
    const options: SelectProps['options'] = allCenterName?.map((item, key) => ({
        value: key,
        label: item
    }));

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <Select
            style={{ width: '150px', height: 'auto' }}
            showSearch
            placeholder="Center Name"
            optionFilterProp="children"
            //filterOption={(input, option) => (option?.label ?? '').includes(input)}
            //filterSort={(optionA, optionB) => (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())}
            onChange={handleChange}
            options={options}
            // options={[
            //     {
            //         value: '1',
            //         label: 'Not Identified fghngjhjh'
            //     },
            //     {
            //         value: '2',
            //         label: 'Closed'
            //     }
            // ]}
        />
    );
}
