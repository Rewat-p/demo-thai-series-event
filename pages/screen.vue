<template>
  <div v-resize="onResize" class="screen__container fill-height">
    <div id="content" class="screen__content">
      <div
        class="screen__item"
        :style="{ width: boxSize + 'px', height: boxSize + 'px' }"
      >
        <div class="screen__boxes"></div>
      </div>
      <div
        class="screen__item"
        :style="{ width: boxSize + 'px', height: boxSize + 'px' }"
      >
        <div class="screen__boxes"></div>
      </div>
      <div
        class="screen__item"
        :style="{ width: boxSize + 'px', height: boxSize + 'px' }"
      >
        <div class="screen__boxes"></div>
      </div>
    </div>

    <div style="position: absolute;opacity: 0">
      <v-btn @click="showWinnerList = !showWinnerList">show winner</v-btn>
    </div>

    <div v-show="false" style="position: absolute; top: 16px; right: 16px">
      <v-btn @click="handleSpin">spin</v-btn>
      <v-btn @click="handleReset">reset</v-btn>
    </div>

    <div v-show="showWinnerList" id="winner_list" class="winner-window">
      <div  class="winner-window__box" :style="{ height: maxWinnerHeight + 'px' }">
        <winner-list />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenPage',
  data() {
    return {
      boxSize: 100,
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      spinning: false,
      startRef: null,
      isWinnerMouseDown: false,
      winnerOffset: [0, 0],
      maxWinnerHeight: 100,
      originalWinnerWidth: 100,
      showWinnerList: true,
    }
  },
  mounted() {
    this.initEvent()
    this.init()

    const elem = document.querySelector('#winner_list')
    elem.addEventListener('mouseup', this.handleOnWinnerMouseUp)
    elem.addEventListener('mouseleave', this.handleOnWinnerMouseUp)
    elem.addEventListener('mousedown', this.handleOnWinnerMouseDown)
    elem.addEventListener('mousemove', this.handleOnWinnerMouseMove)
  },
  beforeDestroy() {
    const elem = document.querySelector('#winner_list')
    elem.removeEventListener('mouseup', this.handleOnWinnerMouseUp)
    elem.removeEventListener('mouseleave', this.handleOnWinnerMouseUp)
    elem.removeEventListener('mousedown', this.handleOnWinnerMouseDown)
    elem.removeEventListener('mousemove', this.handleOnWinnerMouseMove)
  },
  methods: {
    onResize() {
      const width = Math.min(window.innerWidth, 860) - 69
      this.boxSize = width / 3
      const height = window.innerHeight
      this.maxWinnerHeight = height - 32
    },
    initEvent() {
      try {
        this.$fire.database.ref('game/stage').on('value', (snapshot) => {
          const val = snapshot.val()
          console.log('stage', val)
          const status = val.status
          const code = val.code
          if (status === 'ready') this.handleReset()
          else if (status === 'spinning') {
            this.handleReset()
            this.spin(code)
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    init(selected, first = true, groups = 1, duration = 1) {
      const items = document.querySelectorAll('.screen__item')
      duration = Math.min(1, duration)
      let row = 0
      for (const item of items) {
        if (first) item.dataset.spinned = '0'
        else if (item.dataset.spinned === '1') return

        const boxes = item.querySelector('.screen__boxes')
        const boxesClone = boxes.cloneNode(false)
        const pool = ['0']

        if (!first) {
          groups = Math.min(1, groups)
          const arr = []
          for (let i = 0; i < groups; i++) {
            arr.push(...this.items)
          }
          console.log(this.shuffle(arr))
          pool.push(...this.shuffle(arr))
          pool.push(selected[row])

          boxesClone.addEventListener(
            'transitionstart',
            () => {
              item.dataset.spinned = '1'
              boxes.querySelectorAll('.screen__box').forEach((box) => {
                box.style.filter = 'blur(1px)'
              })
            },
            { once: true }
          )

          boxesClone.addEventListener(
            'transitionend',
            () => {
              boxes.querySelectorAll('.screen__box').forEach((box, index) => {
                box.style.filter = 'blur(0)'
                if (index > 0) boxes.removeChild(box)
              })
            },
            { once: true }
          )
        }

        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div')
          box.classList.add('screen__box')
          box.style.width = this.boxSize + 'px'
          box.style.height = this.boxSize + 'px'
          box.textContent = pool[i]
          boxesClone.appendChild(box)
        }

        boxesClone.style.transitionDuration = `${duration}s`
        boxesClone.style.transform = `translateY(-${
          item.clientHeight * (pool.length - 1)
        }px)`
        item.replaceChild(boxesClone, boxes)

        row += 1
      }
    },
    async getReward() {
      const snapshot = await this.$fire.database
        .ref('game/reward')
        .once('value')
      const val = snapshot.val()
      const snapshot2 = await this.$fire.database
        .ref('rewards')
        .child(val.ref)
        .once('value')
      const reward = snapshot2.val()
      return { ...reward, ref: val.ref }
    },
    async spin(code) {
      if (this.spinning) return
      this.spinning = true
      // const rand = Math.floor(Math.random() * 501)
      const randpad = ('000' + code).slice(-3).split('')
      console.log('lucky', randpad)
      this.init(randpad, false, 1, 2)
      const items = document.querySelectorAll('.screen__item')
      for (const item of items) {
        const boxes = item.querySelector('.screen__boxes')
        const duration = parseInt(boxes.style.transitionDuration)
        boxes.style.transform = 'translateY(0)'
        await new Promise((resolve) => setTimeout(resolve, duration * 100))
      }
      await new Promise((resolve) => setTimeout(resolve, 900))
      const reward = await this.getReward()
      const status = reward.qty - reward.draws < 1 ? 'break' : 'spined'
      console.log('status', status)
      await this.$fire.database.ref('game/stage').update({ status })
      // setTimeout(async () => {
      //   await this.$fire.database.ref('game/stage').update({ status: 'spined'})
      // }, 900);
      // await this.startRef.update({ '/status': 'spined'})
      // this.spinning = false
    },
    shuffle(items) {
      let current = items.length
      while (current > 0) {
        const rand = Math.floor(Math.random() * current)
        current -= 1
        const temp = items[current]
        items[current] = items[rand]
        items[rand] = temp
      }
      return items
    },
    handleReset() {
      this.spinning = false
      this.init()
    },
    handleSpin() {
      const rand = Math.floor(Math.random() * 501)
      this.spin(rand)
    },
    inParent(parent, child){
      return !!parent.contains(child)
    },
    handleOnWinnerMouseDown(e) {
      const elem = document.querySelector('#winner_list')
      const inparent = this.inParent(document.querySelector('.winner-list__actions'), e.target)
      if (inparent) return
      this.isWinnerMouseDown = true
      this.originalWinnerWidth = elem.offsetWidth
      this.winnerOffset = [
        elem.offsetLeft - e.clientX,
        elem.offsetTop - e.clientY,
      ]
      console.log('mouse down', this.isWinnerMouseDown, this.winnerOffset)
    },
    handleOnWinnerMouseUp(e) {
      this.isWinnerMouseDown = false
      console.log('mouse up')
    },
    handleOnWinnerMouseMove(e) {
      e.preventDefault()
      const elem = document.querySelector('#winner_list')
      if (this.isWinnerMouseDown) {
        elem.style.left = e.clientX + this.winnerOffset[0] + 'px'
        elem.style.top = e.clientY + this.winnerOffset[1] + 'px'
        elem.style.right = (window.innerWidth - ((e.clientX + this.winnerOffset[0]) + this.originalWinnerWidth)) + 'px'
        console.log('mouse move', e.clientX + this.winnerOffset[0], this.originalWinnerWidth)
        // elem.style.right = (elem.style.right - (elem.style.left - this.originalWinnerWidth)) + 'px'
      }
    },
  },
}
</script>

<style lang="scss">
.screen {
  &__box {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 8rem;
  }
}
</style>

<style lang="scss" scoped>
.screen {
  &__container {
    background-color: #00b13f;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__content {
    position: relative;
    width: 100%;
    max-width: 860px;
    display: flex;
    user-select: none;

    & * {
      user-select: none;
    }
  }

  &__item {
    margin-left: 12px;
    margin-right: 12px;
    background-color: #ffffff;
    border-radius: 50%;
    overflow: hidden;
  }

  &__boxes {
    transition: transform 1s ease-in-out;
  }
}

.winner-window {
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: move;

  &__box {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(4.7px);
    -webkit-backdrop-filter: blur(4.7px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }
}
</style>
