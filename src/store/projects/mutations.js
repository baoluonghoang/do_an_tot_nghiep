export default {
  setProjects: (state, payload) => (state.projects = payload),

  setProjectsDetail: (state, payload) => (state.projectsDetail = payload),

  addProject(state, payload) {
    return state.projects.push(payload);
  },

  deleteProject(state, payload) {
    return state.projects.splice(
      state.projects.indexOf(
        state.projects.find((project) => project._id === payload)
      ),
      1
    );
  },

  //update form projects
  updateName: (state, payload) => (state.projectsDetail.name = payload),
  updateDescription: (state, payload) =>
    (state.projectsDetail.description = payload),
  updateArchitecture: (state, payload) =>
    (state.projectsDetail.architecture = payload),
  updateClient: (state, payload) => (state.projectsDetail.client = payload),
  updateCost: (state, payload) => (state.projectsDetail.cost = payload),
  updateArea: (state, payload) => (state.projectsDetail.area = payload),
};
