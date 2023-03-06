import { DeploymentUnitOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

import styles from '~/styles/components/payroll.module.scss';
import { formatMoney } from '~/utils/format';

export interface PayslipProps {}

export const Payslip = (_props: PayslipProps) => {
  return (
    <div className={styles['payroll-container']}>
      <div className={styles['header']}>
        <div className={styles['logo']}>
          <DeploymentUnitOutlined />
        </div>
        <div className={styles['infor']}>
          <h1>Employee salary slip</h1>
          <h1>Partner salary slip</h1>
          <h3>{dayjs().format('MMMM YYYY')}</h3>
          <div>Unit: VND</div>
        </div>
      </div>

      <section style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
        <b>Note:</b>
        <span>Note</span>
      </section>

      <table className={styles['table']} width={'100%'} border={1}>
        <tbody>
          <tr>
            <td className={styles['title']}>Full name:</td>
            <td className={styles['align-left']}>{'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Position:</td>
            <td className={styles['align-left']}>{'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(A) Standard working hours:</td>
            <td className={styles['align-left']}>{'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(B) Overtime hours:</td>
            <td className={styles['align-left']}>{'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(C) Number of hours off:</td>
            <td className={styles['align-left']}>{'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(D = A + B - C) Actual hours:</td>
            <td className={styles['align-left']}>{'N/a'}</td>
          </tr>
          <tr>
            <td className={styles['title']}>(E) Base salary:</td>
            <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
          </tr>
          <tr>
            <td className={styles['title']}>Total salary</td>
            <td>
              <table width={'100%'} border={1}>
                <tbody>
                  <tr>
                    <td className={styles['sub-title']}>(F = E / A) Basic salary/hour:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(G = F * 1.5) Overtime salary/hour:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(H = G * B) Total bonus:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(I = F * C) Salary deductions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(J = E + H - I) Total income:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
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
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(L) Payment of accident insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(M) Payment of health insurance contributions:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                  <tr>
                    <td className={styles['sub-title']}>(N) Payment of TAX:</td>
                    <td className={styles['align-left']}>{formatMoney.VietnamDong.format(0)}</td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td className={styles['title']}>{'(J - O)' + '(J)'} Actually received:</td>
            <td className={styles['align-left']}>
              <span className={styles['total']}>{formatMoney.VietnamDong.format(0)}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
