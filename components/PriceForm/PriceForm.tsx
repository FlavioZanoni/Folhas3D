
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const PriceForm = ({ volume }: { volume: number }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);

  useEffect(() => {
    if (volume) {
      clearErrors("volume");
    }
  }, [volume]);

  const onSubmit = (data: any) => {
    setLoading(true);
    fetch("/api/price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setPrice(data.price);
        if (data.discount) {
          setDiscount(data.discount);
          setDiscountedPrice(data.discountedPrice);
        } else {
          setDiscount(0);
          setDiscountedPrice(0);
        }
      });
  };

  const inputStyle =
    "border border-gray-300 my-2 p-2 rounded bg-white text-gray-700 text-lg focus:border focus:border-purple-500 focus:outline-none";
  const labelStyle = "text-gray-600 mt-3";

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
          <p className="text-slate-500 text-sm mt-1 ml-2">*Cupons somente serão aplicados para pedidos maiores que R${process.env.NEXT_PUBLIC_MIN_PRICE}.00</p>
        </div>
        <div className="flex flex-col">
          <button
            className="mb-8 mx-auto container block w-full p-3 text-lg bg-[#76c672] text-slate-50 rounded hover:bg-[#4fb55b]"
            type="submit"
            onClick={() => {
              if (volume) {
                setValue("volume", volume);
              } else {
                setError("volume", {
                  type: "manual",
                  message: "Por favor, insira um modelo 3d",
                });
              }
            }}
          >
            <b> Cotar</b>
          </button>
          {errors.volume && (
            <div className="text-red-500">
              {errors.volume.message?.toString()}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {loading ? (
            <div className="text-1xl text-slate-700">
              <b>Carregando...</b>
            </div>
          ) : price ? (
            <>
              <div className="text-1xl text-slate-700">
                <b>
                  Preço:{" "}
                  {discount > 0 ? (
                    <span className="line-through">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(price)}
                    </span>
                  ) : (
                    new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(price)
                  )}
                </b>
              </div>
              {discount > 0 && discountedPrice > 0 && (
                <div className="text-1xl text-green-700">
                  <b>
                    Preço com desconto ({discount}%):{" "}
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(discountedPrice)}
                  </b>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </form>
  );
};

