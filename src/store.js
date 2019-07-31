import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    transcriptions: {},
  },
  mutations: {
    fetch(state, payload) {
      state.transcriptions = payload.reduce(
        (acc, t) => ((acc[t.id] = t), acc),
        {}
      );
    },
    create(state) {
      // I could get the last item from the array, but this is safer
      const nextId =
        Object.keys(state.transcriptions).reduce((acc, cur) =>
          Math.max(acc, cur)
        ) + 1;

      Vue.set(state.transcriptions, nextId, {
        id: nextId,
        voice: '',
        text: '',
      });
    },
    update(state, payload) {
      Vue.set(state.transcriptions, payload.id, {
        ...state.transcriptions[payload.id],
        ...payload,
      });
    },
    delete(state, payload) {
      Vue.delete(state.transcriptions, payload.id);
    },
  },
  actions: {},
});
