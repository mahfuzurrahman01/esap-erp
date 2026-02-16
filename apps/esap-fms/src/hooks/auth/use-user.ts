"use client"

import { useRouter } from "next/navigation"

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import toast from "react-hot-toast"

import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/config/constants"
import { user } from "@/server/service/auth/user.service"
import { UserList, UserPaginator, UserQueryOptions } from "@/types/auth"
import {
  createQueryKeys,
} from "@/server/service/query-config"

export function useEnable2Fa() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { email: string }) => user.enable2fa(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enable-2fa"] })
    },
  })
}

export function useVerify2Fa() {
  return useMutation<any, AxiosError, any>({
    mutationFn: (data) => user.verify2fa(data),
    onSuccess: (output: any) => {
      toast.success(output)
    },
    onError: (error: AxiosError | any) => {
      const errorMessage =
        error?.response?.data?.message || "Verification Error"
      toast.error(errorMessage)
    },
  })
}

export const USER_KEYS = createQueryKeys("user")

export function useUserList(options?: Partial<UserQueryOptions>) {
  const queryKey = [USER_KEYS.all, options]

  return useQuery<UserPaginator, Error>({
    queryKey,
    queryFn: ({ queryKey, pageParam }) => {
      return user.all(Object.assign({}, queryKey[1], pageParam))
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export function useUserById(id: any) {
  return useQuery({
    queryKey: [USER_KEYS.detail(id)],
    queryFn: () => user.get(id),
    enabled: !!id,
    throwOnError: false
  })
}

export function useUserByEmail(email: string) {
  return useQuery({
    queryKey: [],
    queryFn: () => user.getByEmail(email),
    enabled: !!email,
    throwOnError: false,
  });
}


export function useCreateUser() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (data: any): Promise<any> => user.create(data),
    onMutate: async (newUser) => {
      await queryClient.cancelQueries({
        queryKey: [USER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        USER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<UserPaginator>(queryKey)

      queryClient.setQueryData<UserPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [newUser],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: [...old.data, { ...newUser, id: Date.now() }],
          count: old.count + 1,
        }
      })

      return { previousCountries }
    },
    onSuccess: () => {
      router.push("/users")
      toast.success(t("form-user-created-successfully"))
    },
    onError: (err: any, newUser, context) => {
      const errorMsg = err?.response?.data || String(err)
      if (errorMsg == "User exist with this Email") {
        toast.error("User exist with this Email")
      } else {
        toast.error(t("form-failed-to-create-user"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          USER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [USER_KEYS.all],
        exact: false,
      })
    },
  })
}

export function useUpdateUser() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: ({ id, data }: any) => user.update(id, data),
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: [USER_KEYS.all],
        exact: false,
      })
      await queryClient.cancelQueries({
        queryKey: USER_KEYS.detail(id),
      })

      const queryKey = [
        USER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      const previousCountries =
        queryClient.getQueryData<UserPaginator>(queryKey)
      const previousUser = queryClient.getQueryData<UserList>(
        USER_KEYS.detail(id)
      )

      queryClient.setQueryData<UserPaginator>(queryKey, (old: any) => {
        if (!old)
          return {
            data: [data],
            count: 1,
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          }
        return {
          ...old,
          data: old.data.map((item: any) =>
            item.id === id ? { ...item, ...data } : item
          ),
        }
      })

      queryClient.setQueryData(USER_KEYS.detail(id), data)

      return { previousCountries, previousUser }
    },
    onSuccess: () => {
      router.push("/users")
      toast.success(t("form-user-updated-successfully"))
    },
    onError: (err:any, variables, context) => {
      if(err.response.data.message){
        toast.error(
          err.response.data.message &&
          (String(err.response.data.message).charAt(0).toUpperCase() + String(err.response.data.message).slice(1))
        )        
      }else{
        toast.error(t("form-failed-to-update-user"))
      }
      if (context?.previousCountries) {
        const queryKey = [
          USER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
      if (context?.previousUser) {
        queryClient.setQueryData(
          USER_KEYS.detail(variables.id),
          context.previousUser
        )
      }
    },
    onSettled: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [USER_KEYS.all],
        exact: false,
      })
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: USER_KEYS.detail(data.id),
        })
      }
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  const t = useTranslations("form")

  return useMutation({
    mutationFn: (userId: any) => user.delete(userId),
    onMutate: async (userId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: [USER_KEYS.all],
        exact: false,
      })

      const queryKey = [
        USER_KEYS.all,
        {
          pageIndex: DEFAULT_PAGE_INDEX,
          pageSize: DEFAULT_PAGE_SIZE,
        },
      ]

      // Snapshot the previous value
      const previousCountries =
        queryClient.getQueryData<UserPaginator>(queryKey)

      // Optimistically remove the COA from the list
      queryClient.setQueryData<UserPaginator>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          data: old.data.filter((item) => item.userId !== userId),
          count: old.count - 1,
        }
      })

      return { previousCountries }
    },

    onSuccess: () => {
      toast.success(t("form-user-deleted-successfully"))
    },

    onError: (err, variables, context) => {
      toast.error(t("form-failed-to-delete-user"))
      if (context?.previousCountries) {
        const queryKey = [
          USER_KEYS.all,
          {
            pageIndex: DEFAULT_PAGE_INDEX,
            pageSize: DEFAULT_PAGE_SIZE,
          },
        ]
        queryClient.setQueryData(queryKey, context.previousCountries)
      }
    },

    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: [USER_KEYS.all],
        exact: false,
      })
    },
  })
}