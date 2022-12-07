<template>
  <div class="reward-item__container">
    <v-card v-if="edit || addMode" class="reward-item__card" outlined>
      <v-card-text class="pb-0">
        <v-form ref="formCreateReward" v-model="valid" @submit.prevent="">
          <v-textarea
            v-model="item.name"
            label="Name"
            :rules="[(v) => !!v || 'Name is required']"
            :rows="1"
            auto-grow
            dense
            outlined
          ></v-textarea>
          <v-text-field
            v-model="item.qty"
            label="Quantity"
            type="number"
            :rules="[
              (v) => !!v || 'Quantity is required',
              (v) => (!!v && /\d+/.test(v)) || 'Quantity is invalid',
              (v) => (!!v && Number(v) > 0 || 'Quantity must be greater than 0')
            ]"
            dense
            outlined
          ></v-text-field>
          <div v-if="item.image_url" class="reward-item__image">
            <v-img :src="item.image_url" class="grey lighten-4" height="240" contain />
            <div class="reward-item__image--hover">
              <v-btn icon @click="handleOnRemoveImage">
                <v-icon color="white">mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
          <upload-image-field v-else v-model="item.image" accept="image/png" :rules="[(v) => !!v || 'Image is required']" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="handleOnCancel">Cancel</v-btn>
        <v-btn v-if="addMode" text @click="handleOnAdd">Add</v-btn>
        <v-btn v-else text @click="handleOnUpdate">Update</v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else outlined>
      <v-card-text>
        <div class="reward-item__box">
          <div class="reward-item__title">
            <div class="text-subtitle-2">{{ value.name }}</div>
            <div class="text-body-2 font-weight-light">
              {{ value.draws }}/{{ value.qty }} items
            </div>
          </div>
          <v-spacer />
          <div class="reward-item__actions">
            <v-menu
              :nudge-width="200"
              bottom
              left
            >
              <template #activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-dots-vertical
                  </v-icon>
              </template>
              <v-list>
                <v-list-item @click="handleOnEdit">
                  <v-list-item-title>Edit</v-list-item-title>
                </v-list-item>
                <v-list-item @click="handleOnRemove">
                  <v-list-item-title>Delete</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'RewardItem',
  props: {
    value: {
      type: Object,
      default() {
        return {}
      },
    },
    addMode: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      edit: false,
      valid: true,
      item: {
        name: '',
        qty: '',
        image: '',
      },
      tempDelete: '',
    }
  },
  // mounted() {
  //   // this.item = this.value
  //   this.$nextTick(() => {
  //     console.log('update')
  //     this.$refs.formCreateReward && this.$refs.formCreateReward.reset()
  //   })
  // },
  methods: {
    handleOnEdit() {
      this.item = JSON.parse(JSON.stringify(this.value))
      console.log('edit', this.item)
      this.edit = true
    },
    handleOnUpdate() {
      if (!this.$refs.formCreateReward.validate()) return
      // if (this.tempDelete) this.item
      this.$emit('update', this.item)
      this.edit = false
      this.$refs.formCreateReward.reset()
    },
    handleOnAdd() {
      if (!this.$refs.formCreateReward.validate()) return
      this.$emit('input', this.item)
      this.$emit('add', this.item)
      this.$refs.formCreateReward.reset()
    },
    handleOnRemove() {
      this.$emit('remove', this.value.ref)
    },
    handleOnCancel() {
      this.edit = false
      this.$emit('cancel')
    },
    handleOnRemoveImage() {
      console.log('remove image')
      this.item.temp_delete = this.item.image_path
      this.item.image_url = null
    }
  }
}
</script>

<style lang="scss" scoped>
.reward-item {
  &__box {
    display: flex;

    & > * + * {
      padding-left: 8px;
    }
  }

  &__actions {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
    margin-right: -8px;
  }

  &__image {
    position: relative;

    &:hover > &--hover {
      display: flex;
    }

    &--hover {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.3);
      display: none;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
