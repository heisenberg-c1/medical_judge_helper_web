<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { ElMessageBox, ElMessage } from 'element-plus';
import router from '@/router'

import HeaderComponent from './components/header.vue';
import LeftBarComponent from './components/leftBar.vue';
import RightBarComponent from './components/rightBar.vue';
import patientForm from "./components/patientForm.vue";

const tableData = ref(null);
const difyOutput = ref("暂无分析,待调用");
const imageList = ref(null);

const options = [
  {
    value: 'Option1',
    label: '科室1',
  },
  {
    value: 'Option2',
    label: '科室2',
  }
]

const input = ref('')

const form = reactive({
  dept: '',
  name: '',
  gender: '',
  age: '',
  hospital: '',
  cardNo: '',
  bedNo: '',
  orderDoc: '',
  boneSource: '',
  sendDate: '',
  reportDoc: '',
  auditDoc: '',
  reportDate: '',
});

const textarea = ref('')
const currentBoneMarrowNo = ref('');
const currentSelectedRow = ref(null); 


const deptOptions = [{ value: 'dept1', label: '科室1' }];
const genderOptions = [{ value: 'male', label: '男' }, { value: 'female', label: '女' }];
const hospitalOptions = [{ value: 'hos1', label: '医院1' }];
const docOptions = [{ value: 'doc1', label: '医生1' }];
const sourceOptions = [{ value: 'source1', label: '来源1' }];


const disabledDate = (time) => time.getTime() > Date.now();

const shortcuts = [
  {
    text: '今天',
    onClick: (picker) => {
      picker.setValue(new Date());
    },
  },
];

const leftTableData = ref([
  {
    name: '13', boneMarrowNo: '20250809151313', gender: '男', cellData: [{
      cellName: "原始粒细胞",
      bloodSmear: "-",
      boneMarrowAvg: "0.64",
      boneMarrowStd: "±0.33",
      boneMarrowResult: "0.4"
    }], cellMorphology: {}, pic: ['https://picsum.photos/300/200?random=1','https://picsum.photos/300/200?random=2'], otherInfo: {}
  },
  { name: '123', boneMarrowNo: '20250812165541', gender: '男' },
  { name: '123', boneMarrowNo: '20250813155711', gender: '男' },
  { name: '123', boneMarrowNo: '20250818084518', gender: '男' },
  { name: '123', boneMarrowNo: '20250827145113', gender: '男' },
  { name: '123', boneMarrowNo: '20250829105251', gender: '男' },
  { name: '123', boneMarrowNo: '20250830155604', gender: '男' },
  { name: '123', boneMarrowNo: '20250902104945', gender: '男' },
  { name: '123', boneMarrowNo: '20250908111854', gender: '男' },
  { name: '123', boneMarrowNo: '20250911094726', gender: '男' },
  { name: '123', boneMarrowNo: '20250911111448', gender: '男' },
  { name: '123', boneMarrowNo: '20250911150925', gender: '男' },
  { name: '123', boneMarrowNo: '20250917163051', gender: '男' },
]);



//异步请求管理
const request = axios.create({
  baseURL: '这里替换为后端的地址',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
})



const handleSearch = async () => {
  const searchValue = input.value?.trim();
  if (!searchValue) {
    console.log("请输入搜索内容");
    return;
  }

  console.log("搜索内容：", searchValue);

  try {
    const isBoneMarrowNo = /^\d+$/.test(searchValue);

    const params = isBoneMarrowNo
      ? { boneMarrowNo: searchValue }  // 骨髓号查询
      : { name: searchValue };         // 姓名查询

    const response = await request.get('查询的地址接口', { params });
    leftTableData.value = response.data;

    //console.log(`搜索${isBoneMarrowNo ? '骨髓号' : '姓名'}成功`, response.data);

  } catch (error) {
    console.error("搜索失败", error);
    leftTableData.value = []; // 搜索失败时清空表格
  }
}

