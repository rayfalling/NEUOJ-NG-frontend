<template>
  <v-app :dark="nightly" :light="!nightly">
    <v-toolbar app
               :height="50"
               clipped-left
    >
      <v-toolbar-title class="headline text-uppercase">
        <span>NEUOJ</span>
        <span class="font-weight-light"> NG</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/">Home</v-btn>
        <v-btn flat to="/problem">Problem</v-btn>
        <v-btn flat to="/status">Status</v-btn>
        <v-btn flat to="/contest">Contest</v-btn>
        <v-btn flat to="/training">Training</v-btn>
        <v-btn flat to="/discuss">Discuss</v-btn>
        <v-btn flat to="/rating">Rating</v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat to="/login">Sign in</v-btn>
        <v-btn flat to="/join">Sign up</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <v-navigation-drawer
          v-model="drawer"
          :mini-variant="mini"
          permanent
          clipped
          app
          class="elevation-4"
          :width="260"
      >
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile avatar tag="div" v-if="!mini">
            <v-list-tile-action>
              <v-icon>menu</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Quick Navigation</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider light></v-divider>

          <v-subheader>
            Tool Box
          </v-subheader>

          <v-list-tile
              @click="toggleLight"
          >
            <v-list-tile-action>
              <v-icon>{{ nightly ? 'brightness_1' : 'brightness_3' }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ nightly ? 'Day Mode' : 'Night Mode' }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  private nightly = false;
  private readonly drawer = true;
  private mini = false;

  public mounted() {
    if (
      document.documentElement &&
      document.documentElement.clientWidth <= 1600
    ) this.mini = true;
  }

  private toggleLight() {
    this.nightly = !this.nightly;
  }
}
</script>

<style lang="stylus">
html
  min-width 1350px
  overflow auto !important
</style>

<style lang="stylus" scoped>
.v-navigation-drawer
  z-index 1
</style>
