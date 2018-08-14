<template>
  <div id="wms-sidebar">
    <toqqn-search></toqqn-search>
    <toqqn-community-info></toqqn-community-info>
    <toqqn-community-moderators></toqqn-community-moderators>
    <toqqn-community-members></toqqn-community-members>
    <toqqn-community-rules></toqqn-community-rules>
  </div>
</template>

<script>
import Search from '../sidebar/Search'
import Info from './partials/CommunityInfo'
import Moderators from './partials/Moderators'
import Members from './partials/Members'
import Rules from './partials/Rules'

export default {
  name: 'CommunitySidebar',
  components: {
    'toqqnSearch': Search,
    'toqqnCommunityInfo': Info,
    'toqqnCommunityModerators': Moderators,
    'toqqnCommunityMembers': Members,
    'toqqnCommunityRules': Rules
  }
}
</script>
