import { ArrowDownOutlined, ArrowUpOutlined, CaretDownOutlined, SortAscendingOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { DataGridColumn } from '../DataGrid';
import { useState } from 'react';

import './ColumnSorter.style.css';

export type ColumnSorterProps<T> = {
    columns: DataGridColumn<T>[];
    onSwitchSortOrder?: (key: string) => void;
};

export function ColumnSearch<T>({ columns, onSwitchSortOrder }: ColumnSorterProps<T>) {
    const [open, setOpen] = useState<boolean>(false);

    const _renderSortItem = ({ title, sortOrder }: DataGridColumn<T>) => {
        return (
            <span className="sorterItem">
                <>{title}</>
                <>
                    {sortOrder ? (
                        <>{sortOrder === 'descend' ? <ArrowDownOutlined className="stateSortIcon" /> : <ArrowUpOutlined className="stateSortIcon" />}</>
                    ) : (
                        <div className="sorterIcon">
                            <ArrowUpOutlined className="stateSortIcon" />
                        </div>
                    )}
                </>
            </span>
        );
    };

    const sortMenuItems: MenuProps['items'] = [
        {
            label: <a href="#">Clear Sort</a>,
            key: 'clear'
        },
        { type: 'divider' },
        ...columns.map((c) => ({
            key: c.key as string,
            label: _renderSortItem(c)
        })),


        
    ];

    const menuProps = {
        items: sortMenuItems,
        onClick: (e: { key: string }) => {
            onSwitchSortOrder?.(e.key);
            setOpen(false);
        }
    };

    return (
        <Dropdown open={open} menu={menuProps} trigger={['click']}>
            <Button icon={<SortAscendingOutlined />} onClick={() => setOpen(!open)}>
                Sort
                <CaretDownOutlined />
            </Button>
        </Dropdown>
    );
}
