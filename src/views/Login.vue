<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Sign in / Sign up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field @keyup="onTextChange" @change="onTextChange"
                            v-model="username"
                            prepend-icon="person" name="username" label="Username" type="text">
              </v-text-field>
              <v-text-field v-model="password"
                            @keypress="onPasswordChange" @keypress.enter="submit"
                            id="password" prepend-icon="lock" name="password" label="Password" type="password">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <p class="font-weight-bold" v-if="markCreate">
              It appears this username has not been taken. <br/>
              Shall we register a new membership with the given credentials?
            </p>
            <p class="font-weight-bold error--text" v-else-if="markReset">
              You provided the wrong password. <br/>
              If you believe this should be right, we can reset it for you.
            </p>
            <p class="font-weight-bold" v-else-if="markLogin"
              v-html="
                justReset
                ? `An email with a reset link has been sent to you. <br/>
                  Once you opened that link, you'll be ready to login.`
                : `It appears this username has already been taken. <br/>
                  If you believe you're the owner, please provide credentials to sign in.`
              "
            >
            </p>
            <v-spacer></v-spacer>
            <v-btn @click="reset" color="error" v-if="markReset">
              Reset
            </v-btn>
            <v-btn @click="createAccount" color="primary" v-else-if="markCreate">
              Register
            </v-btn>
            <v-btn @click="login" v-else-if="markLogin">
              Login
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private markCreate = false;
  private markLogin = false;
  private markReset = false;
  private justReset = false;

  private username = '';
  private password = '';

  private onTextChange() {
    console.log(this.username);
    if (Math.floor(Math.random() * 100 % 2)) {
      this.markLogin = true;
      this.markCreate = false;
    } else {
      this.markLogin = false;
      this.markCreate = true;
    }
    this.markReset = false;
    this.justReset = false;
  }

  private onPasswordChange() {
    this.markReset = false;
    this.justReset = false;
  }

  private createAccount() {
    this.$router.push('/join');
  }

  private login() {
    this.markReset = true;
  }

  private reset() {
    this.justReset = true;
    this.markReset = false;
    this.markLogin = true;
  }

  private submit() {
    if (this.markLogin) return this.login();
    else if (this.markCreate) return this.createAccount();
  }
}
</script>

<style lang="stylus" scoped>

</style>