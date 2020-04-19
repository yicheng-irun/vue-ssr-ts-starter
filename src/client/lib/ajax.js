import axios from 'axios';
import runtime from './runtime';
// import urlLib from 'url';

export function createAxios () {
   if (runtime.isServer) {
      const instance = axios.create({
         // add headers to server side requests
         headers: {
            ...runtime.action.ctx.request.header,
            accept: '*/*',
         },

         baseURL: runtime.serverOrigin,
      });
      instance.interceptors.response.use((response) => {
         /**
             * throw the 'set-cookie' of the ajax response header to action response header
             */
         let newSetCookie = response.headers && response.headers['set-cookie'];
         if (newSetCookie) {
            const oldSetCookie = runtime.action.ctx.response.header['set-cookie'] || [];
            if (!Array.isArray(newSetCookie)) {
               newSetCookie = [newSetCookie];
            }
            runtime.action.ctx.response.set('set-cookie', newSetCookie.concat(oldSetCookie));
         }
         return response;
      }, (error) => Promise.reject(error));
      return instance;
   }
   return axios.create();
}

export function get (url, params) {
   return createAxios().get(url, {
      params,
   });
}

export function post (url, data, params) {
   return createAxios().post(url, data, {
      params,
   });
}
