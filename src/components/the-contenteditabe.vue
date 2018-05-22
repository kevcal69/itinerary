<template>
    <div contenteditable="true" @input="$emit('update:content', $event.target.innerText)"></div>
</template>
<script>
export default {
    name: 'editable',
    props: ['content'],
    mounted () {
        this.$el.innerText = this.content;
    },
    watch: {
        content: function () {
            this.$el.innerText = this.content;
        }
    }
}
</script>

