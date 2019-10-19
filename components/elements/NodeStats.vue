<template>
  <section>
    <div class="iconContainerSpaceBetween">
      <h5 style="text-align:center;color:#dedeff;"><b>{{ nodeType }}</b></h5>
      <h3 style="text-align:center;color:#dedeff;">Node Stats</h3>
      <h5 style="text-align:right;color:#dedeff;"><b>{{ country }}</b></h5>
    </div>
    <br>



    <div id="splittViewRowNodeStats">
      <!-- <p style="text-align:center;">Last Block:</p> -->
      <section class="nodeStatsElement">
        <div class="iconContainerSpaceBetween">
          <span>Height: </span>
          <span v-if="olderThanTwoMinutes"><b style="float:right;font-size:30px;color:green;">{{ nodeStats.lastBlockHeight }}</b></span>
          <span v-else><b style="float:right;font-size:30px;color:red;">{{ nodeStats.lastBlockHeight }}</b></span>
        </div>

        <div>
          <span>Timestamp: <b style="float:right;" v-if="nodeStats.lastBlockTime">{{ momentCalDate(nodeStats.lastBlockTime) }} - {{ momentWithSeconds(nodeStats.lastBlockTime) }}</b><b v-else style="float:right;">~</b></span><br>
          <span>Epoch: <span style="float:right;"><b> {{ nodeStats.lastBlockDate.split(".")[0] }}</b></span></span><br>
          <span>Slot: <span style="float:right;"><b> {{ nodeStats.lastBlockDate.split(".")[1] }}</b></span></span><br>
          <span>Fees: <b style="float:right;">{{ nodeStats.lastBlockFees }}</b></span><br>
          <span>Sum: <b style="float:right;">{{ nodeStats.lastBlockSum }}</b></span><br>
          <span>TX count: <b style="float:right;">{{ nodeStats.lastBlockTx }}</b></span><br>
        </div>

        <p style="text-align:center;font-size:13px;">Hash:</p>
        <p style="text-align:center;overflow:auto;"><b class="blockHash">{{ nodeStats.lastBlockHash }}</b></p>
      </section>
      <!-- <p style="text-align:center;">Node Info:</p> -->
      <section class="nodeStatsElement">
        <span>uptime: <b style="float:right;">{{ hhmmss(nodeStats.uptime) }}</b></span><br>
        <span>Blocks received: <b style="float:right;">{{ nodeStats.blockRecvCnt }}</b></span><br>
        <span>TX received: <b style="float:right;">{{ nodeStats.txRecvCnt }}</b></span><br>
      </section>
    </div>











  </section>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    nodeStats: Object,
    momentCalDate: Function,
    momentWithSeconds: Function,
    country: String,
    nodeType: String
  },
  methods: {
    hhmmss(seconds) {
      const arr = new Date(seconds * 1000).toISOString().substr(11, 8).split(':');
      const days = Math.floor(seconds / 86400);
      arr[0] = parseInt(arr[0], 10) + days * 24;
      return arr.join(':');
    }
  },
  computed: {
    olderThanTwoMinutes() {
      if ((moment(this.nodeStats.lastBlockTime) < moment().subtract(5, 'minutes')) || this.nodeStats.lastBlockTime === null) {
        return false;
      } else {
        return true;
      }
    }
  }
}
</script>

<style>
.nodeStatsElement {
  margin-top: 0.25em;
  border: solid 0.25px grey;
  padding: 0.5em;
  background-color: rgba(44, 57, 92, 0.3);
  min-width: 100%;
}
.blockHash {
  font-size: 9px;
  color: lightgrey;
}
#splittViewRowNodeStats {
  display: flex;
  flex-wrap: wrap;
}
</style>
