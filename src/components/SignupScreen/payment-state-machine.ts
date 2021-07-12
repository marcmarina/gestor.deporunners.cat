import { assign, createMachine, Typestate } from 'xstate';

interface PaymentStateSchema extends Typestate<PaymentContext> {
  states: {
    loading: {};
    enterUserDetails: {};
    enterPaymentDetails: {};
    paymentInProcess: {};
  };
}

type PaymentEvent =
  | {
      type: 'CONFIRM_PAYMENT';
      payment_intent_id?: string;
      payment_method_id?: string;
      memberId?: string;
    }
  | {
      type: 'CONFIRM_USER';
      member: any;
    };

interface PaymentContext {
  clientSecret: string;
  memberId: string;
}

export const paymentMachine = createMachine<
  PaymentContext,
  PaymentEvent,
  PaymentStateSchema
>({
  id: 'payments',
  initial: 'enterUserDetails',
  states: {
    paymentInProcess: {
      invoke: {
        src: 'executePayment',
        onDone: [
          {
            cond: (_, event) => event.data.data.requires_action,
            target: 'requiresAction',
            actions: assign({
              clientSecret: (_, event) => event.data.data.payment_client_secret,
            }),
          },
          {
            cond: (_, event) => event.data.data.success,
            target: 'paymentConfirmation',
          },
        ],
        onError: {
          target: 'enterUserDetails',
        },
      },
    },
    submitUser: {
      invoke: {
        src: 'createUser',
        onDone: [
          {
            cond: (_, event) => event.data.data.member,
            target: 'paymentPending',
            actions: assign({
              memberId: (_, event) => event.data.data.member.stripeId,
            }),
          },
          {
            target: 'enterUserDetails',
          },
        ],
        onError: {
          target: 'enterUserDetails',
        },
      },
    },
    requiresAction: {
      on: {
        CONFIRM_PAYMENT: {
          target: 'paymentInProcess',
        },
      },
    },
    enterUserDetails: {
      on: {
        CONFIRM_USER: {
          target: 'submitUser',
        },
      },
    },
    paymentPending: {
      on: {
        CONFIRM_PAYMENT: {
          target: 'paymentInProcess',
        },
      },
    },
    paymentConfirmation: {},
  },
});
