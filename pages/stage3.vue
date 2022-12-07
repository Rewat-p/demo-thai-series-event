<template>
  <div v-resize="onResize" class="stage__container fill-height">
    <div :class="['stage__box']" :style="{ width: boxSize + 'px', height: boxSize + 'px' }">
      <div class="stage-btn--border" :style="{ width: buttonSize + 'px', height: buttonSize + 'px' }">
        <button :disabled="!['ready', 'spined'].includes(status)" class="stage-btn" @click="handleOnSpin">
          หมุน
        </button>
      </div>
    </div>
    <v-overlay :value="status === 'wait'" :opacity="0.7">
      <div class="text-center">
        <div class="white--text text-h6 mt-2">ปิดใช้งาน</div>
      </div>
    </v-overlay>
    <v-overlay :value="!['ready', 'spined', 'wait'].includes(status)">
      <div class="text-center">
        <v-progress-circular width="2" indeterminate />
        <div class="white--text text-h6 mt-2">โปรดรอสักครู่...</div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'StagePage',
  data() {
    return {
      boxSize: 100,
      buttonSize: 50,
      status: false,
    }
  },
  mounted() {
    this.initEvent()
  },
  methods: {
    initEvent() {
      try {
        this.$fire.database.ref('game/stage').on('value', (snapshot) => {
          const val = snapshot.val()
          this.status = val.status
          console.log('upate status', val, this.status)
        })
      } catch (error) {
        console.error(error)
      }
    },
    onResize() {
      const width = Math.max(Math.min(800, window.innerWidth), 320)
      console.log(width)
      this.boxSize = parseInt(width * 0.8)
      this.buttonSize = parseInt(this.boxSize * 0.5)
    },
    async getReward() {
      const snapshot = await this.$fire.database.ref('game/reward').once('value')
      const val = snapshot.val()
      const snapshot2 = await this.$fire.database.ref('rewards').child(val.ref).once('value')
      const reward = snapshot2.val()
      return { ...reward, ref: val.ref }
    },
    async handleOnSpin() {
      if (!['ready', 'spined'].includes(this.status)) return

      try {
        const rand = Math.floor(Math.random() * 501)
        const name = 'คุณมโน ได้รางวัล'
        const reward = await this.getReward()
        console.log('rewards', reward)
        await this.$fire.database.ref('game/stage').update({ code: rand, status: 'spinning' })
        const draws = reward.draws + 1
        await this.$fire.database.ref('rewards').child(reward.ref).update({ draws })
        // .transaction((item) => {
        //   item.draws = item.draws ? item.draws + 1 : 1
        //   return item
        // })
        // .update({ draws: this.$fire.database.increment(1) })
        await this.$fire.database.ref('logs').push({
          code: rand,
          name,
          reward_id: reward.id,
          reward_name: reward.name,
          reward_ref: reward.ref,
          status: 'confirmed',
          timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.stage {
  &__container {
    background-color: #555;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    background-color: rgba(0, 0, 0, 0.2);
    overflow: hidden;

    &--disable {
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.7);
        box-shadow: inset 0 10px 30px rgba(0, 0, 0, .1), inset 0 10px 30px rgba(0, 0, 0, .2), inset 0 10px 30px rgba(0, 0, 0, .05), inset 0 10px 30px rgba(0, 0, 0, .05);
      }
    }
  }

  &-btn {
    position: absolute;
    left: 16px;
    right: 16px;
    top: 16px;
    bottom: 16px;
    font-size: 3rem;
    font-weight: 500;
    color: #820000;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: initial;
    background-image: linear-gradient(#e51414, #720000);
    border-radius: 50%;
    box-shadow: 0 10px 20px rgba(0, 0, 0, .1),0 3px 6px rgba(0, 0, 0, .2);
    box-sizing: border-box;
    cursor: pointer;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    &:active {
      background-image: linear-gradient(#720000, #8a0000);
      border: 5px solid #8c0000;
      color: #820000;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.8;
      background-image: linear-gradient(#ff0000, #720000) !important;
      border: none !important;
      color: #720000 !important;
    }

    &--border {
      position: relative;
      border-radius: 50%;
      background-color: #aaa;
      border-bottom: 3px solid rgba(0, 0, 0, 0.4);
      border-top: 3px solid rgba(255, 255, 255, 0.3);
    }
    // padding: 8px;

    // &::after {
    //   content: '';
    //   position: absolute;
    //   top: 16px;
    //   bottom: 16px;
    //   left: 16px;
    //   right: 16px;
    //   border-radius: 50%;
    //   background-color: red;
    //   cursor: pointer;

    //   &:hover {
    //     top: 8px;
    //     bottom: 8px;
    //     left: 8px;
    //     right: 8px;
    //   }
    // }
  }
}
</style>
