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
          | Etus Challenge
          div(slot="subtitle")
            | Developer by: Felipe C P Magalhães
        q-btn(
          v-if='loggedIn'
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
      leftDrawerOpen: false
    };
  },
  computed: {
    ...mapGetters('user', [
      'loggedIn'
    ])
  },
  methods: {
    ...mapActions('user', [
      'signOut'
    ]),
    signOutAndChangeRoute() {
      const data = this.signOut();
      console.log('logout', data);
      if (data) {
        this.$router.replace({ name: 'login' });
        this.$q.notify({
          message: 'User logged out!',
          timeout: 4000,
          type: 'positive'
        });
      }
      // return ( !loggedIn && ? true : false);
    },
    openURL
  }
};
</script>

<style>
</style>
