
const FormComponents = {
   base: () => import('./form-components/base.vue'),
   boolean: () => import('./form-components/boolean.vue'),
   'date-time': () => import('./form-components/date-time.vue'),
   'number-enum': () => import('./form-components/number-enum.vue'),
   number: () => import('./form-components/number.vue'),
   'string-enum': () => import('./form-components/string-enum.vue'),
   'string-remote-select': () => import('./form-components/string-remote-select.vue'),
   string: () => import('./form-components/string.vue'),
   textarea: () => import('./form-components/textarea.vue'),
};

export default FormComponents;
