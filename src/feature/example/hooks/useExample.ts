import { useQuery } from '@tanstack/react-query'

export function useExample() {
  return useQuery({
    queryKey: ['example'],
    queryFn: () => ({ hello: 'world' }),
  })
}
