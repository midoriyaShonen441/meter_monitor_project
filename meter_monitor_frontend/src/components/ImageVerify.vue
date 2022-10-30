<script>
import 'v-calendar/dist/style.css';
import axios from 'axios';
import Footer from '../components/footer/Footer.vue';
import Modal from './modal/Modal.vue';

export default {
    components: {
        Footer,
        Modal
    },
    setup() {
        return {

        }
    },
    data() {
        return {
            date: new Date(),
            storeDate: new Date(),
            isDateChange: false,
            typeDate: "",
            isDate: "",
            dateShow: "",
            isInputDate: "",
            isDateBase: "",
            userId: "",
            imgData: [],
            imgDataTest: [],
            isFirst: false,
            showModal: false,
            setObject: {},
            filterBtn: "img",
            isLoading: true,
            errorDesc: "",
            isChecking: false,
            findType: true,
            arrayMeter: [],
            uniqueMeter: [],
            meterZone: [],
            cssMeterIsCheck: "card-meter",
            listAllMeter:null,
            backupListAllMeter:null,
            findMeterId: "",
            findZoneId:"",
            // setReloadCn: false,
        }
    },
    methods: {

        btnEditProfile() {
            // console.log("edit");
            this.$router.push("/updateprofile");
        },

        btnSwitch() {
            if (this.filterBtn === "img") {
                this.filterBtn = "list"
            } else {
                this.filterBtn = "img"
            }
        },

        settingModal(menuIn) {
            console.log("menuIn ==> ",menuIn)
            this.setObject = {
                _id: menuIn._id,
                meterId: menuIn.meterId,
                zoneId: menuIn.zoneId,
                isDelete: menuIn.isDelete,
                isCheck: menuIn.isCheck,
                imgDesc: menuIn.imgDesc,
                img: menuIn.img,
            }
            this.isChecking = menuIn.isCheck;
            this.showModal = true;
        },

        btnChangeSerach(evt){
            if(evt === 'zone'){
                this.findType = 'zone'
                this.fetchImageData()
            }else if(evt === 'meter'){
                this.findType = 'meter'
                this.fetchMeter()
            }else if(evt === 'all'){
                this.findType= 'all'
                this.findAllMeter()
            }
        },

        distinctMeterId(value, index, seft){
            return seft.indexOf(value) === index
        },



        haddleFinder(evt){
            if(evt === 'reset'){
                this.listAllMeter = this.backupListAllMeter;
            }else{
                if(this.findMeterId === ""){
                this.listAllMeter = this.backupListAllMeter;
                this.findMeterId = ""
                // this.$forceUpdate();
                // this.setReloadCn = false
                }else{
                this.listAllMeter = this.backupListAllMeter;
                let setListMeterData = []
                this.listAllMeter.forEach(element => {
                    if(element.meterId === this.findMeterId){
                        setListMeterData.push(element)
                    }
                })
                this.listAllMeter = setListMeterData;
                this.findMeterId = ""
                // this.$forceUpdate();
                // this.setReloadCn = false
                }
            }

            
        },

        async findAllMeter(){
            try{
                const allMeterData = await axios.get("http://localhost:3000/fetchAll");
                let setData = []
                for(let i = 0; i < allMeterData.data.length;i++){
                    const settingData = {
                                _id: allMeterData.data[i]._id,
                                dateString: allMeterData.data[i].dateString,
                                date: allMeterData.data[i].date.slice(11, 16),
                                filename: allMeterData.data[i].filename,
                                size: allMeterData.data[i].size,
                                meterId: allMeterData.data[i].meterId,
                                zoneId: allMeterData.data[i].zoneId,
                                isDelete: allMeterData.data[i].isDelete,
                                isCheck: allMeterData.data[i].isCheck,
                                imgDesc: allMeterData.data[i].imgDesc,
                                img: "data:image/png;base64, " + allMeterData.data[i].image
                            }
                    setData.push(settingData)
                } 
                this.listAllMeter = setData;
                this.backupListAllMeter = setData;
            }catch(err){
                console.log(err);
            }       
        },  

        

        async fetchMeter(){

            this.imgData = []
            const day = this.date.getDate();
            const month = this.date.getMonth() + 1;
            const year = this.date.getFullYear();
            this.isDate = `${year}-${month}-${day}`;
            this.$store.isDateG = this.isDate;
            this.storeDate = this.isDate;
            this.dateShow = `${day}/${month}/${year}`

            try{
                const payload = {
                    dateIn: this.isDate
                }
                const gettingImgData = await axios.post("http://localhost:3000/fetchimg", payload);

                console.log(this.arrayMeter)
                let setMeterId = []
                let setMeterZoneId = []
                for(let i = 0; i < gettingImgData.data.listData.length;i++){
                    console.log(gettingImgData.data.listData[i])
                    const settingData = {
                                _id: gettingImgData.data.listData[i]._id,
                                dateString: gettingImgData.data.listData[i].dateString,
                                date: gettingImgData.data.listData[i].date.slice(11, 16),
                                filename: gettingImgData.data.listData[i].filename,
                                size: gettingImgData.data.listData[i].size,
                                meterId: gettingImgData.data.listData[i].meterId,
                                zoneId: gettingImgData.data.listData[i].zoneId,
                                isDelete: gettingImgData.data.listData[i].isDelete,
                                isCheck: gettingImgData.data.listData[i].isCheck,
                                imgDesc: gettingImgData.data.listData[i].imgDesc,
                                img: "data:image/png;base64, " + gettingImgData.data.listData[i].image
                            }
                    this.arrayMeter.push(settingData)
                    setMeterZoneId.push(gettingImgData.data.listData[i].zoneId)
                    setMeterId.push(gettingImgData.data.listData[i].meterId)
                }   
                this.meterZone = setMeterZoneId.filter(this.distinctMeterId)
                this.uniqueMeter= setMeterId.filter(this.distinctMeterId)
                console.log("zone",this.meterZone)
            }catch(err){
                console.log(err)
            }
        },

        async fetchImageData() {
            this.imgData = []


            const day = this.date.getDate();
            const month = this.date.getMonth() + 1;
            const year = this.date.getFullYear();

            this.isDate = `${year}-${month}-${day}`;
            this.$store.isDateG = this.isDate;

            this.storeDate = this.isDate;
            this.dateShow = `${day}/${month}/${year}`

            try {


                const payload = {
                    dateIn: this.isDate
                }

                const gettingImgData = await axios.post("http://localhost:3000/fetchimg", payload);
                
                if (gettingImgData.data.isError === false) {
                    this.isDateBase = gettingImgData.data.isDate

                    let zone1 = [];
                    let zone2 = [];
                    let zone3 = [];
                    let zone4 = [];

                    gettingImgData.data.listData.forEach(element => {
                        if (element.zoneId === '1') {
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
                                date: element.date.slice(11, 16),
                                filename: element.filename,
                                size: element.size,
                                meterId: element.meterId,
                                zoneId: element.zoneId,
                                isDelete: element.isDelete,
                                isCheck: element.isCheck,
                                imgDesc: element.imgDesc,
                                img: "data:image/png;base64, " + element.image
                            }
                            zone1.push(settingData)
                        } else if (element.zoneId === '2') {
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
                                date: element.date.slice(11, 16),
                                filename: element.filename,
                                size: element.size,
                                meterId: element.meterId,
                                zoneId: element.zoneId,
                                isDelete: element.isDelete,
                                isCheck: element.isCheck,
                                imgDesc: element.imgDesc,
                                img: "data:image/png;base64, " + element.image
                            }
                            zone2.push(settingData)
                        } else if (element.zoneId === '3') {
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
                                date: element.date.slice(11, 16),
                                filename: element.filename,
                                size: element.size,
                                meterId: element.meterId,
                                zoneId: element.zoneId,
                                isDelete: element.isDelete,
                                isCheck: element.isCheck,
                                imgDesc: element.imgDesc,
                                img: "data:image/png;base64, " + element.image
                            }
                            zone3.push(settingData)
                        } else if (element.zoneId === '4') {
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
                                date: element.date.slice(11, 16),
                                filename: element.filename,
                                size: element.size,
                                meterId: element.meterId,
                                zoneId: element.zoneId,
                                isDelete: element.isDelete,
                                isCheck: element.isCheck,
                                imgDesc: element.imgDesc,
                                img: "data:image/png;base64, " + element.image
                            }
                            zone4.push(settingData)
                        }
                    });
                    this.imgData.push(zone1);
                    this.imgData.push(zone2);
                    this.imgData.push(zone3);
                    this.imgData.push(zone4);
                    this.isLoading = false;

                } else {
                    this.isLoading = false;
                    this.errorDesc = gettingImgData.data.text
                }
            } catch (err) {
                console.log(err);
                this.isLoading = false;
                this.errorDesc = err;
            }
        },

        haddleTypeDate() {
            const trimDate = this.isInputDate.trim();
            const convertDate = trimDate.split("/");
            const genNewDate = convertDate[2] + "-" + convertDate[1] + "-" + convertDate[0]
            // console.log(genNewDate);
            this.isDate = genNewDate;
        },

        async funcGetCookies() {
            // console.log("getting cookies")
            try {

                const isCheckAuth = await axios({
                    method: "GET",
                    url: "http://localhost:3000/checkingauth",
                    headers: {
                        'Content-Type': 'application/json',
                        'access-token': this.$cookies.get("DamToken")
                    }
                });

                if (isCheckAuth.data.text !== "ok") {
                    this.$cookies.remove("userDam");
                    this.$cookies.remove("DamToken");
                    this.$cookies.remove("DamType");
                    this.$router.push("/")
                } else {
                    this.userId = this.$cookies.get("userDam");

                }
            } catch (err) {
                alert("Error in backend.");
                alert("Error code: ", err);
                this.$cookies.remove("userDam");
                this.$cookies.remove("DamToken");
                this.$cookies.remove("DamType");
                this.$router.push("/")
            }
        },

        haddleLogout() {
            this.$cookies.remove("userDam");
            this.$cookies.remove("DamToken");
            this.$cookies.remove("DamType");
            this.$router.push("/");
        },
        haddleSelectDate() {
            this.fetchImageData();
        },
    },
    mounted() {
        this.funcGetCookies();
        // this.haddleFinder();
        // if(this.setReloadCn === true){
        //     this.haddleFinder()
        // }
    },
    updated() {
        const day = this.date.getDate();
        const month = this.date.getMonth() + 1;
        const year = this.date.getFullYear();

        const dateNow = `${year}-${month}-${day}`;

        if (dateNow !== this.$store.isDateG) {
            // console.log("date change!")
            this.isLoading = true;
            this.fetchImageData();
        }

        
        

        
    }
}

