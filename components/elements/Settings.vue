<template>
  <div>
    <h3 style="text-align:center;margin-bottom:1em;color:#dedeff;">Settings</h3>

    <span><b>Refresh Interval:</b><b style="float:right;padding-bottom:1em,">{{ settings.refreshInterval }} seconds</b></span>
    <input type="range" min="1" max="60" class="slider" id="myRange" v-model="localRefreshInterval" @change="writeChangeToStore('refreshInterval', localRefreshInterval);restartInterval()">
    <div class="m3">

      <button v-if="settings.refreshEnabled" @click="writeChangeToStore('refreshEnabled', !$store.state.settings.refreshEnabled);disableInterval()" style="width:100%;" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
        Disable Refresh
      </button>

      <button v-else @click="writeChangeToStore('refreshEnabled', !$store.state.settings.refreshEnabled);enableInterval()" style="width:100%;" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full">
        Enable Refresh
      </button>


      <button v-if="$store.state.settings.mempoolEnabled" @click="writeChangeToStore('mempoolEnabled', !$store.state.settings.mempoolEnabled);restartInterval()" style="width:100%;margin-top:0.25em;" class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full">
        Disable Mempool
      </button>

      <button v-else @click="writeChangeToStore('mempoolEnabled', !$store.state.settings.mempoolEnabled);restartInterval()" style="width:100%;margin-top:0.25em;" class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded-full">
        Enable Mempool (can take some time)
      </button>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    enableInterval: Function,
    disableInterval: Function,
    restartInterval: Function,
  },
  mounted() {
    this.localRefreshInterval = this.$store.state.settings.refreshInterval;
  },
  data() {
    return {
      localRefreshInterval: 10
    }
  },
  methods: {
    writeChangeToStore(target, value) {
      this.$store.commit('writeChange', { target, value });
    }
  },
  computed: {
    ...mapState([
      'settings'
    ])
  }
}
</script>

<style>
.slidecontainer {
  width: 100%;
  border-radius: 50px;
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 25px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
  border-radius: 50px;
}
.slider:hover {
  opacity: 1;
}
.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background: red;
  cursor: pointer;
  border-radius: 50px;
}
.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background: red;
  cursor: pointer;
  border-radius: 50px;
}
</style>
