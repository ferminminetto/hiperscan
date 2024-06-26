"use client";
import { useState, useEffect } from 'react';
import styles from './calculator.module.css';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import ErrorMessage from '../common/ErrorMessage';

type ErrorsType = {
  cintura?: string;
  presionArterial?: string;
  presionPulso?: string;
  sexo?: string;
  [key: string]: string | undefined;
}

const Calculator = () => {

  const [cintura, setCintura] = useState<string>('');
  const [presionArterial, setPresionArterial] = useState<string>('');
  const [presionPulso, setPresionPulso] = useState<string>('');
  const [sexo, setSexo] = useState<string>('');
  const [hipertensionProbabilityValue, setHipertensionProbabilityValue] = useState<number>(0);
  const [hipertensionProbability, setHipertensionProbability] = useState<boolean | undefined>(undefined);
  const [errors, setErrors] = useState<ErrorsType>({});

  useEffect(() => {
    if (isNumeric(cintura) && isNumeric(presionArterial) && isNumeric(presionPulso) && sexo !== '') {
      const probabilityResult = probabilityOfHipertension()
      setHipertensionProbability(probabilityResult > 0.4);
      setHipertensionProbabilityValue(probabilityResult);
    } else {
      setHipertensionProbability(undefined);
      setHipertensionProbabilityValue(0);
    }
  }, [cintura, presionArterial, presionPulso, sexo])

  const validateFieldInRange = (fieldName: string, value: string, lowerRange: number, upperRange: number) => {
    let errorFound = false;
    if (isNumeric(value)) {
      const numericValue = parseInt(value);
      if (numericValue < lowerRange || numericValue > upperRange) {
        errorFound = true;
        setErrors({
          ...errors,
          [fieldName]: `Advertencia: Fuera de los valores normales entre ${lowerRange} y ${upperRange}`
        });
      }
    }
    if (!errorFound) {
      let errorsWithout: ErrorsType = {
        ...errors
      };
      delete errorsWithout[fieldName];
      setErrors({ ...errorsWithout });
    }
  }

  useEffect(() => {
    validateFieldInRange("presionPulso", presionPulso, 15, 70);
  }, [presionPulso])

  useEffect(() => {
    validateFieldInRange("cintura", cintura, 36, 198);
  }, [cintura])

  useEffect(() => {
    validateFieldInRange("presionArterial", presionArterial, 50, 89);
  }, [presionArterial])

  const isNumeric = (str: string) => {
    // return /^(\d+)?$/.test(str);
    // Use regex to check if the input is a numeric string with no more than 2 numbers
    return /^\d{1,3}$/.test(str);
  }

  const determineResultStyle = () => {
    let result;
    switch (hipertensionProbability) {
      case true:
        result = styles.riskResult;
        break;
      case false:
        result = styles.noRiskResult;
        break;
      case undefined:
        result = '';
        break;
      default:
        result = '';
        break;
    }
    return result;
  }

  const probabilityOfHipertension = () => {
    const interceptoInicial = -10.068962;
    const sexoBeta = 0.707707;
    const presionArterialBeta = 0.079202;
    // Cintura
    const cinturaBeta = 0.018968;
    // Presion Pulso
    const presionPulsoBeta = 0.023772;

    // Should be 1 for male, and 0 for female.
    const sexoInt = (sexo === 'male') ? 1 : 0;
    const presionArterialInt = parseInt(presionArterial);
    const cinturaInt = parseInt(cintura);
    const presionPulsoInt = parseInt(presionPulso);

    // Calcula el logaritmo natural de la odds ratio
    const lnOddsRatio = interceptoInicial + (sexoBeta * sexoInt) + (presionArterialBeta * presionArterialInt) + 
      (cinturaBeta * cinturaInt) + (presionPulsoBeta * presionPulsoInt);
    

    // Calcula la probabilidad de que ocurra el evento
    const probabilityOfHipertensionResult = 1 / (1 + Math.exp(-1 * lnOddsRatio));
    return probabilityOfHipertensionResult;
  }

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.formGridContainer}>
        <div style={{ marginBottom: "2em" }}>
          Por favor, complete el formulario proporcionando las métricas de los pacientes con valores numéricos precisos.
        </div>
        <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic" label="Presión de Pulso" placeholder="Ingrese un número"
                variant="standard"
                sx={{ width: '70%' }}
                InputProps={{ sx: { height: 30, fontSize: 20 } }}
                value={presionPulso}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (isNumeric(event.target.value) || event.target.value == '') {
                    setPresionPulso(event.target.value);
                  }
                }}
              />
              <ErrorMessage message={errors?.presionPulso} />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField id="outlined-basic" label="Presion Arterial Distolica" placeholder="Ingrese un número"
                variant="standard"
                sx={{ width: '70%' }}
                InputProps={{ sx: { height: 30, fontSize: 20 } }}
                value={presionArterial}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (isNumeric(event.target.value) || event.target.value == '') {
                    setPresionArterial(event.target.value);
                  }
                }}
              />
              <ErrorMessage message={errors?.presionArterial} />
            </Grid>

            <Grid item md={6} xs={12}>
              {/* <img src="/public/form_icons/cintura.jpg" alt="Cintura" /> */}
              <TextField id="outlined-basic" label="Cm de Cintura" placeholder="Ingrese un número"
                variant="standard"
                sx={{ width: '70%' }}
                InputProps={{ sx: { height: 30, fontSize: 20 } }}
                value={cintura}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  if (isNumeric(event.target.value) || event.target.value == '') {
                    setCintura(event.target.value);
                  }
                }}
              />
              <ErrorMessage message={errors?.cintura} />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Sexo</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel value="male" control={<Radio />} label="Masculino" onChange={() => setSexo('male')} />
                  <FormControlLabel value="female" control={<Radio />} label="Femenino" onChange={() => setSexo('female')} />
                </RadioGroup>
              </FormControl>
            </Grid>

        </Grid>

        <div className={`${styles.resultBox} ${determineResultStyle()}`} style={{ marginTop: "4em" }}>

          {hipertensionProbability !== undefined ? (
            <div>
              <div> Resultado</div>
              <div className={styles.resultText} style={{ marginTop: "0.5em" }}>
                {hipertensionProbability === true &&
                  (<div>ALTO RIESGO</div>)}
                {hipertensionProbability === false &&
                  (<div>BAJO RIESGO</div>)}
              </div>
              <div className={styles.probabilityBox}>
                Con probabilidad de {(hipertensionProbabilityValue * 100).toFixed(0)}% de ser hipertenso
              </div>
            </div>
          ) : (<div style={{ fontWeight: 300 }}>
            Completar los datos requeridos para obtener un resultado
          </div>)}

        </div>




      </div>
    </div >
  )
}

export default Calculator;