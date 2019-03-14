<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="@/global/assets/logo.png">
    <img alt="Vue logo" :src="LoadingSvg">
    <img alt="Vue logo" :src="TeeDevAnimation"> -->

    <!-- <br>
    {{$store.state.stateManager.otherState}}
    <br>
    {{$store.getters['stateManager/getTestState']}}
    <br>
    {{$store.getters['stateManager/getTestState']}}
    <br>
    {{$store.getters['stateManager/getTestStateFunc']('Templatey')}}
    <br>
    {{$store.getters['stateManager/getTestStateFunc']('Templatey')}}
    <br>
    <teedev-button href="#" text="Get" @click.native="onGet" />
    <teedev-button href="#" text="Mutate" @click.native="onMutate" />
    <teedev-button href="#" text="Dispatch" @click.native="onDispatch" />
    <teedev-button href="#" text="Mutate Other" @click.native="onMutateOther" /> -->
  </div>
</template>

<script>
import LoadingSvg from '@/global/assets/svg/loading.svg';
import TeeDevAnimation from '@/global/assets/svg/teedev-animation.svg';

export default {
  name: 'home',
  data() {
    return {
      LoadingSvg,
      TeeDevAnimation,
    };
  },
  // methods: {
  //   onGet() {
  //     console.log('onGet Click');
  //     console.log(this.$store.getter('stateManager/getTestStateFunc')('Clicky'));
  //   },
  //   onMutate() {
  //     console.log('onMutate Click');
  //     this.$store.commit('stateManager/setTestState', Math.floor(Math.random() * 1000));
  //   },
  //   onDispatch() {
  //     console.log('onDispatch Click');
  //     const returnData = this.$store.dispatch(
  //       'stateManager/setTestState',
  //        Math.floor(Math.random() * 1000)
  //     );
  //     console.log(returnData);
  //   },
  //   onMutateOther() {
  //     console.log('onMutateOther Click');
  //     this.$store.commit('stateManager/setOtherState', Math.floor(Math.random() * 1000));
  //   },
  // },
};
</script>
