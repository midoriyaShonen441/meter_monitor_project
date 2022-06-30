<script>
import 'v-calendar/dist/style.css';
import axios from 'axios';
import Footer from '../components/footer/Footer.vue';
// import { Pagination } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/vue';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation'
import Modal from './modal/Modal.vue';

export default {
    components:{
        Footer,
        // Swiper,
        // SwiperSlide,
        Modal
    },
    setup() {
      return {
        // modules: [Pagination]
        
      }
    },
    data(){
        return{
            date: new Date(),
            typeDate:"",
            isDate:"",
            isInputDate:"",
            isDateBase:"",
            userId:"",
            imgData:[],
            imgDataTest:[],
            isFirst:false, 
            showModal: false,
            // menuData:"",
            setObject:{},
            // debugModalData:[{
            //     meterId:"A",
            //     zoneId:"1",
            //     img:"666",
            //     desc:"aaaaa"
            // },{
            //     meterId:"B",
            //     zoneId:"1",
            //     img:"66446",
            //     desc:"bbbbaa"
            // }]

        }
    },
    methods:{
        
        settingModal(menuIn){
            console.log("menuIn ===> ",menuIn);
            this.setObject = {
                meterId: menuIn.meterId,
                zoneId: menuIn.zoneId,
                img: menuIn.img,
                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
            // this.menuData =  menuIn;
            this.showModal = true;
            

        },  

        async fetchImageData(){
            this.imgData = []
            // console.log("fetch img data");
            // console.log("set convert");

            const day = this.date.getDate();
            const month = this.date.getMonth()+1;
            const year = this.date.getFullYear();
            
            // console.log(payload)
            try{
                this.isDate = `${year}-${month}-${day}`;
                // console.log("this.isDate ===> ",this.isDate); 

                const payload = {
                    dateIn: this.isDate
                }

                const gettingImgData = await axios.post("http://127.0.0.1:3000/fetchimg",payload);
                // console.log("gettingImgData.data", gettingImgData.data.isDate)
                this.isDateBase = gettingImgData.data.isDate
                // console.log("settingDateBase ===> ",this.isDateBase);
                // console.log("gettingImgData.data ==> ",gettingImgData.data)
                
                let zone1 = [];
                let zone2 = [];
                let zone3 = [];
                let zone4 = [];
 
                gettingImgData.data.listData.forEach(element => {
                    if(element.zoneId === '1'){
                        this.imgDataTest.push("data:image/png;base64, "+element.image)
                        const settingData = {
                            meterId:element.meterId,
                            zoneId: element.zoneId,
                            img: "data:image/png;base64, "+element.image
                        }
                        zone1.push(settingData)
                    }else if(element.zoneId === '2'){
                        this.imgDataTest.push("data:image/png;base64, "+element.image)
                        const settingData = {
                            meterId:element.meterId,
                            zoneId: element.zoneId,
                            img: "data:image/png;base64, "+element.image
                        }
                        zone2.push(settingData)
                    }else if(element.zoneId ==='3'){
                        this.imgDataTest.push("data:image/png;base64, "+element.image)
                        const settingData = {
                            meterId:element.meterId,
                            zoneId: element.zoneId,
                            img: "data:image/png;base64, "+element.image
                        }
                        zone3.push(settingData)
                    }else if(element.zoneId === '4'){
                        this.imgDataTest.push("data:image/png;base64, "+element.image)
                        const settingData = {
                            meterId:element.meterId,
                            zoneId: element.zoneId,
                            img: "data:image/png;base64, "+element.image
                        }
                        zone4.push(settingData)          
                    }
                });
 
                // this.imgData.push(warping);
                this.imgData.push(zone1);
                this.imgData.push(zone2);
                this.imgData.push(zone3);
                this.imgData.push(zone4);
                console.log(this.imgDataTest)

                console.log("data ===> ",this.imgData);
                
            }catch(err){
                console.log(err);
            }
        },

        haddleTypeDate(){
            const trimDate = this.isInputDate.trim();
            const convertDate = trimDate.split("/");
            const genNewDate = convertDate[2]+"-"+convertDate[1]+"-"+convertDate[0]
            console.log(genNewDate);
            this.isDate = genNewDate;
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
        },

        haddleSelectDate(){
            this.fetchImageData();
        },

   
    },

    beforeMount(){
        // this.haddleSelectDate();
    },

    mounted(){
        // this.setConvert();
        this.funcGetCookies();
        if(this.isFirst === false){
            this.fetchImageData();
            this.isFirst = true
        }
        
    },
}

</script>

<template>
      <div class="warp-container">
            <div class="verify-container">
                        <div class="filter-container">
                            <div class="userprofile-info">
                                <h4>user: {{userId}}</h4>
                               
                                <div>
                                    <button class="btn-logout" @click="haddleLogout">Logout</button>
                                </div>
                            </div>
                            <div class="search-date-input">
                                <input class="set-input-date" placeholder="31/01/1990"  v-model="isInputDate" />
                                <button @click="haddleTypeDate"><i class="fa fa-search"></i></button>
                            </div>
                            <div class="calendar-container">
                                <v-date-picker  style="border-radius: 30px;" v-model="date" />
                            </div>
                            <div class="container-btn-select-date">
                                <button class="btn-select-date" @click="haddleSelectDate">select</button>
                            </div>
                        </div>
                        <div class="collection-container">
                            <div class="set-title-content">
                                <div class="set-container-content">
                                    <h3 style="color: #9A9A9A">ผลการตรวจสอบประจำวันที่ {{isDate}}</h3>
                                    <div class="set-from-icon">
                                        <button>
                                            <i class="material-icons"></i>
                                        </button>
                                        <button>List</button>
                                    </div>
                                </div>
                                <hr/>
                            </div>
                                     
                            
                            <div class="content-container" >
                                <div class="img-data-container" v-for="(isdata, index1) in imgData"   :key="index1">
                                    <h4 class="title-container">
                                        โซนที่ {{index1 + 1}}
                                         <hr/>
                                    </h4>

                                    <div class="setting-grid-img" > 

                                        <div class="setting-grid-img-show" v-for="(isdata2, index2) in isdata" :key="index2">
                                            <div class="setting-modal-content" @click="settingModal(isdata2)">

                                                <img class="img-on" width="250" height="250" :src="isdata2.img"   /> 
                                                <div class="set-label">
                                                    <h5>Meter {{isdata2.meterId}}</h5>
                                                </div>
                                            </div>
                                            <Teleport to="body">
                                                <modal :dataIn="{show: showModal, data:setObject}" @close="showModal = false">
                                                    <template #header>
                                                        <h3>Location Zone: {{setObject.zoneId}} with Meter id: {{setObject.meterId}}, </h3>
                                                    </template>
                                                </modal>
                                            </Teleport>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div class="test">
                        
                        <!-- <button id="show-modal" @click="settingModal(debugModalData[0])">Show Modal</button>
                        <button id="show-modal-1" @click="settingModal(debugModalData[1])">Show Modal2</button>

                        <Teleport to="body">
                
                            <modal :dataIn="{show: showModal, data:menuData}"   @close="showModal = false">
                            <template #header>
                                <h3>custom header {{this.menuData.meterId}}</h3>
                            </template>
                            </modal>
                        </Teleport> -->

                         
                       
                    </div>
                    
            <div class="adding-footer">
                
                
                <Footer/>
            </div>
            
      </div>
</template>

<style scoped>
 

.warp-container{
    height: 100%;
}
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

.content-container{
    margin-bottom: 100px;
 
}

.btn-logout{
    background-color: rgb(149, 61, 61);
    color:white;
    border-radius: 5px;
    font-weight: bold;
    height: 30px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
.container-btn-select-date{
    margin-top: 30px;
}
.btn-select-date{
    background-color: rgb(36, 54, 103);
    color:white;
    border-radius: 5px;
    font-weight: bold;
    height: 30px;
    border: none;
    width: 50%;
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

.img-data-container{
     margin-left: 30px;
}

.set-label{
    text-align: center;
    height: 30px;
    width: 250px;
    background-color: rgb(223, 220, 220);
    color: grey;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}
.title-container{
    color: rgb(90, 88, 88);
    margin-top: 30px;
}

 
.img-on{
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.setting-grid-img{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 50px; 
}

.setting-grid-img-show{
    z-index: 10;
}

.adding-footer{
    margin-top: 20%;
}

 
/*  test modal */
 
.modal-btn{
    width: 30%;
    height: 40px;
    margin: auto;
    text-align: center;
  
    border-radius: 10px;
    margin-top: 10px;
 
}

.modal-dialog{
    top: 30vh;
}



.modal-bg{
    background-color: rgb(60, 60, 60);
    height: 150px;
    z-index: 999;
}

/* .modal-bg2{
    background-color: rgb(90, 42, 42);
    height: 150px;
} */
/* 
.is-modal{
    position: fixed;
    margin: auto;
    left: 25%;
    top:10vh;
    width: 50%;
    height: 70vh;
    align-items: center;
    z-index: 999;
    background-color: gray;
    border-radius: 10px;
} */
</style>