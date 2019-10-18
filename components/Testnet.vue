<template>
  <section>

    <section class="pageWrapperNodeMonitor" v-if="$store.state.settings.nodeMonitorEnabled">

      <h1 class="subPageHeader">NODE MONITOR</h1>

      <section class="moduleContainer">

        <div id="splittViewRow">
          <Settings id="settingsContainer" v-if="this.$store.state.settings.standalone === false" :restartInterval="restartInterval" :enableInterval="enableInterval" :disableInterval="disableInterval"/>
          <Settings id="settingsContainer" v-if="this.$store.state.settings.standalone === true" :restartInterval="restartIntervalLocal" :enableInterval="enableIntervalLocal" :disableInterval="disableIntervalLocal"/>
        </div>

        <div id="splittViewRow">
          <NodeStats v-if="nodeStats.lastBlockHeight" :nodeStats="nodeStats" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" :country="'Location'" :nodeType="'Pool Name'" id="settingsContainer"/>
        </div>

        <div id="splittViewRow">
          <Mempool :mempool="mempool" :nodeName="''" :momentCalDate="momentCalDate" :momentWithSeconds="momentWithSeconds" id="settingsContainer"/>
        </div>

      </section>
    </section>

    <section class="pageWrapperTestnet" v-if="$store.state.settings.explorerEnabled">

      <h1 class="subPageHeader">TESTNET EXPLORER</h1>

      <section class="moduleContainer">

        <Transactions :transactions="transactions" :getAdaValue="getAdaValue" :sumAllTransferred="sumAllTransferred" id="transactionContainer"/>

        <div class="testnetContainerElement">
          <h3 style="text-align:center;margin-bottom:1em;color:#dedeff;">Stakepool Distribution</h3>

          <StakePool v-if="pool[1] != 0" v-for="(pool, index) in sortStakePoolDistribution" :key="index" :poolIndex="index" :pool="pool" :resolvePoolId="resolvePoolId" :getAdaValue="getAdaValue" :sumAllAtStake="sumAllAtStake" :leaders="leaders"/>
          <br>
          <a-collapse>
            <a-collapse-panel header="Show Stake pools without associated Stake" key="1" style="background-color:rgba(44, 57, 92, 1);">
              <StakePool v-if="pool[1] === 0" v-for="(pool, index) in sortStakePoolDistribution" :key="index" :poolIndex="index" :pool="pool" :resolvePoolId="resolvePoolId" :getAdaValue="getAdaValue" :sumAllAtStake="sumAllAtStake" :leaders="leaders"/>
            </a-collapse-panel>
          </a-collapse>
        </div>

      </section>
    </section>

  </section>
</template>

<script>
import moment from 'moment'

import Settings from './elements/Settings'
import NodeStats from './elements/NodeStats'
import Mempool from './elements/Mempool'

import Transactions from './elements/Transactions'
import StakePool from './elements/StakePool'


