<template lang="pug">
  transition(
      appear,
      enter-active-class='animated fadeIn',
      leave-active-class='animated fadeOut'
    )
    .row#login-form.q-pa-lg
      .col-12
        .row
          .col-12.text-center
            .title-form.q-pb-lg Administrative Area
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
                    label="Login"
                  )
              .col-12
                .row.q-py-lg.flex-center
                  span.title-btn.text-center.q-pb-xs Not registered?
                  q-btn.q-btn-tertiary(
                    label="Sign Up"
                    to=""
                  )

</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  name: 'login',
  data() {
    return {
      form: {
        email: '',
        password: ''
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
  methods: {
    toLowerCaseEmail() {
      this.form.email = this.form.email.toLowerCase();
    },
    async submit() {
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        this.$q.notify('Por favor, reveja os campos em vermelho.', 4000, 'negative');
      } else {
        // await this.logUser();
        console.log('logando');
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
