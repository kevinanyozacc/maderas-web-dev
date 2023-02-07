interface Props {
  children: any
  title: string
}

const ShowInfoCard = ({ children, title }: Props) => {
  return (
    <div className='border-2 mb-4 dark:border-slate-700'>
      {/* <hr /> */}
      <div className="py-4 text-primary-600 dark:text-primary-300 font-semibold bg-primary-600 bg-opacity-5
        border-b-primary-600 dark:border-b-primary-300 border-b-2 p-3 place-items-center ">
        <h3 className="text-xl">{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default ShowInfoCard
