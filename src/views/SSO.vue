<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center column>
      <p>
        <v-progress-circular
            :size="70"
            :width="7"
            color="primary"
            indeterminate
        ></v-progress-circular>
      </p>
      <p>Please wait while the system signing you in.</p>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class SSO extends Vue {
}
</script>

<style scoped lang="stylus">
p
  font-size 1.5rem
</style>