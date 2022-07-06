<script>
import axios from 'axios';

export default {
    data(){
        return{
            // debug login // 
            isUsername: "",
            isPassword: "",
            ErrorText: ""
        }
    },
    methods:{
        async haddleLogin(){

            try{

                const payload = {
                    username:this.isUsername,
                    password: this.isPassword
                }

                const isUserProfile = await axios.post("http://127.0.0.1:3000/haddlelogin",payload);

                if(isUserProfile.data.isError === false){
                    this.ErrorText = "";  
                    this.$cookies.set('userDam',isUserProfile.data.userData.username); 
                    this.$cookies.set("DamToken", isUserProfile.data.userData.isToken);
                    this.$cookies.set("DamType", isUserProfile.data.userData.userType);
                    this.$router.push("/verify");
                }else{
                    this.ErrorText = isUserProfile.data.text
                }
            }catch(err){
                this.ErrorText = "Cannot connect to backend."
            }
            
        },
        // funcCheckLogin(){
        //     if(this.$cookies.get("userDam")){
        //         this.$router.push("/verify");
        //     }
        // }
    },
    mounted(){
        // this.funcCheckLogin();
    }
}
</script>

<template>
    <div class="register-container">
        <div class="login-container">
            <div class="setting-container">

                <div class="username-container">
                    <input class="input-username-container" placeholder="username" v-model="isUsername" type="text" required />
                </div>
                <div class="password-container">
                    <input class="input-password-container" placeholder="password" v-model="isPassword" type="password" required />
                </div>
                <div class="Error-container" style="text-align: center; color: red;" v-if="ErrorText !== ''">
                    <p>{{this.ErrorText}}</p>
                </div>
                <div class="set-btn-container">
                    <button class="btn-login" @click="haddleLogin">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-container{
    text-align: center; 
}
.login-container{
    height: 100px;
    margin-top: 18%; 
}
.setting-container{
    margin:auto;
    width: 500px;
    height: 300px;
    border-radius:60px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.input-username-container{
    margin-top: 50px;
    height: 30px;
    width: 200px;
    border-radius: 30px;
    border: 1px solid gray;
    text-indent: 15px;
}

.input-password-container{
    margin-top: 30px;
    height: 30px;
    width: 200px;
    border-radius: 30px;
    border: 1px solid gray;
    text-indent: 15px;
}

.btn-login{
    margin-top: 30px;
    background: gray;
    border-radius: 30px;
    width: 100px;
    height: 30px;
    color: white;
    border: none
}
</style>