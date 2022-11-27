import Project from "@/utils/entities/Project";

export default interface ProjectList {
    notStart: Array<Project>;
    progressing: Array<Project>;
    completed: Array<Project>;
}
