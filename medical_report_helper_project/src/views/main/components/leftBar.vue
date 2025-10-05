<script setup>
import { Document, Delete, Download, Cpu, Search } from "@element-plus/icons-vue";
import { defineEmits, defineProps} from 'vue';

const emit = defineEmits(['search', 'row-click', 'save', 'delete', 'export', 'ai-analyze']);
const props = defineProps({
  leftTableData: {
    type: Array,
    required: true,
    default: () => []
  }
});
const handleSearch = () => {
  emit('search'); 
};

const handleLeftTableRowClick = (row) => {
  emit('row-click', row); 
};


</script>

<template>
    <el-aside class="left-bar">


        <div style="display: flex; align-items: center;">
            <el-input v-model="input" style="flex: 1; margin-right: 10px;" placeholder="请输入患者的姓名" />
            <el-button type="primary" @click="handleSearch">
                <el-icon>
                    <Search />
                </el-icon>
                查找</el-button>
        </div>

        <!-- 表单区（加边框） -->
        <div class="left-table">

            <div style="padding: 10px;">
                <!-- 表格组件：border属性显示边框，与示例样式更贴近 -->
                <el-table :data="props.leftTableData" border style="width: 100%;" @row-click="handleLeftTableRowClick">
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
</template>


<style scoped>

.btn-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
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


.left-bar {
  width: 25%;
  border: 1px solid #ebeef5;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  height: 100vh;
  box-sizing: border-box;
}


.left-table {
  flex: 1;
  overflow-y: auto;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 5px;
}
</style>