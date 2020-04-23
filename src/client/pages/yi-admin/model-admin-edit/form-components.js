
const FormComponents = {
   base: () => import('./form-components/base.vue'),
   boolean: () => import('./form-components/boolean.vue'),
   'date-time': () => import('./form-components/date-time.vue'),
   number: () => import('./form-components/number.vue'),
   string: () => import('./form-components/string.vue'),
   textarea: () => import('./form-components/textarea.vue'),
};

export default FormComponents;
