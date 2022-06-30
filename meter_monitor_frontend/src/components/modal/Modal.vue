<script>
export default {
  props: {
    // show: Boolean,
    dataIn: Object
  },
  // mounted(){
  //   console.log("this.dataIn ==> ",this.dataIn)
  // }
}
</script>

<template>
  <Transition name="modal">
    <div v-if="dataIn.show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <div class="body-content">
              <img :src="this.dataIn.data.img" height="450" width="450" />
              <div class="setting-content-text">
                <h6>Description</h6>
                <div class="text-container">
                  <p>{{ this.dataIn.data.desc }}</p>
                </div>
              </div>
              
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-check-button"
                @click="$emit('close')"
              >
              Check
              </button>
              <button
                class="modal-save-button"
                @click="$emit('close')"
              >
              Save
              </button>
              <button
                class="modal-delete-button"
                @click="$emit('close')"
              >
              Delete
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style >
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
</style>