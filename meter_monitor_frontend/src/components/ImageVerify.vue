<script>
import 'v-calendar/dist/style.css';
import axios from 'axios';

export default {
    data(){
        return{
            date: new Date(),
            typeDate:"",
            isDate:"",
            userId:"",
            imgData:[]
        }
    },
    methods:{
        async fetchImageData(){
            console.log("fetch img data");

            const payload = {
                dateIn: this.isDate
            }

            const gettingImgData = await axios.post("http://127.0.0.1:3000/fetchimg",payload);
            this.imgData = gettingImgData.data;
            console.log(this.imgData);
 

        },
        setConvert(){
            console.log("set convert")
            const day = this.date.getDate();
            const month = this.date.getMonth()+1;
            const year = this.date.getFullYear();
            this.isDate = `${year}-${month}-${day}`;
            // console.log(this.isDate);
            // this.isDate = `${day}/${month}/${year}`;
        },

        haddleTypeDate(){
            
            const trimDate = this.typeDate.trim();
            console.log(trimDate);
        },

        async funcGetCookies(){
            console.log("getting cookies")
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
        this.setConvert();
        this.funcGetCookies();
        this.fetchImageData()
    },

    // updated(){
    //     this.setConvert();
    // }
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
            <div class="set-title-content">
                <div class="set-container-content">
                    <h3 style="color: #9A9A9A">ผลการตรวจสอบประจำวันที่ {{date.getDate()}}/{{date.getMonth() + 1 }}/{{date.getFullYear() + 543}}</h3>
                    <div class="set-from-icon">
                        <button><i class="material-icons"></i></button>
                        <button>List</button>
                    </div>
                </div>
                <hr/>
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

.set-container-content{
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    margin-right: 30px;
}

.set-from-icon{
    margin-top: 12px;
    margin-right: 3px;   
}

.set-from-icon > button{
    margin-right: 3px;   
}
</style>