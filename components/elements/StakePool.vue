<template>
  <div :style="resolveLeaderStyle">
    <div class="iconContainerSpaceBetween">
      <span>#{{ poolIndex + 1 }} - <span v-if="resolvePoolId(pool[0]) != ''"><b>{{ resolvePoolId(pool[0]) }} </b></span></span>
      <p><span>{{ getAdaValue(pool[1]).toFixed(6) }} ₳</span></p>
    </div>

    <p style="text-align:center;font-size:13px;"><span class="delegateDescriptionLarge" style="overflow:auto;">{{ pool[0] }}</span></p>

    <a-progress :percent="pool[1] / sumAllAtStake * 100" :showInfo="false" :strokeColor="'red'" style="width:100%;padding-top:0.5em;"/>


  </div>
</template>

<script>
export default {
  props: {
    pool: Array,
    poolNames: Array,
    getAdaValue: Function,
    poolIndex: Number,
    sumAllAtStake: Number,
    leaders: Array
  },
  data() {
    return {
      leaderStyle: {
        marginTop: '0.25em',
        border: 'solid 1px rgb(248, 255, 120,0.5)',
        padding: '0.5em',
        backgroundColor: 'rgb(255,255,0,0.1)',
      },
      notLeaderStyle: {
        marginTop: '0.25em',
        border: 'solid 1px grey',
        padding: '0.5em',
        backgroundColor: 'rgba(44, 57, 92, 0.3)',
      },
    }
  },
  methods: {
    resolvePoolId(id) {
      let name = '';
      for (let i = 0; i < this.poolNames.length; i++) {
        if (id === this.poolNames[i].id) {
          name = this.poolNames[i].name;
        }
      }
      return name;
    }
  },
  computed: {
    isLeader() {
      for (let i = 0; i < this.leaders.length; i++) {
        if (this.leaders[i] === this.poolIndex + 1) {
          return true;
        }
      }
    },
    resolveLeaderStyle() {
      if (this.isLeader) {
        return this.leaderStyle;
      } else {
        return this.notLeaderStyle;
      }
    }
  }
}
</script>

<style>
.slotLeader {
  background-color: yellow;
}
</style>
