<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar class="accent">
            <v-toolbar-title>Sign in / Sign up</v-toolbar-title>
          </v-toolbar>
          <div class="relative">
            <v-progress-linear v-if="submitting" :indeterminate="true"></v-progress-linear>
          </div>
          <v-card-text>
            <v-form ref="form">
              <v-text-field v-model="username"
                            required
                            :rules="[v => !!v || 'Username is required!']"
                            prepend-icon="person" name="username" label="Username" type="text">
              </v-text-field>
              <v-text-field v-model="password"
                            required
                            :rules="[v => !!v || 'Password is required!']"
                            @keypress.enter="submit"
                            id="password" prepend-icon="lock" name="password" label="Password" type="password">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions v-if="username">
            <p class="font-weight-bold" v-if="submitting">
              Please wait...
            </p>
            <p class="font-weight-bold" v-else-if="queryingUsername">
              Please wait while checking username.
            </p>
            <p class="font-weight-bold" v-else-if="markCreate">
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
            <template v-if="!queryingUsername">
              <v-btn @click="reset" :disabled="submitting" color="error" v-if="markReset">
                Reset
              </v-btn>
              <v-btn @click="createAccount" :disabled="submitting" color="primary" v-else-if="markCreate">
                Register
              </v-btn>
              <v-btn @click="login" :disabled="submitting" color="primary" v-else-if="markLogin">
                Login
              </v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  private markCreate = false;
  private markLogin = false;
  private markReset = false;
  private justReset = false;

  private username = '';
  private password = '';

  private submitting = false;

  @Watch('username')
  private onUsernameChanged() {
    clearTimeout(this.requestTimer);
    if (this.abortController) this.abortController.abort();
    this.markCreate = false;
    this.markLogin = false;
    this.markReset = false;
    if (this.username) this.requestTimer = window.setTimeout(this.queryUsername, 500);
  }

  @Watch('password')
  private onPasswordChanged() {
    this.markReset = false;
    this.justReset = false;
  }

  private queryingUsername = false;
  private requestTimer = 0;
  private abortController: AbortController = null;

  private queryUsername() {
    this.queryingUsername = true;
    this.abortController = new AbortController();
    new Promise((resolve, reject) => {
      const t = setTimeout(resolve, 2000);
      this.abortController.signal.addEventListener('abort', () => {
        clearTimeout(t);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }).then(() => {
      if (Math.floor(Math.random() * 100 % 2)) {
        this.markLogin = true;
        this.markCreate = false;
      } else {
        this.markLogin = false;
        this.markCreate = true;
      }
      this.markReset = false;
      this.justReset = false;
      this.queryingUsername = false;
    });
  }

  private createAccount() {
    if ((this.$refs.form as any).validate()) {
      this.submitting = true;
      setTimeout(() => {
        this.submitting = false;
        this.$router.push('/join');
      }, 1000);
    }
  }

  private login() {
    if ((this.$refs.form as any).validate()) {
      this.submitting = true;
      setTimeout(() => {
        this.markReset = true;
        this.submitting = false;
      }, 1000);
    }
  }

  private reset() {
    if ((this.$refs.form as any).validate()) {
      this.submitting = true;
      setTimeout(() => {
        this.justReset = true;
        this.markReset = false;
        this.markLogin = true;
        this.submitting = false;
      }, 1000);
    }
  }

  private submit() {
    if (this.markLogin) return this.login();
    else if (this.markCreate) return this.createAccount();
  }
}
</script>

<style lang="stylus" scoped>
.relative
  position relative
</style>