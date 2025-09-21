<script setup>
import { ref } from "vue";
import { reactive } from "vue";
import { Document, Delete, Download, Cpu, User, Search } from "@element-plus/icons-vue";

function isAbnormal(row) {
  const value = parseFloat(row.boneMarrowResult);
  const avg = parseFloat(row.boneMarrowAvg);
  const stdMatch = row.boneMarrowStd.match(/±([\d.]+)/);
  if (!stdMatch) return false;

  const std = parseFloat(stdMatch[1]);
  return Math.abs(value - avg) > std * 2;
}

const tableData = ref([
  {
    cellName: "原始粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "0.64",
    boneMarrowStd: "±0.33",
    boneMarrowResult: "0.4"
  },
  {
    cellName: "早幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "1.57",
    boneMarrowStd: "±0.60",
    boneMarrowResult: "0.8"
  },
  {
    cellName: "中性中幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "6.49",
    boneMarrowStd: "±2.04",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "中性晚幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "7.9",
    boneMarrowStd: "±1.97",
    boneMarrowResult: "18.4"
  },
  {
    cellName: "中性杆状核粒细胞",
    bloodSmear: "5.0",
    boneMarrowAvg: "23.72",
    boneMarrowStd: "±3.50",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "原始粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "0.64",
    boneMarrowStd: "±0.33",
    boneMarrowResult: "0.4"
  },
  {
    cellName: "早幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "1.57",
    boneMarrowStd: "±0.60",
    boneMarrowResult: "0.8"
  },
  {
    cellName: "中性中幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "6.49",
    boneMarrowStd: "±2.04",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "中性晚幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "7.9",
    boneMarrowStd: "±1.97",
    boneMarrowResult: "18.4"
  },
  {
    cellName: "中性杆状核粒细胞",
    bloodSmear: "5.0",
    boneMarrowAvg: "23.72",
    boneMarrowStd: "±3.50",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "原始粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "0.64",
    boneMarrowStd: "±0.33",
    boneMarrowResult: "0.4"
  },
  {
    cellName: "早幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "1.57",
    boneMarrowStd: "±0.60",
    boneMarrowResult: "0.8"
  },
  {
    cellName: "中性中幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "6.49",
    boneMarrowStd: "±2.04",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "中性晚幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "7.9",
    boneMarrowStd: "±1.97",
    boneMarrowResult: "18.4"
  },
  {
    cellName: "中性杆状核粒细胞",
    bloodSmear: "5.0",
    boneMarrowAvg: "23.72",
    boneMarrowStd: "±3.50",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "原始粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "0.64",
    boneMarrowStd: "±0.33",
    boneMarrowResult: "0.4"
  },
  {
    cellName: "早幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "1.57",
    boneMarrowStd: "±0.60",
    boneMarrowResult: "0.8"
  },
  {
    cellName: "中性中幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "6.49",
    boneMarrowStd: "±2.04",
    boneMarrowResult: "15.6"
  },
  {
    cellName: "中性晚幼粒细胞",
    bloodSmear: "-",
    boneMarrowAvg: "7.9",
    boneMarrowStd: "±1.97",
    boneMarrowResult: "18.4"
  },
  {
    cellName: "中性杆状核粒细胞",
    bloodSmear: "5.0",
    boneMarrowAvg: "23.72",
    boneMarrowStd: "±3.50",
    boneMarrowResult: "15.6"
  }
]);

function calculateReferenceRange(row) {
  const avg = parseFloat(row.boneMarrowAvg);
  const stdMatch = row.boneMarrowStd.match(/±([\d.]+)/);

  if (!stdMatch) return "";

  const std = parseFloat(stdMatch[1]);
  const lowerBound = avg - std * 2;
  const upperBound = avg + std * 2;

  // 保留两位小数并格式化显示
  return `${lowerBound.toFixed(2)}-${upperBound.toFixed(2)}`;
}


const difyOutput = ref("正在加载...");

const imageList = ref([
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=1',
  'https://picsum.photos/300/200?random=1',
]);


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


