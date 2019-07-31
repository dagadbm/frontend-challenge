<template>
  <div v-if="transcriptions.length > 0">
    <div class="grid">
      <Transcription :key="t.id" v-for="t in transcriptions" :transcription="t" />
    </div>
    <div class="add-row">
      <AddRow v-on:click="createTranscription" />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Transcription from './TranscriptionsItem';
import AddRow from '@/assets/svg/add-row.svg';

export default {
  name: 'Transcriptions',
  components: { Transcription, AddRow },
  computed: mapState({
    transcriptions: state => Object.values(state.transcriptions),
  }),

  methods: {
    ...mapMutations({
      createTranscription: 'create',
    }),
  },
};
</script>

<style scoped lang="scss">
.grid {
  border: 1px #eaedef solid;
  margin: 10vh 5vh 0 5vh;
}

@media (min-width: 768px) {
  .grid {
    margin: 10vh 20vh 0 20vh;
  }
}

.add-row {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
}

.add-row :global(svg) {
  cursor: pointer;
}
</style>
