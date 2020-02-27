<template>
  <PrivilegeRole :imFromPro="imFromPro"></PrivilegeRole>
</template>
<script>

  import PrivilegeRole from 'idevvuejs/role'
  export default {
    components: {PrivilegeRole},
    data() {
      return {}
    },
    methods: {
      imFromPro(url) {
        return import('@/views/' + url + ".vue")
      },
    }
  }
</script>
