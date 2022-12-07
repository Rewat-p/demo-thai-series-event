<template>
  <div class="staff__container fill-height">
    <v-container style="max-width: 960px">
      <v-row>
        <v-col>
          <v-card class="mb-4">
            <v-card-text>
              <v-form ref="form" v-model="valid" @submit.prevent="">
                <div class="d-flex">
                  <v-spacer />
                  <v-chip :color="stageColor" small outlined>
                    {{ stage }}
                  </v-chip>
                </div>
                <div class="d-flex align-center">
                  <div>Reward</div>
                  <v-spacer />
                  <div
                    class="staff-btn--reward primary--text"
                    @click="handleOnOpenManageReward"
                  >
                    Manage Reward
                  </div>
                </div>
                <v-select
                  v-model="rewardId"
                  :items="rewardItems"
                  :disabled="stage !== 'wait'"
                  :rules="[(v) => !!v || 'Must be selected reward']"
                  item-text="name"
                  item-value="id"
                  dense
                  single-line
                  outlined
                  hide-details
                  @change="handleOnChangeReward"
                >
                  <template #item="{ item, attrs, on }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-content>
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        {{ item.draws }}/{{ item.qty }}
                      </v-list-item-action>
                    </v-list-item>
                  </template>
                  <template #selection="{ item }">
                    {{ item.name }} ({{ item.draws }}/{{ item.qty }})
                  </template>
                </v-select>
                <div class="register-types-list">
                  <template v-for="(item, i) in registerTypes">
                    <div :key="'type-' + i" class="register-types-item">
                      <v-checkbox
                        v-model="selectedTypes"
                        :disabled="stage !== 'wait'"
                        :label="item.name"
                        :value="item.id"
                        :hide-details="i !== 0"
                        :rules="[(v) => v.length > 0 || 'Please select register group']"
                        dense
                        multiple
                      ></v-checkbox>
                    </div>
                  </template>
                </div>
                <v-row>
                  <v-col md="6">
                    <v-btn
                      v-if="stage === 'wait'"
                      :disabled="!enabledReward || !rewardId || !valid"
                      color="primary"
                      block
                      @click="handleOnStart"
                    >
                      Start
                    </v-btn>
                    <v-btn
                      v-else
                      :disabled="!['ready', 'spined', 'break'].includes(stage)"
                      color="error"
                      block
                      @click="handleOnStop"
                    >
                      Stop
                    </v-btn>
                  </v-col>
                  <v-col md="6">
                    <v-btn
                      :disabled="!rewardId || !['ready', 'wait', 'break'].includes(stage) || currentItem.draws < 1"
                      block
                      @click="handleRollback"
                    >
                      Rollback (-1)
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex">
            <div class="text-subtitle-1">History</div>
            <v-spacer />
            <div
              :class="[
                'staff-btn--reward',
                'error--text',
                { 'staff-btn--disable': logs.length < 1 && stage !== 'ready' },
              ]"
              @click="confirmDeleteHistoryDialog = logs.length > 0"
            >
              Reset
            </div>
          </div>
          <v-data-table
            :headers="headers"
            :items="logs"
            :items-per-page="5"
            :options.sync="options"
            sort-by="timestamp"
            :sort-desc="true"
            height="290"
            class="elevation-1"
            fixed-header
          >
            <template #[`item.no`]="{ index }">
              {{ index + 1 + (options.page - 1) * options.itemsPerPage }}
            </template>
            <template #[`item.status`]="{ item }">
              <v-chip :color="getStatusColor(item.status)" small outlined>
                {{ item.status || 'wait' }}
              </v-chip>
            </template>
            <template #[`item.tools`]="{ item }">
              <div class="text-right">
                <!-- <v-btn color="success" icon @click="handleConfirm(item)"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
                <v-btn color="error" icon @click="handleReject(item)"
                  ><v-icon>mdi-close</v-icon></v-btn
                > -->
                <v-btn v-if="['wait'].includes(item.status)" color="success" icon @click="handleOnChangeStatusHistory(item, 'confirmed')"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
                <v-btn v-if="['wait', 'confirmed'].includes(item.status)" color="error" icon @click="handleOnChangeStatusHistory(item, 'rejected')"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </div>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="d-flex">
            <v-spacer />
            <v-btn color="error" block @click="handleOnResetAll">
              Reset All
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-navigation-drawer v-model="rewardManageDialog" width="320" fixed right>
      <template #prepend>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Rewards</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-icon @click="handleOnCloseManageReward">mdi-close</v-icon>
          </v-list-item-action>
        </v-list-item>
      </template>
      <manage-reward v-model="rewardItems" />
    </v-navigation-drawer>
    <v-dialog v-model="confirmDeleteHistoryDialog" max-width="480" persistent>
      <v-card>
        <v-card-title>Reset History</v-card-title>
        <v-card-text>
          Deleting all reward history will permanently remove it.
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirmDeleteHistoryDialog = false">Cancel</v-btn>
          <v-btn color="error" text @click="handleOnDeleteHistory"
            >Delete History</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      selectedTypes: [],
      registerTypes: [
        {
          id: 'Press',
          name: 'Press'
        },
        {
          id: 'Influencer',
          name: 'Influencer'
        },
        {
          id: 'Clients / Agency',
          name: 'Clients / Agency'
        },
        {
          id: 'Partner',
          name: 'Partner'
        },
        {
          id: 'Guest',
          name: 'Guest'
        }
      ],
      rewardItems: [],
      logs: [],
      headers: [
        {
          text: 'No.',
          align: 'start',
          sortable: false,
          value: 'no',
        },
        { text: 'Code', value: 'code', sortable: false },
        { text: 'Name', value: 'name', sortable: false },
        { text: 'Reward', value: 'reward_name', sortable: false },
        { text: 'Status', value: 'status', sortable: false },
        { text: 'Timestamp', value: 'timestamp', sortable: false },
        { text: '', value: 'tools', sortable: false, align: 'end' },
      ],

      options: {},
      valid: true,
      enabledReward: false,
      rewardManageDialog: false,
      rewardManageMini: true,
      tempEditRewardItems: [],

      confirmDeleteHistoryDialog: false,

      rewardCount: 0,
      currentItem: {},
    }
  },
  computed: {
    stageColor() {
      switch(this.stage) {
        case 'wait':
          return 'warning'
        case 'spinning':
        case 'break':
          return 'error'
        case 'ready':
          return 'success'
        default:
          return 'grey'
      }
    },
  },
  watch: {
    rewardId(val) {
      const item = this.rewardItems.find((x) => x.id === val)
      if (item) {
        const qty = item.qty
        this.enabledReward = qty > 0
      }
    },
  },
  mounted() {
    this.initEvent()
    this.getCurrentReward()
  },
  methods: {
    initEvent() {
      try {
        this.stageRef = this.$fire.database.ref('game/stage')
        this.stageRef.on('value', (snapshot) => {
          const val = snapshot.val()
          this.stage = val.status
          this.rewardCount = val.count
          this.selectedTypes = val.types || []
          console.log(this.stage)
        })

        const refLog = this.$fire.database.ref('logs')
        refLog.on('value', (snapshot) => {
          const val = snapshot.val() || {}
          const items = Object.keys(val).map((x) => ({ ...val[x], ref: x }))
          this.logs = items
        })

        const refReward = this.$fire.database.ref('rewards')
        refReward.on('value', (snapshot) => {
          const items = snapshot.val() || {}
          this.rewardItems = Object.keys(items).map((x) => ({
            ...items[x],
            ref: x,
          }))
        })
      } catch (error) {
        console.error(error)
      }
    },
    getCurrentReward() {
      this.$fire.database.ref('game/reward').once('value', (snapshot) => {
        const val = snapshot.val()
        if (val) {
          this.rewardId = val.id
          this.handleOnChangeReward(val.id)
        }
      })
    },
    async handleOnStart() {
      if (!this.$refs.form.validate()) return
      const item = this.rewardItems.find((x) => x.id === this.rewardId)
      if (!item) return
      const ref = this.$fire.database.ref('game/reward')
      await ref.update({
        id: item.id,
        name: item.name,
        ref: item.ref,
        image_url: item.image_url
      })
      const notPlay = item.draws >= item.qty
      await this.$fire.database.ref('game/stage').update({ status: notPlay ? 'break': 'ready', count: item.draws, types: this.selectedTypes })
      // await this.$fire.database.ref('game/stage').update({ count: item.draws })
    },
    async handleOnStop() {
      if (!['ready', 'spined', 'break'].includes(this.stage)) return
      await this.$fire.database.ref('game/stage').update({ status: 'wait' })
    },
    async handleOnResetAll() {
      await this.$fire.database
        .ref('game')
        .set({ reward: {}, stage: { code: -1, status: 'wait' } })
      await this.$fire.database.ref('logs').remove()
      await this.$fire.database.ref('rewards').remove()
    },
    async handleRollback() {
      if (!this.$refs.form.validate()) return
      try {
        const item = this.rewardItems.find((x) => x.id === this.rewardId)
        if (!item) return
        if (item.draws < 1) return
        // await this.$fire.database.ref('rewards').child(item.ref).transaction((item) => {
        //   item.draws = Math.max(0, item.draws - 1)
        //   return item
        // })
        const draws = item.draws - 1
        await this.$fire.database.ref('rewards').child(item.ref).update({ draws })
        await this.$fire.database.ref('game/stage').update({ count: draws })
        // const newItem = JSON.parse(JSON.stringify(item))
        // const ref = newItem.ref
        // newItem.draws = Math.max(0, newItem.draws - 1)
        // delete newItem.ref
        // await this.$fire.database.ref('rewards').child(ref).update(newItem)
      } catch (error) {
        console.error(error)
      }
    },
    getStatusColor(status) {
      if (status === 'confirmed') return 'success'
      if (status === 'rejected') return 'error'
      return 'warning'
    },
    async handleConfirm(item) {
      await this.$fire.database.ref('logs/' + item.ref).update({
        status: 'confirmed',
        updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    },
    async handleReject(item) {
      await this.$fire.database.ref('logs/' + item.ref).update({
        status: 'rejected',
        updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    },
    async handleOnChangeStatusHistory(item, status = 'confirmed') {
      await this.$fire.database.ref('logs/' + item.ref).update({
        status,
        updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    },
    async handleOnDeleteHistory() {
      try {
        await this.$fire.database.ref('logs').remove()
        await this.$fire.database.ref('rewards').transaction((items) => {
          // item.draws = item.draws ? item.draws + 1 : 1
          for (const key in items) {
            const item = items[key]
            item.draws = 0
          }
          return items
        })
        this.confirmDeleteHistoryDialog = false
      } catch (error) {
        console.error(error)
      }
    },
    handleOnOpenManageReward() {
      this.rewardManageDialog = true
    },
    handleOnCloseManageReward() {
      this.rewardManageDialog = false
    },
    handleOnAddReward() {
      this.createRewardDialog = true
    },
    handleOnChangeReward(val) {
      console.log(val)
      const item = this.rewardItems.find((x) => x.id === val)
      if (!item) return
      this.currentItem = JSON.parse(JSON.stringify(item))
    }
  },
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
  &-btn {
    &--reward {
      cursor: pointer;
      padding-top: 8px;
      padding-bottom: 8px;
      &:hover {
        text-decoration: underline;
      }
    }
    &--disable {
      cursor: not-allowed;
      color: #ddd !important;
      &:hover {
        text-decoration: none !important;
      }
    }
  }
}

.register-types {
  &-list {
    display: flex;
    padding: 16px 0;
  }
  &-item {
    flex: 1;
  }
}
</style>
