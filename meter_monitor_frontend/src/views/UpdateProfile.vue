<script>
// import axios
import axios from 'axios'

export default {
    data(){
        return{
            textError: "",
            newPassword: "",
            oldPassword: ""
        }
    },
    methods:{
        async haddleUpdate(){
            if(this.newPassword === this.oldPassword){
                const payload = {
                    username: this.$cookies.get("userDam"),
                     isPassword: this.newPassword
                 }
                const statusUpdate = await axios.put(`${location.href}backend/updateprofile`,payload);

                if(statusUpdate.data.isError === true){

                      this.textError = statusUpdate.data.text

                }else{
 
                      alert("update success. please login again.")
                     this.$cookies.remove("userDam");
                    this .$cookies.remove("DamToken");
                     this.$ookies.remove("DamType");
                    this.$router.push("/");

                 }
            }else{
                this.textError = "password is not match."
            }
        }
    },
    mounted( ){

    }
 }
</script>

<template>
    <div class="update-container">
        <div class="set-update">
            <div class="password-container">
                <div class="set-password">
                    <input class="set-new-password" placeholder="Enter your new password" v-model="newPassword"
                        type="password" />
                </div>
                <div class="set-password">
                    <input class="set-new-password" placeholder="Confirm your password" v-model="oldPassword"
                        type="password" />
                </div>
                <div class="error-container">
                    <h4 v-if="textError !== ''">
                        {{textError}}
                    </h4>
                </div>
                <div class="set-btn">
                    <button class="btn-update" @click="haddleUpdate">update</button>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
.update-container {
    text-align: center;
    bottom: 0;
    height: 100vh;
    margin-top: calc(10% + 100px);
}

.set-update {
    margin: auto;
    height: 50%;
    width: 35%;
    border: 1px solid gray;
    border-radius: 30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}

.password-container {
    margin-top: 10%;
}

.set-password {
    margin-top: 30px;
}

.set-new-password {
    width: 85%;
    height: 50px;
    border-radius: 5px;
    border: 1px solid gray;
    text-indent: 10px;
}

.error-container {
    text-align: center;
    margin-top: 50px;
    color: red;
}

.set-btn {
    margin-top: calc(15vh - 50px);
    display: flex;
    justify-content: flex-end;
    margin-right: 50px;
}

.btn-update {
    border: 1px solid gray;
    border-radius: 10px;
    width: 100px;
}
</style>