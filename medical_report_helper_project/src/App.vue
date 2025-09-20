<script setup>
import { ref } from "vue";
import { reactive } from "vue";


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
</script>


<template>
  <div class="common-layout">
    <el-container>
      <el-header style="background-color: aqua; display: flex; align-items: center; justify-content: space-between;">
        <div></div>

        <!-- 中间标题 -->
        <div style="font-weight: bold; text-align: center; flex: 1;">
          医疗报告分析平台
        </div>

        <!-- 右边按钮 -->
        <div>
          <el-dropdown>
            <el-button type="primary" size="small">
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

          <!-- 查询区 -->
          <div style="display: flex; align-items: center;">
            <el-input v-model="input" style="flex: 1; margin-right: 10px;" placeholder="请输入患者的id/姓名" />
            <el-button type="primary">查找</el-button>
          </div>

          <!-- 表单区（加边框） -->
          <div style="flex: 1; overflow-y: auto; border: 1px solid black; border-radius: 4px; padding: 5px;">
            <el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
              <el-menu-item index="1">患者 A</el-menu-item>
              <el-menu-item index="2">患者 B</el-menu-item>
              <el-menu-item index="3">患者 C</el-menu-item>
            </el-menu>
          </div>

          <!-- 下方按钮操作区 -->
          <div class="btn-grid">
            <button>保存</button>
            <button>删除</button>
            <button>导出</button>
            <button>ai分析</button>
          </div>

        </el-aside>


        <el-main>
          <!-- 患者信息区 -->
          <div>
            <el-card>
              <el-row>

                <el-col :span="12">
                  <span style="font-size: 10px;">病人骨髓号</span><el-tag type="info">测试数据</el-tag>
                </el-col>

                <el-col :span="12">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">科室</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>

              </el-row>
              <el-row>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">姓名</span>
                    <el-input v-model="input" placeholder="请输入" size="small" />
                  </div>

                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">性别</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">年龄</span>
                    <el-input v-model="input" size="small" />
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">医院</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">诊疗卡号</span>
                    <el-input v-model="input" size="small" />
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">床号</span>
                    <el-input v-model="input" size="small" />
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">开单医生</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">骨髓来源</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">送检日期</span>
                    <el-date-picker v-model="value2" type="date" :disabled-date="disabledDate" :shortcuts="shortcuts"
                      :size="small" />
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">报告医生</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">审核医生</span>
                    <el-select v-model="value" placeholder="Select" size="small">
                      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 10px;">报告日期</span>
                    <el-date-picker v-model="value2" type="date" :disabled-date="disabledDate" :shortcuts="shortcuts"
                      :size="small" />
                  </div>
                </el-col>
              </el-row>
            </el-card>


          </div>

          <!-- 报告图片区 -->
          <div>
            <el-card>
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
            <el-card>
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
            <el-card><el-input v-model="textarea2" style="width: 100%" :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea" placeholder="请输入医疗意见" />
            </el-card>

          </div>


        </el-main>


        <el-aside width="30%" style="padding: 10px; background: #fff; border: 1px solid #ebeef5; border-radius: 6px;">
          <div style="max-height: 70vh; overflow-y: auto;">
            <el-table :data="tableData" border stripe highlight-current-row style="width: 100%; font-size: 10px;"
              :header-cell-style="{ background: '#f5f7fa', color: '#606266', fontWeight: 'bold' }">
              <!-- 细胞名称 -->
              <el-table-column fixed prop="cellName" label="细胞名称" width="80" show-overflow-tooltip />

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
</style>
