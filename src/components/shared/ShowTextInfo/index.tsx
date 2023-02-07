import { classNames } from '@utils/classNames'

interface Props {
  title: string
  text: string | number | undefined | null
  isTextArea?: boolean
}

const ShowTextInfo = ({ text, title, isTextArea = false }: Props) => {
  return (
    <div className={classNames(['flex flex-col sm:flex-row', isTextArea ? 'sm:flex-col' : '', 'gap-2 dark:text-white'])}>
      <p className={classNames(['font-semibold'])}>{title}:</p>
      <p className=''>{text}</p>
    </div>
  )
}

export default ShowTextInfo
