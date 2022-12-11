import ApplicationUtils from "@/utils/ApplicationUtils";

const enumLang = ApplicationUtils.locale.enum;

export default class GlobalData {
    public static readonly taskTypeList = [
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.newFeature },
        { value: 2, label: enumLang.bugfix },
        { value: 3, label: enumLang.design },
        { value: 4, label: enumLang.docs }
    ];
    public static readonly sourceOfDemandList = [
        { value: 0, label: enumLang.unknown },
        { value: 1, label: enumLang.rdPost },
        { value: 2, label: enumLang.testPost },
        { value: 3, label: enumLang.designPost },
        { value: 4, label: enumLang.marketResearch }
    ];
    public static readonly priorityList = [
        { value: 0, label: enumLang.unknown, iconColor: "" },
        { value: 1, label: enumLang.general, iconColor: "#5dcfff" },
        { value: 2, label: enumLang.normal, iconColor: "#40e0c3" },
        { value: 3, label: enumLang.important, iconColor: "#f4d66d" },
        { value: 4, label: enumLang.urgent, iconColor: "#fb7fb7" },
        { value: 5, label: enumLang.mostUrgent, iconColor: "#fa8888" }
    ];
}
