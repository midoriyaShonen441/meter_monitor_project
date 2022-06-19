<script>
import 'v-calendar/dist/style.css';
import axios from 'axios';

export default {
    data(){
        return{
            date: new Date(),
            typeDate:"",
            isDate:"",
            userId:""
        }
    },
    methods:{
        async fetchImageData(){
            const gettingImgData = await axios.get("http://127.0.0.1:3000/")
        },
        setConvert(){
            const day = this.date.getDate();
            const month = this.date.getMonth()+1;
            const year = this.date.getFullYear();
            this.isDate = `${day}/${month}/${year}`;
        },

        haddleTypeDate(){
            const trimDate = this.typeDate.trim();
            console.log(trimDate);
        },

        async funcGetCookies(){

            try{
 

                const isCheckAuth = await axios({
                        method: "GET",
                        url:"http://127.0.0.1:3000/checkingauth",
                        headers: {
                            'Content-Type': 'application/json',
                            'access-token': this.$cookies.get("DamToken")
                            }
                        });

                // console.log(isCheckAuth);

                if(isCheckAuth.data.text !== "ok"){
                    this.$cookies.remove("userDam");
                    this.$cookies.remove("DamToken");
                    this.$cookies.remove("DamType");
                    this.$router.push("/")
                }else{
                    this.userId = this.$cookies.get("userDam");

                }
            }catch(err){
                alert("Error in backend.");
                alert("Error code: ",err);
                this.$cookies.remove("userDam");
                this.$cookies.remove("DamToken");
                this.$cookies.remove("DamType");
                this.$router.push("/")
            }
            
            
        },
        haddleLogout(){
            this.$cookies.remove("userDam");
            this.$cookies.remove("DamToken");
            this.$cookies.remove("DamType");
            this.$router.push("/");
        }
    },

    mounted(){
        this.funcGetCookies();
    },

    beforeUpdate(){
        this.setConvert();
    }
}
</script>

<template>
    <div class="verify-container">
        <div class="filter-container">
            <div class="userprofile-info">
                <h4>user: {{userId}}</h4>
                <div>
                    <button class="btn-logout" @click="haddleLogout">Logout</button>
                </div>
            </div>
            <div class="search-date-input">
                <input class="set-input-date" placeholder="01/01/1990"  v-model="typeDate"/>
                <button @click="haddleTypeDate"><i class="fa fa-search"></i></button>
            </div>
            <div class="calendar-container">
                <v-date-picker  style="border-radius: 30px;" v-model="date" />
            </div>
        </div>
        <div class="collection-container">
            <div>
                <h1>debug ==> {{isDate}}</h1>
            </div>
            <div class="content-container">
                
            </div>
            
        </div>
    </div>
</template>

<style scoped>
.verify-container{
    display: grid;
    grid-template-columns: 1.5fr 5fr;
    height: 680px;
    margin-top: 10.9%; 
}
.search-date-input{
    margin-bottom: 20px;
}
.filter-container{
    margin-top: 30px;
    text-align: center;
    background-color: #EAEAEA33;
}
.set-input-date{
    width: 75%;
    height: 30px;
    border-radius: 4px;
    border: none;
    text-indent: 30px;
    box-shadow: rgba(112, 112, 168, 0.25) 0px 30px 60px -12px inset, rgba(60, 60, 60, 0.3) 0px 18px 36px -18px inset;
}

.btn-logout{
    background-color: rgb(220, 80, 80);
    color:white;
    border-radius: 5px;
    font-weight: bold;
    height: 30px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.userprofile-info{
    display: flex;
    justify-content:center;
    margin-bottom: 10px;
}

.userprofile-info > h4{
    margin-right: 10px;
}

 
.userprofile-info > div > button{
    margin-top: 10px;   
}
</style>