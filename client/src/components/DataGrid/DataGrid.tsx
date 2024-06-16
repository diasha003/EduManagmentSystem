import { Button, GetProp, Select, SelectProps, Space, Table } from 'antd';
import { ColumnSorter } from '../DataGrid/columnSorter/ColumnSorter';
import { ColumnType, TableProps } from 'antd/es/table';
import { ColumnSelector } from '../DataGrid/columnSelector/ColumnSelector';
import { useCallback, useState } from 'react';
import { SorterResult } from 'antd/es/table/interface';
import { SelectCenterName } from './selectCenterName/SelectCenterName';

export type DataGridProps<T> = {
    toolbar?: JSX.Element;
    showColumnsSelector?: boolean;
    showSort?: boolean;
    showSelectCenterName?: boolean;

    columns: DataGridColumn<T>[];
    dataSource: T[];
    allCenterName?: string[];
    setPage?: (numberPage: number) => void;
    countRecords?: number;
};

export type DataGridColumn<T> = {
    key: string;
    hidden?: boolean;
    title?: string;
    dataIndex?: string;
    width?: number;
    fixed?: 'left' | 'right';
    sorter?: (a: T, b: T) => number;
    sortOrder?: 'ascend' | 'descend';
    render?: (value: any, record: T, index: number) => React.ReactNode;
};

export type DataGridExtendedColumn<T> = DataGridColumn<T> & {
    defaultHidden?: boolean;
};

export function DataGrid<T>({ toolbar, showColumnsSelector, showSort, showSelectCenterName, columns, dataSource, allCenterName, setPage, countRecords }: DataGridProps<T>) {
    const [cols, setCols] = useState<DataGridExtendedColumn<T>[]>(columns.map((c) => ({ ...c, defaultHidden: c.hidden })));

    const onSwitchShowColumn = useCallback(
        (key: string) => {
            if (key === 'all') {
                setCols(cols.map((c) => ({ ...c, hidden: false })));
                return;
            } else if (key === 'default') {
                setCols(cols.map((c) => ({ ...c, hidden: c.defaultHidden })));
                return;
            }

            const column = cols.find((c) => c.key === key);
            if (!column) return;

            setCols(cols.map((c) => (c.key === key ? { ...column, hidden: !c.hidden } : c)));
        },
        [cols]
    );

    const onSwitchSortOrder = useCallback(
        (key: string) => {
            if (key === 'clear') {
                setCols(cols.map((c) => ({ ...c, sortOrder: undefined })));
                return;
            }

            const column = cols.find((c) => c.key === key);
            if (!column) return;

            setCols(
                cols.map((c) =>
                    c.key === key
                        ? {
                              ...column,
                              sortOrder: column.sortOrder ? (column.sortOrder === 'ascend' ? 'descend' : 'ascend') : 'ascend'
                          }
                        : {
                              ...c,
                              sortOrder: undefined
                          }
                )
            );
        },
        [cols]
    );

    const handleHeaderClick = (sorter: SorterResult<any>) => {
        console.log(sorter.column?.key);
        if (!sorter.column?.key) {
            onSwitchSortOrder('clear');
            return;
        }

        onSwitchSortOrder(sorter.column.key.toString());
    };

    return (
        <div
            style={{
                margin: '5px 15px',
                padding: '10px 10px',
                background: 'white'
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',

                    margin: '16px 0px'
                }}
            >
                {toolbar}
                <Space align="center">
                    {showColumnsSelector && <ColumnSelector columns={cols} onSwitchColumn={onSwitchShowColumn} />}
                    {showSort && <ColumnSorter columns={cols} onSwitchSortOrder={onSwitchSortOrder} />}
                    {/* <Button>Search</Button> */}
                    {showSelectCenterName && <SelectCenterName allCenterName={allCenterName} />}
                </Space>
            </div>

            <Table
                columns={cols as ColumnType<any>[]}
                onChange={(_a, _b, sorter, _e) => {
                    handleHeaderClick(sorter as unknown as SorterResult<any>);
                }}
                dataSource={dataSource}
                scroll={{ x: 1500, y: 1200 }}
                //loading={loadingSpinner}
                pagination={{
                    position: ['bottomCenter'],
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    onChange: (page, pageSize) => {
                        setPage && setPage(page);

                        //fetchRecords(page, pageSize);
                    },
                    total: countRecords ? countRecords : 0
                }}
                onRow={(record, rowIndex) => {
                    return {
                        onClickCapture: (event) => {
                            // console.log(record);
                            // console.log(1)
                        }
                    };
                }}
            />
        </div>
    );
}
