import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SignupForm from './SignupForm';

import './SignupScreen.css';
import { Button, Paper, Step, StepLabel, Stepper } from '@material-ui/core';
import { useMachine } from '@xstate/react';
import { paymentMachine } from './payment-state-machine';
import http from 'services/http';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Informació', 'Dades Personals', 'Finalitzar Inscripció'];

export default function SignupScreen() {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);

  const [state, send] = useMachine(paymentMachine, {
    devTools: true,
    services: {
      executePayment: (_, event) =>
        http.post('/member/signup/pay', {
          ...event,
        }),
      createUser: (_, event) =>
        http.post('/member', {
          member: 'member' in event ? event.member : null,
        }),
    },
  });

  const { clientSecret, memberId } = state.context;

  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) return null;

  const firstPayment = async () => {
    const card = elements.getElement(CardElement);

    if (card) {
      const { paymentMethod } = await stripe.createPaymentMethod({
        card,
        type: 'card',
      });
      send('CONFIRM_PAYMENT', {
        memberId,
        payment_method_id: paymentMethod?.id,
      });
    }
  };

  const cardAction = async () => {
    const { paymentIntent } = await stripe.handleCardAction(clientSecret);

    send('CONFIRM_PAYMENT', {
      payment_intent_id: paymentIntent?.id,
    });
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  if (state.matches('requiresAction')) {
    cardAction();
  }

  if (state.matches('paymentPending')) {
    firstPayment();
  }

  if (state.matches('paymentConfirmation'))
    return (
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Last />
        </Paper>
      </main>
    );

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" align="center">
          Inscripció a C.E. Deporunners
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <div hidden={activeStep !== 0}>
          <Information />
        </div>
        <div hidden={activeStep !== 1}>
          <SignupForm
            onSubmit={(values) =>
              send('CONFIRM_USER', {
                member: values,
              })
            }
          />
        </div>

        <div className={classes.buttons}>
          {activeStep === 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 2 ? 'Fer pagament' : 'Següent'}
            </Button>
          )}
          {activeStep === 1 && (
            <Button onClick={handleBack} className={classes.button}>
              Anterior
            </Button>
          )}
        </div>
      </Paper>
    </main>
  );
}

function Information() {
  return (
    <div>
      <h2 className="header">Benvingut/da a Deporunners!</h2>
      <p>
        A partir d'avui, no només formes part d’un club de Trail, formes part
        d’una comunitat de persones amb les mateixes inquietuds i aficions!
        <br />
        <br />
        Us proposem un nou espai, on fer activitats grupals setmanals, entrenos,
        curses, xerrades o testejar nous materials esportius. Un lloc de
        confluència esportiva, on gaudir del medi natural i la muntanya, sigui
        el nexe de connexió entre tots nosaltres!
        <br />
        <br />
        Quins avantatges tindràs al ser soci/a de Deporunners?
      </p>

      <table>
        <tbody className="advantages-table">
          <tr>
            <td>
              <strong>Avantatges generals:</strong>
              <ul>
                <li>Pistes gratis amb carnet</li>
                <li>Quota Aqua Sports 39€ mes</li>
                <li>Perruqueria i estètica Doina 10% descompte en tot</li>
                <li>Prova esforç 20€ descompte a CRF Vilanova</li>
                <li>Calserra 10% descompte</li>
                <li>Fisiolab 10%</li>
                <li>Sorteigs aris i descomptes a Curses de Muntanya</li>
              </ul>
            </td>
            <td>
              <strong>Avantatges primer any:</strong>
              <ul>
                <li>Entrega de la Samarreta tècnica oficial del Club.</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
      <h3>Quota anual: 40€</h3>
    </div>
  );
}

function Last() {
  return (
    <div>
      <p>
        Ja ens ha arribat el pagament i ara rebràs un correu amb el llistat
        d'avantatges que has vist abans i informació sobre el teu compte. Si no
        el trobes, busca a la carpeta de Spam.
        <br />
        <br />
        Aqui tens l'enllaç per descarregar l'aplicació a la plataforma que
        necessitis.
      </p>
      <a
        href="https://play.google.com/store/apps/details?id=com.cedeporunners.deporunners"
        target="__blank"
      >
        <img
          alt="Google Play Logo"
          src="https://webstockreview.net/images/google-play-store-png.png"
          height="120"
        />
      </a>
    </div>
  );
}
