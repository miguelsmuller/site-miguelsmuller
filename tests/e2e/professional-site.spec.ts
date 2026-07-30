import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('site profissional', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('renderiza a estrutura editorial sem violações automáticas de acessibilidade', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Miguel Silva - Müller', level: 1 })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Índice do site' })).toBeVisible()
    await expect(page.getByRole('region', { name: 'Experiência profissional' })).toBeVisible()

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()

    expect(results.violations).toEqual([])
  })

  test('abre e fecha contato restaurando foco', async ({ page }) => {
    const contactTrigger = page.getByRole('banner').getByRole('button', { name: 'contato' })
    await contactTrigger.click()

    const dialog = page.getByRole('dialog', { name: 'Falar comigo' })
    const closeButton = dialog.getByRole('button', { name: 'fechar' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('Brasil', { exact: true })).toBeVisible()
    await expect(dialog.getByText('Remoto', { exact: true })).toBeVisible()
    await expect(closeButton).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(contactTrigger).toBeFocused()
  })

  test('filtra certificações sem alterar formação acadêmica', async ({ page }) => {
    const academic = page.getByRole('region', { name: 'Formação acadêmica' })
    await expect(academic.getByRole('listitem')).toHaveCount(3)
    await expect(academic.getByText('Pós-graduação em Engenharia de Software', { exact: true })).toBeVisible()
    await expect(academic.getByText('PUC Minas — abril de 2025', { exact: true })).toBeVisible()

    await page.getByRole('button', { name: 'certificações' }).click()
    await expect(page.locator('li[data-type="certification"]')).toHaveCount(1)
    await expect(page.locator('li[data-type="course"]')).toHaveCount(0)
    await expect(academic.getByRole('listitem')).toHaveCount(3)
  })

  test('revela cursos progressivamente e reinicia ao trocar o filtro', async ({ page }) => {
    const learning = page.getByRole('region', { name: 'Certificações e cursos' })

    await expect(learning.getByRole('listitem')).toHaveCount(3)

    const loadMore = learning.getByRole('button', { name: 'carregar mais' })
    await loadMore.click()
    await expect(learning.getByRole('button', { name: 'carregando…' })).toBeVisible()
    await expect(learning.getByRole('listitem')).toHaveCount(6)

    await learning.getByRole('button', { name: 'ver todos' }).click()
    await expect(learning.getByRole('button', { name: 'mostrar menos' })).toBeVisible()
    await expect(learning.getByRole('button', { name: 'carregar mais' })).toHaveCount(0)

    await learning.getByRole('button', { name: 'cursos' }).click()
    await expect(learning.getByRole('listitem')).toHaveCount(3)
    await expect(learning.getByRole('button', { name: 'carregar mais' })).toBeVisible()

    await learning.getByRole('button', { name: 'certificações' }).click()
    await expect(learning.getByRole('listitem')).toHaveCount(1)
    await expect(learning.getByRole('button', { name: 'carregar mais' })).toHaveCount(0)
    await expect(learning.getByRole('button', { name: 'mostrar menos' })).toHaveCount(0)
  })

  test('revela artigos de dois em dois', async ({ page }) => {
    const articles = page.getByRole('region', { name: 'Artigos' })

    await expect(articles.getByRole('listitem')).toHaveCount(2)
    await expect(articles.getByRole('link', { name: /Agile Wheel/i })).toHaveAttribute(
      'href',
      /articles\.miguelsmuller\.dev\.br/
    )
    await articles.getByRole('button', { name: 'carregar mais' }).click()
    await expect(articles.getByRole('button', { name: 'carregando…' })).toBeVisible()
    await expect(articles.getByRole('listitem')).toHaveCount(4)

    await articles.getByRole('button', { name: 'ver todos' }).click()
    await expect(articles.getByRole('button', { name: 'mostrar menos' })).toBeVisible()
    await expect.poll(() => articles.getByRole('listitem').count()).toBeGreaterThan(4)

    await articles.getByRole('button', { name: 'mostrar menos' }).click()
    await expect(articles.getByRole('listitem')).toHaveCount(2)
  })

  test('revela projetos de três em três', async ({ page }) => {
    const projects = page.getByRole('region', { name: 'Projetos' })

    await expect(projects.getByRole('listitem')).toHaveCount(3)
    await expect(projects.getByRole('button', { name: 'Pousada Müller' })).toBeVisible()
    await projects.getByRole('button', { name: 'carregar mais' }).click()
    await expect(projects.getByRole('button', { name: 'carregando…' })).toBeVisible()
    await expect(projects.getByRole('listitem')).toHaveCount(6)

    await projects.getByRole('button', { name: 'ver todos' }).click()
    await expect(projects.getByRole('button', { name: 'mostrar menos' })).toBeVisible()
    await projects.getByRole('button', { name: 'mostrar menos' }).click()
    await expect(projects.getByRole('listitem')).toHaveCount(3)
  })

  test('mantém links de projeto somente no modal', async ({ page }) => {
    const projects = page.getByRole('region', { name: 'Projetos' })
    await expect(projects.getByRole('link')).toHaveCount(0)

    const project = projects.getByRole('article').filter({ hasText: 'Pousada Müller' })
    await project.getByRole('button', { name: 'Pousada Müller' }).click()

    const dialog = page.getByRole('dialog', { name: 'Pousada Müller' })
    await expect(dialog.getByText('Conclusão', { exact: true })).toBeVisible()
    await expect(dialog.getByRole('link', { name: 'repositório' })).toBeVisible()
  })
})

test.describe('navegação mobile', () => {
  test.use({ viewport: { width: 390, height: 844 } })

  test('drawer gerencia foco, Escape e retorno ao gatilho', async ({ page }) => {
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'índice' })
    await trigger.click()

    const drawer = page.getByRole('dialog', { name: 'navegação' })
    await expect(drawer).toBeVisible()
    await expect(drawer.getByRole('button', { name: 'fechar' })).toBeFocused()

    await page.keyboard.press('Escape')
    await expect(drawer).toBeHidden()
    await expect(trigger).toBeFocused()
  })

  test('mantém o gatilho do índice flutuante no canto inferior direito', async ({ page }) => {
    await page.goto('/')

    const trigger = page.getByRole('button', { name: 'índice' })
    const box = await trigger.boundingBox()

    expect(box).not.toBeNull()
    expect(box!.x + box!.width).toBeGreaterThan(320)
    expect(box!.y + box!.height).toBeGreaterThan(780)
  })

  test('footer retorna ao início real da página', async ({ page }) => {
    await page.goto('/')
    const footer = page.getByRole('contentinfo')
    await footer.scrollIntoViewIfNeeded()
    await footer.getByRole('link', { name: 'topo' }).click()

    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  })
})
