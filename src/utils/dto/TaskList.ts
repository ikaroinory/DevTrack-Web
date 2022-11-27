import Task from "@/utils/entities/Task";

export default interface TaskList {
    notStart: Array<Task>;
    progressing: Array<Task>;
    completed: Array<Task>;
}
