import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './DestinationCard.module.css';

interface DestinationProps {
  country: string;
  course: string;
  features: string[];
  index: number;
  featured?: boolean;
  flag: string;
  city: string;
  imageUrl: string;
}

const DestinationCard: React.FC<DestinationProps> = ({
  country,
  course,
  features,
  index,
  featured = false,
  flag,
  city,
  imageUrl,
}) => {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ''}`}>
      <div className={styles.imageBg} style={{ backgroundImage: `url(${imageUrl})` }} aria-hidden />
      <div className={styles.overlay} />
      
      <header className={styles.head}>
        <span className={styles.num}>{String(index).padStart(2, '0')}</span>
        <span className={styles.flag} aria-hidden>{flag}</span>
      </header>

      <div className={styles.body}>
        <h3 className={styles.country}>{country}</h3>
        <p className={styles.city}>{city}</p>
        
        <div className={styles.details}>
          <p className={styles.course}>{course}</p>
          <ul className={styles.features}>
            {features.map((feature, idx) => (
              <li key={idx} className={styles.feature}>
                <span className={styles.bullet} aria-hidden>—</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className={styles.foot}>
        <a href="#contact" className={styles.link}>
          <span>Enquire</span>
          <ArrowUpRight size={16} strokeWidth={1.5} />
        </a>
      </footer>
    </article>
  );
};

export default DestinationCard;
