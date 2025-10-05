<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
const props = defineProps({
  form: {
    type: Object,
    required: true, 
    default: () => ({})
  },
  // 科室
  deptOptions: {
    type: Array,
    default: () => []
  },
  // 性别
  genderOptions: {
    type: Array,
    default: () => []
  },
  // 医院
  hospitalOptions: {
    type: Array,
    default: () => []
  },
  // 医生
  docOptions: {
    type: Array,
    default: () => []
  },
  // 骨髓来源
  sourceOptions: {
    type: Array,
    default: () => []
  },
  // 日期禁用逻辑
  disabledDate: {
    type: Function,
    required: true
  },
  // 日期快捷选项
  shortcuts: {
    type: Array,
    default: () => []
  },
  // AI分析
  difyOutput: {
    type: String,
    default: ''
  },
  // 报告图片
  imageList: {
    type: Array,
    default: () => []
  },
  // 医生意见
  textarea: {
    type: String,
    default: ''
  }
}
);

const emit = defineEmits(['update:form', 'update:textarea']);

const localForm = ref({ ...props.form});

const localTextarea = ref(props.textarea);

// 监听父组件数据变化
watch(
  () => props.form,
  (newVal) => {
    localForm.value = { ...newVal };
  },
  { deep: true } 
);

watch(
  () => props.textarea,
  (newVal) => {
    localTextarea.value = newVal;
  }
);

// 监听本地表单变化
watch(
  localForm,
  (newVal) => {
    emit('update:form', { ...newVal });
  },
  { deep: true }
);

// 监听医生意见变化
watch(
  localTextarea,
  (newVal) => {
    emit('update:textarea', newVal);
  }
);
</script>

<template>
  <!-- 患者信息区 -->
  <el-card style="padding: 16px;" shadow="hover">
    <el-form :model="localForm" label-width="80px" size="small">
      <!-- 第一行：病人骨髓号 + 科室 -->
      <el-row style="margin-bottom: 12px;">
        <el-col :span="12">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12px;">病人骨髓号</span>
            <el-tag type="info">测试数据</el-tag>
          </div>
        </el-col>
        <el-col :span="12">
          <el-form-item label="科室">
            <el-select v-model="localForm.dept">
              <el-option v-for="item in props.deptOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第二行：姓名 + 性别 + 年龄 -->
      <el-row style="margin-bottom: 12px;">
        <el-col :span="8">
          <el-form-item label="姓名">
            <el-input v-model="localForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别">
            <el-select v-model="localForm.gender">
              <el-option v-for="item in props.genderOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="年龄">
            <el-input v-model="localForm.age" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第三行：医院 + 诊疗卡号 + 床号 -->
      <el-row style="margin-bottom: 12px;">
        <el-col :span="8">
          <el-form-item label="医院">
            <el-select v-model="localForm.hospital">
              <el-option v-for="item in props.hospitalOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="诊疗卡号">
            <el-input v-model="localForm.cardNo" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="床号">
            <el-input v-model="localForm.bedNo" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第四行：开单医生 + 骨髓来源 + 送检日期 -->
      <el-row style="margin-bottom: 12px;">
        <el-col :span="8">
          <el-form-item label="开单医生">
            <el-select v-model="localForm.orderDoc">
              <el-option v-for="item in props.docOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="骨髓来源">
            <el-select v-model="localForm.boneSource">
              <el-option v-for="item in props.sourceOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送检日期">
            <el-date-picker v-model="localForm.sendDate" type="date" 
            :disabled-date="props.disabledDate" 
            :shortcuts="props.shortcuts" />
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 第五行：报告医生 + 审核医生 + 报告日期 -->
      <el-row>
        <el-col :span="8">
          <el-form-item label="报告医生">
            <el-select v-model="localForm.reportDoc">
              <el-option v-for="item in props.docOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="审核医生">
            <el-select v-model="localForm.auditDoc">
              <el-option v-for="item in props.docOptions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="报告日期">
            <el-date-picker v-model="localForm.reportDate" type="date" 
            :disabled-date="props.disabledDate"
            :shortcuts="props.shortcuts" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-card>



  <!-- 报告图片区 -->
  <div>
    <el-card shadow="hover">
      <div class="report-image-container">
        <span>报告图片</span>
        <div class="image-scroll-wrapper">
          <div class="image-list">
            <el-image v-for="(imgUrl, index) in props.imageList" 
            :key="index" 
            :src="imgUrl" fit="cover"
            style="width: 200px; height: 160px;  margin-right: 10px;" 
            :preview-src-list="props.imageList"
            :show-progress="true" 
            :initial-index="0" 
            :preview-teleported="true" />
          </div>
        </div>
      </div>
    </el-card>
  </div>

  <!-- ai分析结果区 -->
  <div>
    <el-card shadow="hover">
      <div class="p-2">
        <el-alert title="AI 分析结果仅供参考" type="info" :closable="false" class="mb-1"></el-alert>
        <div class="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
          <p class="whitespace-pre-line text-neutral-700">{{ props.difyOutput }}</p>
        </div>
      </div>
    </el-card>

  </div>

  <!-- 意见输入区 -->
  <div>
    <el-card shadow="hover">
      <el-input v-model="localTextarea" 
      style="width: 100%" 
      :autosize="{ minRows: 2, maxRows: 4 }" 
      type="textarea"
      placeholder="请输入医疗意见" />
    </el-card>

  </div>


</template>


<style scoped>
.report-image-container {
  width: 100%;
}

.image-scroll-wrapper {
  overflow-x: visible;
  overflow-y: hidden;
  white-space: nowrap;
}

.image-list {
  display: flex;
  flex-wrap: nowrap;
}

.image-list .el-image {
  flex-shrink: 0;
}

.el-button {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}



/* el-card 美化 */
.el-card {
  background-color: #f1fdfb !important;
  /* 清新的淡绿背景 */
  border-radius: 12px;
  border: 1px solid #d0f0ea;
  transition: all 0.3s ease-in-out;
}

/* 悬停效果 */
.el-card:hover {
  box-shadow: 0 6px 18px rgba(0, 150, 136, 0.2);
  transform: translateY(-4px);
  background-color: #e8fbf7 !important;
}
</style>