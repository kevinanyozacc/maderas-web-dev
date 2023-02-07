import { Fragment, HTMLAttributes } from 'react'
import NextLink from 'next/link'

import { classNames } from '../../../utils/classNames'
import { IconChevronRight } from '../../../icons'

interface BreadcrumbLinkProps {
  id: string
  label: string
  href?: string
  disabled?: boolean
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  links?: BreadcrumbLinkProps[]
}

export const BreadcrumbLink = ({ href, label }: BreadcrumbLinkProps) => {
  if (!href) {
    return (
      <p className="text-center md:text-left  text-slate-600 dark:text-slate-400 font-medium">{label}</p>
    )
  }

  return (
    <NextLink href={href}>
      <a className="text-center md:text-left font-medium text-primary-600 dark:text-primary-400 hover:underline">
        {label}
      </a>
    </NextLink>
  )
}

const Breadcrumb = ({ links, ...props }: Props) => {
  return (
    <div
      {...props}
      className={classNames(['flex flex-col md:flex-row items-center gap-2', props.className])}
    >
      {Array.isArray(links) &&
        links.map((link, i) => (
          <Fragment key={link.id}>
            <div className="flex items-center gap-2">
              <BreadcrumbLink {...link} />
              {i !== links.length - 1 && (
                <IconChevronRight className="icon-3 dark:text-slate-500" />
              )}
            </div>
          </Fragment>
        ))}
    </div>
  )
}

export default Breadcrumb
