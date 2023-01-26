type ButtonType = {
  children?: React.ReactNode
  clickHandler: () => void
  label?: string
}

export const Button = ({ children, label, clickHandler }: ButtonType) => (
  <button
    onClick={() => clickHandler()}
    className="rounded-lg px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-600 hover:text-blue-100 duration-300"
  >
    {label}
    {children}
  </button>
)
