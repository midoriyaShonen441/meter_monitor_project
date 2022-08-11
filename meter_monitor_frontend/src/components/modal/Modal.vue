<script>
import axios from 'axios';

export default {
  props: {
    // show: Boolean,
    dataIn: Object
  },
  data(){
    return{
      isDesc: "",
      isCheck: false,
      isDelete: false,
      errorDesc: "",
      isEdit:false,
      textDesc:"",
      isLoading: false, 
      showConfirm: false
    }
  },
  methods:{
    async fetchImg(){
      const payload = {
        isCheck: isCheck,
        imgDesc: imgDesc,
        isDelete: isDelete,
        _id: _id
      }

      try{
        const returnDataUpdate = await axios.put("/updateMachine",payload);
        if(returnDataUpdate.data.isError === false){
          alert(returnDataUpdate.data.text);
        }else{
          this.errorDesc = returnDataUpdate.data.text;
        }
      }catch(err){
        this.errorDesc = "Cannot connnect to backend."
      }
    },
  
    haddleEdit(){
      this.imgText = this.dataIn.data.imgDesc;
      this.isEdit = true;
    },


    async haddleSaveEdit(updateType){
      // console.log("updateType ==>",updateType)
      this.isLoading = true
      

      if(updateType === "text"){
        const payload = {
          _id: this.dataIn.data._id,
          isDelete: this.dataIn.data.isDelete, 
          imgDesc: this.imgText, 
          isCheck: this.dataIn.data.isCheck,
          updateType: updateType
        }

        try{
          const dataUpdate = await axios.put("http://127.0.0.1:3000/updateMachine", payload);
          // console.log("dataUpdate ==> ",dataUpdate.data)
          if(dataUpdate.data.isError === false){
            alert(dataUpdate.data.text);
            this.isLoading = false;
            this.dataIn.data.imgDesc = this.imgText
            this.$store.isDateG = ""
            
          }else{
            this.errorDesc = dataUpdate.data.text;
            this.isLoading = false;
          }
        }catch(err){
          this.errorDesc = err;
          this.isLoading = false;
        }

      }else if(updateType === 'check'){

        const payload = {
          _id: this.dataIn.data._id,
          isDelete: this.dataIn.data.isDelete, 
          imgDesc: this.imgText, 
          isCheck: true,
          updateType: updateType
        }

        try{
          const dataUpdate = await axios.put("http://127.0.0.1:3000/updateMachine", payload);
          console.log("dataUpdate ==> ",dataUpdate.data)
          if(dataUpdate.data.isError === false){
            alert(dataUpdate.data.text);
            this.isLoading = false;
            this.dataIn.data.imgDesc = this.imgText
            this.$store.isDateG = ""
            this.$emit("close")
          }else{
            this.errorDesc = dataUpdate.data.text;
            this.isLoading = false;
          }
        }catch(err){
          this.errorDesc = err;
          this.isLoading = false;
        }

      }else if(updateType === "delete"){
        const payload = {
          _id: this.dataIn.data._id,
          isDelete: true, 
          imgDesc: this.imgText, 
          isCheck: this.dataIn.data.isCheck,
          updateType: updateType
        }

        try{
          const dataUpdate = await axios.put("http://127.0.0.1:3000/updateMachine", payload);
          console.log("dataUpdate ==> ",dataUpdate.data)
          if(dataUpdate.data.isError === false){
            alert(dataUpdate.data.text);
            this.isLoading = false;
            this.dataIn.data.imgDesc = this.imgText
            this.$store.isDateG = ""
            this.$emit("close")
          }else{
            this.errorDesc = dataUpdate.data.text;
            this.isLoading = false;
          }
        }catch(err){
          this.errorDesc = err;
          this.isLoading = false;
        }
      }else if(updateType === "uncheck"){
        const payload = {
          _id: this.dataIn.data._id,
          isDelete: this.dataIn.data.isDelete, 
          imgDesc: this.imgText, 
          isCheck: false,
          updateType: updateType
        }

        try{
          const dataUpdate = await axios.put("http://127.0.0.1:3000/updateMachine", payload);
          console.log("dataUpdate ==> ",dataUpdate.data)
          if(dataUpdate.data.isError === false){
            alert(dataUpdate.data.text);
            this.isLoading = false;
            this.dataIn.data.imgDesc = this.imgText
            this.$store.isDateG = ""
            this.$emit("close")
          }else{
            this.errorDesc = dataUpdate.data.text;
            this.isLoading = false;
          }
        }catch(err){
          this.errorDesc = err;
          this.isLoading = false;
        }
      }

      
      
    },

    haddleCancelEdit(){
      this.isEdit = false
    },

    haddleExit(){
      this.isDesc = ""
      this.isCheck = false
      this.isDelete = false
      this.errorDesc = ""
      this.isEdit = false
      this.textDesc = ""
      this.$emit("close")
    },

    

    haddleConfirmDelete(selectionIn){
      this.showConfirm = true;
      if(selectionIn === 'delete'){
        // console.log(selectionIn)
        this.haddleSaveEdit('delete')
      }else if(selectionIn === 'cancel'){
        this.showConfirm = false;
      }
    },
  },
  mounted(){
    // console.log("this.dataIn ==> ",this.dataIn);
    // this.textDesc =  this.dataIn.data.imgDesc
  },
  updated(){
    // this.textDesc =  this.dataIn.data.imgDesc
  }
 
}
</script>

