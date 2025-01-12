<template>
    <div class="skeleton"></div>
</template>
<script lang="ts" setup></script>
<style scope>
.skeleton {
    width: 100%;
    height: 64px;
    position: relative;
    box-shadow: 0 2px 10px 0 rgba(0 0 0 / 20%);
    overflow: hidden;
    background: #001529;
}
.skeleton::before {
    content: '';
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 80%;
    background: linear-gradient(
        to right,
        transparent 0%,
        #2c5277 50%,
        transparent 100%
    );
    animation: load 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

@keyframes load {
    from {
        left: -150px;
    }

    to {
        left: 100%;
    }
}
</style>
