import { Salary } from '~/models/modules/salaries';
import { formatMoney } from '~/utils/format';

export interface PayRollProps {
  data: Salary;
}

export default function PayRoll({ data }: PayRollProps) {
  return (
    <table>
      <tr>
        <td>Full name:</td>
        <td>{data.contract.employee.name}</td>
      </tr>
      <tr>
        <td>Position:</td>
        <td>{data.contract.job}</td>
      </tr>
      <tr>
        <td>Standard working hours:</td>
        <td>{data.standardWorkHours}</td>
      </tr>
      <tr>
        <td>Actual hours:</td>
        <td>{data.realityWorkHours}</td>
      </tr>
      <tr>
        <td>Overtime hours:</td>
        <td>{data.overtimeHours}</td>
      </tr>
      <tr>
        <td>Number of hours off:</td>
        <td>{data.leaveHours}</td>
      </tr>
      <tr>
        <td>Base salary:</td>
        <td>{formatMoney.VietnamDong.format(data.baseSalary || 0)}</td>
      </tr>
      <tr>
        <td>Total salary</td>
        <td>
          <tr>
            <td>Basic salary/hour:</td>
            <td>{formatMoney.VietnamDong.format(data.baseSalaryPerHour || 0)}</td>
          </tr>
          <tr>
            <td>Overtime salary/hour:</td>
            <td>{formatMoney.VietnamDong.format(data.ovetimeSalaryPerHour || 0)}</td>
          </tr>
          <tr>
            <td>Total bonus:</td>
            <td>{formatMoney.VietnamDong.format(data.totalBonus || 0)}</td>
          </tr>
          <tr>
            <td>Salary deductions:</td>
            <td>{formatMoney.VietnamDong.format(data.totalDeductions || 0)}</td>
          </tr>
          <tr>
            <td>Total income:</td>
            <td>{formatMoney.VietnamDong.format(data.finalIncome || 0)}</td>
          </tr>
        </td>
      </tr>
      <tr>
        <td>Items to be deducted from salary:</td>
        <td>
          <tr>
            <td>Payment of social insurance contributions:</td>
            <td>{formatMoney.VietnamDong.format(data.socialInsurance)}</td>
          </tr>
          <tr>
            <td>Payment of accident insurance contributions:</td>
            <td>{formatMoney.VietnamDong.format(data.accidentInsurance)}</td>
          </tr>
          <tr>
            <td>Payment of health insurance contributions:</td>
            <td>{formatMoney.VietnamDong.format(data.healthInsurance)}</td>
          </tr>
          <tr>
            <td>Payment of TAX:</td>
            <td>{formatMoney.VietnamDong.format(data.tax)}</td>
          </tr>
        </td>
      </tr>
      <tr>
        <td>Actually received:</td>
        <td>{formatMoney.VietnamDong.format(data.finalIncome || 0)}</td>
      </tr>
    </table>
  );
}
