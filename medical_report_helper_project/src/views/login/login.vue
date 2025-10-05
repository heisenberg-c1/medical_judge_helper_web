<script setup>
import { ref, reactive, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import router from '@/router'
import { Avatar } from '@element-plus/icons-vue';
// 表单引用和数据
const loginFormRef = ref(null);
const loginForm = reactive({
  username: '',
  password: '',
  rememberMe: false
});

// 表单验证规则
const loginRules = {
  username: [
    { required: true, message: '请输入用户名或工号', trigger: 'blur' },
    { min: 3, message: '用户名长度不能少于3位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
};

// 状态管理
const showPassword = ref(false);
const isLoading = ref(false);
const autoComplete = ref('off'); // 关闭自动完成增强安全性
const focusedField = ref('');

// 处理输入框焦点
const handleInputFocus = (field) => {
  focusedField.value = field;
};

const handleInputBlur = () => {
  focusedField.value = '';
};

// 处理登录逻辑
const handleLogin = async () => {
  try {
    // 表单验证（仅验证非空和长度，不验证账号密码正确性）
    await loginFormRef.value.validate();

    // 显示加载状态
    isLoading.value = true;

    // 模拟登录请求（无需验证账号密码，直接成功）
    setTimeout(() => {
      console.log('登录信息:', loginForm); // 仅打印，不验证

      // 记住密码逻辑（保持不变）
      if (loginForm.rememberMe) {
        localStorage.setItem('rememberedUser', JSON.stringify({
          username: loginForm.username
        }));
      } else {
        localStorage.removeItem('rememberedUser');
      }

      // 登录成功提示
      ElMessage.success('登录成功，正在进入系统...');

      // 关键：跳转到主页面（路径与路由配置中的 /main 对应）
      router.push('/main');

      isLoading.value = false;
    }, 1500);
  } catch (error) {
    console.log('表单验证失败:', error);
    isLoading.value = false;
  }
};

// 处理忘记密码
const handleForgotPassword = () => {
  ElMessageBox.alert(
    '请联系医院信息科或系统管理员重置密码',
    '密码找回',
    {
      confirmButtonText: '确定',
      type: 'info'
    }
  );
};

// 页面加载时恢复记住的用户名
onMounted(() => {
  const savedUser = localStorage.getItem('rememberedUser');
  if (savedUser) {
    try {
      const user = JSON.parse(savedUser);
      loginForm.username = user.username;
      loginForm.rememberMe = true;
    } catch (e) {
      console.error('解析保存的用户信息失败', e);
      localStorage.removeItem('rememberedUser');
    }
  }

  // 自动聚焦到用户名输入框
  setTimeout(() => {
    const usernameInput = document.querySelector('input[placeholder="请输入用户名/工号"]');
    if (usernameInput) usernameInput.focus();
  }, 500);
});
</script>








<template>
  <div class="login-container">
    <!-- 背景装饰元素 -->
    <div class="bg-pattern"></div>

    <!-- 登录卡片 -->
    <el-card class="login-card">
      <div class="login-header">
        <div class="logo-container">

          <el-icon :size="52" class="logo-icon">
            <Avatar />
          </el-icon>
        </div>
        <h1 class="system-title">医疗报告分析辅助平台</h1>
        <p class="subtitle">医生专用登录入口</p>
      </div>

      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入用户名/工号" prefix-icon="User" :autocomplete="autoComplete"
            @focus="handleInputFocus('username')" @blur="handleInputBlur('username')"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="loginForm.password" :type="showPassword ? 'text' : 'password'" placeholder="请输入密码"
            prefix-icon="Lock" :show-password="showPassword" :autocomplete="autoComplete"
            @focus="handleInputFocus('password')" @blur="handleInputBlur('password')"></el-input>
        </el-form-item>


        <el-form-item class="form-options">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <el-checkbox v-model="loginForm.rememberMe" class="remember-checkbox">
              记住登录状态
            </el-checkbox>
            <el-link type="primary" class="forgot-link" @click="handleForgotPassword">
              忘记密码?
            </el-link>
          </div>
        </el-form-item>



        <el-form-item>
          <el-button type="primary" class="login-btn" :loading="isLoading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="security-info">
        <el-icon :size="16" class="security-icon">

        </el-icon>

      </div>
    </el-card>

    <!-- 页脚信息 -->
    <footer class="login-footer">

    </footer>
  </div>
</template>



<style scoped src="./loginStyle.css"></style>