export default {
  components: {
    Settings,
    NodeStats,
    Mempool,
    Transactions,
    StakePool
  },
  data() {
    return {
      nodeStats: {},
      mempool: [],
      stakePoolDistribution: {},
      poolsWithStake: [],
      poolsWithoutStake: [],
      transactions: [],
      leaders: [],
      refreshIntervalFn: {}
    }
  },
  async mounted() {
    if (this.$store.state.settings.standalone === true) {
      this.refreshApiDataLocally();
      this.refreshIntervalFn = this.returnIntervalLocalFn();
    } else {
      this.refreshApiData();
      this.refreshIntervalFn = this.returnIntervalFn();
    }
  },
  methods: {
    enableInterval() {
      this.refreshIntervalFn = this.returnIntervalFn();
    },
    disableInterval() {
      window.clearInterval(this.refreshIntervalFn);
    },
    restartInterval() {
      window.clearInterval(this.refreshIntervalFn);
      this.refreshIntervalFn = this.returnIntervalFn();
    },
    returnIntervalFn() {
      let interval = window.setInterval(() => {
        this.refreshApiData();
      }, this.$store.state.settings.refreshInterval * 1000);
      return interval;
    },
    enableIntervalLocal() {
      this.refreshIntervalFn = this.returnIntervalLocalFn();
    },
    disableIntervalLocal() {
      window.clearInterval(this.refreshIntervalFn);
    },
    restartIntervalLocal() {
      window.clearInterval(this.refreshIntervalFn);
      this.refreshIntervalFn = this.returnIntervalLocalFn();
    },
    returnIntervalLocalFn() {
      let interval = window.setInterval(() => {
        this.refreshApiDataLocally();
      }, this.$store.state.settings.refreshInterval * 1000);
      return interval;
    },
    async refreshApiData() {
      try {

        let nodeStatData = await this.$axios.get('/api/nodestats');
        this.nodeStats = nodeStatData.data;

        let mempool = await this.$axios.get('/api/fragmentlogs');
        this.mempool = mempool.data;

        let stakePoolDistribution = await this.$axios.get('/api/stake');
        this.stakePoolDistribution = stakePoolDistribution.data.stake;

        let transactions = await this.$axios.get('/api/transactions');
        this.transactions = transactions.data;

        let leaders = await this.$axios.get('/api/leaders');
        this.leaders = leaders.data;

      } catch (err) {
        console.log(err);
      }
    },
    async refreshApiDataLocally() {
      try {

        let nodeStatData = await this.$axios.get('/localapi/api/v0/node/stats', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.nodeStats = nodeStatData.data;

        let mempool = await this.$axios.get('/localapi/api/v0/fragment/logs', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.mempool = mempool.data;

        let stakePoolDistribution = await this.$axios.get('/localapi/api/v0/stake', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.stakePoolDistribution = stakePoolDistribution.data.stake;

        let transactions = await this.$axios.get('/localapi/api/v0/utxo', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.transactions = transactions.data;

        let leaders = await this.$axios.get('/localapi/api/v0/leaders', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        this.leaders = leaders.data;

      } catch (err) {
        console.log(err);
      }
    },
    momentCalDate (date) {
      moment.locale('us');
      return moment(date).format('L');
    },
    momentWithSeconds (date) {
      moment.locale('us');
      return moment(date).format('LTS');
    },
    getAdaValue(lovelace) {
      return lovelace / 1000000;
    },
    resolvePoolId(id) {
      let name = '';
      for (let i = 0; i < this.$store.state.poolNames.length; i++) {
        if (id === this.$store.state.poolNames[i].id) {
          name = this.$store.state.poolNames[i].name;
        }
      }
      return name;
    }
  },
  computed: {
    dataReady() {
      let isReady = false;
      if (this.stakePoolDistribution && this.stakePoolDistribution.pools) {
        isReady = true;
      }
      return isReady;
    },
    sortStakePoolDistribution() {
      if (this.dataReady) {
        return this.stakePoolDistribution.pools.sort(function(a, b) {
          return a[1] > b[1] ? 1 : -1;
        }).reverse();
      }
    },
    sort(arr) {
      arr.sort((a, b) => (a[1] > b[1]) ? 1 : -1);
      return arr;
    },
    sumAllAtStake() {
      let sum = 0;
      for (let i = 0; i < this.stakePoolDistribution.pools.length; i++) {
        sum += this.stakePoolDistribution.pools[i][1]
      }
      return sum;
    },
    sumAllTransferred() {
      let sum = 0;
      for (let i = 0; i < this.transactions.length; i++) {
        sum += this.transactions[i].associated_fund
      }
      return sum;
    },
  }
}


</script>

<style>
.ant-collapse-header {
  color: lightgrey;
  text-align: center;
  font-size: 25px;
  padding: 0.5em;
}
.anticon-right {
  display: none;
}
.ant-collapse-content-box {
  background-color: rgba(44, 57, 92, 0.9);
}
.testnetHeadline {
  font-size: 50px;
  font-weight: 400;
  text-align:center;padding-top: 1em;
  color:#dedeff;
}
#goalsLogo {
  height: 3em;
  margin: auto;
  padding-bottom: 1em;
}
p {
  white-space: pre-line;
  margin: 0;
}
.pageWrapperNodeMonitor {
  padding-bottom: 2em;
  background-color: #2e2e2e;
  color: #dedeff;
}
.pageWrapperTestnet {
  padding-bottom: 2em;
  background-color: #1e1e1e;
  color: #dedeff;
}
.moduleContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-around; /* align horizontal */
  align-items: top; /* align vertical */
  padding-top: 2em;
  /* min-height: 100vh; */
}
.testnetContainerElement {
  margin: 0.5em;
  background-color: rgba(44, 57, 92, 0.3);
  border: 10px solid grey;
  padding: 1em;
  min-width: 25em;
  width: 100%;
}
.delegateElement {
  margin-top: 0.25em;
  border: solid 1px grey;
  padding: 0.5em;
  background-color: rgba(44, 57, 92, 0.3);
}
.txElement {
  margin-top: 0.25em;
  border: solid 1px grey;
  padding: 0.5em;
  background-color: rgba(44, 57, 92, 0.3);
  min-width: 49%;
}
.delegateDescriptionLarge {
  font-size: 15px;
  color: lightgrey;
}
.delegateDescription {
  font-size: 11px;
  color: grey;
}


#splittViewRow {
  display: flex;
  flex-wrap: wrap;
  min-width: 98.9vw;
}
#nodeStatsContainer {
  flex: 1;
  order: 2;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 35em;
  margin: 0.25em;
  background-color: rgba(44, 57, 92, 0.3);
  border: 10px solid grey;
  padding: 1em;
}
#settingsContainer {
  flex: 1;
  order: 1;
  flex-grow: 1;
  flex-basis: 0;
  min-width: 35em;
  margin: 0.25em;
  background-color: rgba(44, 57, 92, 0.3);
  border: 10px solid grey;
  padding: 1em;
}
#transactionContainer {
  min-width: 22.5em;
}

