<template lang="pug">
  q-layout(view="lHh Lpr lFf")
    q-layout-header
      q-toolbar(
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'")
        q-btn(
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
            Running Developer by: Felipe C P Magalhães
    q-layout-drawer(
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
          q-item-side(icon="list")
          q-item-main(label="Create Card")

    q-page-container
      router-view
</template>

<script>
import { openURL } from 'quasar';

export default {
  name: 'base-layout',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    };
  },
  methods: {
    openURL
  }
};
</script>

<style>
</style>
