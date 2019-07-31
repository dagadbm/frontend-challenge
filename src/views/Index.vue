<template>
  <div>
    <Header />
    <Transcriptions />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Transcriptions from '@/components/Transcriptions';

export default {
  name: 'home',
  components: {
    Header,
    Transcriptions,
  },
};
</script>
