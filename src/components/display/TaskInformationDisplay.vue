<template>
    <div class="task-details-container task-flex-column">
        <div class="task-title">
            <el-input v-model="curTaskInformation.taskName"
                      @focus=""
                      input-style="font-size: 2rem; height: 3rem;"
            />
        </div>
        <div class="task-second-container task-flex">
            <div class="task-second-box task-flex">
                <el-icon size="3rem" :style="{color: iconColor}">
                    <Clock/>
                </el-icon>
                <div class="task-second-main">
                    <span class="little-text">{{ lang.status }}</span>
                    <div style="padding-left: 11px">{{ status }}</div>
                </div>
            </div>
            <div class="task-second-box task-flex">
                <el-avatar :size="45" :src="'data:image/jpeg;base64,' + curTaskInformation.principalAvatar"/>
                <div class="task-second-main">
                    <div class="task-select">
                        <span class="little-text">{{ lang.principal }}</span>
                        <el-select v-model="curTaskInformation.principalNickname">
                            <el-option v-for="item in options.staffOptions"
                                       :key="item.value"
                                       :label="item.label"
                                       :value="item.value"
                            />
                        </el-select>
                    </div>
                </div>
            </div>
            <div class="task-second-box-column task-flex-column">
                <span class="task-second-text">{{ lang.startTime }}</span>
                <el-date-picker v-model="curTaskInformation.startTime"
                                type="datetime"
                                :disabled-date="disableStartTime"
                />
            </div>
            <div class="task-second-box-column task-flex-column">
                <span class="task-second-text">{{ lang.deadline }}</span>
                <el-date-picker v-model="curTaskInformation.deadline"
                                type="datetime"
                                :disabled-date="disableDeadline"
                />
            </div>
        </div>
        <el-divider/>
        <div class="task-third-container task-flex">
            <div class="text-third-box task-flex-column">
                <span class="task-label">{{ lang.priority }}</span>
                <div class="task-select">
                    <el-select v-model="curTaskInformation.priority">
                        <el-option v-for="item in priorityList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <div class="text-third-box task-flex-column">
                <span class="task-label">{{ lang.sourceOfDemand }}</span>
                <div class="task-select">
                    <el-select v-model="curTaskInformation.sourceOfDemand">
                        <el-option v-for="item in sourceOfDemandList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </div>
            </div>

            <div class="text-third-box task-flex-column">
                <span class="task-label">{{ lang.taskType }}</span>
                <div class="task-select">
                    <el-select v-model="curTaskInformation.taskType">
                        <el-option v-for="item in taskTypeList"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
            <div class="text-third-box task-flex-column">
                <span class="task-label">{{ lang.members }}</span>
                <div class="task-select">
                    <el-select v-model="curTaskInformation.members">
                        <el-option v-for="item in options.staffOptions"
                                   :key="item.value"
                                   :label="item.label"
                                   :value="item.value"
                        />
                    </el-select>
                </div>
            </div>
        </div>
        <div class="task-fourthly-container task-flex-column">
            <span class="task-label">{{ lang.description }}</span>
            <el-input v-model="curTaskInformation.taskDescription"
                      type="textarea" resize="none" maxlength="100" show-word-limit
            />
        </div>
        <div class="task-create-container">
            <div class="task-create-info little-text">
                {{ curTaskInformation.creatorNickname }} {{ lang.createAt }} {{ curTaskInformation.creationTime }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { computed, ref } from "vue";
    import { Clock } from "@element-plus/icons-vue";
    import TaskInformation from "@/utils/dto/TaskInformation";
    import ApplicationUtils from "@/utils/ApplicationUtils";

    const props = defineProps<{
        task: TaskInformation
    }>();

    const lang = ApplicationUtils.locale.form.taskInformation;
    const enumLang = ApplicationUtils.locale.enum;

    const taskTypeList = ref([
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.newFeature },
        { value: 2, label: enumLang.bugfix }
    ]);
    const priorityList = ref([
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.general },
        { value: 2, label: enumLang.normal },
        { value: 3, label: enumLang.important },
        { value: 4, label: enumLang.urgent },
        { value: 5, label: enumLang.mostUrgent }
    ]);
    const sourceOfDemandList = ref([
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.rdPost },
        { value: 2, label: enumLang.testPost }
    ]);

    const curTaskInformation = ref<TaskInformation>({
        creationTime: "",
        creatorAvatar: "",
        creatorNickname: "",
        creatorUUID: "",
        creatorUsername: "",
        deadline: "",
        finishTime: "",
        fromProjectUUID: "",
        principalAvatar: "",
        principalNickname: "",
        principalUUID: "",
        principalUsername: "",
        priority: 0,
        sourceOfDemand: 0,
        startTime: "",
        taskDescription: "",
        taskName: "",
        taskType: 0,
        taskUUID: ""
    });

    const iconColor = computed(() => {
        if (curTaskInformation.value.finishTime)
            return "#40e0c3";
        else if (!curTaskInformation.value.startTime || new Date(curTaskInformation.value.startTime).getTime() > Date.now())
            return "#ff8888";
        else
            return "#f6c659";
    });
    const status = computed(() => {
        if (curTaskInformation.value.finishTime)
            return enumLang.completed;
        else if (!curTaskInformation.value.startTime || new Date(curTaskInformation.value.startTime).getTime() > Date.now())
            return enumLang.notStart;
        else
            return enumLang.inProgress;
    });

    init();

    function init() {
        curTaskInformation.value = props.task;
    }

    //禁用当前时间之前的时间
    function disableStartTime(current: Date) {
        const now = new Date();
        return current.getTime() < new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    };

    //禁用开始时间之前的时间
    function disableDeadline(current: Date) {
        let startTimeToDate = new Date(curTaskInformation.startTime);
        return current < startTimeToDate;
    };

    const options = {
        projectOptions: [
            {
                value: "项目1",
                label: "项目1"
            },
            {
                value: "项目2",
                label: "项目2"
            }
        ],
        typeOptions: [
            {
                value: "新增功能",
                label: "新增功能"
            },
            {
                value: "修复bug",
                label: "修复bug"
            },
            {
                value: "添加需求",
                label: "添加需求"
            }
        ],
        staffOptions: [
            {
                value: "张三",
                label: "张三"
            },
            {
                value: "李四",
                label: "李四"
            }
        ],
        priorityOptions: [
            {
                value: "最高",
                label: "最高"
            },
            {
                value: "较高",
                label: "较高"
            },
            {
                value: "普通",
                label: "普通"
            },
            {
                value: "较低",
                label: "较低"
            },
            {
                value: "较低",
                label: "较低"
            }
        ],
        sourceOfDemandOptions: [
            {
                value: "研发工程师",
                label: "研发工程师"
            },
            {
                value: "测试工程师",
                label: "测试工程师"
            },
            {
                value: "客户",
                label: "客户"
            },
            {
                value: "产品经理",
                label: "产品经理"
            },
            {
                value: "市场",
                label: "市场"
            },
            {
                value: "用户",
                label: "用户"
            },
            {
                value: "老板",
                label: "老板"
            },
            {
                value: "合作伙伴",
                label: "合作伙伴"
            },
            {
                value: "运营",
                label: "运营"
            }
        ],
        statusOptions: [
            {
                value: "未开始",
                label: "未开始"
            },
            {
                value: "进行中",
                label: "进行中"
            },
            {
                value: "已完成",
                label: "已完成"
            }
        ]
    };
