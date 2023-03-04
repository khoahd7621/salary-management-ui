import { DeploymentUnitOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

import { AppRoutes } from '~/models/constants/Routes';
import { Salary } from '~/models/modules/salaries';
import { formatMoney } from '~/utils/format';

import styles from '~/styles/components/payroll.module.scss';

export interface PayrollProps {
  data: Salary;
}

export default function Payroll({ data }: PayrollProps) {
  const router = useRouter();

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
            <td className={styles['title']}>Standard working hours:</td>
            <td className={styles['align-left']}>{data.standardWorkHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Actual hours:</td>
            <td className={styles['align-left']}>{data.realityWorkHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Overtime hours:</td>
            <td className={styles['align-left']}>{data.overtimeHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Number of hours off:</td>
            <td className={styles['align-left']}>{data.leaveHours}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Base salary:</td>
            <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.baseSalary || 0)}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Total salary</td>
            <td>
              <table width={'100%'} border={1}>
                <tbody>
                  <tr>
                    <td className={styles['sub-title']}>Basic salary/hour:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.baseSalaryPerHour || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Overtime salary/hour:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.ovetimeSalaryPerHour || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Total bonus:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.totalBonus || 0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Salary deductions:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.totalDeductions || 0)}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Total income:</td>
                    <td className={styles['align-left']}>
                      {formatMoney.VietnamDong.format(data.baseSalary + data.totalBonus - data.totalDeductions || 0)}
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
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.socialInsurance)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Payment of accident insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.accidentInsurance)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Payment of health insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.healthInsurance)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>Payment of TAX:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(data.tax)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>Actually received:</td>
            <td className={styles['align-left']}>
              <span className={styles['total']}>{formatMoney.VietnamDong.format(data.finalIncome || 0)}</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <button>Save</button>
        <button onClick={async () => await router.push(`/${AppRoutes.salaries}`)}>Cancel</button>
      </div>
    </div>
  );
}
