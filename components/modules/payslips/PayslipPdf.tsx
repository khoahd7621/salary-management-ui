import { Document, Page, StyleSheet, Text, View, Font } from '@react-pdf/renderer';
import dayjs from 'dayjs';

import { Payslip, Type } from '~/models/modules/payslips';
import { formatMoney } from '~/utils/format';

interface Props {
  data: Payslip;
}

Font.register({
  family: 'Ubuntu',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/questrial/v13/QdVUSTchPBm7nuUeVf7EuStkm20oJA.ttf',
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: '20px',
    backgroundColor: '#E4E4E4',
    fontFamily: 'Ubuntu',
  },
  header: {
    alignItems: 'center',
    fontFamily: 'Ubuntu',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #000',
    fontFamily: 'Ubuntu',
  },
  tr: {
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid #000',
    fontFamily: 'Ubuntu',
  },
  label: {
    fontSize: '14px',
    width: '200px',
    borderRight: '1px solid #000',
    padding: '4px 16px 4px 4px',
    marginRight: '16px',
    fontFamily: 'Ubuntu',
  },
  content: {
    fontSize: '12px',
    flex: '1',
    padding: '4px 0',
    fontFamily: 'Ubuntu',
  },
});

export const PayslipPdf = ({ data }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        {data.paidType === Type.Staff && (
          <Text style={{ fontSize: '26px', fontWeight: 'bold', margin: '4px 0' }}>Employee salary slip</Text>
        )}
        {data.paidType === Type.Partner && (
          <Text style={{ fontSize: '26px', fontWeight: 'bold', margin: '4px 0' }}>Partner salary slip</Text>
        )}
        <Text style={{ fontSize: '20px', fontWeight: 'medium', margin: '4px 0' }}>
          {dayjs(data.paidDate).format('MMMM YYYY')}
        </Text>
        <Text style={{ fontSize: '14px', margin: '4px 0' }}>Unit: VNĐ</Text>
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', margin: '8px 0' }}>
        <Text style={{ fontSize: '14px', width: '100px' }}>Note:</Text>
        <Text style={{ fontSize: '12px', flex: '1' }}>{data.note || 'N/a'}</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.tr}>
          <Text style={styles.label}>Full name:</Text>
          <Text style={styles.content}>{data.contract.employee.name || 'N/a'}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.content}>{data.contract.partner.companyName || 'N/a'}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>Position:</Text>
          <Text style={styles.content}>{data.contract.job || 'N/a'}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>(A) Standard working hours:</Text>
          <Text style={styles.content}>{data.standardWorkHours || 0}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>(B) Overtime hours:</Text>
          <Text style={styles.content}>{data.overtimeHours || 0}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>(C) Number of hours off:</Text>
          <Text style={styles.content}>{data.leaveHours || 0}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>(D = A + B - C) Actual hours:</Text>
          <Text style={styles.content}>{data.standardWorkHours + data.overtimeHours - data.leaveHours || 0}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={styles.label}>(E) Base salary:</Text>
          <Text style={styles.content}>{formatMoney.VietnamDong.format(data.baseSalary || 0)}</Text>
        </View>
        <View style={styles.tr}>
          <Text style={{ ...styles.label, marginRight: '0' }}>Total salary</Text>
          <View style={{ flex: '1' }}>
            <View style={styles.tr}>
              <Text style={{ ...styles.label, width: '240px' }}>(F = E / A) Basic salary/hour:</Text>
              <Text style={styles.content}>{formatMoney.VietnamDong.format(data.baseSalaryPerHour || 0)}</Text>
            </View>
            <View style={styles.tr}>
              <Text style={{ ...styles.label, width: '240px' }}>(G = F * 1.5) Overtime salary/hour:</Text>
              <Text style={styles.content}>{formatMoney.VietnamDong.format(data.ovetimeSalaryPerHour || 0)}</Text>
            </View>
            <View style={styles.tr}>
              <Text style={{ ...styles.label, width: '240px' }}>(H = G * B) Total bonus:</Text>
              <Text style={styles.content}>{formatMoney.VietnamDong.format(data.totalBonus || 0)}</Text>
            </View>
            <View style={styles.tr}>
              <Text style={{ ...styles.label, width: '240px' }}>(I = F * C) Salary deductions:</Text>
              <Text style={styles.content}>{formatMoney.VietnamDong.format(data.totalDeductions || 0)}</Text>
            </View>
            <View style={{ ...styles.tr, border: '0' }}>
              <Text style={{ ...styles.label, width: '240px' }}>(J = E + H - I) Total income:</Text>
              <Text style={styles.content}>
                {formatMoney.VietnamDong.format(data.baseSalary + data.totalBonus - data.totalDeductions || 0)}
              </Text>
            </View>
          </View>
        </View>
        {data.paidType === Type.Staff && (
          <View style={styles.tr}>
            <Text style={{ ...styles.label, marginRight: '0' }}>
              {`(O = K + L + M + N)
              Items to be deducted from salary:`}
            </Text>
            <View style={{ flex: '1' }}>
              <View style={styles.tr}>
                <Text style={{ ...styles.label, width: '240px' }}>(K) Payment of social insurance contributions:</Text>
                <Text style={styles.content}>{formatMoney.VietnamDong.format(data.socialInsurance || 0)}</Text>
              </View>
              <View style={styles.tr}>
                <Text style={{ ...styles.label, width: '240px' }}>
                  (L) Payment of accident insurance contributions:
                </Text>
                <Text style={styles.content}>{formatMoney.VietnamDong.format(data.accidentInsurance || 0)}</Text>
              </View>
              <View style={styles.tr}>
                <Text style={{ ...styles.label, width: '240px' }}>(M) Payment of health insurance contributions:</Text>
                <Text style={styles.content}>{formatMoney.VietnamDong.format(data.healthInsurance || 0)}</Text>
              </View>
              <View style={{ ...styles.tr, border: '0' }}>
                <Text style={{ ...styles.label, width: '240px' }}>(N) Payment of TAX:</Text>
                <Text style={styles.content}>{formatMoney.VietnamDong.format(data.tax || 0)}</Text>
              </View>
            </View>
          </View>
        )}
        <View style={{ ...styles.tr, border: '0' }}>
          <Text style={styles.label}>{data.paidType === Type.Staff ? '(J - O)' : '(J)'} Actually received:</Text>
          <Text style={{ ...styles.content, fontSize: '16px' }}>
            {formatMoney.VietnamDong.format(data.finalIncome || 0)}
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);
