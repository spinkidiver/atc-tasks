<template>
  <table class="table tablesorter" :class="tableClass">
    <thead :class="theadClasses">
      <tr>
        <slot name="columns" :columns="columns">
          <th v-for="column in columns" :key="column">{{ column }}</th>
        </slot>
      </tr>
    </thead>
    <tbody :class="tbodyClasses">
      <tr v-for="(item, index) in data" :key="index">
        <slot :row="item" :index="index">
          <template v-for="(column, index) in columns">
            <td v-if="hasValue(item, column)" :key="index">
              {{ itemValue(item, column) }}
            </td>
          </template>
        </slot>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "base-table",
  props: {
    columns: {
      type: Array,
      default: () => [],
      description: "Table columns",
    },
    data: {
      type: Array,
      default: () => [],
      description: "Table data",
    },
    type: {
      type: String, // striped | hover
      default: "",
      description: "Whether table is striped or hover type",
    },
    theadClasses: {
      type: String,
      default: "",
      description: "<thead> css classes",
    },
    tbodyClasses: {
      type: String,
      default: "",
      description: "<tbody> css classes",
    },
  },
  computed: {
    tableClass() {
      return this.type ? `table-${this.type}` : "";
    },
  },
  methods: {
    hasValue(item, column) {
      return item[column.toLowerCase()] !== undefined;
    },
    itemValue(item, column) {
      return item[column.toLowerCase()];
    },
  },
};
</script>
