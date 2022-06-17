<script>
export default {
    data(){
        return{
            isUserIn:false
        }
    },
    methods:{
        funcGetCookies(){
            const userIn = this.$cookies.get("userDam");
            if(userIn){
                this.isUserIn = true
            }else{
                this.isUserIn = false
            }
        },
        haddleLogout(){
            this.$cookies.remove("userDam");
            this.$router.push("/");
        }
    },
    // created(){
    //     this.funcGetCookies();
    // },
    // beforeMount(){
    //     this.funcGetCookies();
    // },
    // mounted(){
    //     this.funcGetCookies();
    // },
    // beforeUpdate(){
    //     this.funcGetCookies();
    // },
    // updated(){
    //     this.funcGetCookies();
    // }
}
</script>

<template>
  <div class="header-container">
    <div class="sub-header-container">
        <div class="logo-container">
            <div class="setting-logo-container">
                    <router-link to="./">
                        <img class="logo" height="120" width="120" src="../../assets/powerth.png"/>
                    </router-link>
                    
                    <div class="logo-title-container">
                        <div class="on-title-content">
                            <h1 style="color:#7184A3;">
                            <span style="text-decoration: underline"  >แอปพลิเคชันตรวจสอบการทำงานอุปกรณ์</span> 
                            <br/>
                            เขื่อนภูมิพล</h1>
                        </div>
                    </div>
            </div>
        </div>  
        <!-- <div class="setting-buttom" v-if="isUserIn === true">
            <button class="btn-logout" @click="haddleLogout">Logout</button>
        </div> -->
    </div>
    <div style="height: 180px;"></div>
  </div>
</template>

<style>
.header-container{
    background-color: #F4E27D;
    position: absolute;
    left: 0px;
    top:0px;
    width: 100%;
    height: 180px;
}

.sub-header-container{
    background-color: #F9EFB8;
    position: absolute;
    width: 100%;
    height: 140px;
}

.logo-container{
    margin-left:50px;
    margin-top:15px;
}

.setting-logo-container{
    display: flex;
    justify-content: flex-start;
   
}

.logo-title-container{
    display: grid;
    margin-left: 100px;
}
 
.setting-buttom{
    display: flex;
    justify-content: flex-end;
    margin-right: 80px;
    margin-top: 3px;
}

/* .btn-logout{
    background-color: rgb(220, 80, 80);
    color:white;
    border-radius: 5px;
    width: 100px;
    font-weight: bold;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
} */

</style>