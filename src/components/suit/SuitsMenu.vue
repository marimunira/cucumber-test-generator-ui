<template>
  <div class="suits-menu">
    <draggable v-model="localItems" v-if="localItems">
      <div @click="handleClick(index, item)" v-for="(item, index) in localItems" v-bind:class="['suit-menu-item', {'suit-menu-item__active': isActive(item.id)}]">
        <span>{{item.name}}</span>
      </div>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';

  export default {
    components: {
      draggable,
    },
    data() {
      return {
        localItems: this.items,
        activeItemId: null,
      };
    },
    methods: {
      handleClick(index, item) {
        this.activeItemId = item.id;
        if (this.menuClick) this.menuClick(index, item);
      },
      isActive(itemId) {
        return itemId === this.activeItemId;
      },
    },
    mounted() {
    },
    name: 'suits-menu',
    props: {
      items: {
        type: Array,
        default: [],
      },
      menuClick: {
        type: Function,
        default: null,
      },
    },
    watch: {
      items(newValue, oldValue) {
        this.$data.localItems = newValue;
        if (oldValue.length === 0) this.$data.activeItemId = newValue[0].id;
      },
    },
  };
</script>

<style lang="scss" scoped>
  .suits-menu {
    margin: 10px 20px;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
    li,
    .suit-menu-item {
      margin: 10px 0;
      border-radius: 2px;
      border: 1px solid rgba(0,0,0,0.1);
      font-size: 12px;
      padding: 8px 5px;
      &:hover {
        cursor: pointer;
      }
      &.sortable-ghost {
        opacity: 1;
        border-style: dashed;
        border-color: red;
      }
      &.suit-menu-item__active {
        border: 1px solid rgba(0,0,0,0.5);
      }
    }
  }
</style>
