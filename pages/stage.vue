<template>
  <div v-resize="onResize" class="stage__container fill-height">
    <div class="stage__item" :style="{ height: (itemHeight * 0.8) + 'px' }">
      <v-img :src="require('~/assets/images/stage-logo.png')" max-width="70%" :max-height="itemHeight * 0.8" contain />
    </div>
    <div class="stage__item" :style="{ height: (itemHeight * 1.4) + 'px' }">
      <div class="stage-reward">
        <v-img :src="reward.image_url" :max-height="itemHeight * 0.9" contain />
        <div class="stage-reward__name">{{ reward.name }}</div>
        <div class="stage-reward__count">รางวัลลำดับที่ {{ rewardCount + 1 }}</div>
      </div>
    </div>
    <div class="stage__item" :style="{ height: (itemHeight * 0.8) + 'px' }">
      <button class="stage-btn" :style="{ height: ((itemHeight * 0.8) - 48) + 'px', width: (itemHeight - 48) + 'px' }" @click="handleOnRandom">
      </button>
    </div>
    <v-overlay :value="status === 'spinning'"></v-overlay>
    <v-overlay :value="['break', 'wait'].includes(status)" opacity="0.7">
      <div class="white-color text-center">
        <v-icon size="48">mdi-emoticon-excited-outline</v-icon>
        <div class="text-h4 pt-3">รอออกรางวัล...</div>
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
      status: 'wait',
      reward: {},
      rewardCount: 0,
      itemHeight: 0,
      tempWinner: {},
      registerTypes: [],
    }
  },
  mounted() {
    this.initEvent()
  },
  methods: {
    onResize() {
      // const width = Math.max(Math.min(800, window.innerWidth), 320)
      // console.log(width)
      // this.boxSize = parseInt(width * 0.8)
      // this.buttonSize = parseInt(this.boxSize * 0.5)
      const height = window.innerHeight
      this.itemHeight = height / 3
    },
    initEvent() {
      try {
        this.$fire.database.ref('game/stage').on('value', async (snapshot) => {
          const val = snapshot.val()
          this.registerTypes = val.types
          console.log(val)
          if (['break', 'spined'].includes(val.status) && this.tempWinner.code) {
            console.log('insert log', this.tempWinner)
            await this.$fire.database.ref('logs').push(this.tempWinner)
            this.tempWinner = {}
            const count = val.count + (val.status === 'break' ? 0 : 1)
            await this.$fire.database.ref('game/stage').update({ count })
            this.status = val.status
          } else {
            this.status = val.status
            this.rewardCount = val.count
            console.log('upate status', val, this.status)
          }
        })

        this.$fire.database.ref('game/reward').on('value', (snapshot) => {
          const val = snapshot.val()
          this.reward = val
          console.log('update reward', val)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async handleOnRandom() {
      try {
        const data = { types: this.registerTypes }
        const result = await this.$axios.$post('https://monothaiseries.mono29.com/api/v1/rewards/random', data)
        // const count = this.rewardCount + 1
        const rewardItem = await this.$fire.database.ref('rewards').child(this.reward.ref).once('value')
        const reward = rewardItem.val()
        const draws = reward.draws + 1
        await this.$fire.database.ref('game/stage').update({ code: result.code, status: 'spinning' })
        await this.$fire.database.ref('rewards').child(this.reward.ref).update({ draws })
        this.tempWinner = {
          code: result.code,
          name: result.name,
          reward_id: reward.id,
          reward_name: reward.name,
          reward_ref: this.reward.ref,
          status: 'confirmed',
          timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
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
    background-image: url('assets/images/stage-bg.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__item {
    width: 100%;
    // flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  &-btn {
    width: 200px;
    height: 200px;
    background-image: url('assets/images/stage-btn.png');
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
    box-sizing: border-box;
    cursor: pointer;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  &-reward {
    // padding-top: 16px;
    // padding-bottom: 16px;
    &__name,
    &__count {
      font-size: 2.5rem;
      font-weight: 400;
      line-height: 4rem;
      text-align: center;
    }
  }
}

@media only screen and (max-width: 800px) {
  .stage {
    &-reward {
      &__name,
      &__count {
        font-size: 1.2rem;
        line-height: 2.5rem;
      }
    }
  }
}

@media only screen and (max-width: 1024px) {
  .stage {
    &-reward {
      &__name,
      &__count {
        font-size: 2rem;
        line-height: 3rem;
      }
    }
  }
}
</style>
