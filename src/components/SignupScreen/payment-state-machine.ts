import { assign, createMachine, Typestate } from 'xstate';

interface PaymentStateSchema extends Typestate<PaymentContext> {
  states: {
    loading: {};
    enterUserDetails: {};
    enterPaymentDetails: {};
  };
}

type PaymentEvent = { type: 'CONFIRM_USER' };

interface PaymentContext {
  clientSecret: string;
}

export const paymentMachine = createMachine<
  PaymentContext,
  PaymentEvent,
  PaymentStateSchema
>({
  id: 'payments',
  initial: 'loading',
  context: {
    clientSecret: '',
  },
  states: {
    loading: {
      invoke: {
        src: 'loadSecret',
        onDone: [
          {
            target: 'enterUserDetails',
            cond: (_, event) => event.data.data.clientSecret,
            actions: assign({
              clientSecret: (_, event) => event.data.data.clientSecret,
            }),
          },
        ],
      },
    },
    paymentInProcess: {
      invoke: {
        src: 'executePayment',
        onDone: [],
      },
    },
    enterUserDetails: {
      on: {
        CONFIRM_USER: {
          target: 'enterPaymentDetails',
        },
      },
    },
    enterPaymentDetails: {},
    paymentConfirmation: {},
  },
});
