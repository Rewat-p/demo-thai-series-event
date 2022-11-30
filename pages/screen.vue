<template>
  <div v-resize="onResize" class="screen__container fill-height">
    <div id="content" class="screen__content">
      <div class="screen__item" :style="{ width: boxSize + 'px', height: boxSize + 'px' }">
        <div class="screen__boxes"></div>
      </div>
      <div class="screen__item" :style="{ width: boxSize + 'px', height: boxSize + 'px' }">
        <div class="screen__boxes"></div>
      </div>
      <div class="screen__item" :style="{ width: boxSize + 'px', height: boxSize + 'px' }">
        <div class="screen__boxes"></div>
      </div>
    </div>

    <div v-show="false" style="position: absolute;top: 16px;right: 16px;">
      <v-btn @click="handleSpin">spin</v-btn>
      <v-btn @click="handleReset">reset</v-btn>
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
    }
  },
  mounted() {
    this.initEvent()
    this.init()
  },
  methods: {
    onResize() {
      const width = Math.min(window.innerWidth, 860) - 69
      this.boxSize = width/3
    },
    initEvent() {
      try {
        // console.log(this.$fire.database.ref('stage_spin'))
        this.startRef = this.$fire.database.ref('game/stage')
        this.startRef.on('value', (snapshot) => {
          const val = snapshot.val()
          const status = val.status
          const code = val.code
          if (status === 'ready') this.handleReset()
          else if (status === 'spin') this.spin(code)
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
        const pool = ['?']

        if (!first) {
          groups = Math.min(1, groups)
          const arr = []
          for (let i = 0; i < groups; i++) {
            arr.push(...this.items)
          }
          console.log(this.shuffle(arr))
          pool.push(...this.shuffle(arr))
          pool.push(selected[row])

          boxesClone.addEventListener('transitionstart', () => {
            item.dataset.spinned = '1'
            boxes.querySelectorAll('.screen__box').forEach((box) => {
              box.style.filter = 'blur(1px)'
            })
          }, { once: true })

          boxesClone.addEventListener('transitionend', () => {
            boxes.querySelectorAll('.screen__box').forEach((box, index) => {
              box.style.filter = 'blur(0)'
              if (index > 0) boxes.removeChild(box)
            })
          }, { once: true })
        }

        for (let i = pool.length - 1; i >= 0; i--) {
          const box = document.createElement('div')
          box.classList.add('screen__box')
          box.style.width = this.boxSize + 'px'
          box.style.height = this.boxSize + 'px'
          box.textContent = pool[i]
          boxesClone.appendChild(box)
        }

        boxesClone.style.transitionDuration = `${duration}s`;
        boxesClone.style.transform = `translateY(-${item.clientHeight * (pool.length - 1)}px)`;
        item.replaceChild(boxesClone, boxes);

        row += 1
      }
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
      setTimeout(async () => {
        this.startRef && await this.startRef.update({ '/status': 'spined'})
      }, 900);
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
    }
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
</style>
