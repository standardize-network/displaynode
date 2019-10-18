<template>
  <div class="testnetContainerElement">
    <div class="iconContainerSpaceBetween">
      <p>TX Count: {{ transactions.length }}</p>
      <h3 style="text-align:center;margin-bottom:1em;color:#dedeff;">Find Transactions</h3>
      <p>{{ getAdaValue(sumAllTransferred).toFixed(6) }} ₳</p>
      <!-- <p style="cursor:pointer;" @click="listAllTx = !listAllTx">show all (may take a moment)</p> -->
    </div>


    <input v-model="txSearchId" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="ENTER FRAGMENT ID OR ADDRESS" @keyup.enter="searchTx()"/>
    <br><br>

    <h2 v-if="noResult === true" style="text-align:center;padding-bottom:1em;">No Results!</h2>

    <div class="delegateElement" v-if="resultTx.transaction_id != undefined" style="margin-bottom:1em;">
      <h2 style="text-align:center;">Searchresult:</h2>


      <div class="txElement">
        <p>Fragment ID: <b style="float:right;">{{ resultTx.transaction_id }}</b></p>
        <p>Address: <b style="float:right;">{{ resultTx.address }}</b></p>
        <p>Associated Fund: <b style="float:right;">{{ resultTx.associated_fund }}</b></p>
      </div>
    </div>



    <a-collapse>
      <a-collapse-panel header="Show all Transactions" key="1" style="background-color:rgba(44, 57, 92, 1);">
        <div class="iconContainerSpaceBetween">
          <div class="txElement" v-for="(tx, index) in transactions" :key="index">
            <p>Fragment ID: <b style="float:right;font-size:12px;">{{ tx.transaction_id }}</b></p>
            <p>Address: <b style="float:right;font-size:12px;">{{ tx.address }}</b></p>
            <p>Associated Fund: <b style="float:right;font-size:12px;">{{ tx.associated_fund }}</b></p>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>

  </div>
</template>

<script>
export default {
  props: {
    transactions: Array,
    getAdaValue: Function,
    sumAllTransferred: Number
  },
  data() {
    return {
      resultTx: {},
      txSearchId: '',
      noResult: false
    }
  },
  methods: {
    searchTx() {
      let haveRes;
      for (let i = 0; i < this.transactions.length; i++) {
        if (this.transactions[i].transaction_id === this.txSearchId || this.transactions[i].address === this.txSearchId) {
          haveRes = this.transactions[i];
          this.resultTx = this.transactions[i];
        }
      }
      if (haveRes === undefined) {
        this.noResult = true;
        this.resultTx = {};
      } else {
        this.noResult = false;
      }
    }
  }
}
</script>

<style>
::-webkit-input-placeholder {
   text-align: center;
}

:-moz-placeholder { /* Firefox 18- */
   text-align: center;
}

::-moz-placeholder {  /* Firefox 19+ */
   text-align: center;
}

:-ms-input-placeholder {
   text-align: center;
}

.spinningIcon {
  animation-name: spin;
  animation-duration: 2000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  /* transform: rotate(3deg); */
   /* transform: rotate(0.3rad);/ */
   /* transform: rotate(3grad); */
   /* transform: rotate(.03turn);  */
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>