const handleLeftTableRowClick = async (row) => {
  console.log("点击了左侧表格行：", row);
  //将点击当前行患者的数据填充到中间对应的内容，右边表单

  if (row && row.cellData) {
    // 检查cellData是否为数组，如果不是则转换为数组
    tableData.value = row.cellData
    console.log("当前行的细胞数据：", tableData.value)
  } else {
    // 如果没有细胞数据，清空右侧表格
    tableData.value = []
    console.log("当前行没有细胞数据")
  }


  if (row) {
    // 骨髓号
    currentBoneMarrowNo.value = row.boneMarrowNo || '未知';

    // 表单基本信息
    form.value = {
      name: row.name || '',
      gender: row.gender || '',
      age: row.age || '',
      hospital: row.hospital || '',
      cardNo: row.cardNo || '',
      bedNo: row.bedNo || '',

      dept: row.dept || '',
      orderDoc: row.orderDoc || '',
      boneSource: row.boneSource || '',
      sendDate: row.sendDate ? new Date(row.sendDate) : '', // 日期可能需要转换
      reportDoc: row.reportDoc || '',
      auditDoc: row.auditDoc || '',
      reportDate: row.reportDate ? new Date(row.reportDate) : ''
    };

    // 更新报告图片列表
    imageList.value = row.pic ? (Array.isArray(row.pic) ? row.pic : [row.pic]) : [];

    textarea.value = row.advice || '';
  } else {
    // 若行数据为空，清空中央区域
    currentBoneMarrowNo.value = '';
    form.value = {};
    imageList.value = [];
    textarea.value = '';
  }
};

const handleAiAnalyze = async () => {
  //处理ai分析按钮点击，将对骨髓细胞的描述，以及处理后的表格数据传给后端接口
  //异步返回difyOutput的内容

  // 检查是否有选中的细胞数据
  if (!tableData.value || tableData.value.length === 0) {
    console.error("没有可分析的细胞检测数据");
    // 可以添加提示信息，如ElMessage.warning("请先选择患者查看细胞数据")
    return;
  }

  // 检查是否有选中的患者（确保有细胞形态数据）
  if (!currentSelectedRow.value) { // 假设你有一个存储当前选中行的变量
    console.error("未选中任何患者数据");
    ElMessage.warning("请先选择左侧表格中的患者")
    return;
  }

  try {
    // 构造请求参数
    const requestData = {
      // 细胞检测数据（右侧表格数据）
      cellDetectionData: tableData.value,
      // 细胞形态数据（来自当前选中行）
      cellMorphologyData: currentSelectedRow.value.cellMorphology || {},
      // 可选：添加患者基本信息辅助分析
      patientInfo: {
        boneMarrowNo: currentSelectedRow.value.boneMarrowNo,
        name: currentSelectedRow.value.name,
        gender: currentSelectedRow.value.gender
      }
    };

    console.log("发送AI分析请求数据：", requestData);

    // 发送请求到后端
    const response = await request.post('ai分析的地址接口', requestData);

    // 存储返回结果
    difyOutput.value = response.data || '未获取到分析结果';
    console.log("AI分析完成：", difyOutput.value);

    // 可以添加成功提示
    // ElMessage.success("AI分析完成")
  } catch (error) {
    console.error("AI分析失败：", error);
    difyOutput.value = '分析失败，请稍后重试';
    // ElMessage.error("AI分析失败，请稍后重试")
  }
}


