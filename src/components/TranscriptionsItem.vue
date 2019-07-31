
<template>
  <div class="grid-item">
    <label class="checkbox">
      <input type="checkbox" class="sr-only" />
      <span class="checkbox-content" />
    </label>
    <div class="icon">
      <Person />
    </div>
    <div
      class="voice"
      v-on:blur="updateTranscription('voice', $event)"
      contenteditable="true"
      suppressContentEditableWarning
    >{{transcription.voice || 'Insert Voice'}}</div>
    <div
      class="text"
      v-on:blur="updateTranscription('text', $event)"
      contenteditable="true"
      suppressContentEditableWarning
    >{{transcription.text || 'Insert Text'}}</div>
    <div class="delete" v-on:click="deleteTranscription(id)">
      <Delete />
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

import Person from '@/assets/svg/person.svg';
import Delete from '@/assets/svg/delete.svg';

export default {
  name: 'Transcription',
  components: {
    Person,
    Delete,
  },

  props: {
    transcription: Object,
  },

  methods: {
    updateTranscription(type, event) {
      this.$store.commit('update', {
        id: this.transcription.id,
        [type]: event.target.textContent,
      });
    },
    deleteTranscription(id) {
      this.$store.commit('delete', {
        id: this.transcription.id,
      });
    },
  },
};
</script>

<style scoped lang="scss">
.grid-item {
  display: grid;
  grid-template-columns: [checkbox] min-content [icon] min-content [content] auto [delete] 24px;
  grid-column-gap: 16px;
  padding: 32px 24px;
  border-bottom: 1px #eaedef solid;
}

.grid-item:hover {
  box-shadow: 0 0 2px #859eff;
}

svg {
  display: block;
}

.delete {
  display: none;
  grid-column: delete;
  grid-row: 1;
  align-self: center;
  justify-self: center;
  cursor: pointer;
}

.grid-item:hover .delete {
  display: block;
}

.checkbox,
.icon,
.voice {
  align-self: center;
}

.checkbox,
.icon {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.checkbox-content {
  display: flex;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: 2px solid #859eff;
  border-radius: 2px;
  cursor: pointer;
}

.checkbox input:checked + .checkbox-content {
  background-color: #859eff;
}

.checkbox input:checked + .checkbox-content::after {
  content: '';
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.voice {
  font-family: 'Montserrat';
  font-weight: 600;
  color: #566074;
}

.text {
  font-family: 'Open Sans';
  grid-column: content;
  color: #778195;
}

.voice:focus,
.text:focus {
  outline: none;
  border: 2px solid #859eff;
  box-shadow: 0 0 4px #859eff;
  // to avoid shifting content because of the 2px border
  margin: -2px;
}

.error {
  grid-column: delete;
}

/* https://accessibility.18f.gov/hidden-content/ */
.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: polygon(0px 0px, 0px 0px, 0px 0px);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  white-space: nowrap;
}
</style>
