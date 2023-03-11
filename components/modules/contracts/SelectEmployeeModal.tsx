import { Button, Input, message, Modal } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';

import { employeeApi } from '~/api-clients/modules/employee-api';
import { Employee } from '~/models/modules/employees';

export interface ComponentProps {
  setEmployee: (_value: Employee | null) => void;
  employee?: Employee | null;
  employeeName: string;
}

export const SelectEmployeeModal = ({ setEmployee, employeeName, employee }: ComponentProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<Employee[]>([]);
  const [currentRow, setCurrentRow] = useState<Employee | null>(employee || null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await employeeApi.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
  };

  const columns: ColumnsType<Employee> = [
    {
      title: 'Code',
      dataIndex: 'code',
    },
    {
      title: 'Employee Name',
      dataIndex: 'name',
    },
  ];

  const handleSelectRow = (_selectedRowKeys: React.Key[], selectedRows: Employee[]) => {
    setCurrentRow(selectedRows[0]);
  };

  const handleClickRow = (record: Employee) => {
    return {
      onClick: () => {
        setCurrentRow(record);
      },
    };
  };

  // Filter the data based on the search text
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase()) ||
      item.code.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Button style={{ width: '100%', textAlign: 'start' }} onClick={() => setModalOpen(true)}>
        {employeeName}
      </Button>
      <Modal
        title="Select employee"
        centered
        open={modalOpen}
        onOk={() => {
          if (currentRow) {
            setEmployee(currentRow);
          }
          setModalOpen(false);
        }}
        onCancel={() => setModalOpen(false)}
      >
        <div>
          <Input.Search
            placeholder="Search by name"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200, marginTop: 8, marginBottom: 16, float: 'right' }}
            allowClear
          />
        </div>
        <Table
          rowSelection={{
            type: 'radio',
            selectedRowKeys: currentRow ? [currentRow.employeeId] : [],
            onChange: handleSelectRow,
          }}
          size="small"
          rowKey={(record) => record.employeeId}
          onRow={handleClickRow}
          columns={columns}
          dataSource={filteredData}
          className="table-selection"
        />
      </Modal>
    </>
  );
};
