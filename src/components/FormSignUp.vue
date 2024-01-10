<template>
    <section id="hero" class="d-flex align-items-between">
        <div class="container-fluid aos-init aos-animate" data-aos="fade-up">
            <div class="row justify-content-center">
                <div class="col-xl-5 col-lg-6 d-flex flex-column justify-content-space-around">
                    <div class="card p-4">
                        <h3 class="title">Welcome to Saudi AZM</h3>
                        <p class="text-black">Create new account</p>

                        <form @submit.prevent="onSubmit">
                            <div class="form-group mt-3">
                                <label>Email</label>
                                <input type="email" v-model="email" class="form-control"
                                    :class="{ 'is-valid': email !== '', 'is-invalid': hasErrEmail }" />
                                <div class="invalid-feedback" v-if="hasErrEmail">
                                    This field is required
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" v-model="password" class="form-control"
                                    :class="{ 'is-valid': password !== '', 'is-invalid': hasErrPass }" />
                                <div class="invalid-feedback" v-if="hasErrPass">
                                    This field is required
                                </div>
                            </div>

                            <button type="submit" class="btn btn-primary mt-3 btn-block py-3">
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
                <div class="col-xl-4 col-lg-6 order-1 order-lg-4 hero-img aos-init aos-animate" data-aos="zoom-in"
                    data-aos-delay="150">
                    <img src="https://bootstrapmade.com/demo/templates/Techie/assets/img/hero-img.png"
                        class="img-fluid animated" alt="">
                </div>
            </div>
        </div>

    </section>
</template>
<script>
import { createUser } from '@/firebase'

export default {
    data() {
        return {
            hasErrEmail: false,
            hasErrPass: false,
            email: '',
            password: '',
            hashedPassword: '',

        }
    },
    methods: {
        async generateHashPass(password) {
            if(password !== '') { 
                const encoder = new TextEncoder();
                const data = await encoder.encode(password);
                const hash = await crypto.subtle.digest("SHA-256", data);
                const hashArray = await Array.from(new Uint8Array(hash));
                const hashHex = await hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
                return hashHex;
            }
        },
        async onSubmit() {
            await this.generateHashPass(this.password).then((password) => {
                this.hashedPassword = password;
            });
            const formData = {
                'email': this.email,
                'password': this.hashedPassword,
                'role': 0,
                'profileImage': '',

            };
            if (formData.email == '') {

                this.hasErrEmail = true;
            }
            else if (formData.password == '') {

                this.hasErrPass = true;
            }
            else if (formData.email == '' && formData.password == '') {

                this.hasErrEmail = true;
                this.hasErrPass = true;
            }
            else if (formData.email !== '' && formData.password !== '') {

                this.hasErrEmail = false;
                this.hasErrPass = false;
                await createUser({ ...formData })
                formData.email = ''
                formData.password = ''
            }


        }

    }
}
</script>
<style>
.title {
    font-size: 26px;
    font-weight: 600;
    color: #733088;
}
</style>