// 选项
const deptOptions = [{ value: 'dept1', label: '科室1' }];
const genderOptions = [{ value: 'male', label: '男' }, { value: 'female', label: '女' }];
const hospitalOptions = [{ value: 'hos1', label: '医院1' }];
const docOptions = [{ value: 'doc1', label: '医生1' }];
const sourceOptions = [{ value: 'source1', label: '来源1' }];
// 日期禁用逻辑（示例）
const disabledDate = (time) => time.getTime() > Date.now();
// 快捷日期（示例）
const shortcuts = [
  {
    text: '今天',
    onClick: (picker) => {
      picker.$emit('select', new Date());
    },
  },
];

const leftTableData = ref([
  { name: '123', boneMarrowNo: '20250809151313', gender: '男' },
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

</script>


<template>
  <div class="common-layout">
    <el-container>
      <el-header style="display: flex; align-items: center; justify-content: space-between;">
        <!-- 中间标题 -->
        <div style="font-weight: bold; text-align: center; flex: 1; font-size: 40px; color: white;">
          医疗报告分析平台
        </div>

        <!-- 右边按钮 -->
        <div>
          <el-dropdown>
            <el-button type="primary" size="small">
              <el-icon>
                <User />
              </el-icon>
              个人中心
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人设置</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>



      <el-container>
        <el-aside width="25%"
          style="border: 1px solid black; padding: 10px; display: flex; flex-direction: column; gap: 15px; height: 100vh; box-sizing: border-box;">


          <div style="display: flex; align-items: center;">
            <el-input v-model="input" style="flex: 1; margin-right: 10px;" placeholder="请输入患者的姓名" />
            <el-button type="primary">
              <el-icon>
                <Search />
              </el-icon>
              查找</el-button>
          </div>

          <!-- 表单区（加边框） -->
          <div style="flex: 1; overflow-y: auto; border: 1px solid black; border-radius: 4px; padding: 5px;">

            <div style="padding: 10px;">
              <!-- 表格组件：border属性显示边框，与示例样式更贴近 -->
              <el-table :data="leftTableData" border style="width: 100%;">
                <!-- 姓名列：label为表头，prop对应数据字段 -->
                <el-table-column prop="name" label="姓名" align="center"></el-table-column>
                <!-- 骨髓号列 -->
                <el-table-column prop="boneMarrowNo" label="骨髓号" align="center"></el-table-column>
                <!-- 性别列 -->
                <el-table-column prop="gender" label="性别" align="center"></el-table-column>
              </el-table>
            </div>

          </div>

          <!-- 下方按钮操作区 -->
          <div class="btn-grid">
            <button>
              <el-icon>
                <Document />
              </el-icon> 保存
            </button>
            <button>
              <el-icon>
                <Delete />
              </el-icon> 删除
            </button>
            <button>
              <el-icon>
                <Download />
              </el-icon> 导出
            </button>
            <button>
              <el-icon>
                <Cpu />
              </el-icon> AI分析
            </button>
          </div>
        </el-aside>


        <el-main>
          <!-- 患者信息区 -->
          <el-card style="padding: 16px;" shadow="hover">
            <el-form :model="form" label-width="80px" size="small">
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
                    <el-select v-model="form.dept" placeholder="Select">
                      <el-option v-for="item in deptOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第二行：姓名 + 性别 + 年龄 -->
              <el-row style="margin-bottom: 12px;">
                <el-col :span="8">
                  <el-form-item label="姓名">
                    <el-input v-model="form.name" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="性别">
                    <el-select v-model="form.gender" placeholder="Select">
                      <el-option v-for="item in genderOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="年龄">
                    <el-input v-model="form.age" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第三行：医院 + 诊疗卡号 + 床号 -->
              <el-row style="margin-bottom: 12px;">
                <el-col :span="8">
                  <el-form-item label="医院">
                    <el-select v-model="form.hospital" placeholder="Select">
                      <el-option v-for="item in hospitalOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="诊疗卡号">
                    <el-input v-model="form.cardNo" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="床号">
                    <el-input v-model="form.bedNo" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第四行：开单医生 + 骨髓来源 + 送检日期 -->
              <el-row style="margin-bottom: 12px;">
                <el-col :span="8">
                  <el-form-item label="开单医生">
                    <el-select v-model="form.orderDoc" placeholder="Select">
                      <el-option v-for="item in docOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="骨髓来源">
                    <el-select v-model="form.boneSource" placeholder="Select">
                      <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="送检日期">
                    <el-date-picker v-model="form.sendDate" type="date" :disabled-date="disabledDate"
                      :shortcuts="shortcuts" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第五行：报告医生 + 审核医生 + 报告日期 -->
              <el-row>
                <el-col :span="8">
                  <el-form-item label="报告医生">
                    <el-select v-model="form.reportDoc" placeholder="Select">
                      <el-option v-for="item in docOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="审核医生">
                    <el-select v-model="form.auditDoc" placeholder="Select">
                      <el-option v-for="item in docOptions" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="报告日期">
                    <el-date-picker v-model="form.reportDate" type="date" :disabled-date="disabledDate"
                      :shortcuts="shortcuts" />
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
                    <el-image v-for="(imgUrl, index) in imageList" :key="index" :src="imgUrl" fit="cover"
                      style="width: 200px; height: 160px;  margin-right: 10px;" :preview-src-list="imageList"
                      :show-progress="true" :initial-index="0" />
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
                  <p class="whitespace-pre-line text-neutral-700">{{ difyOutput }}</p>
                </div>
              </div>
            </el-card>

          </div>

          <!-- 意见输入区 -->
          <div>
            <el-card shadow="hover">
              <el-input v-model="textarea2" style="width: 100%" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea"
                placeholder="请输入医疗意见" />
            </el-card>

          </div>


        </el-main>


        <el-aside width="30%" style="padding: 10px; border: 1px solid #ebeef5; border-radius: 6px;">
          <div style="height: 70vh; overflow-y: auto;">
            <el-table :data="tableData" border stripe highlight-current-row
              style="width: 100%; font-size: 10px; min-width: 600px"
              :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: 'bold' }">
              <!-- 细胞名称 -->
              <el-table-column fixed prop="cellName" label="细胞名称" width="120" show-overflow-tooltip />

              <!-- 血片值 -->
              <el-table-column prop="bloodSmear" label="血片(%)" align="center" width="70">
                <template #default="scope">
                  <el-tag>
                    {{ scope.row.bloodSmear }}
                  </el-tag>
                </template>
              </el-table-column>
              <!-- 髓片值 -->
              <el-table-column prop="boneMarrowResult" label="髓片(%)" align="center" width="70">
                <template #default="scope">
                  <el-tag :type="isAbnormal(scope.row) ? 'danger' : 'success'">
                    {{ scope.row.boneMarrowResult }}
                  </el-tag>

                </template>
              </el-table-column>

              <!--髓片参考范围值 -->
              <el-table-column label="参考范围" align="center" width="110">
                <template #default="scope">
                  {{ calculateReferenceRange(scope.row) }}
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-aside>

      </el-container>


    </el-container>
  </div>
</template>

<style scoped>
.btn-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
}


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
  /* 防止图片被压缩 */
}

.el-button {
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
}




.btn-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  width: 100%;
}

.btn-grid button {
  width: 100%;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #1565c0;
  background-color: #e3f2fd;
  border: 1px solid #90caf9;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s ease;
}

.btn-grid button:hover {
  background-color: #bbdefb;
  border-color: #64b5f6;
  color: #0d47a1;
  box-shadow: 0 3px 8px rgba(33, 150, 243, 0.3);
}

.btn-grid button:active {
  transform: translateY(2px);
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.2);
}

/* 页面整体背景 */
.common-layout {
  margin: 0;
  background: linear-gradient(135deg, #9ddc89 0%, #a8bdb8 100%);
  font-family: "Helvetica Neue", Arial, sans-serif;
}

/* el-card 美化 */
.el-card {
  background-color: #f1fdfb !important;
  /* 清新的淡绿背景 */
  border-radius: 12px;
  border: 1px solid #d0f0ea;
  transition: all 0.3s ease-in-out;
}

/* 悬停效果增强 */
.el-card:hover {
  box-shadow: 0 6px 18px rgba(0, 150, 136, 0.2);
  transform: translateY(-4px);
  background-color: #e8fbf7 !important;
  /* 鼠标悬停时背景更亮 */
}
</style>
