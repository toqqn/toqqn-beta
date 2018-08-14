<template>
  <div>
    <form action="" class="wms-search-form">
        <input type="text" name="" placeholder="Search">
        <button class="wms-search-btn" type="submit">
            <i class="fas fa-search"></i>
        </button>
    </form>
    <div class="wms-community-btn-area" v-if="getData.isLoggedIn">
        <a href="#" class="wms-primary-btn" data-toggle="modal" data-target="#createCommunity">Create Community</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  computed: {
    getData () {
      return this.$store.state
    }
  }
}
</script>
