<template>
  <div>
    <div class="iconContainerSpaceBetween">
      <p>Mempool count: {{ mempool.length }}</p>
      <h3 style="text-align:center;margin-bottom:1em;color:#dedeff;">Mempool {{ nodeName }}</h3>
      <p style="cursor:pointer;" @click="listAllTx = !listAllTx">Pending: {{ pendingCount }}</p>
    </div>

    <div class="delegateElement" v-for="(transaction, index) in mempool.slice(0, 5)" :key="index">
      <SingleTx :transaction="transaction" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds"/>
    </div>

    <a-collapse v-if="mempool.length > 5" style="margin-top:0.25em;">
      <a-collapse-panel header="Show more" key="1" style="background-color:rgba(44, 57, 92, 1);">
        <div class="delegateElement" v-for="(transaction, index) in mempool.slice(5)" :key="index">
          <SingleTx :transaction="transaction" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds"/>
        </div>
      </a-collapse-panel>
    </a-collapse>

  </div>
</template>

<script>
import moment from 'moment'
import SingleTx from './SingleTx'

export default {
  props: {
    mempool: Array,
    momentCalDate: Function,
    momentWithSeconds: Function,
    nodeName: String
  },
  components: {
    SingleTx
  },
  computed: {
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

<style lang="css" scoped>
</style>
