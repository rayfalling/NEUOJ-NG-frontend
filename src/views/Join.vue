<template>
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step complete step="1">Create personal account</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Complete your profile</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Tailor your experience</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
      </v-stepper-content>
      <v-stepper-content step="2">
        <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
        ></v-card>

        <v-btn
            color="primary"
            @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card
            class="mb-5"
            color="grey lighten-1"
            height="200px"
        ></v-card>

        <v-btn
            color="primary"
            @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Join extends Vue {
  private e1 = 2;
}
</script>

<style scoped>

</style>