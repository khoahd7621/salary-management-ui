import styles from '~/styles/components/countcard.module.scss';

export interface CountCardProps {
  title?: string;
  value?: string;
  dotColor?: string;
}

export function CountCard({ title = 'Title', value = '20000000000', dotColor = '#309981' }: CountCardProps) {
  return (
    <div className={styles['card-container']}>
      <div className={styles['title']}>
        <div className={styles['dot']} style={{ backgroundColor: dotColor }}></div>
        <h4 className={styles['text']}>{title}</h4>
      </div>
      <h2 className={styles['number']}>{value}</h2>
    </div>
  );
}
