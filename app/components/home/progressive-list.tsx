import React, { useEffect, useRef, useState } from 'react'
import styles from '../home-page.module.css'

const defaultListPageSize = 4
const listLoadDelay = 400

export function useProgressiveList(totalItems: number, pageSize = defaultListPageSize) {
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [loading, setLoading] = useState(false)
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => () => {
    if (loadTimer.current) clearTimeout(loadTimer.current)
  }, [])

  const reset = () => {
    if (loadTimer.current) {
      clearTimeout(loadTimer.current)
      loadTimer.current = null
    }

    setLoading(false)
    setVisibleCount(pageSize)
  }

  const loadMore = () => {
    if (loading || visibleCount >= totalItems) return

    setLoading(true)
    loadTimer.current = setTimeout(() => {
      setVisibleCount(count => Math.min(count + pageSize, totalItems))
      setLoading(false)
      loadTimer.current = null
    }, listLoadDelay)
  }

  const showAll = () => {
    if (loadTimer.current) {
      clearTimeout(loadTimer.current)
      loadTimer.current = null
    }

    setLoading(false)
    setVisibleCount(totalItems)
  }

  return {
    visibleCount,
    loading,
    hasMore: visibleCount < totalItems,
    canCollapse: totalItems > pageSize && visibleCount >= totalItems,
    reset,
    loadMore,
    showAll,
    collapse: () => setVisibleCount(pageSize)
  }
}

export function ProgressiveListActions({
  listId,
  loading,
  hasMore,
  canCollapse,
  onLoadMore,
  onShowAll,
  onCollapse
}: {
  listId: string
  loading: boolean
  hasMore: boolean
  canCollapse: boolean
  onLoadMore: () => void
  onShowAll: () => void
  onCollapse: () => void
}) {
  if (!hasMore && !canCollapse) return null

  return (
    <div className={styles.listActions} aria-live="polite">
      {hasMore && (
        <>
          <button
            type="button"
            aria-controls={listId}
            disabled={loading}
            onClick={onLoadMore}
          >
            {loading
              ? 'carregando…'
              : 'carregar mais'}
          </button>
          <span aria-hidden="true">/</span>
          <button
            type="button"
            aria-controls={listId}
            disabled={loading}
            onClick={onShowAll}
          >
            ver todos
          </button>
        </>
      )}
      {canCollapse && (
        <button type="button" aria-controls={listId} onClick={onCollapse}>
          mostrar menos
        </button>
      )}
    </div>
  )
}
