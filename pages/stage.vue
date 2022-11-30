<template>
  <div class="stage__container fill-height">
    <div class="stage__content">
      <div class="stage__reward mb-6">
        <div class="stage__reward--name">{{ reward }}</div>
        <div v-if="stage === 'spined'" class="stage__reward--winner">{{ winner.code }} - {{ winner.name }}</div>
      </div>
      <button :disabled="stage !== 'ready'" class="game-button orange" style="width: 100%;margin: auto" @click="handleOnStart">Start</button>
    </div>
  </div>
</template>

<script>
import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'
export default {
  name: 'StagePage',
  data() {
    return {
      reward: '',
      rewardId: null,
      winner: {},
      stage: 'wait',
      startRef: null,
    }
  },
  mounted() {
    this.initEvent()
  },
  methods: {
    initEvent() {
      try {
        // console.log(this.$fire.database.ref('stage_spin'))
        const ref = this.$fire.database.ref('game/reward')
        ref.on('value', (snapshot) => {
          const val = snapshot.val()
          this.reward = val.name
          this.rewardId = val.id
          this.winner = val.winner
          console.log(val)
        })

        this.startRef = this.$fire.database.ref('game/stage')
        this.startRef.on('value', (snapshot) => {
          const val = snapshot.val()
          this.stage = val.status
          console.log(this.stage)
        })
      } catch (error) {
        console.error(error)
      }
    },
    async handleOnStart() {
      if (this.stage !== 'ready') return
      const rand = Math.floor(Math.random() * 501)
      faker.seed(rand)
      const name = 'คุณ' + faker.name.firstName() + ' ' + faker.name.lastName()

      this.$fire.database.ref('game/reward').update({
        winner: {
          code: rand,
          name,
        }
      })
      const refLog = this.$fire.database.ref('logs')
      await refLog.push({
        code: rand,
        name,
        reward_id: this.rewardId,
        reward_name: this.reward,
        status: 'wait',
        timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
      await this.$fire.database.ref('game/stage').update({ 'status': 'spin' })
    }
  }
}
</script>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Carter+One';

.game-button {
  position: relative;
  top: 0;
  cursor: pointer;
  text-decoration: none !important;
  outline: none !important;
  font-family: 'Carter One', sans-serif;
  font-size: 20px;
  line-height: 1.5em;
  letter-spacing: .1em;
  text-shadow: 2px 2px 1px #0066a2, -2px 2px 1px #0066a2, 2px -2px 1px #0066a2, -2px -2px 1px #0066a2, 0 2px 1px #0066a2, 0 -2px 1px #0066a2, 0 4px 1px #004a87, 2px 4px 1px #004a87, -2px 4px 1px  #004a87;
  border: none;
  margin: 15px 15px 30px;
  background: repeating-linear-gradient( 45deg, #3ebbf7, #3ebbf7 5px, #45b1f4 5px, #45b1f4 10px);
  border-bottom: 3px solid rgb(16 91 146 / 50%);
  border-top: 3px solid rgb(255 255 255 / 30%);
  color: #fff !important;
  border-radius: 8px;
  padding: 8px 15px 10px;
  box-shadow: 0 6px 0 #266b91, 0 8px 1px 1px rgb(0 0 0 / 30%), 0 10px 0 5px #12517d, 0 12px 0 5px #1a6b9a, 0 15px 0 5px #0c405e, 0 15px 1px 6px rgb(0 0 0 / 30%);
}

.game-button:hover {
  top:2px;
  box-shadow: 0 4px 0 #266b91, 0 6px 1px 1px rgb(0 0 0 / 30%), 0 8px 0 5px #12517d, 0 10px 0 5px #1a6b9a, 0 13px 0 5px #0c405e, 0 13px 1px 6px rgb(0 0 0 / 30%);
}

.game-button::before {
  content: '';
  height: 10%;
  position: absolute;
  width: 40%;
  background: #fff;
  right: 13%;
  top: -3%;
  border-radius: 99px;
}

.game-button::after {
  content: '';
  height: 10%;
  position: absolute;
  width: 5%;
  background: #fff;
  right: 5%;
  top: -3%;
  border-radius: 99px;
}

.game-button.orange {
  background: repeating-linear-gradient( 45deg, #ffc800, #ffc800 5px, #ffc200 5px, #ffc200 10px);
  box-shadow: 0 6px 0 #b76113, 0 8px 1px 1px rgb(0 0 0 / 30%), 0 10px 0 5px #75421f, 0 12px 0 5px #8a542b, 0 15px 0 5px #593116, 0 15px 1px 6px rgb(0 0 0 / 30%);
  border-bottom: 3px solid rgb(205 102 0 / 50%);
  text-shadow: 2px 2px 1px #e78700, -2px 2px 1px #e78700, 2px -2px 1px #e78700, -2px -2px 1px #e78700, 0 2px 1px #e78700, 0 -2px 1px #e78700, 0 4px 1px #c96100, 2px 4px 1px #c96100, -2px 4px 1px  #c96100;
}

.game-button.orange:hover {
  top:2px;
  box-shadow: 0 4px 0 #b76113, 0 6px 1px 1px rgb(0 0 0 / 30%), 0 8px 0 5px #75421f, 0 10px 0 5px #8a542b, 0 13px 0 5px #593116, 0 13px 1px 6px rgb(0 0 0 / 30%);
}

.game-button.red {
  background: repeating-linear-gradient( 45deg, #ff4f4c, #ff4f4c 5px, #ff4643 5px, #ff4643 10px);
  box-shadow: 0 6px 0 #ae2725, 0 8px 1px 1px rgb(0 0 0 / 30%), 0 10px 0 5px #831614, 0 12px 0 5px #a33634, 0 15px 0 5px #631716, 0 15px 1px 6px rgb(0 0 0 / 30%);
  border-bottom: 3px solid rgb(160 25 23 / 50%);
  text-shadow: 2px 2px 1px #d72d21, -2px 2px 1px #d72d21, 2px -2px 1px #d72d21, -2px -2px 1px #d72d21, 0 2px 1px #d72d21, 0 -2px 1px #d72d21, 0 4px 1px #930704, 2px 4px 1px #930704, -2px 4px 1px  #930704;
}

.game-button.red:hover {
  top:2px;
  box-shadow: 0 4px 0 #ae2725, 0 6px 1px 1px rgb(0 0 0 / 30%), 0 8px 0 5px #831614, 0 10px 0 5px #a33634, 0 13px 0 5px #631716, 0 13px 1px 6px rgb(0 0 0 / 30%);
}

.game-button.green {
  background: repeating-linear-gradient( 45deg, #54d440, #54d440 5px, #52cc3f 5px, #52cc3f 10px);
  box-shadow: 0 6px 0 #348628, 0 8px 1px 1px rgb(0 0 0 / 30%), 0 10px 0 5px #2a6d20, 0 12px 0 5px #39822e, 0 15px 0 5px #1d4c16, 0 15px 1px 6px rgb(0 0 0 / 30%);
  border-bottom: 3px solid rgb(40 117 29 / 50%);
  text-shadow: 2px 2px 1px #348628, -2px 2px 1px #348628, 2px -2px 1px #348628, -2px -2px 1px #348628, 0 2px 1px #348628, 0 -2px 1px #348628, 0 4px 1px #1d4c16, 2px 4px 1px #1d4c16, -2px 4px 1px #1d4c16;
}

.game-button.green:hover {
  top:2px;
  box-shadow: 0 4px 0 #348628, 0 6px 1px 1px rgb(0 0 0 / 30%), 0 8px 0 5px #2a6d20, 0 10px 0 5px #39822e, 0 13px 0 5px #1d4c16, 0 13px 1px 6px rgb(0 0 0 / 30%);
}

.game-button:disabled,
.game-button[disabled] {
  top: 0 !important;
  opacity: 0.8;
  cursor: not-allowed;
}

.game-button:disabled.orange,
.game-button[disabled].orange {
  box-shadow: 0 6px 0 #b76113, 0 8px 1px 1px rgb(0 0 0 / 30%), 0 10px 0 5px #75421f, 0 12px 0 5px #8a542b, 0 15px 0 5px #593116, 0 15px 1px 6px rgb(0 0 0 / 30%) !important;
}

.game-button:disabled.green,
.game-button[disabled].green {
  box-shadow: 0 6px 0 #348628, 0 8px 1px 1px rgb(0 0 0 / 30%), 0 10px 0 5px #2a6d20, 0 12px 0 5px #39822e, 0 15px 0 5px #1d4c16, 0 15px 1px 6px rgb(0 0 0 / 30%) !important;
}
</style>

<style lang="scss" scoped>
.stage {
  &__container {
    // background-color: #00b13f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    position: relative;
    width: 100%;
    min-width: 320px;
    max-width: 640px;
    text-align: center;
  }

  &__reward {
    width: 100%;
    padding: 8px;
    border: 1px solid #888;
    border-radius: 8px;
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &--name {
      font-size: 1.5rem;
      font-weight: 600;
    }

    &--winner {
      font-size: 1rem;
    }
  }
}

</style>
