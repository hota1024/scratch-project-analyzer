<template>
  <v-card>
    <v-card-title>
      <v-icon>{{ titleIcon }}</v-icon>
      {{ listTitle }}
      <v-spacer></v-spacer>
      <v-text-field v-model="search" label="Search"></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="lists"
      :search="search"
      :items-per-page="500"
    ></v-data-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { List } from 'project-json'

@Component
export class ListList extends Vue {
  search: string = ''

  headers = [
    {
      text: 'Name',
      align: 'left',
      value: 'name'
    },
    {
      text: 'Value',
      align: 'left',
      value: 'value'
    }
  ]

  @Prop({ default: () => '' }) listTitle!: string

  @Prop({ default: () => '' }) titleIcon!: string

  @Prop({ default: () => {} }) lists!: List
}

export default ListList
</script>

<style lang="stylus">
.theme--dark.v-data-table tbody tr {
  transition: all 200ms;
}
</style>
