import { createFileRoute } from '@tanstack/react-router'
import { PageContainer, PageHeader } from '@/components'
import { ExampleForm } from '@/feature/example'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})

function Dashboard() {
  const { t } = useTranslation()
  return (
    <PageContainer>
      <PageHeader title={t('dashboard')} subtitle={t('welcome')} />
      <ExampleForm />
    </PageContainer>
  )
}

