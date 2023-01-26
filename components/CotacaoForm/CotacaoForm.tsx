import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

export const CotacaoForm: React.FC = ({ volume }: { volume: number }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const [price, setPrice] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (volume) {
      clearErrors("volume")
    }
  }, [volume])

  const onSubmit = (data) => {
    const { volume, quantity, sanded, painted, cupom } = data

    const res = quantity * ((volume * 325) / 1000) + 20

    setPrice(res)
    /*     setLoading(true)
    fetch("https://donumtibas.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setPrice(data.custo)
      }) */
  }

  const inputStyle =
    "border border-gray-300 my-2 p-2 rounded bg-white text-gray-700 text-lg focus:border focus:border-purple-500 focus:outline-none"
  const labelStyle = "text-gray-600 mt-3"

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex flex-col gap-4">
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="quantity">
            Quantidade:
          </label>
          <input
            className={inputStyle}
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            max="100"
            defaultValue={1}
            {...register("quantity", { required: true })}
          />
        </div>

        <div className="flex items-center">
          <input
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 "
            type="checkbox"
            id="sanded"
            name="sanded"
            defaultChecked={false}
            {...register("sanded")}
          />
          <label className="ml-2 text-gray-700" htmlFor="sanded">
            Lixado
          </label>
        </div>
        <div className="flex items-center ">
          <input
            className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 "
            type="checkbox"
            id="paint"
            name="paint"
            defaultChecked={false}
            {...register("painted")}
          />{" "}
          <label className="ml-2 text-gray-700" htmlFor="paint">
            Pintura:
          </label>
        </div>
        <div className="flex flex-col">
          <label className={labelStyle} htmlFor="cupom">
            Cupom de desconto:
          </label>
          <input
            className={inputStyle}
            type="text"
            id="cupom"
            name="cupom"
            {...register("cupom")}
          />
        </div>
        <div className="flex flex-col">
          <button
            className="mb-8 mx-auto container block w-full p-3 text-lg bg-purple-700 text-purple-50 rounded hover:bg-purple-600"
            type="submit"
            onClick={() => {
              if (volume) {
                setValue("volume", volume)
              } else {
                setError("volume", {
                  type: "manual",
                  message: "Por favor, insira um volume",
                })
              }
            }}
          >
            <b> Cotar</b>
          </button>
          {errors.volume && (
            <div className="text-red-500">
              {errors.volume.message.toString()}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {loading ? (
            <div className="text-1xl text-slate-700">
              <b>Carregando...</b>
            </div>
          ) : price ? (
            <div className="text-1xl text-slate-700">
              <b>
                Preço:{" "}
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(price)}
              </b>
            </div>
          ) : null}
        </div>
      </div>
    </form>
  )
}
