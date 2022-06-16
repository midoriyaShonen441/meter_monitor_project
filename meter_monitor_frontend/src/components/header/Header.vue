<script>
export default {

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
                    <h1 style="color:#7184A3;">
                    <span style="text-decoration: underline"  >แอปพลิเคชันตรวจสอบการทำงานอุปกรณ์</span> 
                    <br/>
                    เขื่อนภูมิพล</h1>
                </div>
            </div>
        </div>  
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
    margin-top:15px
}

.setting-logo-container{
    display: flex;
    justify-content: flex-start;
}

.logo-title-container{
    margin-left: 100px;
}
</style>