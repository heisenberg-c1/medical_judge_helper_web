<script setup>
import { User } from '@element-plus/icons-vue';
import { defineEmits } from 'vue';


const emit = defineEmits(['logout']);

const handleLogout = () => {
  emit('logout'); 
};

</script>
<template>
    <el-header class="header-container">
    <!-- 中间标题 -->
    <div class="main-title">
      医疗报告分析平台
    </div>

    <!-- 右边按钮 -->
    <div class="user-actions">
      <el-dropdown>
        <el-button type="primary" size="medium">
          <el-icon>
            <User />
          </el-icon>
          个人中心
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<style scoped>
.main-title {
  font-weight: bold;
  text-align: center;
  flex: 1;
  font-size: 40px;
  color: white;
}
.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
