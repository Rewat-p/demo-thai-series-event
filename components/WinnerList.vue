<template>
  <div v-resize="onResize" class="winner-list">
    <div
      class="winner-list__title"
      :style="{
        fontSize: fontSizeTitle + 'rem',
        lineHeight: fontSizeTitle + 'rem',
      }"
    >
      <!-- {{ currentReward.name }} -->
    </div>
    <div class="winner-list__content mt-10" :style="{ maxHeight: maxHeight + 'px' }">
      <v-row v-if="items.length <= 2" :justify="items.length === 1? 'center': 'space-around'">
        <v-col cols="4" v-for="(item, index) in items" :key="index">
          <div
            :key="item.ref"
            class="winner-list__item text-center"
            :style="{
              fontSize: fontSizeContent * (items.length > 1?  4: 5) + 'rem',
              lineHeight: fontSizeContent * (items.length > 1? 9: 9) + 'rem',
            }"
          >
            {{ item.code | display_code }}
          </div>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="4" v-for="(item, index) in items" :key="index">
          <div
            :key="item.ref"
            class="winner-list__item text-center"
            :style="{
              fontSize: fontSizeContent  + 'rem',
              lineHeight: fontSizeContent * 1.8 + 'rem',
            }"
          >
            {{ item.code | display_code }}
          </div>
        </v-col>
      </v-row>
      <!-- <template v-for="item in items">
        <div
          :key="item.ref"
          class="winner-list__item"
          :style="{
            fontSize: fontSizeContent + 'rem',
            lineHeight: fontSizeContent * 1.8 + 'rem',
          }"
        >
          {{ item.code | display_code }}
        </div>
      </template> -->
    </div>
    <div class="winner-list__actions">
      <div class="d-flex" style="height: 100%">
        <v-slider
          v-model="fontSize"
          max="3"
          min="1"
          step="0.05"
          color="primary"
          height="160"
          always-dirty
          dense
          hide-details
          vertical
        >
          <template #prepend>
            <v-icon color="primary" @click="handleFontSizeDecrement">
              mdi-minus
            </v-icon>
          </template>

          <template #append>
            <v-icon color="primary" @click="handleFontSizeIncrement">
              mdi-plus
            </v-icon>
          </template>
        </v-slider>
      </div>
    </div>
    <!-- <v-btn  @click="test.push({ref: test.length+1, code:test.length+1})">Test add</v-btn>
    <v-btn  @click="test = test.slice(0, -1)">Test remove</v-btn> -->
  </div>
</template>

<script>
export default {
  name: 'WinnerList',
  filters: {
    display_code(val) {
      return ('000' + val).slice(-3)
    },
  },
  data() {
    return {
      maxHeight: 100,
      currentReward: {},
      logs: [],
      fontSize: 1,
      // test:[]
    }
  },
  computed: {
    items() {
      return this.logs.filter((x) => x.reward_id === this.currentReward.id)
    },
    fontSizeTitle() {
      return this.fontSize
    },
    fontSizeContent() {
      return this.fontSize * 2
    },
  },
  mounted() {
    this.initEvent()
  },
  methods: {
    onResize() {
      // console.log('winner parent', document.querySelector('.winner-list').parentElement, document.querySelector('.winner-list').parentElement.style.height)
      const height =
        document.querySelector('.winner-list').parentElement.offsetHeight
      const title = document.querySelector('.winner-list__title')
      console.log('root height', height)
      this.maxHeight = height - title.offsetHeight
    },
    initEvent() {
      try {
        const ref = this.$fire.database.ref('logs')
        ref
          .orderByChild('status')
          .equalTo('confirmed')
          .on('value', (snapshot) => {
            const val = snapshot.val() || {}
            const items = Object.keys(val).map((x) => ({ ...val[x], ref: x }))
            this.logs = items
            this.onResize()
            this.updateContentScroll()
          })

        this.$fire.database.ref('game/reward').on('value', (snapshot) => {
          const val = snapshot.val() || {}
          this.currentReward = val
        })
      } catch (error) {
        console.error(error)
      }
    },
    handleFontSizeDecrement() {
      this.fontSize -= 0.05
    },
    handleFontSizeIncrement() {
      this.fontSize += 0.05
    },
    updateContentScroll() {
      setTimeout(() => {
        const content = document.querySelector('.winner-list__content')
        content.scrollTop = content.scrollHeight
        console.log(content.scrollHeight)
      }, 100)
    },
  },
}
</script>

<style lang="scss" scoped>
.winner-list {
  position: relative;
  height: 100%;
  // background-color: rgba(255, 255, 255, 0.4);
  overflow: hidden;

  &__title {
    // padding-left: 16px;
    // padding-right: 16px;
    padding-top: 16px;
    // padding-bottom: 16px;
  }

  &__content {
    min-width: 260px;
    min-height: 200px;
    padding: 0 16px 16px;
    overflow: hidden;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &__actions {
    visibility: hidden;
    display: flex;
    position: absolute;
    top: 8px;
    right: 0;
    // bottom: 16px;
    // width: 100%;
    padding: 4px 8px;
  }

  &:hover > &__actions {
    visibility: visible;
  }
}
</style>