</script>

<template>
    <div class="warp-container">
        <div class="on-loading" v-if="isLoading === true">
            <h1>Loading...</h1>
        </div>
        <div class="error-desc" v-if="errorDesc !== ''">
            <h1>{{ errorDesc }}</h1>
        </div>
        <div class="verify-container">
            <div class="filter-container">
                <div class="set-search-type">
                    <div>
                        <button class="btn-find-switch" @click="btnChangeSerach('zone')">ค้นหาโดยโซน</button>
                    </div>
                    <div>
                        <button class="btn-find-switch" @click="btnChangeSerach('meter')">ค้นหาโดยมิตเตอร์</button>
                    </div>
                    <div>
                        <button class="btn-find-switch" @click="btnChangeSerach('all')">ดูมิตเตอร์ทั้งหมด</button>
                    </div>
                </div>
                <div class="title-username">
                    <h4>user: {{userId}}</h4>
                </div>
                <div class="userprofile-info">

                    <div>
                        <button class="btn-logout" @click="haddleLogout">Logout</button>
                        <button class="btn-edit" @click="btnEditProfile">Edit</button>
                    </div>
                </div>
                <br />

                <div class="calendar-container">
                    <v-date-picker style="border-radius: 30px;" v-model="date" />
                </div>

            </div>
            <div class="collection-container" v-if="findType === 'zone'">
                
                <div class="set-title-content">
                    <div class="set-container-content">
                        <h3 style="color: #9A9A9A">ค้นหาโดยโซน ผลการตรวจสอบประจำวันที่ {{dateShow}}</h3>
                        <div class="set-from-icon">
                            <button class="on-click-menu" @click="btnSwitch">
                                <img src="./icons/photo.png" height="20" width="20">
                            </button>
                            <button class="on-click-menu" @click="btnSwitch">
                                <img src="./icons/list.png" height="20" width="20">
                            </button>
                        </div>
                    </div>
                    <hr />
                </div>
                <div class="content-container" v-if="filterBtn === 'img'">
                    <div class="img-data-container" v-for="(isdata, index1) in imgData" :key="index1">
                        <h4 class="title-container">
                            โซนที่ {{index1 + 1}}
                            <hr />
                        </h4>
                        <div class="setting-grid-img">
                            <div class="setting-grid-img-show" v-for="(isdata2, index2) in isdata" :key="index2">
                                <div class="setting-modal-content" v-if="isdata2.isDelete !== true"
                                    @click="settingModal(isdata2)">
                                    <img class="img-on" width="250" height="250" :src="isdata2.img" />
                                    <div class="set-label" v-if="isdata2.isCheck === false">
                                        <h5>Meter {{isdata2.meterId}}</h5>
                                    </div>
                                    <div class="set-label-check" v-if="isdata2.isCheck === true">
                                        <h5>Meter {{isdata2.meterId}}</h5>
                                    </div>
                                </div>
                                <Teleport to="body">
                                    <modal :dataIn="{show: showModal, data:setObject, checking:isChecking}"
                                        @close="showModal = false">
                                        <template #header>
                                            <h3>Location Zone: {{setObject.zoneId}} with Meter id:
                                                {{setObject.meterId}}, </h3>
                                        </template>
                                    </modal>
                                </Teleport>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-container" v-if="filterBtn === 'list'">
                    <div class="img-data-container" v-for="(isdata, index1) in imgData" :key="index1">
                        <h4 class="title-container">
                            โซนที่ {{index1 + 1}}
                            <hr />
                        </h4>
                        <div class="setting-list-img">
                            <div class="setting-grid-img-show">
                                <div class="setting-modal-content">
                                    <div class="set-list">
                                        <table>
                                            <tr class="table-header" v-if="isdata.lenght !== 0">
                                                <th>รูปภาพ</th>
                                                <th>สถานะ</th>
                                                <th>ชื่อไฟล์</th>
                                                <th>วันที่</th>
                                                <th>เวลา</th>
                                                <th>ขนาดไฟล์</th>
                                            </tr>
                                            <tr class="setting-row" v-for="(isdata2, index2) in isdata" :key="index2"
                                                @click="settingModal(isdata2)">
                                                <td>
                                                    <img height="30" width="30" :src="'data:image/png;base64, '+isdata2.img" />
                                                </td>
                                                <td>
                                                    <span class="status-check"
                                                        v-if="isdata2.isCheck === true">ยืนยัน</span>
                                                    <span class="status-not-check"
                                                        v-if="isdata2.isCheck === false">ยังไม่ได้ยืนยัน</span>
                                                </td>
                                                <td>{{isdata2.filename}}</td>
                                                <td>{{isdata2.dateString}}</td>
                                                <td>{{isdata2.date}}</td>
                                                <td>{{isdata2.size}}</td>
                                            </tr>
                                        </table>
                                        <!-- <h5>Meter {{isdata2.meterId}}</h5> -->
                                    </div>
                                </div>
                                <Teleport to="body">
                                    <modal :dataIn="{show: showModal, data:setObject}" @close="showModal = false">
                                        <template #header>
                                            <h3>Location Zone: {{setObject.zoneId}} with Meter id:
                                                {{setObject.meterId}}, </h3>
                                        </template>
                                    </modal>
                                </Teleport>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div  class="collection-container" v-if="findType === 'meter'">
                <div class="set-container-content">
                    <h3 style="color: #9A9A9A">ค้นหาโดยมิเตอร์ ผลการตรวจสอบประจำวันที่ {{dateShow}}</h3>
                </div>
                <hr />
                <div class="content-container">
                    <div class="set-meter-container" v-for="(setMeter, indexSet) in uniqueMeter" :key="indexSet">
                        <div class="meter-title">
                            <h5>Meter id: {{setMeter}}</h5>
                        </div>
                        <div class="set-meter-detail-container">
                            <div class="meter-detail"  v-for="(meterId, indexId) in arrayMeter" :key="indexId">
                               
                                    <div class="card-meter" v-if="setMeter === meterId.meterId">
                                        <div class="card-img">
                                            <img height="150" width="150" :src="meterId.img" />
                                        </div>
                                        <div class="card-desc">
                                            <div class="card-desc-label">
                                                <div>วันที่บันทึก</div>
                                                <div>วันที่เวลาที่บันทึก</div>
                                                <div>ชื่อไฟล์</div>
                                                <div> โซน/พื้นที่</div>
                                                <div>สถานะการยืนยัน</div>
                                            </div>
                                            <div class="card-desc-text">
                                                <div>{{meterId.dateString}}</div>
                                                <div>{{meterId.date}}</div>
                                                <div>{{meterId.filename}}</div>
                                                <div>{{meterId.zoneId}}</div>
                                                <div v-if="meterId.isCheck === false" style="color: rgb(141, 18, 18); font-size: 18px; font-weight: bold;">ยังไม่ได้ยืนยัน</div>
                                                <div v-if="meterId.isCheck === true" style="color: rgb(0, 94, 201); font-size: 18px; font-weight: bold;">ยืนยัน</div>
                                            </div>
                                            <div class="card-desc-commemt">
                                                <div class="card-comment-title">
                                                    <h6>คำอธิบาย</h6>
                                                </div>
                                                <div>
                                                    {{meterId.imgDesc}}
                                                </div>
                                            </div>
                                            <div>
                                                <button class="card-btn-edit" @click="settingModal(meterId)">แก้ไขข้อมูล</button>
                                                <Teleport to="body">
                                                    <modal :dataIn="{show: showModal, data:setObject, checking:isChecking}"
                                                        @close="showModal = false">
                                                        <template #header>
                                                            <h3>Location Zone: {{setObject.zoneId}} with Meter id:
                                                                {{setObject.meterId}}, </h3>
                                                        </template>
                                                    </modal>
                                                </Teleport>
                                            </div>
                                        </div>
                                    </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div  class="collection-container" v-if="findType === 'all'">
                <div class="set-container-content">
                    <h3 style="color: #9A9A9A">ค้นหามิเตอร์ทั้งหมด</h3>
                </div>
                <div class="filter-container-set">
                    <input class="set-finder" v-model="findMeterId" placeholder="เลขมิเตอร์" />
                    <button class="btn-finder" style="margin-right: 10px;" @click="haddleFinder">ค้นหา</button>
                    <button class="btn-finder" @click="haddleFinder('reset')">คืนค้า</button>
                </div>
                <hr />
                <div class="content-container">
                    <table>
                        <tr>
                            <th>รูป</th>
                            <th>มิเตอร์</th>
                            <th>โซน</th>
                            <th>ชื่อไฟล์</th>
                            <th>วันที่ที่บันทึก</th>
                            <th>เวลาที่บันทึก</th>
                            <th>สถานะการยืนยัน</th>
                            <th>ขนาดไฟล์</th>
                            <th>รายละเอียด</th>
                        </tr>
                        <tr v-for="(data ,index) in listAllMeter" :key="index">
                            <td> <img height="100" width="100" :src="data.img" /></td>
                            <td>{{data.meterId}}</td>
                            <td>{{data.zoneId}}</td>
                            <td>{{data.filename}}</td>
                            <td>{{data.dateString}}</td>
                            <td>{{data.date}}</td>
                            <td>{{data.isCheck}}</td>
                            <td>{{data.size}}</td>
                            <td>{{data.imgDesc}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="adding-footer">
            <Footer />
        </div>
    </div>
</template>

<style scoped>
.status-check {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    color: rgb(42, 144, 52)
}

.status-not-check {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    color: rgb(255, 47, 47)
}

.on-loading {
    position: fixed;
    text-align: center;
    background-color: rgb(199, 199, 199);
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 40;
    left: 0;
    top: 0;
}

.on-loading>h1 {
    margin-top: 25%;
}

.error-desc {
    position: fixed;
    text-align: center;
    background-color: rgb(255, 255, 255);
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 40;
    left: 0;
    top: 0;
}

.error-desc>h1 {
    margin-top: 25%;
    color: red;
}

table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.on-click-menu {
    border-radius: 3px;
    border: 1px solid rgb(122, 122, 122);

}

.warp-container {
    height: 100%;
}

.verify-container {
    display: grid;
    grid-template-columns: 1.5fr 5fr;
    height: 680px;
    margin-top: 10.9%;
}

.search-date-input {
    margin-bottom: 20px;
}

.filter-container {
    margin-top: 30px;
    text-align: center;
    background-color: #EAEAEA33;
}

.set-input-date {
    width: 75%;
    height: 30px;
    border-radius: 4px;
    border: none;
    text-indent: 30px;
    box-shadow: rgba(112, 112, 168, 0.25) 0px 30px 60px -12px inset, rgba(60, 60, 60, 0.3) 0px 18px 36px -18px inset;
}

.content-container {
    margin-bottom: 100px;
}

.btn-logout {
    background-color: rgb(149, 61, 61);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    height: 30px;
    width: 70px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.btn-edit {
    margin-left: 10px;
    background-color: rgb(212, 211, 116);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    height: 30px;
    width: 70px;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.container-btn-select-date {
    margin-top: 30px;
}

.btn-select-date {
    background-color: rgb(36, 54, 103);
    color: white;
    border-radius: 5px;
    font-weight: bold;
    height: 30px;
    border: none;
    width: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.userprofile-info {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.userprofile-info>h4 {
    margin-right: 10px;
}


.userprofile-info>div>button {
    margin-top: 10px;
}

.set-container-content {
    display: flex;
    justify-content: space-between;
    margin-left: 30px;
    margin-right: 30px;
}

.set-from-icon {
    margin-top: 12px;
    margin-right: 3px;
}

.set-from-icon>button {
    margin-right: 3px;
}

.img-data-container {
    margin-left: 30px;
}

.set-label {
    text-align: center;
    height: 30px;
    width: 250px;
    background-color: rgb(223, 220, 220);
    color: grey;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.set-label-check {
    text-align: center;
    height: 30px;
    width: 250px;
    background-color: rgb(143, 255, 206);
    color: grey;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
}

.title-container {
    color: rgb(90, 88, 88);
    margin-top: 30px;
}

.img-on {
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
}

.setting-grid-img {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-row-gap: 50px;
}

.setting-grid-img-show {
    z-index: 10;
}

.adding-footer {
    margin-top: 20%;
}

/*  test modal */
.modal-btn {
    width: 30%;
    height: 40px;
    margin: auto;
    text-align: center;
    border-radius: 10px;
    margin-top: 10px;
}

.modal-dialog {
    top: 30vh;
}



.modal-bg {
    background-color: rgb(60, 60, 60);
    height: 150px;
    z-index: 40;
}

 
.set-search-type{
    width: 80%;
    margin: auto;
}

.btn-find-switch{
    width: 180px;
    height: 60px;
    border-radius: 10px;
    border: 1px solid grey;
    font-size: 18px;
    margin-bottom: 40px;
}

.btn-find-switch:hover{
    background-color: rgb(109, 109, 109);
    color: white;
}

.btn-find-switch:active{
    background-color: rgb(109, 109, 109);
    color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.set-meter-container{
    width: 95%;
    margin: auto;
    margin-bottom: 30px;
}

.set-meter-detail-container{
    max-height: 1000px;
    overflow-y: scroll;
    margin-left: 10px;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset;
    border-radius: 10px;
}

.grid-meter-border{
    margin-bottom: 10px;
}

.meter-detail{
    margin-bottom: 30px;
}

.card-meter{
    display: grid;
    grid-template-columns: 1fr 2fr;
    border-bottom: 1px solid grey;
    padding-bottom: 30px;
    padding-top: 30px;
}   

.card-img{
    text-align: center;
}

.card-desc{
   display: grid;
   grid-template-columns: 1fr 2fr 2fr 1fr;
}

.card-desc-commemt{
    margin-right: 50px;
}

.card-btn-edit{
    width: 100px;
    height: 50px;
    margin-top: 40px;
    border-radius: 10px;
    border: 1px solid gray;
}

.card-btn-edit:hover{
    background: rgb(104, 104, 104);
    color:white;
}

.card-btn-edit:active{
    background: rgb(84, 84, 84);
    color:white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
}

.set-finder{
    margin-left: 20px;
    margin-right: 20px;
    width: 300px;
    height: 50px;
}


.filter-container-set{
    text-align: left;
    margin-top: 30px;
    margin-bottom: 30px;
}

.btn-finder{
    height: 50px;
    border: 1px solid rgb(127, 127, 127);
    border-radius: 10px;
}

.btn-finder:hover{
    background-color: rgb(99, 99, 99);
    color: white;
}

.btn-finder:active{
    background-color: rgb(72, 72, 72);
    color: white;
}

</style>