const handleSave = async () => {
  //处理保存按钮点击

  //处理表单内容的保存

  //处理医生意见的保存

  // 1. 检查是否选中患者（无患者则无法关联数据）
  if (!currentSelectedRow.value) {
    ElMessage.warning('请先从左侧表格选择患者');
    return;
  }
  // 2. 检查核心表单字段（根据业务需求调整必填项）
  const requiredFields = [
    { key: 'name', label: '患者姓名' },
    { key: 'boneMarrowNo', label: '骨髓号', from: 'selectedRow' }, // 骨髓号来自选中行
    { key: 'sendDate', label: '送检日期' },
    { key: 'reportDoc', label: '报告医生' },
    { key: 'auditDoc', label: '审核医生' }
  ];
  for (const field of requiredFields) {
    // 区分字段来源：表单(form) 或 选中行(selectedRow)
    const value = field.from === 'selectedRow'
      ? currentSelectedRow.value[field.key]
      : form.value[field.key];

    // 校验空值（日期需特殊判断，避免空对象）
    if (!value || (typeof value === 'object' && !value.getTime)) {
      ElMessage.warning(`请完善${field.label}字段`);
      return;
    }
  }

  if (!textarea.value.trim()) {
    ElMessage.warning('请输入医生意见');
    return;
  }


  // 整理数据格式（需和后端接口字段对齐，以下为通用结构，需根据实际调整）
  const saveData = {
    // 1. 患者唯一标识（关键：用于后端关联数据）
    boneMarrowNo: currentSelectedRow.value.boneMarrowNo, // 骨髓号（唯一键）

    // 2. 中央表单的患者基础信息
    patientForm: {
      ...form.value,
      // 处理日期格式：后端通常需要字符串（如 'YYYY-MM-DD'），而非Date对象
      sendDate: form.value.sendDate ? form.value.sendDate.toISOString().split('T')[0] : '',
      reportDate: form.value.reportDate ? form.value.reportDate.toISOString().split('T')[0] : ''
    },

    // 3. 医生意见
    doctorAdvice: textarea.value.trim(),

    // 4. 右侧表格的细胞检测数据（关联保存）
    cellDetectionData: tableData.value,

    // 5. 可选：其他关联数据（如细胞形态数据）
    cellMorphologyData: currentSelectedRow.value.cellMorphology || {}
  };


  try {
    ElMessage.info('正在保存数据...'); // 加载中提示
    // 发送POST请求（替换为你的实际保存接口地址）
    const response = await request.post('/api/patient/save', saveData);

    // 保存成功处理
    if (response.data.success) {
      // 假设后端返回 { success: boolean, message: string }
      ElMessage.success('数据保存成功！');
      // 可选：保存后重置表单/意见（根据业务需求）
      // textarea.value = ''; 
      // form.value = { ...初始默认值 };
    } else {
      ElMessage.error(`保存失败：${response.data.message || '未知错误'}`);
    }
  } catch (error) {
    // 网络错误/接口异常处理
    console.error('保存接口请求失败：', error);
    ElMessage.error('网络异常，保存失败，请稍后重试');
  }

}

const handleLogout = () => {
  // 弹出确认对话框
  ElMessageBox.confirm(
    '确定要退出登录吗？',
    '退出确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {

      // 显示退出成功提示
      ElMessage.success('已成功退出登录');

      setTimeout(() => {
        router.push('/login').catch(err => {
          alert.error('路由跳转失败:', err);
        });
      }, 500);
    })
    .catch(() => {

      ElMessage.info('已取消退出');
    });
};

</script>

<template>
  <div class="common-layout">
    <el-container style="flex-direction: column">

      <HeaderComponent 
      @logout="handleLogout" />


      <el-container style="flex-direction: row">

        <LeftBarComponent 
        @search="handleSearch" 
        @row-click="handleLeftTableRowClick"
        :left-table-data="leftTableData" />

        <el-main>
          <patientForm 
          @update:form="newForm => Object.assign(form, newForm)"
          @update:textarea="val => textarea = val"
          :form="form" 
          :dept-options="deptOptions" 
          :gender-options="genderOptions"
          :hospital-options="hospitalOptions" 
          :doc-options="docOptions" 
          :source-options="sourceOptions"
          :disabled-date="disabledDate" 
          :shortcuts="shortcuts" 
          :dify-output="difyOutput" 
          :image-list="imageList"
          :textarea="textarea" />
        </el-main>

        <RightBarComponent 
        :table-data="tableData" />
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.common-layout {
  margin: 0;
  background: linear-gradient(135deg, #9ddc89 0%, #a8bdb8 100%);
  font-family: "Helvetica Neue", Arial, sans-serif;
}
</style>