export interface OptionProps {
  label: string
  value: string
  onClick?: () => void
}

const Option = ({ label, onClick }: OptionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left border-b border-gray-100 dark:border-slate-600 rounded-t cursor-pointer hover:bg-primary-50 dark:hover:bg-primary-600"
    >
      <div className="relative flex items-center w-full p-2 pl-2 border-l-4 border-transparent hover:border-primary-700">
        <div className="flex items-center w-full">
          <div className="mx-2 -mt-1">{label}</div>
        </div>
      </div>
    </button>
  )
}

export default Option
