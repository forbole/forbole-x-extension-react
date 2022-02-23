import React from "react";
import Button from "../../Element/button";
import Dialog from "../../Element/dialog";
import { useForm } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: (open: boolean) => void;
  onSubmit: (password: string) => void;
}

type Inputs = {
  password: string;
  confirmPassword: string;
};

const UnlockDialog = ({ open, onClose, onSubmit }: Props) => {
  const [error, setError] = React.useState("");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onFormSubmit = (data) => {
    onSubmit(watch("password"));
    setError("");
    reset({ password: "" });
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose(false);
        setError("");
        reset({ password: "" });
      }}
      title="Unlock Password"
    >
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="flex flex-col items-center mt-5">
          <p className="max-w-sm text-center">
            Enter password to unlock your application
          </p>
          <div className="w-full flex justify-center">
            <div className="w-full px-10 py-7">
              <input
                key="password"
                type="password"
                {...register("password", { required: true })}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full text-sm border-gray-300 rounded-sm px-3 py-2 bg-popup-100"
              />
              {!!error && (
                <p className="text-sm mt-2 text-red-500 nightwind-prevent">
                  {error}
                </p>
              )}
              <p className="text-sm mt-2">* Require after 15 minutes</p>
              <div className="mt-24">
                <Button text="Next" type="submit" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default UnlockDialog;
