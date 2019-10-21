<template>
  <div class="delegateElement">
    <span>Fragment ID: <b style="float:right;color:lightgrey;" class="delegateDescription">{{ transaction.fragment_id }}</b></span><br>
    <span>Received at: <b style="float:right;padding-bottom:1em,">{{ momentCalDate(transaction.received_at) }} - {{ momentWithSeconds(transaction.received_at) }}</b></span><br>
    <span>Last updated at: <b style="float:right;padding-bottom:1em,">{{ momentCalDate(transaction.last_updated_at) }} - {{ momentWithSeconds(transaction.last_updated_at) }}</b></span><br>

    <span v-if="transaction.status.InABlock != undefined">Status: <b style="float:right;padding-bottom:1em;color:green;">In a Block - {{ transaction.status.InABlock.date }}</b></span>
    <span v-if="transaction.status.Rejected">Status: <b style="float:right;color:red;">{{ transaction.status.Rejected.reason }}</b></span>
    <span v-if="transaction.status.InABlock === undefined && transaction.status.Rejected === undefined">Status: <b style="float:right;">{{ transaction.status }}</b></span>
    <OrbitSpinnerSmall v-if="transaction.status === 'Pending'"/>
  </div>
</template>

<script>
import OrbitSpinnerSmall from '~/components/loadingIndicator/OrbitSpinnerSmall'
export default {
  props: {
    transaction: Object,
    momentCalDate: Function,
    momentWithSeconds: Function,
  },
  components: {
    OrbitSpinnerSmall
  }
}
</script>

<style>
</style>
