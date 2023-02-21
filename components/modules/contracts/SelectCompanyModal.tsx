import { Button, Input, message, Modal } from 'antd';
import Table, { ColumnsType } from 'antd/lib/table';
import { useEffect, useState } from 'react';
import { companyApi } from '~/api-clients/modules/company-api';
import { Company } from '~/models/modules/companies';

export interface Props {
  setCompany: (_value: Company | null) => void;
  company?: Company;
  companyName: string;
}

export const SelectCompanyModal = ({ setCompany, companyName }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<Company[]>([]);
  const [currentRow, setCurrentRow] = useState<Company | null>(null);
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await companyApi.getAll();
      setData(response);
    } catch (error) {
      console.log(error);
      message.error('Something went wrong! Please refresh the page and try again!');
    }
  };

  const columns: ColumnsType<Company> = [
    {
      title: 'Company Name',
      dataIndex: 'companyName',
    },
  ];

  const handleSelectRow = (_selectedRowKeys: React.Key[], selectedRows: Company[]) => {
    setCurrentRow(selectedRows[0]);
    setCompany(selectedRows[0]);
  };

  const handleClickRow = (record: Company) => {
    return {
      onClick: () => {
        setCurrentRow(record);
        setCompany(record);
      },
    };
  };

  // Filter the data based on the search text
  const filteredData = data.filter((item) => item.companyName.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
      <Button style={{ width: '100%', textAlign: 'start' }} onClick={() => setModalOpen(true)}>
        {companyName}
      </Button>
      <Modal
        title="Select company"
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
      >
        <Input.Search
          placeholder="Search by name"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 200, marginTop: 8, marginBottom: 16 }}
          allowClear
        />
        <Table
          rowSelection={{
            type: 'radio',
            selectedRowKeys: currentRow ? [currentRow.companyId] : [],
            onChange: handleSelectRow,
          }}
          size="small"
          rowKey={(record) => record.companyId}
          onRow={handleClickRow}
          columns={columns}
          dataSource={filteredData}
        />
      </Modal>
    </>
  );
};
