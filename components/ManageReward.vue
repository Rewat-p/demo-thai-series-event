<template>
  <div class="manage-reward__container">
    <v-btn
      v-if="!createDialog && !creating"
      class="text-capitalize"
      block
      text
      rounded
      @click="handleOnCreate"
    >
      <v-icon color="primary" left>mdi-plus</v-icon>
      Add
    </v-btn>
    <div v-if="creating">Saving...</div>
    <v-expand-transition>
      <reward-item v-show="createDialog" v-model="createItem" add-mode @add="handleOnAdd" @cancel="createDialog = false" />
    </v-expand-transition>

    <div class="manage-reward__content">
      <v-slide-y-transition
        class="py-0"
        tag="div"
        group
      >
        <template v-for="item in items">
          <reward-item :key="item.ref" :value="item" @update="handleOnUpdate" @remove="handleOnRemove" />
        </template>
      </v-slide-y-transition>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
  name: 'ManageReward',
  props: {
    value: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      items: [],
      valid: true,
      createDialog: false,
      creating: false,
      removing: false,
      createItem: {
        name: '',
        qty: '',
      },
    }
  },
  watch: {
    value: {
      deep: true,
      handler(val) {
        this.items = this.processData(val)
        console.log(this.items)
      }
    }
  },
  mounted() {
    this.items = this.processData(this.value)
  },
  methods: {
    handleOnCreate() {
      this.createDialog = true
    },
    async handleOnAdd() {
      try {
        this.creating = true
        const name = String(this.createItem.name).trim()
        const qty = Number(this.createItem.qty)
        const id = Date.now()
        this.createDialog = false
        this.createItem = { name: '', qty: '' }
        await this.$fire.database.ref('rewards').push({ id, name, qty, draws: 0 })
        await this.onLoadReward()
      } catch (error) {
        console.error(error)
      } finally {
        this.creating = false
      }
    },
    async handleOnUpdate(item) {
      try {
        const newItem = JSON.parse(JSON.stringify(item))
        const ref = newItem.ref
        newItem.name = String(newItem.name).trim()
        newItem.qty = Number(newItem.qty)
        // await new Promise((resolve) => setInterval(resolve, 1000))
        // console.log(newItem, ref)
        if (newItem.temp_delete) {
          console.log('delete', newItem.temp_delete)
          await this.$fire.storage.ref('/' + newItem.temp_delete).delete()
          delete newItem.temp_delete
        }
        const refName = uuidv4() + '.png'
        const imgSnapshot = await this.$fire.storage.ref('/rewards/' + refName).putString(newItem.image, 'data_url')
        // console.log(imgSnapshot.metadata)
        delete newItem.ref
        delete newItem.image
        newItem.image_url = await imgSnapshot.ref.getDownloadURL()
        newItem.image_path = imgSnapshot.metadata.fullPath
        await this.$fire.database.ref('rewards').child(ref).update(newItem)
        await this.onLoadReward()
      } catch (error) {
        console.error(error)
      }
    },
    async handleOnRemove(ref) {
      try {
        this.removing = true
        await this.$fire.database.ref('rewards').child(ref).remove()
        await this.onLoadReward()
      } catch (error) {
        console.error(error)
      } finally {
        this.removing = false
      }
    },
    async onLoadReward() {
      const snapshot = await this.$fire.database.ref('rewards').once('value')
      const items = snapshot.val() || {}
      this.items = Object.keys(items).map((x) => ({ ...items[x], ref: x }))
    },
    processData(items) {
      return items
    },
  },
}
</script>

<style lang="scss" scoped>
.manage-reward {
  &__container {
    padding-left: 16px;
    padding-right: 16px;
  }

  &__content {
    padding-top: 16px;
    padding-bottom: 16px;
  }

  &__content > div > * + * {
    margin-top: 8px;
  }
}
</style>
