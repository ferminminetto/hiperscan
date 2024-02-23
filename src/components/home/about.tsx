"use client";
import styles from './about.module.css';

const About = () => {

  return (
    <div className={styles.aboutContainer}>
      <h1>
        Calculadora de Riesgo de Hipertension
      </h1>
      <div>
        <h2>
          ¿Como funciona la calculadora?
        </h2>
        <p>
          La calculadora es una herramienta que calcula la probabilidad de tener hipertensión enmascarada en pacientes que tienen 
          valores de presión arterial (PA) en rango normal en promedio en consultorio ({"<"}140 mmHg de Presión arterial sistólica Y {"<"}90 mmHg Presión arterial diastólica) diagnosticada por Mediciones ambulatorias de Presión arterial de 24 horas en cualquiera de los períodos de este estudio.
        </p>
        <p>
          Por lo tanto, el resultado nos informa la probabilidad predicha a través de una fórmula generada en un modelo con regresión logística probado en una población de entrenamiento en Argentina que realizó validación interna del mismo.
        </p>
        <p>
          Esta fórmula NO debe usarse para pacientes con PA elevada en promedio en consultorio, o para predecir hipertensión enmascarada por otros métodos, ya que no fue evaluada hasta el momento para estos usos.
        </p>
        <p>
          La probabilidad mayor a 0.4 (40%) de tener hipertensión enmascarada se considera alta, ya que puede duplicar a la prevalencia encontrada incluso en poblaciones de alto riesgo, por lo tanto, el informe indica alto riesgo, y se sugiere realizar un MAPA de 24 horas.
        </p>
      </div>
      <div>
        <h2>
          ¿Quienes somos?
        </h2>
        <p>
          El calculador generado fue realizado por el equipo de la Unidad de Enfermedades Cardio metabólicas, del Hospital General Interzonal San Martín de La Plata, Buenos Aires, Argentina.
        </p>
        <p>
          El mismo es un grupo de investigación en enfermedad cardiovascular, con diferentes publicaciones con referatos en diferentes áreas de estas patologías, siendo principalmente el expertis del equipo que trabajo en este calculador la Hipertensión arterial.
        </p>
        <p>
          <strong>Coordinación:</strong> Dr. Walter Espeche.
        </p>
        <p>
          <strong>Investigador Principal:</strong> Med. Minetto Julian- Contacto: jjminetto@hotmail.com
        </p>
        <p>
          <strong>Equipo técnico de la herramienta:</strong> Fermín Minetto
        </p>
      </div>
    </div >
  )
}

export default About;