<template>
  <Transition name="modal">
    <div v-if="dataIn.show" class="modal-mask">
      <div class="confirm-delete" v-if="showConfirm">
        <div class="description-delete">
          <h3>คุณต้องการจะลบข้อมูลชุดนี้ใช่หรือไม่</h3>
        </div>
        <div class="haddle-btn-confirm">
          <button class="btn-confirm-delete" @click="haddleConfirmDelete('delete')">Remove</button>
          <button class="btn-cancel-delete" @click="haddleConfirmDelete('cancel')">Cancel</button>
        </div>
      </div>
    <div class="on-loading" v-if="isLoading === true"><h1>Loading...</h1></div>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
            <button class="btn-close-modal" @click="haddleExit">X</button>
          </div>

          <div class="modal-body">
            <div class="body-content">
              <img :src="this.dataIn.data.img" height="450" width="450" />
              <div class="setting-content-text" >
                <h6>
                  Description
                </h6>

                  <div class="text-container" v-if="errorDesc === ''" >
                    <p v-if="!isEdit">
                      {{dataIn.data.imgDesc}}
                    </p>
                    <div v-if="isEdit" >
                      <textarea class="textarea-desc" v-model="imgText"></textarea>
                    </div>
                  </div>
                
                  <div  class="text-container" v-if="errorDesc !== ''">
                      <h1 class="error-desc">{{errorDesc}}</h1>
                  </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-check-button" v-if="!(isEdit) && dataIn.checking === false" @click="haddleSaveEdit('check')">Check</button>
              <button class="modal-uncheck-button" v-if="dataIn.checking === true" @click="haddleSaveEdit('uncheck')">Uncheck</button>
              <button class="modal-save-button" v-if="!isEdit" @click="haddleEdit">Edit</button>
              <button class="btn-save-edit" v-if="isEdit" @click="haddleSaveEdit('text')">Save</button>
              <button class="modal-delete-button" v-if="isEdit" @click="haddleCancelEdit">Cancel</button>
              <button class="modal-delete-button" v-if="!isEdit" @click="haddleConfirmDelete">Delete</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style  scoped>
.btn-confirm-delete{
  margin-right: 30px;
  border: none;
  background: rgb(234, 155, 155);
  height: 40px;
  width: 100px;
  border-radius: 30px;
}

.btn-cancel-delete{
  margin-left: 30px;
  border: none;
  background: rgb(181, 234, 155);
  height: 40px;
  width: 100px;
  border-radius: 30px;
}
.haddle-btn-confirm{
  margin-top: 20vh;
  text-align: center;
}
.description-delete{
  text-align: center;
  margin-top: 100px;
}
.confirm-delete{
  position: fixed;
  width: 700px;
  height: 500px;
  margin: 5% auto; /* Will not center vertically and won't work in IE6/7. */
  left: 0;
  right: 0;
  background: #fcfcfc;
  border: 1px solid black;
  border-radius: 30px;
  /* margin-left: 30%;
  margin-top: 50vh; */
  z-index: 999;
}
.on-loading{
    position: fixed;
    text-align: center;
    background-color: rgb(199, 199, 199);
    width: 100%;
    height: 100%;
    opacity: 0.7;
    z-index: 999;
    left: 0;
    top: 0;
}

.on-loading > h1{
    margin-top: 25%;
}

.error-desc{
  text-align: center;
  margin-top: 10%;
  color: red;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 70%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #284d87;
}

.modal-body {
  margin: 20px 0;
}

 

.body-content{
  display:flex;
  justify-content: space-between;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.setting-content-text{
  width: 55%;
}

.setting-content-text > h6{
  margin-left: 10px;
}

.modal-footer{
  display:flex;
  justify-content: flex-end;
}

.modal-delete-button{
  width: 120px;
  border: 1px solid #F47D7D;
  border-radius: 5px;
  background-color: #F47D7D;
  color: whitesmoke;
}

.modal-save-button{
  width: 120px;
  border: 1px solid #F4E27D;
  border-radius: 5px;
  background-color: #F4E27D;
  color: whitesmoke;
}

.modal-check-button{
  width: 120px;
  border: 1px solid #ABE88E;
  border-radius: 5px;
  background-color: #ABE88E;
  color: whitesmoke;
}

.modal-uncheck-button{
  width: 120px;
  border: 1px solid #ec4949;
  border-radius: 5px;
  background-color: #ec4949;
  color: whitesmoke;
}

.text-container{
  margin-left: 20px;
}

.textarea-desc{
  width: 90%;
  height: 350px;
}

.btn-edit-container{
  text-align: right;
  margin-top: 10px;
}

.btn-save-edit{
  width: 120px;
  border: 1px solid #ABE88E;
  border-radius: 5px;
  background-color: #ABE88E;
  color: whitesmoke;
}

.btn-close-modal{
  border: none;
  border-radius: 50%;
  background-color: rgb(217, 217, 217);
}
</style>