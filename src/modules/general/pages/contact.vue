<template lang="html">
    <div class="first-container">
        <span>contato</span>
    </div>
</template>

<script>
export default {
    name: 'contact',

    data() {
        return {
            message: {
                name: '',
                email: '',
                phone: '',
                msg: ''
            }
        }
    },

    methods: {

        validateForm() {

            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!this.message.name) return { validated: false, message: 'Informe seu nome' }
            if (!this.message.email) return { validated: false, message: 'Informe seu email' }
            if (re.test(this.message.email) !== true) return { validated: false, message: 'Informe um email válido' }
            if (!this.message.phone) return { validated: false, message: 'Informe seu telefone ou celular' }
            if (!this.message.phone.match(/\d/g).length>=8) return { validated: false, message: 'Informe um número valido' }
            if (!this.message.msg) return { validated: false, message: 'Informe sua mensagem' }
            else return { validated: true }
        },

        submitForm(event) {
            event.preventDefault()

            const validate = this.validateForm()
            if (validate.validated) {
                successNotify('', 'Mensagem eviada!')
                // send this.message
                console.log(this.message)
            } else {
                errorNotify('', validate.message)
            }
        }
    }
}
</script>

<style scoped>

    form {
        max-width: 768px;
        margin: 30px auto;
    }

    .form-group {
        width: 100%;
    }
    .form-group label {
        display: block;
        width: 100%;
    }
    input,
    textarea {
        width: 100%;
    }

</style>
