import axios from 'axios'
import { SNIPPETS_BASE_URL } from '../constants/urls'
import { IItemsInfo } from '../interfaces/common.interface'
import { ISnippet, ISnippetDto } from '../interfaces/snippets.interface'
import { Role } from '../interfaces/user.interface'

export const snippetsApi = () => {
  return {
    getSnippets: async (url: string) => {
      const res = await axios.get<ISnippet[]>(url, { withCredentials: true })
      return res.data
    },
    getSnippetsInfo: async (url: string) => {
      try {
        const res = await axios.get<IItemsInfo>(url, { withCredentials: true })
        return res.data
      } catch (error) {
        console.log(error)
      }

      return null
    },
    postSnippet: async (url: string, { arg }: { arg: ISnippetDto }) => {
      await axios.post<ISnippet>(url, arg, { withCredentials: true })
    },
    patchSnippet: async (url: string, { arg }: { arg: ISnippetDto }) => {
      await axios.patch<ISnippet>(url, arg, { withCredentials: true })
    },
    deleteSnippet: async (snippetId: string) => {
      try {
        const url = SNIPPETS_BASE_URL
        const res = await axios.delete<ISnippet>(url + `/${snippetId}`, {
          withCredentials: true,
        })
        return res.data
      } catch (error) {
        console.log(error)
      }

      return null
    },
  }
}
