import { DeploymentUnitOutlined } from '@ant-design/icons';
import { Button, InputNumber, Space } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { AppRoutes } from '~/models/constants/Routes';
import { Salary } from '~/models/modules/salaries';
import { formatMoney } from '~/utils/format';

import styles from '~/styles/components/payroll.module.scss';

export interface PayrollProps {
  data: Salary;
}

interface EditSalary {
  standardWorkHours: number;
  overTimeHours: number;
  leaveHours: number;
}

export default function Payroll({ data }: PayrollProps) {
  const router = useRouter();

  const [salary, setSalary] = useState<Salary>(data);
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editSalary, setEditSalary] = useState<EditSalary>({
    standardWorkHours: data.standardWorkHours,
    overTimeHours: data.overtimeHours,
    leaveHours: data.leaveHours,
  });

  const handleEditOk = () => {
    setOnEdit(false);
    setSalary({
      ...salary,
      standardWorkHours: editSalary.standardWorkHours,
      overtimeHours: editSalary.overTimeHours,
      leaveHours: editSalary.leaveHours,
      realityWorkHours: editSalary.standardWorkHours - editSalary.leaveHours,
    });
  };

  const handleEditCancel = () => {
    setOnEdit(false);
    setSalary(data);
    setEditSalary({
      standardWorkHours: data.standardWorkHours,
      overTimeHours: data.overtimeHours,
      leaveHours: data.leaveHours,
    });
  };

  return (
    <div className={styles['payroll-container']}>
      <div className={styles['header']}>
        <div className={styles['logo']}>
          <DeploymentUnitOutlined />
        </div>
        <div className={styles['infor']}>
          <h1>Employee salary slip</h1>
          <h3>{dayjs().format('MMMM YYYY')}</h3>
          <div>Unit: VND</div>
        </div>
      </div>

      <div className={styles['action']}>
        {!onEdit ? (
          <a onClick={() => setOnEdit(true)}>Edit</a>
        ) : (
          <>
            <Button type="primary" onClick={handleEditOk}>
              Ok
            </Button>
            <Button type="dashed" danger onClick={handleEditCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>

      <table className={styles['table']} width={'100%'} border={1}>
        <tbody>
          <tr>
            <td className={styles['title']}>Full name:</td>
            <td className={styles['align-left']}>{salary.contract.employee.name}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Position:</td>
            <td className={styles['align-left']}>{salary.contract.job}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Standard working hours:</td>
            <td className={styles['align-left']}>
              {!onEdit ? (
                salary.standardWorkHours
              ) : (
                <InputNumber
                  min={1}
                  max={200}
                  value={editSalary.standardWorkHours}
                  onChange={(value) => setEditSalary({ ...editSalary, standardWorkHours: Number(value) })}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>Actual hours:</td>
            <td className={styles['align-left']}>{salary.realityWorkHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Overtime hours:</td>
            <td className={styles['align-left']}>
              {!onEdit ? (
                salary.overtimeHours
              ) : (
                <InputNumber
                  min={0}
                  max={200}
                  value={editSalary.overTimeHours}
                  onChange={(value) => setEditSalary({ ...editSalary, overTimeHours: Number(value) })}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>Number of hours off:</td>
            <td className={styles['align-left']}>
              {!onEdit ? (
                salary.leaveHours
              ) : (
                <InputNumber
                  min={0}
                  max={200}
                  value={editSalary.leaveHours}
                  onChange={(value) => setEditSalary({ ...editSalary, leaveHours: Number(value) })}
                />
              )}
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>Base salary:</td>
            <td className={styles['align-left']}>{formatMoney.VietnamDong.format(salary.baseSalary || 0)}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Total salary</td>
            <td>
              <table width={'100%'} border={1}>
                <tbody>
                  <tr>
                    <td className={styles['sub-title']}>Basic salary/hour:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(salary.baseSalaryPerHour || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Overtime salary/hour:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(salary.ovetimeSalaryPerHour || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Total bonus:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(salary.totalBonus || 0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Salary deductions:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(salary.totalDeductions || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Total income:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(
                        salary.baseSalary + salary.totalBonus - salary.totalDeductions || 0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>Items to be deducted from salary:</td>
            <td>
              <table width={'100%'} border={1}>
                <tbody>
                  <tr>
                    <td className={styles['sub-title']}>Payment of social insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(salary.socialInsurance)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Payment of accident insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(salary.accidentInsurance)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Payment of health insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(salary.healthInsurance)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Payment of TAX:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(salary.tax)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>Actually received:</td>
            <td className={styles['align-left']}>
              <span className={styles['total']}>{formatMoney.VietnamDong.format(salary.finalIncome || 0)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <Space size="middle">
        <Button type="primary" style={{ background: 'red' }}>
          Save
        </Button>
        <Button onClick={async () => await router.push(`/${AppRoutes.salaries}`)}>Cancel</Button>
      </Space>
    </div>
  );
}
