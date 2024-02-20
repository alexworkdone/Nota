<template>
  <div class="home">
    <div class="card" @click="goTo('violin')">
      <svg viewBox="0 0 38 100" width="38">
        <text x="0" y="65" style="font-size: 50px; font-family: 'Helsinki Std'; fill: rgb(0, 0, 0)">
          &amp;
        </text>
      </svg>
      Скрипковий ключ
    </div>

    <div class="card" @click="goTo('bass')">
      <svg viewBox="0 0 38 100" width="38">
        <text x="0" y="65" style="font-size: 50px; font-family: 'Helsinki Std'; fill: rgb(0, 0, 0)">
          ?
        </text>
      </svg>
      Басовий ключ
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',

  methods: {
    goTo(clef) {
      this.$router.push(`/${clef}-clef`);
    },
  },
};
</script>

<style lang="scss">
.card {
  //
}
</style>
