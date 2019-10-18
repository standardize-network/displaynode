import Vue from 'vue'
export default {
  writeChange(state, { target, value }) {
    return state.settings[target] = value;
  }
}
