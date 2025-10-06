<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import html2pdf from "html2pdf.js";
import router from "@/router";

const route = useRoute();
const exportArea = ref(null);

const form = ref({});
// 表格数据
const tableData = ref([]);

const imageList = ref([null]);

const advice = ref(null);

onMounted(() => {
  const query = route.query;
  // 还原表单数据
  form.value = { ...query };
  
  // 还原表格数据（反序列化）
  if (query.tableData) {
    try {
      tableData.value = JSON.parse(query.tableData);
    } catch (e) {
      console.error("解析表格数据失败", e);
      tableData.value = [];
    }
  }
  
  // 还原图片列表（反序列化）
  if (query.imageList) {
    try {
      imageList.value = JSON.parse(query.imageList);
    } catch (e) {
      console.error("解析图片列表失败", e);
      imageList.value = [];
    }
  }
  
  // 还原AI分析结果
  advice.value = query.advice || "";
});




// 导出PDF
const downloadPDF = () => {
    const element = exportArea.value;
    const opt = {
        margin: [10, 10, 10, 10],
        filename: `患者报告-${form.value.name || "未命名"}.pdf`,
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: 780,
            windowHeight: document.body.scrollHeight,
        },
        jsPDF: { unit: "pt", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
};

// 返回主界面
const handleClose = () => {
    router.push("/main");
};
</script>

<template>
    <div class="export-container">
        <div class="pdf-template" ref="exportArea">
            <h1 class="title">患者信息报告</h1>

            <!-- 顶部信息区 -->
            <el-card shadow="hover" class="mb-4">
                <div class="info-grid">
                    <div><strong>病人骨髓号：</strong>测试数据</div>
                    <div><strong>科室：</strong>{{ form.dept || "—" }}</div>
                    <div><strong>病历号：</strong>{{ form.medicalRecordNo || "—" }}</div>
                    <div><strong>姓名：</strong>{{ form.name || "—" }}</div>
                    <div><strong>性别：</strong>{{ form.gender || "—" }}</div>
                    <div><strong>年龄：</strong>{{ form.age || "—" }}</div>
                    <div><strong>医院：</strong>{{ form.hospital || "—" }}</div>
                    <div><strong>诊疗卡号：</strong>{{ form.cardNo || "—" }}</div>
                    <div><strong>床号：</strong>{{ form.bedNo || "—" }}</div>
                    <div><strong>骨髓来源：</strong>{{form.boneSource || "—"}}</div>
                    <div><strong>开单医生：</strong>{{ form.orderDoc || "—" }}</div>
                    <div><strong>送检日期：</strong>{{ form.sendDate || "—" }}</div>
                    <div><strong>报告医生：</strong>{{ form.reportDoc || "—" }}</div>
                    <div><strong>审核医生：</strong>{{ form.auditDoc || "—" }}</div>
                    <div><strong>报告日期：</strong>{{ form.reportDate || "—" }}</div>

                </div>
            </el-card>

            <!-- 检验结果表 -->
            <el-card shadow="hover" class="mb-4 pdf-card">
                <h3 class="section-title">检验结果表</h3>
                <div class="pdf-table-wrapper">
                    <el-table 
                    :data="tableData" 
                    style="width: 100%" 
                    :cell-style="{ background: '#f5f7fa', fontWeight: 'bold', textAlign: 'center'}"
                    :header-cell-style="{ background: '#f5f7fa', fontWeight: 'bold', textAlign: 'center'}">
                        <el-table-column prop="cellName" label="细胞类型" width="150" />

                        <el-table-column prop="bloodSmear" label="血片(%)" width="120" />
                        <el-table-column label="髓片(%)">
                            <el-table-column prop="boneMarrowResult" label="实际值" width="120" />
                            <el-table-column prop="reference" label="参考范围" />
                        </el-table-column>

                    </el-table>
                </div>
            </el-card>

            <!-- 图像与分析 -->
            <el-row :gutter="16">
                <el-col :span="14">
                    <el-card shadow="hover" class="mb-4">
                        <h3 class="section-title">意见</h3>
                        <div class="ai-output">
                            <div class="ai-text">{{ advice }}</div>
                        </div>
                    </el-card>
                </el-col>

                <el-col :span="10">
                    <el-card shadow="hover" class="mb-4">
                        <h3 class="section-title">细胞图像</h3>
                        <div class="image-list">
                            <el-image v-for="(img, i) in imageList" :key="i" :src="img"
                                style="width: 200px; height: 160px; margin-right: 10px" fit="cover"
                                :preview-src-list="imageList" />
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
            <el-button type="primary" @click="downloadPDF">确认</el-button>
            <el-button type="primary" @click="handleClose">返回</el-button>
        </div>
    </div>
</template>

<style scoped>
.pdf-template, .export-container {
    /* 关键：让width包含padding和border */
    box-sizing: border-box;
}

.pdf-template {
    background: #fff;
    padding: 30px;
    width: 780px;
    margin: 0 auto;
    border-radius: 12px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.export-container {
    width: 780px;
    margin: 0 auto;
    padding: 0;
    background: #ffffff;
    /* 可以继承box-sizing，无需重复设置 */
}

.pdf-table-wrapper {
    width: 100%;
    overflow: hidden;
}

.pdf-card {
    box-shadow: none !important;
    border: 1px solid #dcdfe6;

}

.el-table {
    table-layout: fixed !important;
}

/* 调整列宽比例，避免过宽 */
.el-table-column {
    min-width: auto !important;
    /* 移除强制最小宽度限制 */
}


/* 防止偏移 */
html,
body {
    background: #fff !important;
    margin: 0 !important;
    padding: 0 !important;
}

.title {
    text-align: center;
    font-weight: bold;
    font-size: 22px;
    margin-bottom: 20px;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px 20px;
    font-size: 13px;
}

.section-title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
}

.image-list {
    display: flex;
    flex-wrap: wrap;
}

.ai-output {
    padding: 10px;
}

.ai-text {
    background: #fafafa;
    border-radius: 8px;
    padding: 10px;
    line-height: 1.6;
    white-space: pre-line;
}

.actions {
    text-align: center;
    margin-top: 20px;
}
</style>