@media screen and (max-width: 1100px) {
  #splittViewRow {
    display: flex;
    flex-wrap: wrap;
    min-width: 96vw;
    font-size: 13px;
    max-width: 100vw;
  }
  #nodeStatsContainer {
    flex: 1;
    order: 2;
    flex-grow: 1;
    flex-basis: 0;
    width: 100%;
    min-width: 20em;
    margin: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    border: 10px solid grey;
    padding: 1em;
    max-width: 100vw;
  }
  #settingsContainer {
    flex: 1;
    order: 1;
    flex-grow: 1;
    flex-basis: 0;
    width: 100%;
    min-width: 35em;
    margin: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    border: 10px solid grey;
    padding: 1em;
    max-width: 100vw;
  }
  .delegateDescriptionLarge {
    font-size: 11px;
    color: lightgrey;
  }
  .testnetContainerElement {
    margin: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    border: 10px solid grey;
    padding: 1em;
    min-width: 20em;
    width: 100%;
  }

  .delegateElement {
    font-size: 12px;
    width: 100%;
  }
  .txElement {
    margin-top: 0.25em;
    border: solid 1px grey;
    padding: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    width: 100%;
  }
  .testnetHeadline {
    font-size: 40px;
    font-weight: 400;
    text-align:center;padding-top: 1em;
    color:#dedeff;
  }
}

@media screen and (max-width: 600px) {
  #splittViewRow {
    display: flex;
    flex-wrap: wrap;
    min-width: 100%;
    font-size: 11px;
    max-width: 100vw;
  }
  #nodeStatsContainer {
    flex: 1;
    order: 2;
    flex-grow: 1;
    flex-basis: 0;
    width: 100%;
    min-width: 35em;
    margin: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    border: 10px solid grey;
    padding: 1em;
    max-width: 100vw;
  }
  #settingsContainer {
    flex: 1;
    order: 1;
    flex-grow: 1;
    flex-basis: 0;
    width: 100%;
    min-width: 35em;
    margin: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    border: 10px solid grey;
    padding: 1em;
    max-width: 100vw;
  }
  .delegateDescriptionLarge {
    font-size: 9px;
    color: lightgrey;
  }
  .delegateDescription {
    font-size: 9px;
    color: lightgrey;
  }
  .testnetContainerElement {
    margin: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    border: 10px solid grey;
    padding: 1em;
    min-width: 10em;
    width: 100%;
  }

  .delegateElement {
    font-size: 11px;
    width: 100%;
  }
  .txElement {
    margin-top: 0.25em;
    border: solid 1px grey;
    padding: 0.5em;
    background-color: rgba(44, 57, 92, 0.3);
    width: 100%;
  }
  .testnetHeadline {
    font-size: 30px;
    font-weight: 400;
    text-align:center;padding-top: 1em;
    color:#dedeff;
  }
}



</style>
