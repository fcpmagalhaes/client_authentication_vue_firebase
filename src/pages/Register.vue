<template lang="pug">
  transition(
      appear
      enter-active-class='animated fadeIn'
      leave-active-class='animated fadeOut'
    )
    .row#login-form.q-pa-lg
      .col-12
        .row
          .col-12.text-center
            .title-form.q-pb-lg Sign Up
          .col-md-12.col-sm-12.col-xs-12
            form(
              ref='form'
              @submit.prevent=''
              @keyup.enter="submit"
            )
              .col-12
                q-field(
                  :error='mailHasError'
                  error-label='Invalid e-mail'
                  orientation="horizontal"
                )
                  q-input(
                    float-label="Email"
                    v-model.trim="form.email"
                    @blur='$v.form.email.$touch'
                    @input="toLowerCaseEmail()"
                    :error='$v.form.email.$error'
                  )
              .col-12
                q-field(
                  :error='passwordHasError'
                  error-label='The password is required'
                  orientation="horizontal"
                )
                  q-input(
                    float-label="Password"
                    v-model.trim="form.password"
                    type="password"
                    @blur='$v.form.password.$touch'
                    :error='$v.form.password.$error'
                  )
              .col-12
                .row.q-py-lg.flex-center
                  q-btn.q-btn-secondary(
                    :loading='submitting'
                    @click="submit"
                    label="Register"
                    color="secondary"
                  )

</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      errorPayload: {
        message: '',
        timeout: 4000,
        type: ''
      },
      mailHasError: null,
      passwordHasError: null,
      submitting: false
    };
  },
  validations: {
    form: {
      email: { required, email },
      password: { required }
    }
  },
  computed: {
    ...mapGetters('user', [
      'errorHandling'
    ])
  },
  methods: {
    ...mapActions('user', [
      'registerUser'
    ]),
    toLowerCaseEmail() {
      this.form.email = this.form.email.toLowerCase();
    },
    activeteNotify() {
      this.$q.notify({
        message: this.errorPayload.message,
        timeout: this.errorPayload.timeout,
        type: this.errorPayload.type
      });
    },
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.errorPayload.message = 'Please, review the fields in red.';
        this.errorPayload.type = 'negative';
        this.activeteNotify();
      } else {
        try {
          this.submitting = true;
          await this.registerUser(this.form);
        } catch (err) {
          console.log(err);
        } finally {
          this.submitting = false;
          if (this.errorHandling === null) {
            this.errorPayload.message = 'User registered with success. Welcome!';
            this.errorPayload.type = 'positive';
            this.$router.replace({ name: 'list-cards' });
          } else {
            this.errorPayload.message = this.errorHandling.message;
            this.errorPayload.type = 'negative';
          }
          this.activeteNotify();
        }
      }
    }
  }
};
</script>

<style lang="stylus">
#login-form
  width: 300px;
  margin: 0 auto;
  .forgot-password
    width 100%
    font-size 10px
    text-align right
    cursor pointer
  .forgot-password:hover
    opacity: 0.5
  .title-btn
  .subscription
    width 100%
    font-size 14px
  .forgot-password
  .title-btn
  .subscription
    color #898989

@media screen and (min-width 768px)
  #login-form
    width: 400px;
</style>
