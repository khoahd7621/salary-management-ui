import { DeploymentUnitOutlined } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { Salary } from '~/models/modules/salaries';
import { formatMoney } from '~/utils/format';

import styles from '~/styles/components/payroll.module.scss';

export interface PayrollTmpProps {
  data: Salary;
  type: string;
  button: 'Save' | 'Update';
  isSending: boolean;
  handleClickSave: (_salary: Salary, _note: string) => void;
  handleClickCancel: () => Promise<void>;
  textNote?: string;
  paidDate?: string;
}

export const PayrollTmp = ({
  data,
  type,
  button,
  isSending,
  handleClickCancel,
  handleClickSave,
  textNote = '',
  paidDate = '',
}: PayrollTmpProps) => {
  const { TextArea } = Input;

  const [note, setNote] = useState<string>(textNote);

  return (
    <div className={styles['payroll-container']}>
      <div className={styles['header']}>
        <div className={styles['logo']}>
          <DeploymentUnitOutlined />
        </div>
        <div className={styles['infor']}>
          {type === 'Staff' && <h1>Employee salary slip</h1>}
          {type === 'Partner' && <h1>Partner salary slip</h1>}
          <h3>
            {dayjs(paidDate || data.periodStartDate)
              .endOf('day')
              .format('MMMM YYYY')}
          </h3>
          <div>Unit: VND</div>
        </div>
      </div>

      <table className={styles['table']} width={'100%'} border={1}>
        <tbody>
          <tr>
            <td className={styles['title']}>Full name:</td>
            <td className={styles['align-left']}>{data.contract.employee.name}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Position:</td>
            <td className={styles['align-left']}>{data.contract.job}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(A) Standard working hours:</td>
            <td className={styles['align-left']}>{data.standardWorkHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(B) Overtime hours:</td>
            <td className={styles['align-left']}>{data.overtimeHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(C) Number of hours off:</td>
            <td className={styles['align-left']}>{data.leaveHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(D = A + B - C) Actual hours:</td>
            <td className={styles['align-left']}>{data.realityWorkHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(E) Base salary:</td>
            <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.baseSalary || 0)}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Total salary</td>
            <td>
              <table width={'100%'} border={1}>
                <tbody>
                  <tr>
                    <td className={styles['sub-title']}>(F = E / A) Basic salary/hour:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.baseSalaryPerHour || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(G = F * 1.5) Overtime salary/hour:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.ovetimeSalaryPerHour || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(H = G * B) Total bonus:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.totalBonus || 0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(I = F * C) Salary deductions:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.totalDeductions || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(J = E + H - I) Total income:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.baseSalary + data.totalBonus - data.totalDeductions || 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          {type === 'Staff' && (
            <tr>
              <td className={styles['title']}>
                (O = K + L + M + N)
                <br />
                Items to be deducted from salary:
              </td>
              <td>
                <table width={'100%'} border={1}>
                  <tbody>
                    <tr>
                      <td className={styles['sub-title']}>(K) Payment of social insurance contributions:</td>
                      <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.socialInsurance)}</td>
                    </tr>
                    <tr>
                      <td className={styles['sub-title']}>(L) Payment of accident insurance contributions:</td>
                      <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.accidentInsurance)}</td>
                    </tr>
                    <tr>
                      <td className={styles['sub-title']}>(M) Payment of health insurance contributions:</td>
                      <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.healthInsurance)}</td>
                    </tr>
                    <tr>
                      <td className={styles['sub-title']}>(N) Payment of TAX:</td>
                      <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.tax)}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
          <tr>
            <td className={styles['title']}>{type === 'Staff' ? '(J - O)' : '(J)'} Actually received:</td>
            <td className={styles['align-left']}>
              <span className={styles['total']}>{formatMoney.VietnamDong.format(data.finalIncome || 0)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <section style={{ marginBottom: '32px' }}>
        <h4>Note:</h4>
        <TextArea
          rows={4}
          placeholder="Enter note"
          maxLength={255}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </section>

      <Space size="middle">
        <Button
          disabled={isSending}
          type="primary"
          style={{ background: 'red' }}
          onClick={() => handleClickSave(data, note)}
        >
          {button}
        </Button>
        <Button disabled={isSending} onClick={handleClickCancel}>
          Cancel
        </Button>
      </Space>
    </div>
  );
};