</script>

<style scoped>
    .task-flex {
        display: flex;
    }

    .task-flex-column {
        display: flex;
        flex-direction: column;
    }

    /*完整容器*/
    .task-details-container {
        padding: 0 15px 15px 15px;
    }

    /*第二个盒子容器*/
    .task-second-container {
        justify-content: space-between;
        margin: 16px 0 0 0;
    }

    /*第二个盒子容器内的单个盒子*/
    .task-second-box {
        width: 248px;
        align-items: center;
    }

    /*第二个盒子容器内的单个盒子，垂直布局*/
    .task-second-box-column {
    }

    /*第二个盒子容器的主要内容部分*/
    .task-second-main {
        width: 200px;
    }

    .task-second-text {
        padding-left: 11px;
    }

    /*第三个盒子容器*/
    .task-third-container {
        justify-content: space-between;
    }

    /*第三个盒子容器内的单个盒子*/
    .text-third-box {
        width: 200px;
        margin-bottom: 15px;
    }

    /*选择器和描述的标签*/
    .task-label {
        color: #5f6e8e;
        margin-bottom: 5px;
    }

    /*第四个盒子容器*/
    .task-fourthly-container {
        margin: 15px 0;
    }

    /*较小样式的文字*/
    .little-text {
        color: var(--color-text-remark);
        font-size: 13px;
        padding-left: 11px;
    }

    /*隐藏input类型的边框*/
    :deep(.el-input__wrapper) {
        box-shadow: 0 0 0 0;
    }

    :deep(.el-input__wrapper):hover {
        box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
    }

    :deep(.el-input__wrapper):focus-within {
        box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
    }

    /*隐藏选择器的箭头*/
    :deep(.el-select .el-input .el-select__caret) {
        color: #ffffff;
    }

    .task-select:hover:deep(.el-select .el-input .el-select__caret) {
        color: var(--el-select-input-color);
        font-size: var(--el-select-input-font-size);
    }

    .task-select:focus-within:deep(.el-select .el-input .el-select__caret) {
        color: var(--el-select-input-color);
        font-size: var(--el-select-input-font-size);
    }
</style>