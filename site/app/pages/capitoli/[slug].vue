<script setup lang="ts">
const route = useRoute()
await navigateTo(`/it/capitoli/${route.params.slug}`, { replace: true })
</script>
