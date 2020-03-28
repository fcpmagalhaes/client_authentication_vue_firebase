<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'")
        q-btn(
          v-if="loggedIn"
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          )
          q-icon( name="menu")
        q-toolbar-title
          | Quasar App With Firebase Authentication
          div(slot="subtitle")
            | Developer by: Felipe C P Magalhães
        q-btn(
          v-if='loggedIn'
          :loading='submitting'
          color="primary"
          icon-right="person"
          label="Sign Out"
          @click="signOutAndChangeRoute"
        )
        q-btn(
          v-else
          color="primary"
          icon-right="person"
          label="Login"
          to="/"
        )
    q-layout-drawer(
      v-if='loggedIn'
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    )
      q-list(
        no-border
        link
        inset-delimiter
      )
        q-list-header
          | Menu
        q-item(to="list-cards")
          q-item-side(icon="list")
          q-item-main(label="List Card")
        q-item(to="create-card")
          q-item-side(icon="credit_card")
          q-item-main(label="Create Card")

    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'base-layout',
  data() {
    return {
      leftDrawerOpen: false,
      submitting: false,
      errorPayload: {
        message: '',
        timeout: 4000,
        type: ''
      }
    };
  },
  computed: {
    ...mapGetters('user', [
      'loggedIn',
      'errorHandling'
    ])
  },
  methods: {
    ...mapActions('user', [
      'signOut'
    ]),
    activeteNotify() {
      this.$q.notify({
        message: this.errorPayload.message,
        timeout: this.errorPayload.timeout,
        type: this.errorPayload.type
      });
    },
    async signOutAndChangeRoute() {
      try {
        this.submitting = true;
        await this.signOut();
      } catch (err) {
        console.log(err);
      } finally {
        if (this.errorHandling === null) {
          this.errorPayload.message = 'User logged out!';
          this.errorPayload.type = 'positive';
          this.$router.replace({ name: 'login' });
        } else {
          this.errorPayload.message = this.errorHandling.message;
          this.errorPayload.type = 'negative';
        }
        this.activeteNotify();
      }
    },
    openURL
  }
};
</script>

<style>
</style>
