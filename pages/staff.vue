<template>
  <div class="staff__container fill-height">
    <v-container style="max-width: 860px">
      <v-row>
        <v-col>
          <v-card class="mb-4">
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="">
                <div class="d-flex">
                  <v-spacer />
                  <v-chip
                    :color="stageColor"
                    small
                    outlined
                  >
                    {{ stage }}
                  </v-chip>
                </div>
                <div class="pb-1">Reward</div>
                <v-select v-model="rewardId" :items="items" :rules="[v => !!v || 'Must be selected reward']" item-text="name" item-value="id" dense single-line outlined />
                <!-- <div class="d-flex">
                  <div style="flex: 1">
                    <v-btn color="primary" block @click="handleNextRandom">Next Spin</v-btn>
                  </div>
                  <div style="width: 16px"></div>
                  <div style="flex: 1">
                    <v-btn color="error" block @click="handleReset">Reset</v-btn>
                  </div>
                </div> -->
                <v-row>
                  <v-col md="6">
                    <v-btn color="primary" block @click="handleNextRandom">Next Spin</v-btn>
                  </v-col>
                  <v-col md="6">
                    <v-btn color="error" block @click="handleReset">Reset</v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="text-subtitle-1 pb-2">History</div>
          <v-data-table :headers="headers" :items="logs" :items-per-page="5" class="elevation-1">
            <template #[`item.no`]="{ index }">
              {{ index + 1 }}
            </template>
            <template #[`item.status`]="{ item }">
              <v-chip
                :color="getStatusColor(item.status)"
                small
                outlined
              >
                {{ item.status || 'wait' }}
              </v-chip>
            </template>
            <template #[`item.tools`]="{ item }">
              <div v-if="item.status === 'wait'">
                <v-btn color="success" icon @click="handleConfirm(item)"><v-icon>mdi-check</v-icon></v-btn>
                <v-btn color="error" icon @click="handleReject(item)"><v-icon>mdi-close</v-icon></v-btn>
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  name: 'StaffPage',
  data() {
    return {
      stageRef: null,
      stage: 'wait',
      winner: {},
      rewardId: null,
      reward: {
        id: -1,
        name: '',
      },
      items: [],
      logs: [],
      headers: [
        {
          text: 'No.',
          align: 'start',
          sortable: false,
          value: 'no',
        },
        { text: 'Code', value: 'code' },
        { text: 'Name', value: 'name' },
        { text: 'Reward', value: 'reward_name' },
        { text: 'Status', value: 'status' },
        { text: 'Timestamp', value: 'timestamp' },
        { text: '', value: 'tools' },
      ],
      valid: true,
    }
  },
  computed: {
    stageColor() {
      return this.stage === 'wait' ? 'warning' : this.stage === 'spin' ? 'error' : this.stage === 'ready' ? 'success' : 'grey'
    }
  },
  mounted() {
    this.initEvent()
    this.getReward()
  },
  methods: {
    initEvent() {
      try {
        // console.log(this.$fire.database.ref('stage_spin'))
        // const ref = this.$fire.database.ref('game/reward')
        // ref.on('value', (snapshot) => {
        //   const val = snapshot.val()
        //   this.reward = val.name
        //   this.winner = val.winner.code + ' - ' + val.winner.name
        //   console.log(val)
        // })

        this.stageRef = this.$fire.database.ref('game/stage')
        this.stageRef.on('value', (snapshot) => {
          const val = snapshot.val()
          this.stage = val.status
          console.log(this.stage)
        })

        const refLog = this.$fire.database.ref('logs')
        refLog.on('value', (snapshot) => {
          const val = snapshot.val() || {}
          const items = Object.keys(val).map((x) => ({ ...val[x], ref: x }))
          // this.logs = (snapshot.val() || []).filter((x) => !!x)
          console.log(items)
          this.logs = items
        })
      } catch (error) {
        console.error(error)
      }
    },
    getReward() {
      const ref = this.$fire.database.ref('rewards')
      ref.once('value', (snapshot) => {
        this.items = (snapshot.val() || []).filter((x) => !!x.id)
      })

      this.$fire.database.ref('game/reward').once('value', (snapshot) => {
        const val = snapshot.val()
        val && (this.rewardId = val.id)
      })
    },
    async handleNextRandom() {
      console.log('check reward')
      if (!this.$refs.form.validate()) return
      const item = this.items.find((x) => x.id === this.rewardId)
      if (!item) return
      const ref = this.$fire.database.ref('game/reward')
      await ref.update({
        id: item.id,
        name: item.name,
      })
      await this.$fire.database.ref('game/stage').update({ status: 'ready' })
    },
    async handleReset() {
      await this.$fire.database.ref('game/reward').update({ id: -1, name: '' })
      await this.$fire.database.ref('game/stage').update({ status: 'wait' })
      this.$refs.form.reset();
    },
    getStatusColor(status) {
      if (status === 'confirmed') return 'success'
      if (status === 'rejected') return 'error'
      return 'warning'
    },
    async handleConfirm(item) {
      await this.$fire.database.ref('logs/' + item.ref).update({ status: 'confirmed', updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss') })
    },
    async handleReject(item) {
      await this.$fire.database.ref('logs/' + item.ref).update({ status: 'rejected', updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss') })
    },
  }
}
</script>

<style lang="scss" scoped>
.staff {
  &__container {
    padding: 16px;
    background-color: #fefefe;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  }
  &__content {
    // position: relative;
    // width: 100%;
    // max-width: 860px;
    // display: flex;
  }
}
</style>
