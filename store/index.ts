import { MutationTree, ActionTree, GetterTree } from 'vuex'
import ProjectJsonParser, { Project, ProjectJson } from 'project-json'
import { APIProject } from '~/types/project'

export enum Tab {
  Project,
  Sprite
}

export const state = () => ({
  project: {} as Project,
  loadingProject: false as boolean,
  projectError: false as boolean,
  projectId: '' as string,
  apiProject: {} as APIProject
})

export type RootState = ReturnType<typeof state>

export const getters: GetterTree<RootState, RootState> = {
  project: (state) => state.project,
  projectLoading: (state) => state.loadingProject,
  projectError: (state) => state.projectError,
  projectId: (state) => state.projectId
}

export const mutations: MutationTree<RootState> = {
  SET_PROJECT(state, project: Project) {
    state.project = project
  },
  SET_LOADING_PROJECT(state, loading: boolean) {
    state.loadingProject = loading
  },
  SET_PROJECT_ERROR(state, error: boolean) {
    state.projectError = error
  },
  SET_PROJECT_ID(state, id: string) {
    state.projectId = id
  },
  SET_API_PROJECT(state, project: APIProject) {
    state.apiProject = project
  }
}

export const actions: ActionTree<RootState, RootState> = {
  async downloadProject({ commit }, id: string) {
    commit('SET_LOADING_PROJECT', true)

    try {
      const data = await this.$axios.$get<ProjectJson>(
        'https://projects.scratch.mit.edu/' + id
      )
      const parser = new ProjectJsonParser()
      const project = parser.parse(data)

      const apiProject = await this.$axios.$get(
        'https://sp-analyzer-api.now.sh/',
        {
          params: {
            id
          }
        }
      )
      commit('SET_API_PROJECT', apiProject)

      commit('SET_PROJECT_ID', id)
      commit('SET_PROJECT', project)
    } catch {
      commit('SET_PROJECT_ERROR', true)
    } finally {
      commit('SET_LOADING_PROJECT', false)
    }
  }
}
