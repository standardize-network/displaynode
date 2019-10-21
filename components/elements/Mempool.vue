<template>
  <div>
    <div class="iconContainerSpaceBetween">
      <p>Mempool count: {{ mempool.length }}</p>
      <h3 style="text-align:center;margin-bottom:1em;color:#dedeff;">Mempool {{ nodeName }}</h3>
      <p style="cursor:pointer;" @click="listAllTx = !listAllTx">Pending: {{ pendingCount }}</p>
    </div>

    <a-collapse defaultActiveKey="last">

      <a-collapse-panel :header="`Last Transactions`" key="last" style="background-color:rgba(44, 57, 92, 1);">
        <MempoolTransaction :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="pendingTxs[0]" v-if="pendingTxs[0]"/>
        <MempoolTransaction :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="inBlockTxs[0]" v-if="inBlockTxs[0]"/>
        <MempoolTransaction :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="rejectedTxs[0]" v-if="rejectedTxs[0]"/>
        <MempoolTransaction :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="undefinedTxs[0]" v-if="undefinedTxs[0]"/>
      </a-collapse-panel>

      <a-collapse-panel :header="`Pending Transactions (${pendingTxs.length})`" key="1" style="background-color:rgba(44, 57, 92, 1);">
        <MempoolTransaction v-for="(transaction, index) in pendingTxs" :key="index" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="transaction" v-if="transaction"/>
      </a-collapse-panel>

      <a-collapse-panel :header="`In a Block (${inBlockTxs.length})`" key="2" style="background-color:rgba(44, 57, 92, 1);">
        <MempoolTransaction v-for="(transaction, index) in inBlockTxs" :key="index" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="transaction" v-if="transaction"/>
      </a-collapse-panel>

      <a-collapse-panel :header="`Rejected Transactions (${rejectedTxs.length})`" key="3" style="background-color:rgba(44, 57, 92, 1);">
        <MempoolTransaction v-for="(transaction, index) in rejectedTxs" :key="index" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="transaction" v-if="transaction"/>
      </a-collapse-panel>

      <a-collapse-panel :header="`Other Transactions (${undefinedTxs.length})`" key="4" style="background-color:rgba(44, 57, 92, 1);">
        <MempoolTransaction v-for="(transaction, index) in undefinedTxs" :key="index" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :transaction="transaction" v-if="transaction"/>
      </a-collapse-panel>

    </a-collapse>



  </div>
</template>

<script>
import MempoolTransaction from './MempoolTransaction'
import moment from 'moment'

export default {
  props: {
    mempool: Array,
    momentCalDate: Function,
    momentWithSeconds: Function,
    nodeName: String
  },
  components: {
    MempoolTransaction
  },
  computed: {
    pendingTxs() {
      let pending = [];
      for (let i = 0; i < this.mempool.length; i++) {
        if (this.mempool[i].status === 'Pending') {
          pending.push(this.mempool[i]);
        }
      }
      pending.sort(function(a,b){
      return new Date(b.last_updated_at) - new Date(a.last_updated_at);
      });
      return pending;
    },
    inBlockTxs() {
      let pending = [];
      for (let i = 0; i < this.mempool.length; i++) {
        if (this.mempool[i].status.InABlock != undefined) {
          pending.push(this.mempool[i]);
        }
      }
      pending.sort(function(a,b){
      return new Date(b.last_updated_at) - new Date(a.last_updated_at);
      });
      return pending;
    },
    rejectedTxs() {
      let pending = [];
      for (let i = 0; i < this.mempool.length; i++) {
        if (this.mempool[i].status.Rejected != undefined) {
          pending.push(this.mempool[i]);
        }
      }
      pending.sort(function(a,b){
      return new Date(b.last_updated_at) - new Date(a.last_updated_at);
      });
      return pending;
    },
    undefinedTxs() {
      let pending = [];
      for (let i = 0; i < this.mempool.length; i++) {
        if (this.mempool[i].status != 'Pending' && this.mempool[i].status.Rejected === undefined && this.mempool[i].status.InABlock === undefined) {
          pending.push(this.mempool[i]);
        }
      }
      pending.sort(function(a,b){
      return new Date(b.last_updated_at) - new Date(a.last_updated_at);
      });
      return pending;
    },
    pendingCount() {
      let counter = 0;
      for (let i = 0; i < this.mempool.length; i++) {
        if (this.mempool[i].status === 'Pending') {
          counter ++;
        }
      }
      return counter;
    }
  }
}
</script>

<style>

</style>
