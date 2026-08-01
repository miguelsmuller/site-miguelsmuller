import React from 'react'
import type { SiteContent } from '../../../data/site-content'
import { trackAnalyticsEvent } from '../../../lib/analytics'
import styles from '../../home-page.module.css'
import { ProgressiveListActions, useProgressiveList } from '../progressive-list'

export function ArticlesSection({ articles }: { articles: SiteContent['articles'] }) {
  const articlesList = useProgressiveList(articles.length, 2)
  const visibleArticles = articles.slice(0, articlesList.visibleCount)

  return (
    <section className={styles.section} aria-labelledby="artigos">
      <h2 id="artigos">Artigos</h2>
      {articles.length > 0
        ? (
          <ol id="artigos-lista" className={styles.articleList}>
            {visibleArticles.map(article => (
              <li key={article.href || article.title}>
                <article className={styles.articleRow}>
                  <p className={styles.articleMeta}>
                    {article.date && <time>{article.date}</time>}
                    <span>{article.category}</span>
                  </p>
                  <div>
                    <h3>
                      {article.href
                        ? (
                          <a
                            href={article.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`${article.title} (abre em nova aba)`}
                            onClick={() => trackAnalyticsEvent('article_click', { article_category: article.category })}
                          >
                            {article.title} <span className={styles.articleExternalLinkIcon} aria-hidden="true">↗</span>
                          </a>
                          )
                        : <span>{article.title}</span>}
                    </h3>
                    <p>{article.summary}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
          )
        : <p>Artigos temporariamente indisponíveis.</p>}
      <ProgressiveListActions
        listId="artigos-lista"
        loading={articlesList.loading}
        hasMore={articlesList.hasMore}
        canCollapse={articlesList.canCollapse}
        onLoadMore={articlesList.loadMore}
        onShowAll={articlesList.showAll}
        onCollapse={articlesList.collapse}
        onAction={action => trackAnalyticsEvent('content_list_action', { content_section: 'articles', content_action: action })}
      />
    </section>
  )
}
