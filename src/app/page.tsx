import Image from 'next/image'
import styles from './page.module.css'
import Container from '@mui/material/Container';
import Calculator from '@/components/home/calculator';
import About from '@/components/home/about';
import Separator from '@/components/common/separator';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.fullBoxApp}>
        <Container>
          <div className={styles.headerContainer}>
            <div>
              <Image
                src="/hipertensioscan-logo.png"
                alt="Hipertensioscan Logo"
                className={styles.hipertensioscanLogo}
                width={100}
                height={24}
                priority
              />
            </div>
            <div className={styles.headerTitleContainer}>
              Calculadora de Riesgo de Hipertension
            </div>
          </div>


        </Container>
      </div>
      <Container>
        <Calculator />
      </Container>
      <Separator />
      <Container>
        <About />
      </Container>
    </main>
  )
}
