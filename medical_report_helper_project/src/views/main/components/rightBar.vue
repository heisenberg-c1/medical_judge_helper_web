<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  tableData: {
    type: Array,
    required: true,
    default: () => []
  }
});


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
function isAbnormal(row) {
    const value = parseFloat(row.boneMarrowResult);
    const avg = parseFloat(row.boneMarrowAvg);
    const stdMatch = row.boneMarrowStd.match(/±([\d.]+)/);
    if (!stdMatch) return false;

    const std = parseFloat(stdMatch[1]);
    return Math.abs(value - avg) > std * 2;
}
</script>


<template>
    <el-aside class="right-bar">
        <div style="height: 90vh; overflow-y: auto;">
            <el-table :data="props.tableData" class="right-table" border stripe highlight-current-row>
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
</template>


<style scoped>


.right-bar {
  width: 30%;
  padding: 10px;
  border: 1px solid #ebeef5;
  border-radius: 6px;
}


.right-table {
  width: 100%;
  font-size: 10px;
  min-width: 600px;
  font-size: 13px;
}
.right-table ::v-deep .el-table__header th {
  background: #f5f7fa;
  color: #606266;
  font-weight: bold;
}
</style>