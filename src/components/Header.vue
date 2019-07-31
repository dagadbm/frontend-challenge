<template>
  <div class="container">
    <div>Transcriptions</div>
    <div class="icons">
      <span class="icon upload">
        <Upload data-testid="upload" v-on:click="uploadTranscriptions" />
      </span>
      <span class="icon fetch">
        <FetchDocument data-testid="fetch" v-on:click="fetchTranscriptions" />
      </span>
    </div>
  </div>
</template>

<script>
import Upload from '@/assets/svg/upload.svg';
import FetchDocument from '@/assets/svg/fetch-document.svg';

export default {
  name: 'HelloWorld',
  components: {
    Upload,
    FetchDocument,
  },
  props: {
    msg: String,
  },
  methods: {
    async fetchTranscriptions() {
      const response = await fetch(
        'http://www.mocky.io/v2/5ae1c5792d00004d009d7e5c'
      ).then(response => {
        if (response.status >= 400) {
          throw new Error('Unable to get Transcriptions');
        }
        return response.json();
      });

      this.$store.commit('fetch', response);
    },

    uploadTranscriptions() {
      fetch('http://www.mocky.io/v2/5ae1c5792d00004d009d7e5c', {
        method: 'POST',
        body: JSON.stringify(Object.values(this.$store.state.transcriptions)),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (response.status >= 400) {
          throw new Error('Unable to upload Transcriptions');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.24), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Montserrat;
  font-size: 18px;
  font-weight: 600;
  color: #414c5e;
  padding: 0 calc(5vh + 24px);
}

@media (min-width: 768px) {
  .container {
    padding: 0 calc(20vh + 24px);
  }
}

.upload {
  margin-right: 24px;
}
.icon {
  cursor: pointer;
}
</style>
