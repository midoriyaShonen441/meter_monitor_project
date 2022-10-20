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
            isChecking: false
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
            // console.log("menuIn ==> ",menuIn)
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

        async fetchImageData() {
            this.imgData = []


            const day = this.date.getDate();
            const month = this.date.getMonth() + 1;
            const year = this.date.getFullYear();

            this.isDate = `${year}-${month}-${day}`;
            this.$store.isDateG = this.isDate;
            // console.log("this.$store.isDateG  ===> ", this.$store.isDateG)
            this.storeDate = this.isDate;
            this.dateShow = `${day}/${month}/${year}`

            // console.log(payload)
            try {


                const payload = {
                    dateIn: this.isDate
                }

                const gettingImgData = await axios.post("http://localhost:3000/fetchimg", payload);
                // console.log(gettingImgData.data)
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
                            // this.imgDataTest.push("data:image/png;base64, "+element.image)
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
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
                            // console.log("zone 3 ==>",element)
                            // this.imgDataTest.push("data:image/png;base64, "+element.image)
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
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
                            // this.imgDataTest.push("data:image/png;base64, "+element.image)
                            const settingData = {
                                _id: element._id,
                                dateString: element.dateString,
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
                    // this.imgData.push(warping);
                    this.imgData.push(zone1);
                    this.imgData.push(zone2);
                    this.imgData.push(zone3);
                    this.imgData.push(zone4);
                    this.isLoading = false;

                    // console.log(this.imgDataTest)
                    // console.log("data ===> ",this.imgData);
                } else {
                    this.isLoading = false;
                    this.errorDesc = gettingImgData.data.text
                }
                // console.log("gettingImgData.data", gettingImgData.data)

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

                // console.log(isCheckAuth);

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
            <div class="collection-container">
                <div class="set-title-content">
                    <div class="set-container-content">
                        <h3 style="color: #9A9A9A">ผลการตรวจสอบประจำวันที่ {{dateShow}}</h3>
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
                                                <th>ขนาดไฟล์</th>
                                            </tr>
                                            <tr class="setting-row" v-for="(isdata2, index2) in isdata" :key="index2"
                                                @click="settingModal(isdata2)">
                                                <td>
                                                    <img height="30" width="30" :src="isdata2.img" />
                                                </td>
                                                <td>
                                                    <span class="status-check"
                                                        v-if="isdata2.isCheck === true">ยืนยัน</span>
                                                    <span class="status-not-check"
                                                        v-if="isdata2.isCheck === false">ยังไม่ได้ยืนยัน</span>
                                                </td>
                                                <td>{{isdata2.filename}}</td>
                                                <td>{{isdata2.dateString}}</td>
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
</style>