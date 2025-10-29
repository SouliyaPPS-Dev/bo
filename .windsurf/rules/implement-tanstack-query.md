---
trigger: model_decision
---

# You are a Professional of tanstack query

## Understand API Response
### Response List
- [] The JSON:API specification defines a standardized structure for all responses, including collections.
Example:{`handler_name`: [], total: 0 }
Example2: {`handler_name`: [], naxtPageToken }
### Response Single Object
- [] A single JSON object representing the resource directly.
Example: {id: 1, name: Joe Due, email: Joe@gmail.com}
### Response Error
- [] Custom Structured Error
Example: {code, message, detail, status}

## TanStack Query Implementation
1. Query Keys Management - Base on Feature QUERY_KEYS constant pattern
Example: 
export const QUERY_KEYS = { USERS: { ALL: ['users'] as const, LIST: ['users', 'list'] as const, INFINITE: ['users', 'infinite'] as const, DETAIL: (id: number) => ['users', 'detail', id] as const,}} as const
2. API Response Types - All 3 response formats (List, Paginated, Single, Error)
Example:
interface ListResponse<T> {
  [handlerName: string]: T[];  // Dynamic handler name (users, posts, etc.)
  total: number;
}
interface PaginatedResponse<T> {
  [handlerName: string]: T[];  // Dynamic handler name
  nextPageToken?: string;
}
type SingleResponse<T> = T;
interface ApiError {
  code: string;
  message: string;
  detail?: string;
  status: number;
}
3. useQuery Patterns - Both list and single object with standardized returns
3.1. useQuery - Simple List
# Rules
- Always extract array from response using handler name
- Provide default empty array: data?.users || []
- Cast error type: error as ApiError | null
- Return consistent structure across all list queries
# Return Structure:
{
  [entityName]: T[],          // Array with meaningful name (users, posts, etc.)
  isLoading: boolean,
  error: ApiError | null,
  isError: boolean
}
3.2. useQuery - Single Object
# Rules
- Use dynamic query key: QUERY_KEYS.USERS.DETAIL(userId)
- Return object or null: data || null
- Use enabled for conditional fetching
- Validate parameters in enabled condition
# Return Structure:
{
  [entityName]: T | null,     // Object with meaningful name or null
  isLoading: boolean,
  error: ApiError | null,
  isError: boolean
}
4. useInfiniteQuery - Complete pagination implementation with nextPageToken
4.1. useInfiniteQuery - Pagination
Two Pagination Strategies
Strategy 1: Token-Based Pagination (Cursor)
# Rules:
- Use initialPageParam: undefined
- Return nextPageToken ?? undefined in getNextPageParam
- Token can be string, number, or undefined
- Backend controls pagination logic
Strategy 2: Offset-Based Pagination
# Rules:
- Use initialPageParam: 0 (numeric)
- Check if loadedItems < limit to detect end
- Return lastPageParam + limit for next offset
- Client controls pagination logic
- Pass offset and limit in query params
Strategy 3: Page-Based Pagination
# Rules:
- Use initialPageParam: 1 (pages start at 1)
- Calculate totalPages from total / limit
- Compare currentPage >= totalPages to detect end
- Return lastPageParam + 1 for next page
- Requires total count in response
All Strategies Return Structure
{
  [entityName]: T[],              // Flattened array from all pages
  isLoading: boolean,             // Initial loading state
  error: ApiError | null,
  isError: boolean,
  fetchNextPage: () => void,      // Function to load more
  hasNextPage: boolean,           // Are there more pages?
  isFetchingNextPage: boolean,    // Loading next page?
  isFetching: boolean             // Any fetch in progress?
}
5. useMutation - Create, Update, Delete with cache management
# Rules: 
- Create: Invalidate list queries using QUERY_KEYS.*.ALL
- Update: Use optimistic updates for better UX
- Delete: Remove specific query, then invalidate lists
- Always use onSuccess, onError, onSettled for cache management
- Use onMutate for optimistic updates with rollback
6. Component Examples - Real-world usage patterns
7. Error Handling - Type guards and interceptors
Example: function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    'message' in error &&
    'status' in error
  );
}
8. Cache Invalidation - All patterns covered
9. Quick Reference Checklist - Fast lookup guide
🎯 Core Standards Enforced:
Return Objects:
- List: { users: User[], isLoading, error, isError }
- Single: { user: User | null, isLoading, error, isError }
- Infinite: { users: User[], isLoading, error, isError, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching }
Example: