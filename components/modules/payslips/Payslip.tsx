import { DeploymentUnitOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import { Payslip as PayslipModel, Type } from '~/models/modules/payslips';
import { formatMoney } from '~/utils/format';

import styles from '~/styles/components/payroll.module.scss';

export interface PayslipProps {
  data: PayslipModel;
}

export const Payslip = ({ data }: PayslipProps) => {
  return (
    <div className={styles['payroll-container']}>
      <div className={styles['header']}>
        <div className={styles['logo']}>
          <DeploymentUnitOutlined />
        </div>
        <div className={styles['infor']}>
          {data.paidType === Type.Staff && <h2>Employee salary slip</h2>}
          {data.paidType === Type.Partner && <h2>Partner salary slip</h2>}

          <h3>{dayjs(data.paidDate).format('MMMM YYYY')}</h3>
          <div>Unit: VND</div>
        </div>
      </div>

      <section style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <b>Note:</b>
        <span>{data.note || 'N/a'}</span>
      </section>

      <table className={styles['table']} width={'100%'} border={1}>
        <tbody>
          <tr>
            <td className={styles['title']}>Full name:</td>
            <td className={styles['align-left']}>{data.contract.employee.name || 'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Position:</td>
            <td className={styles['align-left']}>{data.contract.job || 'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(A) Standard working hours:</td>
            <td className={styles['align-left']}>{data.standardWorkHours || 0}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(B) Overtime hours:</td>
            <td className={styles['align-left']}>{data.overtimeHours || 0}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(C) Number of hours off:</td>
            <td className={styles['align-left']}>{data.leaveHours || 0}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(D = A + B - C) Actual hours:</td>
            <td className={styles['align-left']}>
              {data.standardWorkHours + data.overtimeHours - data.leaveHours || 0}
            </td>
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
          {data.paidType === Type.Staff && (
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
                      <td className={styles['align-left']}>
                        {formatMoney.VietnamDong.format(data.socialInsurance || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles['sub-title']}>(L) Payment of accident insurance contributions:</td>
                      <td className={styles['align-left']}>
                        {formatMoney.VietnamDong.format(data.accidentInsurance || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles['sub-title']}>(M) Payment of health insurance contributions:</td>
                      <td className={styles['align-left']}>
                        {formatMoney.VietnamDong.format(data.healthInsurance || 0)}
                      </td>
                    </tr>
                    <tr>
                      <td className={styles['sub-title']}>(N) Payment of TAX:</td>
                      <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.tax || 0)}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
          <tr>
            <td className={styles['title']}>{data.paidType === Type.Staff ? '(J - O)' : '(J)'} Actually received:</td>
            <td className={styles['align-left']}>
              <span className={styles['total']}>{formatMoney.VietnamDong.format(data.finalIncome || 0)}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
